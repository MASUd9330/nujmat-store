/* ============================================
   نجمة الخليج — Admin Panel Logic
   Talks directly to GitHub API as the "database"
   ============================================ */

const ADMIN_CONFIG = {
  owner: 'MASUd9330',
  repo: 'nujmat-store',
  branch: 'main',
  configPath: 'config.json',
  imageFolder: 'images'
};

// ============== STATE ==============
const state = {
  token: localStorage.getItem('nujmat_pat') || '',
  config: null,
  configSha: null,         // GitHub file SHA needed for updates
  originalConfig: null,    // for dirty-check
  currentTab: 'dashboard',
  currentProduct: '01',
  currentImageProduct: '01',
  isDirty: false,
  uploadQueue: []          // pending image uploads
};

// ============== DOM ==============
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============== TOAST ==============
function toast(message, type = 'info', duration = 3500) {
  const el = $('#toast');
  el.textContent = message;
  el.className = `toast show toast-${type}`;
  setTimeout(() => el.classList.remove('show'), duration);
}

// ============== LOGIN ==============
function showApp() {
  $('#loginScreen').classList.add('hidden');
  $('#appScreen').classList.remove('hidden');
  loadConfig();
}

function showLogin() {
  $('#loginScreen').classList.remove('hidden');
  $('#appScreen').classList.add('hidden');
}

function saveToken() {
  const token = $('#patInput').value.trim();
  if (!token) {
    $('#loginError').textContent = 'الرجاء إدخال التوكن';
    return;
  }
  if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
    $('#loginError').textContent = 'صيغة التوكن غير صحيحة. يجب أن يبدأ بـ ghp_ أو github_pat_';
    return;
  }
  state.token = token;
  localStorage.setItem('nujmat_pat', token);
  $('#loginError').textContent = '';
  showApp();
}

function logout() {
  if (state.isDirty) {
    if (!confirm('عندك تعديلات غير محفوظة. هل تريد فعلاً الخروج؟')) return;
  }
  localStorage.removeItem('nujmat_pat');
  state.token = '';
  state.config = null;
  showLogin();
}

$('#loginBtn').addEventListener('click', saveToken);
$('#patInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveToken();
});
$('#logoutBtn').addEventListener('click', logout);

// Help modal
$('#showHelp').addEventListener('click', (e) => {
  e.preventDefault();
  $('#helpModal').classList.remove('hidden');
});
$$('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => $(`#${btn.dataset.close}`).classList.add('hidden'));
});

// ============== GITHUB API ==============
async function ghApi(path, options = {}) {
  const url = `https://api.github.com${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${state.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`GitHub API ${res.status}: ${err.message}`);
  }
  return res.json();
}

// Convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// ============== CONFIG LOAD ==============
async function loadConfig() {
  try {
    setStatus('جاري تحميل الإعدادات...', 'loading');
    const data = await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${ADMIN_CONFIG.configPath}`);
    state.configSha = data.sha;
    const content = atob(data.content.replace(/\n/g, ''));
    state.config = JSON.parse(content);
    state.originalConfig = JSON.parse(content);
    bindAll();
    renderAll();
    setStatus('✓ متصل — آخر تحديث: ' + new Date(state.config.lastUpdated).toLocaleString('ar-SA'), 'ok');
    toast('تم تحميل الإعدادات بنجاح', 'success');
    updateStats();
  } catch (err) {
    console.error(err);
    if (err.message.includes('401')) {
      toast('التوكن غير صحيح أو منتهي الصلاحية', 'error', 5000);
      logout();
    } else {
      toast('فشل التحميل: ' + err.message, 'error', 5000);
      setStatus('✗ خطأ: ' + err.message, 'error');
    }
  }
}

// ============== BIND FORMS ==============
function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function setByPath(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  const target = keys.reduce((o, k) => o[k] = o[k] || {}, obj);
  target[last] = value;
}

function bindAll() {
  $$('[data-bind]').forEach(input => {
    const path = input.dataset.bind;
    const val = getByPath(state.config, path);
    if (input.type === 'checkbox') {
      input.checked = !!val;
    } else if (val !== undefined && val !== null) {
      input.value = val;
    }

    input.removeEventListener('input', input._handler);
    input._handler = () => {
      let v = input.type === 'checkbox' ? input.checked : input.value;
      if (input.type === 'number') v = v === '' ? 0 : Number(v);
      setByPath(state.config, path, v);
      markDirty();
    };
    input.addEventListener('input', input._handler);
  });
}

function markDirty() {
  state.isDirty = true;
  setStatus('● عندك تعديلات غير محفوظة', 'dirty');
}

function markClean() {
  state.isDirty = false;
  setStatus('✓ محفوظ', 'ok');
}

function setStatus(text, type) {
  const el = $('#actionStatus');
  if (el) {
    el.textContent = text;
    el.className = `action-bar-status status-${type}`;
  }
  const ts = $('#topbarStatus');
  if (ts) {
    if (type === 'ok') { ts.textContent = '● متصل'; ts.style.color = '#22c55e'; }
    else if (type === 'error') { ts.textContent = '● خطأ'; ts.style.color = '#ef4444'; }
    else if (type === 'loading') { ts.textContent = '● جاري...'; ts.style.color = '#f59e0b'; }
    else if (type === 'dirty') { ts.textContent = '● تعديلات'; ts.style.color = '#f59e0b'; }
  }
}

// ============== TABS ==============
$$('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentTab = btn.dataset.tab;
    $$('.tab-pane').forEach(p => p.classList.remove('active'));
    $(`[data-pane="${state.currentTab}"]`).classList.add('active');
    if (state.currentTab === 'images') renderImages();
    if (state.currentTab === 'products') renderProductEditor();
  });
});

$$('[data-go]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.go;
    $(`.tab[data-tab="${target}"]`).click();
  });
});

// ============== RENDER ==============
function renderAll() {
  $('#topbarSub').textContent = `${state.config.site.name} · جاهز للتعديل`;
  renderProductTabs();
  renderImageProductTabs();
  renderLinks();
  renderTiers();
  renderImages();
}

function updateStats() {
  $('#statProducts').textContent = state.config.products.length;
  $('#statImages').textContent = state.config.products.reduce((sum, p) => sum + (p.images?.length || 0), 0);
  $('#statUpdated').textContent = new Date(state.config.lastUpdated).toLocaleDateString('ar-SA');
  $('#statDeploy').innerHTML = '<span style="color:#22c55e">●</span> نشط';
}

// ============== PRODUCT EDITOR ==============
function renderProductTabs() {
  const wrap = $('#productTabs');
  wrap.innerHTML = state.config.products.map(p => `
    <button class="prod-tab ${p.id === state.currentProduct ? 'active' : ''}" data-prod="${p.id}">
      <span class="prod-tab-num">${p.num}</span>
      <span class="prod-tab-name">${p.ar}</span>
    </button>
  `).join('');
  $$('.prod-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentProduct = btn.dataset.prod;
      renderProductTabs();
      renderProductEditor();
    });
  });
}

function renderProductEditor() {
  const p = state.config.products.find(x => x.id === state.currentProduct);
  if (!p) return;
  const html = `
    <div class="product-form">
      <div class="form-grid">
        <div class="field">
          <label>الرقم</label>
          <input type="text" value="${p.num}" disabled>
        </div>
        <div class="field">
          <label>الشارة (Badge)</label>
          <input type="text" id="prodBadge" value="${p.badge || ''}">
        </div>
        <div class="field">
          <label>الاسم بالعربي</label>
          <input type="text" id="prodAr" value="${p.ar}">
        </div>
        <div class="field">
          <label>الاسم بالإنجليزي</label>
          <input type="text" id="prodEn" value="${p.en}">
        </div>
        <div class="field">
          <label>الفئة (Tag)</label>
          <input type="text" id="prodTag" value="${p.tag}">
        </div>
        <div class="field">
          <label>المخزون</label>
          <input type="number" id="prodStock" value="${p.stock}">
        </div>
        <div class="field">
          <label>السعر الحالي (ر.س)</label>
          <input type="number" id="prodPrice" value="${p.price}">
        </div>
        <div class="field">
          <label>السعر الأصلي (ر.س)</label>
          <input type="number" id="prodOldPrice" value="${p.oldPrice}">
        </div>
        <div class="field">
          <label>المونوغرام (يظهر لو ما فيه صورة)</label>
          <input type="text" id="prodMonogram" value="${p.monogram}">
        </div>
        <div class="field full">
          <label>الوصف القصير (يظهر في الكارد)</label>
          <textarea id="prodDesc" rows="3">${p.desc}</textarea>
        </div>
        <div class="field full">
          <label>الوصف الطويل (صفحة المنتج)</label>
          <textarea id="prodDescLong" rows="4">${p.descLong}</textarea>
        </div>
      </div>

      <h3>النقاط الرئيسية (Bullets)</h3>
      <div id="prodBullets" class="bullets-list">
        ${p.bullets.map((b, i) => `
          <div class="bullet-item">
            <input type="text" value="${b}" data-bullet="${i}">
            <button class="btn-icon" data-remove-bullet="${i}">×</button>
          </div>
        `).join('')}
        <button class="btn btn-ghost" id="addBulletBtn">+ إضافة نقطة</button>
      </div>

      <h3>المواصفات (Specs)</h3>
      <div id="prodSpecs" class="specs-list">
        ${p.specs.map((s, i) => `
          <div class="spec-item">
            <input type="text" placeholder="المفتاح" value="${s.k}" data-spec-k="${i}">
            <input type="text" placeholder="القيمة" value="${s.v}" data-spec-v="${i}">
            <button class="btn-icon" data-remove-spec="${i}">×</button>
          </div>
        `).join('')}
        <button class="btn btn-ghost" id="addSpecBtn">+ إضافة مواصفة</button>
      </div>
    </div>
  `;
  $('#productEditor').innerHTML = html;

  // Bind edits
  const fields = ['Badge','Ar','En','Tag','Stock','Price','OldPrice','Monogram','Desc','DescLong'];
  fields.forEach(f => {
    const el = $(`#prod${f}`);
    if (el) {
      el.addEventListener('input', () => {
        const key = f === 'Ar' ? 'ar' : f === 'En' ? 'en' : f.charAt(0).toLowerCase() + f.slice(1);
        let v = el.value;
        if (f === 'Stock' || f === 'Price' || f === 'OldPrice') v = Number(v) || 0;
        p[key] = v;
        markDirty();
      });
    }
  });

  // Bullets
  $$('[data-bullet]').forEach(input => {
    input.addEventListener('input', () => {
      p.bullets[Number(input.dataset.bullet)] = input.value;
      markDirty();
    });
  });
  $$('[data-remove-bullet]').forEach(btn => {
    btn.addEventListener('click', () => {
      p.bullets.splice(Number(btn.dataset.removeBullet), 1);
      renderProductEditor();
      markDirty();
    });
  });
  $('#addBulletBtn').addEventListener('click', () => {
    p.bullets.push('نقطة جديدة');
    renderProductEditor();
    markDirty();
  });

  // Specs
  $$('[data-spec-k]').forEach(input => {
    input.addEventListener('input', () => {
      p.specs[Number(input.dataset.specK)].k = input.value;
      markDirty();
    });
  });
  $$('[data-spec-v]').forEach(input => {
    input.addEventListener('input', () => {
      p.specs[Number(input.dataset.specV)].v = input.value;
      markDirty();
    });
  });
  $$('[data-remove-spec]').forEach(btn => {
    btn.addEventListener('click', () => {
      p.specs.splice(Number(btn.dataset.removeSpec), 1);
      renderProductEditor();
      markDirty();
    });
  });
  $('#addSpecBtn').addEventListener('click', () => {
    p.specs.push({ k: 'مواصفة', v: 'القيمة' });
    renderProductEditor();
    markDirty();
  });
}

// ============== IMAGE MANAGER ==============
function renderImageProductTabs() {
  const wrap = $('#imageProductTabs');
  wrap.innerHTML = state.config.products.map(p => `
    <button class="img-prod-tab ${p.id === state.currentImageProduct ? 'active' : ''}" data-prod="${p.id}">
      ${p.num}. ${p.ar}
    </button>
  `).join('');
  $$('.img-prod-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentImageProduct = btn.dataset.prod;
      renderImageProductTabs();
      renderImages();
    });
  });
}

function getImageUrl(filename) {
  // Use jsDelivr CDN if enabled, else relative path
  if (state.config.imageCdn?.enabled) {
    return `${state.config.imageCdn.base}/${filename}`;
  }
  return filename;
}

function renderImages() {
  const p = state.config.products.find(x => x.id === state.currentImageProduct);
  if (!p) return;
  $('#imageProductTitle').textContent = `${p.num}. ${p.ar}`;
  $('#imageProductHint').textContent = `${p.images.length} صورة. ارفع صور جديدة لاستبدالها.`;

  const grid = $('#imageGrid');
  grid.innerHTML = p.images.map((img, idx) => {
    const url = getImageUrl(img);
    return `
      <div class="image-card" data-idx="${idx}">
        <div class="image-preview">
          <img src="${url}" alt="${img}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'img-error\\'>فشل التحميل</div>'">
        </div>
        <div class="image-info">
          <code>${img.split('/').pop()}</code>
          <div class="image-actions">
            <label class="btn btn-ghost btn-sm">
              استبدال
              <input type="file" accept="image/*" data-replace="${idx}" hidden>
            </label>
            <button class="btn btn-ghost btn-sm" data-delete-img="${idx}">حذف</button>
          </div>
        </div>
      </div>
    `;
  }).join('') + `
    <div class="image-card image-card-add" id="addImageCard">
      <div class="add-icon">+</div>
      <div>أضف صورة جديدة</div>
    </div>
  `;

  // Bind replace
  $$('[data-replace]').forEach(input => {
    input.addEventListener('change', (e) => {
      const idx = Number(input.dataset.replace);
      const file = e.target.files[0];
      if (file) handleImageUpload(file, p.images[idx], idx);
    });
  });

  // Bind delete
  $$('[data-delete-img]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('حذف هذه الصورة؟ هذا الإجراء لا يمكن التراجع عنه.')) return;
      const idx = Number(btn.dataset.deleteImg);
      const filename = p.images[idx];
      try {
        setStatus('جاري حذف الصورة...', 'loading');
        // Get file SHA first
        const data = await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${filename}`);
        await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${filename}`, {
          method: 'DELETE',
          body: JSON.stringify({
            message: `chore: delete image ${filename} via admin`,
            sha: data.sha,
            branch: ADMIN_CONFIG.branch
          })
        });
        p.images.splice(idx, 1);
        renderImages();
        setStatus('✓ تم حذف الصورة', 'ok');
        toast('تم حذف الصورة', 'success');
        markDirty();
      } catch (err) {
        toast('فشل الحذف: ' + err.message, 'error', 5000);
      }
    });
  });

  $('#addImageCard').addEventListener('click', () => $('#fileInput').click());
}

async function handleImageUpload(file, targetPath, replaceIdx) {
  if (file.size > 5 * 1024 * 1024) {
    toast('الصورة أكبر من 5MB', 'error');
    return;
  }
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) {
    toast('نوع الصورة غير مدعوم. استخدم JPG أو PNG أو WebP', 'error');
    return;
  }
  try {
    setStatus(`جاري رفع ${file.name}...`, 'loading');
    const buffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(buffer);
    let sha = null;
    try {
      const existing = await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${targetPath}`);
      sha = existing.sha;
    } catch (e) {
      // File doesn't exist yet, fine
    }
    await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${targetPath}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `chore: upload ${file.name} via admin (replace)`,
        content: base64,
        branch: ADMIN_CONFIG.branch,
        ...(sha ? { sha } : {})
      })
    });
    setStatus(`✓ تم رفع ${file.name}`, 'ok');
    toast('تم رفع الصورة بنجاح. قد يستغرق ظهورها 1-2 دقيقة.', 'success', 5000);
    renderImages();
  } catch (err) {
    toast('فشل الرفع: ' + err.message, 'error', 5000);
    setStatus('✗ خطأ: ' + err.message, 'error');
  }
}

// Drag & drop and file input
const uploadZone = $('#uploadZone');
const fileInput = $('#fileInput');
uploadZone.addEventListener('click', () => fileInput.click());
uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragging');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragging'));
uploadZone.addEventListener('drop', async (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragging');
  const p = state.config.products.find(x => x.id === state.currentImageProduct);
  if (!p) return;
  const files = Array.from(e.dataTransfer.files);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const idx = p.images.length + 1 + i;
    const ext = file.name.split('.').pop();
    const path = `${ADMIN_CONFIG.imageFolder}/p${p.id}-${idx}.${ext}`;
    await handleImageUpload(file, path);
  }
  // After uploads, re-fetch config to get new image list
  setTimeout(loadConfig, 2000);
});
fileInput.addEventListener('change', async (e) => {
  const p = state.config.products.find(x => x.id === state.currentImageProduct);
  if (!p) return;
  const files = Array.from(e.target.files);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const idx = p.images.length + 1 + i;
    const ext = file.name.split('.').pop();
    const path = `${ADMIN_CONFIG.imageFolder}/p${p.id}-${idx}.${ext}`;
    await handleImageUpload(file, path);
  }
  setTimeout(loadConfig, 2000);
});

// ============== LINKS EDITOR ==============
function renderLinks() {
  const wrap = $('#linksList');
  wrap.innerHTML = state.config.footer.links.map((l, i) => `
    <div class="link-item">
      <input type="text" placeholder="الاسم" value="${l.label}" data-link-label="${i}">
      <input type="text" placeholder="الرابط" value="${l.url}" data-link-url="${i}">
      <button class="btn-icon" data-remove-link="${i}">×</button>
    </div>
  `).join('');

  $$('[data-link-label]').forEach(input => {
    input.addEventListener('input', () => {
      state.config.footer.links[Number(input.dataset.linkLabel)].label = input.value;
      markDirty();
    });
  });
  $$('[data-link-url]').forEach(input => {
    input.addEventListener('input', () => {
      state.config.footer.links[Number(input.dataset.linkUrl)].url = input.value;
      markDirty();
    });
  });
  $$('[data-remove-link]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.config.footer.links.splice(Number(btn.dataset.removeLink), 1);
      renderLinks();
      markDirty();
    });
  });
}
$('#addLinkBtn').addEventListener('click', () => {
  state.config.footer.links.push({ label: 'رابط جديد', url: '#' });
  renderLinks();
  markDirty();
});

// ============== TIERS EDITOR ==============
function renderTiers() {
  const wrap = $('#tiersList');
  wrap.innerHTML = state.config.discountTiers.map((t, i) => `
    <div class="tier-item">
      <label>من</label>
      <input type="number" min="1" value="${t.min}" data-tier-min="${i}">
      <label>الاسم</label>
      <input type="text" value="${t.label}" data-tier-label="${i}">
      <label>خصم %</label>
      <input type="number" min="0" max="100" value="${t.discount}" data-tier-disc="${i}">
    </div>
  `).join('');
  $$('[data-tier-min]').forEach(input => {
    input.addEventListener('input', () => {
      state.config.discountTiers[Number(input.dataset.tierMin)].min = Number(input.value) || 1;
      markDirty();
    });
  });
  $$('[data-tier-label]').forEach(input => {
    input.addEventListener('input', () => {
      state.config.discountTiers[Number(input.dataset.tierLabel)].label = input.value;
      markDirty();
    });
  });
  $$('[data-tier-disc]').forEach(input => {
    input.addEventListener('input', () => {
      state.config.discountTiers[Number(input.dataset.tierDisc)].discount = Number(input.value) || 0;
      markDirty();
    });
  });
}

// ============== SAVE / DEPLOY ==============
async function saveConfig() {
  if (!state.isDirty) {
    toast('ما فيه تعديلات للحفظ', 'info');
    return;
  }
  try {
    setStatus('جاري الحفظ والنشر...', 'loading');
    state.config.lastUpdated = new Date().toISOString();
    state.config.version = bumpVersion(state.config.version);
    const content = JSON.stringify(state.config, null, 2);
    const base64 = btoa(unescape(encodeURIComponent(content)));
    await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${ADMIN_CONFIG.configPath}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `chore: update site config via admin [v${state.config.version}]`,
        content: base64,
        sha: state.configSha,
        branch: ADMIN_CONFIG.branch
      })
    });
    state.configSha = (await ghApi(`/repos/${ADMIN_CONFIG.owner}/${ADMIN_CONFIG.repo}/contents/${ADMIN_CONFIG.configPath}`)).sha;
    state.originalConfig = JSON.parse(JSON.stringify(state.config));
    markClean();
    setStatus('✓ تم الحفظ — Vercel ينشر الآن (انتظر 30-60 ثانية)', 'ok');
    toast('تم الحفظ والنشر! تحقق من الموقع بعد دقيقة.', 'success', 5000);
    updateStats();
  } catch (err) {
    console.error(err);
    toast('فشل الحفظ: ' + err.message, 'error', 6000);
    setStatus('✗ خطأ في الحفظ', 'error');
  }
}

function bumpVersion(v) {
  const parts = (v || '1.0.0').split('.').map(Number);
  parts[2] = (parts[2] || 0) + 1;
  return parts.join('.');
}

function discardChanges() {
  if (!state.isDirty) {
    toast('ما فيه تعديلات للإلغاء', 'info');
    return;
  }
  if (!confirm('إلغاء كل التعديلات غير المحفوظة؟')) return;
  state.config = JSON.parse(JSON.stringify(state.originalConfig));
  bindAll();
  renderAll();
  markClean();
  toast('تم التراجع عن التعديلات', 'info');
}

function reloadConfig() {
  if (state.isDirty) {
    if (!confirm('عندك تعديلات غير محفوظة. إعادة التحميل ستلغيها. متابعة؟')) return;
  }
  loadConfig();
}

$('#saveBtn').addEventListener('click', saveConfig);
$('#discardBtn').addEventListener('click', discardChanges);
$('#reloadBtn').addEventListener('click', reloadConfig);

// ============== INIT ==============
if (state.token) {
  // Validate token first
  fetch('https://api.github.com/user', {
    headers: { 'Authorization': `Bearer ${state.token}` }
  }).then(res => {
    if (res.ok) {
      showApp();
    } else {
      localStorage.removeItem('nujmat_pat');
      state.token = '';
      showLogin();
      toast('التوكن منتهي، سجّل دخول مرة ثانية', 'warning', 5000);
    }
  }).catch(() => showLogin());
} else {
  showLogin();
}

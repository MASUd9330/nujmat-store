/* ============================================
   نجمة الخليج — Shared App Logic
   Loads config.json (if available) and merges
   with hardcoded defaults below.
   ============================================ */

// ============================================
// DEFAULTS — used if config.json fails to load
// These mirror the values in config.json
// ============================================
const DEFAULT_CONFIG = {
  site: {
    name: "نجمة الخليج",
    nameEn: "Nujmat Al-Khalij",
    tagline: "Gulf Star",
    phone: "+880158126134",
    phoneDisplay: "+880 0158-126134",
    whatsapp: "880158126134",
    email: "",
    address: "الرياض، المملكة العربية السعودية",
    currency: "ر.س",
    supplier: "Zambeel KSA"
  },
  hero: {
    badge: "متجر الخليج المميز",
    title: "اكتشف منتجات تجمع بين الأناقة والعملية",
    subtitle: "أربع قطع مختارة بعناية لكل بيت خليجي — توصيل سريع، الدفع عند الاستلام، وضمان ذهبي.",
    ctaPrimary: "تصفّح المنتجات",
    ctaSecondary: "اطلب الآن — كاش عند التوصيل",
    trustLine: "✓ توصيل 3-5 أيام في السعودية  ·  ✓ دفع عند الاستلام  ·  ✓ ضمان ذهبي 6 أشهر"
  },
  design: {
    accentColor: "#B8860B",
    backgroundColor: "#F7F3EC",
    textColor: "#2A1A0A",
    mutedColor: "#6B5A45",
    cardBackground: "#FFFFFF",
    borderColor: "#E8DDC6"
  },
  products: [
    {
      id: "01", num: "01",
      ar: "مسدس التدليك الذكي", en: "Recovery Smart Massage Gun",
      tag: "صحة · Wellness", monogram: "عافية", monogramEn: "Recovery",
      price: 139, oldPrice: 199, save: 60,
      desc: "أربع رؤوس، ست سرعات، شحن يدوم ست ساعات. يخفف آلام العضلات بعد التمرين أو يوم العمل الطويل — في صمت تام، وأنت في بيتك.",
      descLong: "مسدس التدليك الذكي بـ 4 رؤوس مختلفة يخفف آلام العضلات بعد التمرين أو يوم العمل الطويل. خفيف الوزن، هادئ تماماً، مع 6 سرعات مختلفة للعلاج العميق والسطحي. مصمم للاستخدام اليومي بدون إزعاج.",
      color: "#E8DDC6", visualClass: "pv-1", stock: 47, badge: "الأكثر مبيعاً",
      specs: [
        { k: "الرؤوس", v: "4 رؤوس مختلفة (كرة، مخروط، شوكة، مسطح)" },
        { k: "السرعات", v: "6 سرعات (1500-3200 لفة/دقيقة)" },
        { k: "البطارية", v: "6 ساعات من التشغيل المتواصل" },
        { k: "الوزن", v: "700 جرام" },
        { k: "الضوضاء", v: "أقل من 40 ديسيبل" },
        { k: "الشحن", v: "USB-C" },
        { k: "الضمان", v: "6 أشهر شامل" }
      ],
      shipping: { saudi: "3-5 أيام", uae: "4-6 أيام", gcc: "5-7 أيام" },
      bullets: [
        "يخفف آلام العضلات في 60 ثانية",
        "4 رؤوس لكل عضلة في الجسم",
        "هادئ كهمس — أقل من 40 ديسيبل",
        "يدوم 6 ساعات بشحنة واحدة"
      ],
      images: ["images/p01-main.jpg","images/p01-1.jpg","images/p01-2.jpg","images/p01-3.jpg","images/p01-4.jpg"]
    },
    {
      id: "02", num: "02",
      ar: "حامل الجوال الثلاثي", en: "Bluetooth Tripod Selfie Stick",
      tag: "إبداع · Creator", monogram: "إبداع", monogramEn: "Creator",
      price: 129, oldPrice: 199, save: 70,
      desc: "يرتفع حتى ١.٧ متر، ريموت بلوتوث مدمج، قاعدة ثابتة لا تهتز. صوّر نفسك في البث المباشر، أو أجمع العائلة في صورة واحدة بدون أن تطلب مساعدة.",
      descLong: "حامل جوال ثلاثي احترافي مع ريموت بلوتوث مدمج. ارتفاع قابل للتعديل حتى 1.7 متر. قاعدة ثابتة بدون اهتزاز. مثالي لصناع المحتوى والبث المباشر والتصوير العائلي.",
      color: "#DDD3BD", visualClass: "pv-2", stock: 32, badge: "جديد",
      specs: [
        { k: "الارتفاع", v: "قابل للتعديل حتى 1.7 متر" },
        { k: "البلوتوث", v: "مدمج — ريموت للتحكم عن بعد" },
        { k: "الدوران", v: "360°" },
        { k: "التوافق", v: "جميع الجوالات 4.7-7 بوصة" },
        { k: "الوزن", v: "350 جرام" },
        { k: "الطوي", v: "قابل للطي بالكامل" },
        { k: "الضمان", v: "6 أشهر" }
      ],
      shipping: { saudi: "3-5 أيام", uae: "4-6 أيام", gcc: "5-7 أيام" },
      bullets: [
        "صوّر نفسك بدون مساعدة",
        "ارتفاع 1.7 متر + ريموت بلوتوث",
        "ثابت تماماً — لا اهتزاز",
        "خفيف وقابل للطي"
      ],
      images: ["images/p02-main.jpg","images/p02-1.jpg","images/p02-2.jpg","images/p02-3.jpg","images/p02-4.jpg"]
    },
    {
      id: "03", num: "03",
      ar: "الشاحن السريع GaN", en: "65W GaN 6-Port Fast Charger",
      tag: "تكنولوجيا · Tech", monogram: "قوّة", monogramEn: "Power",
      price: 149, oldPrice: 229, save: 80,
      desc: "ستة منافذ في قطعة واحدة. شحن آمن وسريع لكل أجهزتك — من الجوال إلى اللابتوب. تقنية GaN تجعله أصغر وأقوى من أي شاحن آخر.",
      descLong: "شاحن GaN السريع بـ 6 منافذ — 2 USB-C و 4 USB-A. شحن 65 واط إجمالاً. تقنية GaN المتطورة تجعله أصغر وأقوى. حماية كاملة من الحرارة والتيار الزائد.",
      color: "#D4C9AE", visualClass: "pv-3", stock: 58, badge: "الأكثر طلباً",
      specs: [
        { k: "الطاقة", v: "65 واط إجمالي" },
        { k: "المنافذ", v: "2 USB-C + 4 USB-A" },
        { k: "التقنية", v: "GaN (نيتريد الغاليوم)" },
        { k: "الحماية", v: "حماية من الحرارة، التيار، الجهد" },
        { k: "التوافق", v: "iPhone, Samsung, iPad, لابتوب" },
        { k: "الشحن", v: "كابل طاقة مرفق" },
        { k: "الضمان", v: "12 شهر" }
      ],
      shipping: { saudi: "3-5 أيام", uae: "4-6 أيام", gcc: "5-7 أيام" },
      bullets: [
        "6 منافذ في شاحن واحد",
        "تقنية GaN — شحن 3x أسرع",
        "آمن ومحمي بالكامل",
        "يكفي لابتوب + 5 أجهزة"
      ],
      images: ["images/p03-main.jpg","images/p03-1.jpg","images/p03-2.jpg","images/p03-3.jpg","images/p03-4.jpg"]
    },
    {
      id: "04", num: "04",
      ar: "موزع الروائح الذكي", en: "Smart Aroma Diffuser · 300ml",
      tag: "سكينة · Serenity", monogram: "سكينة", monogramEn: "Serenity",
      price: 119, oldPrice: 179, save: 60,
      desc: "سبعة ألوان متغيرة، ترطيب بالموجات الفوق صوتية، تايمر ذكي. حوّل غرفتك إلى مساحة هادئة — للنوم العميق، أو لاستقبال الضيوف بأجواء مميزة.",
      descLong: "موزع الروائح الذكي بالموجات الفوق صوتية — تقنية هادئة تماماً بدون حرارة. 7 ألوان LED متغيرة، تايمر ذكي 1/3/6 ساعات، سعة 300 مل تدوم 10+ ساعات. إيقاف تلقائي آمن عند نفاد الماء.",
      color: "#E1D5BB", visualClass: "pv-4", stock: 24, badge: "محدود",
      specs: [
        { k: "السعة", v: "300 مل" },
        { k: "المدة", v: "10+ ساعات متواصلة" },
        { k: "الألوان", v: "7 ألوان LED متغيرة" },
        { k: "التايمر", v: "1 / 3 / 6 ساعات" },
        { k: "الأمان", v: "إيقاف تلقائي عند نفاد الماء" },
        { k: "التقنية", v: "موجات فوق صوتية — بدون حرارة" },
        { k: "الضمان", v: "6 أشهر" }
      ],
      shipping: { saudi: "3-5 أيام", uae: "4-6 أيام", gcc: "5-7 أيام" },
      bullets: [
        "ترطيب + عطور + إضاءة في جهاز",
        "هادئ تماماً — مثالي للنوم",
        "7 ألوان LED للإضاءة المزاجية",
        "آمن للأطفال بدون حرارة"
      ],
      images: ["images/p04-main.jpg","images/p04-1.jpg","images/p04-2.jpg","images/p04-3.jpg","images/p04-4.jpg"]
    }
  ],
  bundle: {
    enabled: true,
    products: ["01","02","03","04"],
    title: "باقة نجمة الخليج الكاملة",
    subtitle: "الأربع قطع معاً بسعر مذهل",
    totalPrice: 536, bundlePrice: 399, save: 137,
    badge: "وفّر 137 ر.س"
  },
  discountTiers: [
    { min: 1, discount: 0, label: "قطعة واحدة" },
    { min: 2, discount: 10, label: "قطعتان" },
    { min: 3, discount: 15, label: "3 قطع" },
    { min: 4, discount: 20, label: "4 قطع أو أكثر" },
    { min: 5, discount: 25, label: "5 قطع أو أكثر" }
  ],
  marketing: {
    countdownEnd: "2026-12-31T23:59:59",
    countdownLabel: "ينتهي العرض خلال",
    countdownEnabled: true,
    exitPopup: {
      enabled: true,
      title: "انتظر! عرض خاص قبل أن تخرج",
      text: "احصل على خصم إضافي 10% على طلبك الأول — أدخل رقم واتسابك الآن",
      discount: "10",
      buttonText: "أريد الخصم"
    },
    stockCounterEnabled: true,
    stockMin: 3, stockMax: 12,
    liveActivityEnabled: true,
    liveActivityInterval: 18000
  },
  footer: {
    about: "نجمة الخليج — متجر مميز لأصحاب الذوق الرفيع في السعودية والخليج. أربع قطع مختارة بعناية، توصيل سريع، دفع عند الاستلام، وضمان ذهبي.",
    links: [],
    social: {
      tiktok: "https://www.tiktok.com/@nujmat.sa",
      snapchat: "https://www.snapchat.com/add/nujmat.sa",
      instagram: "https://www.instagram.com/nujmat.sa",
      twitter: "https://twitter.com/nujmat_sa",
      youtube: ""
    },
    copyright: "© 2026 نجمة الخليج · جميع الحقوق محفوظة"
  },
  analytics: {
    metaPixelId: "",
    tiktokPixelId: "",
    googleAnalyticsId: "",
    snapchatPixelId: ""
  },
  integrations: {
    googleSheetsUrl: "https://script.google.com/macros/s/AKfycbyaCfntf-L_XnleTMALCnTo3lr7oivEFVJ_-3QQSvk4eyVdLcKi_WmDDbfc4Bqe-h93Jg/exec",
    mailchimpUrl: "",
    whatsappNumber: "880158126134"
  },
  imageCdn: {
    enabled: true,
    provider: "jsdelivr",
    base: "https://cdn.jsdelivr.net/gh/MASUd9330/nujmat-store@main"
  }
};

// ============================================
// RUNTIME CONFIG — starts as default, replaced by loaded config
// ============================================
let CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));

// ============================================
// LANGUAGE STATE
// ============================================
let CURRENT_LANG = (() => {
  // 1. localStorage takes priority
  const saved = localStorage.getItem('nujmat_lang');
  if (saved === 'ar' || saved === 'en') return saved;
  // 2. Browser language
  const browser = (navigator.language || 'ar').toLowerCase();
  if (browser.startsWith('en')) return 'en';
  return 'ar';
})();

function t(arText, enText) {
  return CURRENT_LANG === 'en' ? (enText || arText) : arText;
}

function toggleLanguage() {
  CURRENT_LANG = CURRENT_LANG === 'ar' ? 'en' : 'ar';
  localStorage.setItem('nujmat_lang', CURRENT_LANG);
  applyLanguage();
  // Re-render product if it exists
  if (typeof window.initProductPage === 'function' && document.getElementById('productPage')) {
    window.initProductPage();
  }
  // Re-render checkout if it exists
  if (typeof window.initCheckoutPage === 'function' && document.getElementById('checkoutPage')) {
    window.initCheckoutPage();
  }
  // Trigger custom event for other scripts
  window.dispatchEvent(new CustomEvent('lang:change', { detail: { lang: CURRENT_LANG } }));
}

function applyLanguage() {
  const lang = CURRENT_LANG;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('lang-en', lang === 'en');
  document.body.classList.toggle('lang-ar', lang === 'ar');
  // Update all toggle buttons
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.innerHTML = lang === 'ar' ? 'EN' : 'ع';
    btn.title = lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية';
  });
}
window.toggleLanguage = toggleLanguage;

// ============================================
// HELPERS
// ============================================
function imageUrl(filename) {
  if (CONFIG.imageCdn?.enabled && CONFIG.imageCdn?.base) {
    // Strip leading "images/" if present, since base already points to repo root
    const clean = filename.replace(/^images\//, '');
    return `${CONFIG.imageCdn.base}/images/${clean}`;
  }
  return filename;
}

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

// ============================================
// CONFIG LOADER
// ============================================
// Promise resolved when config is fully loaded (or failed over to defaults)
// Other scripts can `await window.configReady` before using PRODUCTS/BUNDLE/CONFIG
window.configReady = (async () => {
  try {
    const res = await fetch('config.json?_=' + Date.now());
    if (!res.ok) throw new Error('Config not found');
    const remote = await res.json();
    CONFIG = deepMerge(JSON.parse(JSON.stringify(DEFAULT_CONFIG)), remote);
    console.log('[config] loaded remote config v' + remote.version);
  } catch (err) {
    console.warn('[config] using defaults:', err.message);
  }
  applyDesign();
  applyLanguage();
  applyPageContent();
  // Sync backwards-compat exports after config load
  syncExports();
  // Notify listeners
  window.dispatchEvent(new Event('config:ready'));
  return CONFIG;
})();

function syncExports() {
  // Rebuild PRODUCTS object from CONFIG
  Object.keys(PRODUCTS).forEach(k => delete PRODUCTS[k]);
  CONFIG.products.forEach(p => { PRODUCTS[p.id] = p; });
  BUNDLE.products = CONFIG.bundle.products;
  BUNDLE.totalPrice = CONFIG.bundle.totalPrice;
  BUNDLE.bundlePrice = CONFIG.bundle.bundlePrice;
  BUNDLE.save = CONFIG.bundle.save;
  DISCOUNT_TIERS.length = 0;
  CONFIG.discountTiers.forEach(t => DISCOUNT_TIERS.push(t));
}

async function loadConfig() {
  return window.configReady;
}
  try {
    const res = await fetch('config.json?_=' + Date.now());
    if (!res.ok) throw new Error('Config not found');
    const remote = await res.json();
    // Deep merge: remote overrides defaults
    CONFIG = deepMerge(JSON.parse(JSON.stringify(DEFAULT_CONFIG)), remote);
    console.log('[config] loaded remote config v' + remote.version);
  } catch (err) {
    console.warn('[config] using defaults:', err.message);
  }
  // After load, apply design to CSS variables and update page content
  applyDesign();
  applyPageContent();
}

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// ============================================
// APPLY DESIGN (CSS variables)
// ============================================
function applyDesign() {
  const d = CONFIG.design;
  if (!d) return;
  const root = document.documentElement.style;
  root.setProperty('--accent', d.accentColor);
  root.setProperty('--gold', d.accentColor);
  root.setProperty('--bg', d.backgroundColor);
  root.setProperty('--cream', d.backgroundColor);
  root.setProperty('--ink', d.textColor);
  root.setProperty('--muted', d.mutedColor);
  root.setProperty('--card', d.cardBackground);
  root.setProperty('--border', d.borderColor);
}

// ============================================
// APPLY PAGE CONTENT (hero, footer, social)
// ============================================
function applyPageContent() {
  const lang = CURRENT_LANG;
  const pick = (ar, en) => lang === 'en' ? (en || ar) : ar;

  // Site name in title
  document.title = `${pick(CONFIG.site.name, CONFIG.site.nameEn)} — ${CONFIG.site.tagline || 'Gulf Star'}`;

  // Hero
  setText('[data-hero="badge"]', pick(CONFIG.hero.badge, CONFIG.hero.badgeEn));
  setText('[data-hero="title"]', pick(CONFIG.hero.title, CONFIG.hero.titleEn));
  setText('[data-hero="subtitle"]', pick(CONFIG.hero.subtitle, CONFIG.hero.subtitleEn));
  setText('[data-hero="ctaPrimary"]', pick(CONFIG.hero.ctaPrimary, CONFIG.hero.ctaPrimaryEn));
  setText('[data-hero="ctaSecondary"]', pick(CONFIG.hero.ctaSecondary, CONFIG.hero.ctaSecondaryEn));
  setText('[data-hero="trustLine"]', pick(CONFIG.hero.trustLine, CONFIG.hero.trustLineEn));

  // Footer
  setText('[data-footer="about"]', pick(CONFIG.footer.about, CONFIG.footer.aboutEn));
  setText('[data-footer="copyright"]', pick(CONFIG.footer.copyright, CONFIG.footer.copyrightEn));

  // Phone numbers
  setHref('[data-phone]', `tel:${CONFIG.site.phone}`);
  setText('[data-phone-display]', CONFIG.site.phoneDisplay);
  setHref('[data-whatsapp]', `https://wa.me/${CONFIG.site.whatsapp}`);

  // Social links
  const social = CONFIG.footer.social || {};
  setHref('[data-social="tiktok"]', social.tiktok);
  setHref('[data-social="snapchat"]', social.snapchat);
  setHref('[data-social="instagram"]', social.instagram);
  setHref('[data-social="twitter"]', social.twitter);
  setHref('[data-social="youtube"]', social.youtube);

  // Footer links
  const linksWrap = document.querySelector('[data-footer="links"]');
  if (linksWrap && CONFIG.footer.links?.length) {
    linksWrap.innerHTML = CONFIG.footer.links.map(l =>
      `<a href="${l.url}">${pick(l.label, l.labelEn)}</a>`
    ).join('');
  }

  // Brand name in nav
  const brandAr = document.querySelector('[data-brand="ar"]');
  const brandEn = document.querySelector('[data-brand="en"]');
  if (brandAr) brandAr.style.display = lang === 'ar' ? '' : 'none';
  if (brandEn) brandEn.style.display = lang === 'en' ? '' : 'none';
}

function setText(sel, text) {
  document.querySelectorAll(sel).forEach(el => { if (text) el.textContent = text; });
}
function setHref(sel, href) {
  if (!href) return;
  document.querySelectorAll(sel).forEach(el => el.setAttribute('href', href));
}

// ============================================
// BACKWARDS-COMPAT EXPORTS
// The rest of the site (index.html, product.html) still uses PRODUCTS, BUNDLE, etc.
// ============================================
const PRODUCTS = {};
CONFIG.products.forEach(p => { PRODUCTS[p.id] = p; });

const BUNDLE = {
  products: CONFIG.bundle.products,
  totalPrice: CONFIG.bundle.totalPrice,
  bundlePrice: CONFIG.bundle.bundlePrice,
  save: CONFIG.bundle.save
};

const DISCOUNT_TIERS = CONFIG.discountTiers;
const WHATSAPP_NUMBER = CONFIG.integrations.whatsappNumber;
const GOOGLE_SHEETS_URL = CONFIG.integrations.googleSheetsUrl;

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getDiscountForQty(qty) {
  qty = Math.max(1, parseInt(qty) || 1);
  let tier = DISCOUNT_TIERS[0];
  for (const t of DISCOUNT_TIERS) {
    if (qty >= t.min) tier = t;
  }
  return tier;
}

function calcPrice(unitPrice, qty) {
  qty = Math.max(1, parseInt(qty) || 1);
  const subtotal = unitPrice * qty;
  const tier = getDiscountForQty(qty);
  const discount = subtotal * (tier.discount / 100);
  return {
    subtotal,
    discount,
    total: subtotal - discount,
    pct: tier.discount,
    tier
  };
}

// ============================================
// GOOGLE SHEETS
// ============================================
async function saveToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('Google Sheets URL not configured.');
    return { success: false, reason: 'not_configured' };
  }
  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return { success: true };
  } catch (err) {
    console.error('Sheets save failed:', err);
    return { success: false, error: err };
  }
}

// ============================================
// EMAIL CONFIRMATION
// ============================================
function buildEmailLink(toEmail, orderData) {
  const subject = `تأكيد طلبك من ${CONFIG.site.name} — ${orderData.orderNum}`;
  const body = `مرحباً ${orderData.name}،

شكراً لطلبك من ${CONFIG.site.name}! 🌟

تفاصيل الطلب:
- رقم الطلب: ${orderData.orderNum}
- المنتج: ${orderData.productName}
- الكمية: ${orderData.qty}
- الإجمالي: ${orderData.total} ${CONFIG.site.currency}
- المدينة: ${orderData.city}

سنتصل بك خلال 24 ساعة لتأكيد طلبك.
بعد التأكيد، يصلك خلال 3-5 أيام.
الدفع عند الاستلام.

تابعنا: @nujmat.sa

${CONFIG.site.name}`;
  return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ============================================
// TOAST
// ============================================
function showToast(message, duration = 3000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ============================================
// REVEAL ON SCROLL
// ============================================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// FAQ TOGGLE
// ============================================
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ============================================
// URL PARAMS
// ============================================
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ============================================
// FORMAT CURRENCY
// ============================================
function formatSAR(amount) {
  return `${amount} <span style="font-size:0.6em;color:var(--muted)">${CONFIG.site.currency}</span>`;
}

// ============================================
// ANALYTICS (Pixels)
// ============================================
function injectPixels() {
  const a = CONFIG.analytics;
  if (a.metaPixelId) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', a.metaPixelId);
    fbq('track', 'PageView');
  }
  if (a.tiktokPixelId) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load(a.tiktokPixelId);
      ttq.page();
    }(window, document, 'ttq');
  }
  if (a.snapchatPixelId) {
    (function(snap){snap.tracker=snap.tracker||function(){(snap.tracker.q=snap.tracker.q||[]).push(arguments);};})(window.snaptr=window.snaptr||function(){});
    snaptr('init', a.snapchatPixelId, {});
    snaptr('track', 'PAGE_VIEW');
  }
  if (a.googleAnalyticsId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${a.googleAnalyticsId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', a.googleAnalyticsId);
  }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadConfig();
  injectPixels();
  initReveal();
  initFaq();
});

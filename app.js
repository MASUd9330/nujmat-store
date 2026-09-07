/* ============================================
   نجمة الخليج — Shared App Logic
   ============================================ */

// ============================================
// PRODUCT CATALOG
// ============================================
const PRODUCTS = {
  '01': {
    num: '01',
    ar: 'مسدس التدليك الذكي',
    en: 'Recovery Smart Massage Gun',
    tag: 'صحة · Wellness',
    monogram: 'عافية',
    monogramEn: 'Recovery',
    price: 139,
    oldPrice: 199,
    save: 60,
    desc: 'أربع رؤوس، ست سرعات، شحن يدوم ست ساعات. يخفف آلام العضلات بعد التمرين أو يوم العمل الطويل — في صمت تام، وأنت في بيتك.',
    descLong: 'مسدس التدليك الذكي بـ 4 رؤوس مختلفة يخفف آلام العضلات بعد التمرين أو يوم العمل الطويل. خفيف الوزن، هادئ تماماً، مع 6 سرعات مختلفة للعلاج العميق والسطحي. مصمم للاستخدام اليومي بدون إزعاج.',
    color: '#E8DDC6',
    visualClass: 'pv-1',
    specs: [
      { k: 'الرؤوس', v: '4 رؤوس مختلفة (كرة، مخروط، شوكة، مسطح)' },
      { k: 'السرعات', v: '6 سرعات (1500-3200 لفة/دقيقة)' },
      { k: 'البطارية', v: '6 ساعات من التشغيل المتواصل' },
      { k: 'الوزن', v: '700 جرام' },
      { k: 'الضوضاء', v: 'أقل من 40 ديسيبل' },
      { k: 'الشحن', v: 'USB-C' },
      { k: 'الضمان', v: '6 أشهر شامل' }
    ],
    shipping: { saudi: '3-5 أيام', uae: '4-6 أيام', gcc: '5-7 أيام' },
    bullets: [
      'يخفف آلام العضلات في 60 ثانية',
      '4 رؤوس لكل عضلة في الجسم',
      'هادئ كهمس — أقل من 40 ديسيبل',
      'يدوم 6 ساعات بشحنة واحدة'
    ]
  },
  '02': {
    num: '02',
    ar: 'حامل الجوال الثلاثي',
    en: 'Bluetooth Tripod Selfie Stick',
    tag: 'إبداع · Creator',
    monogram: 'إبداع',
    monogramEn: 'Creator',
    price: 129,
    oldPrice: 199,
    save: 70,
    desc: 'يرتفع حتى ١.٧ متر، ريموت بلوتوث مدمج، قاعدة ثابتة لا تهتز. صوّر نفسك في البث المباشر، أو أجمع العائلة في صورة واحدة بدون أن تطلب مساعدة.',
    descLong: 'حامل جوال ثلاثي احترافي مع ريموت بلوتوث مدمج. ارتفاع قابل للتعديل حتى 1.7 متر. قاعدة ثابتة بدون اهتزاز. مثالي لصناع المحتوى والبث المباشر والتصوير العائلي.',
    color: '#DDD3BD',
    visualClass: 'pv-2',
    specs: [
      { k: 'الارتفاع', v: 'قابل للتعديل حتى 1.7 متر' },
      { k: 'البلوتوث', v: 'مدمج — ريموت للتحكم عن بعد' },
      { k: 'الدوران', v: '360°' },
      { k: 'التوافق', v: 'جميع الجوالات 4.7-7 بوصة' },
      { k: 'الوزن', v: '350 جرام' },
      { k: 'الطوي', v: 'قابل للطي بالكامل' },
      { k: 'الضمان', v: '6 أشهر' }
    ],
    shipping: { saudi: '3-5 أيام', uae: '4-6 أيام', gcc: '5-7 أيام' },
    bullets: [
      'صوّر نفسك بدون مساعدة',
      'ارتفاع 1.7 متر + ريموت بلوتوث',
      'ثابت تماماً — لا اهتزاز',
      'خفيف وقابل للطي'
    ]
  },
  '03': {
    num: '03',
    ar: 'الشاحن السريع GaN',
    en: '65W GaN 6-Port Fast Charger',
    tag: 'تكنولوجيا · Tech',
    monogram: 'قوّة',
    monogramEn: 'Power',
    price: 149,
    oldPrice: 229,
    save: 80,
    desc: 'ستة منافذ في قطعة واحدة. شحن آمن وسريع لكل أجهزتك — من الجوال إلى اللابتوب. تقنية GaN تجعله أصغر وأقوى من أي شاحن آخر.',
    descLong: 'شاحن GaN السريع بـ 6 منافذ — 2 USB-C و 4 USB-A. شحن 65 واط إجمالاً. تقنية GaN المتطورة تجعله أصغر وأقوى. حماية كاملة من الحرارة والتيار الزائد.',
    color: '#D4C9AE',
    visualClass: 'pv-3',
    specs: [
      { k: 'الطاقة', v: '65 واط إجمالي' },
      { k: 'المنافذ', v: '2 USB-C + 4 USB-A' },
      { k: 'التقنية', v: 'GaN (نيتريد الغاليوم)' },
      { k: 'الحماية', v: 'حماية من الحرارة، التيار، الجهد' },
      { k: 'التوافق', v: 'iPhone, Samsung, iPad, لابتوب' },
      { k: 'الشحن', v: 'كابل طاقة مرفق' },
      { k: 'الضمان', v: '12 شهر' }
    ],
    shipping: { saudi: '3-5 أيام', uae: '4-6 أيام', gcc: '5-7 أيام' },
    bullets: [
      '6 منافذ في شاحن واحد',
      'تقنية GaN — شحن 3x أسرع',
      'آمن ومحمي بالكامل',
      'يكفي لابتوب + 5 أجهزة'
    ]
  },
  '04': {
    num: '04',
    ar: 'موزع الروائح الذكي',
    en: 'Smart Aroma Diffuser · 300ml',
    tag: 'سكينة · Serenity',
    monogram: 'سكينة',
    monogramEn: 'Serenity',
    price: 119,
    oldPrice: 179,
    save: 60,
    desc: 'سبعة ألوان متغيرة، ترطيب بالموجات الفوق صوتية، تايمر ذكي. حوّل غرفتك إلى مساحة هادئة — للنوم العميق، أو لاستقبال الضيوف بأجواء مميزة.',
    descLong: 'موزع الروائح الذكي بالموجات الفوق صوتية — تقنية هادئة تماماً بدون حرارة. 7 ألوان LED متغيرة، تايمر ذكي 1/3/6 ساعات، سعة 300 مل تدوم 10+ ساعات. إيقاف تلقائي آمن عند نفاد الماء.',
    color: '#E1D5BB',
    visualClass: 'pv-4',
    specs: [
      { k: 'السعة', v: '300 مل' },
      { k: 'المدة', v: '10+ ساعات متواصلة' },
      { k: 'الألوان', v: '7 ألوان LED متغيرة' },
      { k: 'التايمر', v: '1 / 3 / 6 ساعات' },
      { k: 'الأمان', v: 'إيقاف تلقائي عند نفاد الماء' },
      { k: 'التقنية', v: 'موجات فوق صوتية — بدون حرارة' },
      { k: 'الضمان', v: '6 أشهر' }
    ],
    shipping: { saudi: '3-5 أيام', uae: '4-6 أيام', gcc: '5-7 أيام' },
    bullets: [
      'ترطيب + عطور + إضاءة في جهاز',
      'هادئ تماماً — مثالي للنوم',
      '7 ألوان LED للإضاءة المزاجية',
      'آمن للأطفال بدون حرارة'
    ]
  }
};

// ============================================
// BUNDLE
// ============================================
const BUNDLE = {
  products: ['01', '02', '03', '04'],
  totalPrice: 536,
  bundlePrice: 399,
  save: 137
};

// ============================================
// DISCOUNT TIERS
// ============================================
const DISCOUNT_TIERS = [
  { min: 1, discount: 0, label: 'قطعة واحدة' },
  { min: 2, discount: 10, label: 'قطعتان' },
  { min: 3, discount: 15, label: '3 قطع' },
  { min: 4, discount: 20, label: '4 قطع أو أكثر' },
  { min: 5, discount: 25, label: '5 قطع أو أكثر' }
];

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
// WHATSAPP
// ============================================
const WHATSAPP_NUMBER = '8801581226134';
function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ============================================
// GOOGLE SHEETS (via Apps Script Web App)
// ============================================
// Replace this with your deployed Apps Script URL after setup
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyaCfntf-L_XnleTMALCnTo3lr7oivEFVJ_-3QQSvk4eyVdLcKi_WmDDbfc4Bqe-h93Jg/exec';

async function saveToGoogleSheets(orderData) {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('Google Sheets URL not configured. Order data:', orderData);
    return { success: false, reason: 'not_configured' };
  }
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
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
// EMAIL CONFIRMATION (mailto fallback)
// ============================================
function buildEmailLink(toEmail, orderData) {
  const subject = `تأكيد طلبك من نجمة الخليج — ${orderData.orderNum}`;
  const body = `مرحباً ${orderData.name}،

شكراً لطلبك من نجمة الخليج! 🌟

تفاصيل الطلب:
- رقم الطلب: ${orderData.orderNum}
- المنتج: ${orderData.productName}
- الكمية: ${orderData.qty}
- الإجمالي: ${orderData.total} ر.س
- المدينة: ${orderData.city}

سنتصل بك خلال 24 ساعة لتأكيد طلبك.
بعد التأكيد، يصلك خلال 3-5 أيام.
الدفع عند الاستلام.

تابعنا: @nujmat.sa

نجمة الخليج`;
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
  return `${amount} <span style="font-size:0.6em;color:var(--muted)">ر.س</span>`;
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFaq();
});

# Email Marketing Setup — Mailchimp + Google Sheets Workflow
**نجمة الخليج — Build a list, send campaigns, recover abandoned carts**

---

## Why this matters

- **Email marketing ROI = $36-42 per $1 spent** (DMA, 2024)
- **Abandoned cart emails** recover 5-15% of lost sales
- **Welcome series** converts 4x higher than single campaigns
- **Repeat customers spend 67% more** than first-time buyers

Tumi er site already capturing emails (newsletter + checkout opt-in). Ekhon just need a tool to SEND emails.

---

## 3 Options (cheapest to most powerful)

| Tool | Free Tier | Best For | Cost After Free |
|---|---|---|---|
| **Mailchimp** | 500 contacts, 1,000 emails/mo | Beginners, full features | From $13/mo |
| **Brevo (ex-Sendinblue)** | 300 emails/day unlimited contacts | Transactional + marketing | From $9/mo |
| **MailerLite** | 1,000 subscribers, 12,000 emails/mo | Simple, modern UI | From $10/mo |

**Recommendation: Start with Mailchimp free tier** (500 contacts is enough for first 6-12 months).

---

## Part 1: Mailchimp Account Setup (10 min)

### Step 1: Create free account
1. Jao `mailchimp.com` → **Sign Up Free**
2. Email, password, organization name (`نجمة الخليج`)
3. Phone verification

### Step 2: Create audience (your list)
1. Dashboard → **Audience → All contacts → Create audience**
2. Audience name: `نجمة الخليج — عملاء السعودية`
3. Default from email: `orders@nejmat.sa` (or your Gmail)
4. Default from name: `نجمة الخليج`
5. **Save**

### Step 3: Get your API key
1. Account → **Profile → Extras → API keys**
2. **Create a key** → name it `نجمة الخليج الموقع`
3. **Copy the key** (long string starting with letters)
4. Save it (you'll need this for integration)

---

## Part 2: Import existing emails from Google Sheet (5 min)

### Step 1: Download sheet as CSV
1. Open your `نجمة الخليج - Orders` Google Sheet
2. File → Download → **Comma-separated values (.csv)**
3. File saves to your Downloads folder

### Step 2: Filter only email subscribers
- Open the CSV in Excel/Google Sheets
- Filter where `Marketing = YES` and `Email` is not empty
- Keep only these columns: Email, Name, Phone, City
- Save as `mailchimp-import.csv`

### Step 3: Import to Mailchimp
1. Mailchimp → **Audience → Import contacts**
2. **Upload CSV**
3. Map columns:
   - Email Address → Email
   - First Name → Name (split if possible)
   - Phone → Phone
4. Tag: `newsletter` (so you can segment later)
5. **Import**

### Step 4: Repeat weekly
Every week, repeat this process:
1. Download CSV
2. Filter `Marketing = YES`
3. Import to Mailchimp
4. Tag new ones as `newsletter-{month}` (e.g., `newsletter-sept-2026`)

---

## Part 3: Welcome Email Sequence (set once, runs forever)

When someone subscribes, they should receive 3 emails over 7 days.

### Email 1: Instant welcome + 10% code (Day 0)
**Subject:** مرحباً بك في نجمة الخليج! 🎁 كود خصم 10% هدية
```
Body (Arabic):

أهلاً {FIRST_NAME} 👋

شكراً لاشتراكك في نجمة الخليج!

كود الخصم الخاص بك (صالح 14 يوم):
🎁 NUJMAT10

استخدمه على أي منتج في موقعنا: {STORE_URL}

ما نقدمة لك:
✓ توصيل سريع لكل مدن المملكة (3-5 أيام)
✓ دفع عند الاستلام (آمن 100%)
✓ ضمان استبدال 7 أيام
✓ دعم 24/7 عبر واتساب

شوف منتجاتنا الأكثر مبيعاً:
→ [عرض المنتجات]({STORE_URL}#products)

مع أطيب التحيات،
فريق نجمة الخليج 🌟
```

### Email 2: Bestseller showcase (Day 3)
**Subject:** أكثر منتجاتنا مبيعاً هذا الأسبوع 🔥
```
Body (Arabic):

{FIRST_NAME}، شفت منتجاتنا الجديدة؟

الأكثر مبيعاً في السعودية هذا الأسبوع:

1. مسدس التدليك الذكي — وفّر آلام العضلات
2. حامل الجوال الثلاثي — لصناع المحتوى
3. الشاحن GaN السريع — شحن آمن لكل أجهزتك
4. موزع الروائح الذكي — سبا في بيتك

🎁 تذكير: كود الخصم NUJMAT10 لا يزال سارياً

[تسوق الآن]({STORE_URL}#products)
```

### Email 3: Trust + final reminder (Day 7)
**Subject:** لماذا 2,500+ عميل يثقون بنا ⭐
```
Body:

{FIRST_NAME}،

نتفهم إن اختيار المنتج المناسب صعب، خاصة أونلاين.

لهذا السبب:
- ✅ ضمان استبدال 7 أيام
- ✅ افحص المنتج قبل الدفع
- ✅ ادفع فقط عند الاستلام
- ✅ دعم 24/7 عبر واتساب

جرب بدون أي مخاطرة ⭐

🎁 كود NUJMAT10 ينتهي خلال 7 أيام!

[اطلب الآن]({STORE_URL})

نجمة الخليج
```

### Setup in Mailchimp
1. **Automations → Create → Customer Journey**
2. Trigger: **Subscribes to audience**
3. Add 3 emails with delays: 0 days, 3 days, 7 days
4. Copy the templates above (translate to Arabic if needed)
5. Turn on

---

## Part 4: Abandoned Cart Recovery (advanced)

When someone starts checkout but doesn't complete, send an email.

### Step 1: Setup tracking
- Already done! Your `app.js` saves to localStorage when checkout starts
- Add a webhook to send email 1 hour after abandonment

### Step 2: Email template
**Subject:** نسيت تكمل طلبك؟ منتجك لا يزال محفوظاً 🛒
```
Body:

{FIRST_NAME}،

لاحظنا إنك بدأت طلب {PRODUCT} لكن ما كملته.

لا تقلق — منتجك لا يزال محفوظاً! 🛒

[أكمل الطلب الآن]({CHECKOUT_URL})

🎁 كود خصم 10% للطلب: NUJMAT10

(ينتهي خلال 24 ساعة)

نجمة الخليج
```

---

## Part 5: Weekly Newsletter Template (every Friday)

**Subject of week:** like "عروض نهاية الأسبوع 🔥" or new products

```
Body:

{FIRST_NAME}،

عروض هذا الأسبوع في نجمة الخليج:

[NEW PRODUCT 1 with image]
السعر: {PRICE} (بدلاً من {OLD_PRICE})

[NEW PRODUCT 2 with image]
...

🎁 كود WELCOME10 لأول طلب (10% off)

[تسوق الآن]({STORE_URL})

نجمة الخليج
```

---

## Part 6: Festival Campaigns (high ROI)

| Festival | Send Date | Subject | Discount |
|---|---|---|---|
| **Ramadan** | 1 week before | "عروض رمضان — خصم 25%" | 25% off |
| **Eid Al-Fitr** | 3 days before | "عيدكم مبارك — هدية مجانية" | Free gift |
| **Saudi National Day** | Sep 20-22 | "اليوم الوطني — 93% off" | 7% off (national number) |
| **White Friday** | 1 week before | "الجمعة البيضاء وصلت" | 15-30% off |
| **Back to School** | Aug 15 | "العودة للمدارس بأسعار ذكية" | Bundle deals |

**Each campaign: 1 email per day for 3 days, then last-day reminder.**

---

## Quick start: Get to 100 subscribers in 30 days

1. ✅ Newsletter signup on home page (DONE)
2. ✅ Email opt-in on checkout (DONE)
3. ✅ Exit popup with 10% (DONE)
4. **Today**: Set up Mailchimp account (10 min)
5. **Week 1**: Add newsletter section to TikTok bio link
6. **Week 2**: Send first weekly newsletter
7. **Week 3**: Promote "Exclusive email subscribers get 10%" in TikTok
8. **Week 4**: Run first festival/seasonal campaign

**Goal: 100 subscribers → 1st campaign → 5-15 sales**

---

## ROI Tracking

In Mailchimp, track:
- Open rate (target: 25-35%)
- Click rate (target: 3-5%)
- Conversion rate (target: 1-3%)
- Revenue per email

Compare with ad spend. **Email = highest ROI channel once list is built.**

---

## Need help setting up?

Bolo:
- "Mailchimp setup help" — ami step-by-step guide dichi
- "Email templates Arabic" — ami 5 template ready kore dichi
- "Welcome series setup" — ami Mailchimp automation workflow dichi
- "Festival campaign plan" — ami year-round calendar dichi

**Bhai, email marketing is the ONLY channel you fully own. Once 1,000 subscribers ache, tumi er business recession-proof hoye jabe! 📧🚀**

# 🎛️ Admin Panel Guide — نجمة الخليج

তুমি এখন থেকে **কোনো কোড এডিট না করেই** পুরো সাইট কন্ট্রোল করতে পারবে — product এর দাম, নাম, ছবি, কালার, হিরো সেকশন, ফুটার, সব।

## 🔗 Admin Panel URL

```
https://nujmat-store-iu7w1l5yq-shabaz2.vercel.app/admin.html
```

এটা বুকমার্ক করে রাখো। প্রতিবার এখান থেকে কাজ করবে।

---

## 🔑 প্রথমবার: GitHub Token বানানো (5 মিনিট)

তোমার admin panel কাজ করবে একটা **GitHub Personal Access Token** দিয়ে। এটা একবার বানালেই ৯০ দিন চলবে।

### ধাপ:

1. **এই লিংকে যাও:** https://github.com/settings/tokens
2. **Generate new token** → **Generate new token (classic)** ক্লিক করো
3. **Note** ঘরে লেখো: `nujmat-store-admin`
4. **Expiration** সিলেক্ট করো: `90 days` (সবচেয়ে ভালো)
5. **Select scopes** সেকশনে শুধু **`repo`** চেকবক্সে টিক দাও (বাকি সব খালি)
6. নিচে **Generate token** বাটন ক্লিক করো
7. **টোকেনটা সাথে সাথে কপি করো** (এটা আর দেখতে পাবে না!) — কোথাও সেভ করে রাখো
8. Admin panel এ গিয়ে সেই টোকেন পেস্ট করো → **دخول** (Login)

> ⚠️ **গুরুত্বপূর্ণ:** Git-remote এ যে টোকেন আছে (PAT) — সেটা **ভিন্ন**। নতুন টোকেন বানাও শুধু admin panel এর জন্য।

---

## 📋 Admin Panel এ ৯টা ট্যাব আছে

### 1. 📊 نظرة عامة (Dashboard)
- কুইক stats (কয়টা product, কয়টা image)
- শর্টকাট বাটন

### 2. ⚙️ بيانات الموقع (Site Settings)
- **Store name** (নাম)
- **Phone number**
- **WhatsApp number**
- **Address**
- **Email**
- **Currency** (ر.س)

### 3. ✨ البطل (Hero Section)
- **Badge** (ছোট ব্যাজ)
- **Title** (বড় শিরোনাম)
- **Subtitle** (নিচের টেক্সট)
- **CTA buttons** (বাটনের লেখা)
- **Trust line** (তথ্যমূলক লাইন)

### 4. 🛍️ المنتجات (Products) — **সবচেয়ে বেশি ব্যবহার হবে**
- ৪টা product ট্যাব
- প্রতিটায়:
  - নাম (আরবি + ইংরেজি)
  - দাম (আসল + পুরাতন)
  - ছোট বর্ণনা (কার্ডে দেখায়)
  - বড় বর্ণনা (product page এ)
  - **Bullets** (মূল বৈশিষ্ট্য ৪টা)
  - **Specs** (স্পেসিফিকেশন টেবিল)
  - Stock count
  - Badge (الأكثر مبيعاً ইত্যাদি)

### 5. 🖼️ الصور (Images) — **নিজে ছবি আপলোড!**
- Product সিলেক্ট করো
- **দুইভাবে ছবি আপলোড:**
  - **Drag & Drop** — ছবিটা জোনে টেনে ছেড়ে দাও
  - **Click** — জোনে ক্লিক করে ফাইল সিলেক্ট
- **আপলোডের পর:**
  - "استبدال" বাটন দিয়ে নির্দিষ্ট ছবি replace করো
  - "حذف" বাটন দিয়ে ডিলিট করো
- সাইজ রেকমেন্ডেশন: **1080×1350 (4:5) JPG/PNG**

### 6. 📄 الفوتر والروابط (Footer & Links)
- **About text** (ম্যাগাজিন স্টাইল প্যারা)
- **Quick links** — যেকোনো লিংক add/remove
- **Social media** — TikTok, Snapchat, Instagram, Twitter, YouTube

### 7. 📢 التسويق (Marketing)
- **Countdown timer** — চালু/বন্ধ, শেষ তারিখ
- **Exit popup** — চালু/বন্ধ, শিরোনাম, টেক্সট, ডিসকাউন্ট
- **Stock counter** — চালু/বন্ধ, min/max
- **Live activity** — চালু/বন্ধ, ফ্রিকোয়েন্সি
- **Bundle** — বাণ্ডেল price, badge
- **Discount tiers** — quantity discount table

### 8. 🎨 الألوان والتصميم (Colors & Design)
- **Accent** (গোল্ড color)
- **Background** (cream color)
- **Text** (কালো)
- **Muted** (ধূসর)
- **Card background** (সাদা)
- **Border** (হালকা বাদামি)

> 💡 Color পরিবর্তন হতে ১-২ মিনিট লাগে (CSS rebuild)।

### 9. 📈 التتبع (Analytics & Pixels)
- **Meta Pixel ID** (Facebook)
- **TikTok Pixel ID**
- **Snapchat Pixel ID**
- **Google Analytics ID**
- **Google Sheets URL** (orders)
- **Mailchimp URL** (newsletter)

---

## 🔄 কাজ করার Flow (সাধারণ Routine)

1. **Admin panel ওপেন করো** → বুকমার্ক থেকে
2. যে ট্যাব দরকার সেটায় ক্লিক করো
3. **ফিল্ডে মান পরিবর্তন করো** (যেকোনো জায়গায়)
4. নিচে **💾 حفظ ونشر** (Save & Deploy) বাটন ক্লিক করো
5. ৩০-৬০ সেকেন্ড অপেক্ষা করো
6. **মেইন সাইট রিফ্রেশ করো** (Ctrl+Shift+R) — পরিবর্তন দেখবে

---

## ⚠️ গুরুত্বপূর্ণ টিপস

1. **"عندك تعديلات غير محفوظة"** দেখালে মানে কিছু পরিবর্তন করেছ কিন্তু save করোনি।
   - সবুজ ✓ "متصل" দেখলে save হয়ে গেছে।

2. **ছবি আপলোডের পর ১-২ মিনিট অপেক্ষা করো** — Vercel রিডিপ্লয় করে।

3. **Vercel Deployment Protection** চালু আছে, তাই সরাসরি ছবি লোড নাও হতে পারে।
   - jsDelivr CDN ব্যবহার করা হচ্ছে (config.json এ `imageCdn.enabled = true`)

4. **ভুল হলে** ↻ إعادة تحميل বাটন দিয়ে রিলোড করো, অথবা "إلغاء التعديلات" দিয়ে revert করো।

5. **লগআউট** করতে চাইলে উপরে ডানদিকে "خروج" বাটন।

---

## 🆘 সমস্যা হলে

| সমস্যা | সমাধান |
|---|---|
| "التوكن غير صحيح" | নতুন টোকেন বানাও (90 দিনের) |
| "GitHub API 404" | config.json ফাইল নেই — admin panel রিলোড করো |
| ছবি দেখা যাচ্ছে না | ২ মিনিট অপেক্ষা করো, তারপর hard refresh |
| "فشل الحفظ" | ইন্টারনেট চেক করো, retry করো |
| Edit করেছ কিন্তু সাইটে দেখা যাচ্ছে না | Hard refresh (Ctrl+Shift+R) করো |

---

## 📞 Support

- সাইট URL: `https://nujmat-store-iu7w1l5yq-shabaz2.vercel.app`
- Admin URL: `https://nujmat-store-iu7w1l5yq-shabaz2.vercel.app/admin.html`
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repo: https://github.com/MASUd9330/nujmat-store

---

**💡 Pro Tip:** প্রথমে একটা ছোট জিনিস পরিবর্তন করে দেখো (যেমন: product এর badge), save করো, সাইটে দেখো। যদি কাজ করে, বড় এডিটগুলো করো।

# Google Sheets Auto-Save Setup Guide
**নজমাত আল-খালিজ — Orders auto-save to your Google Sheet**

---

## What this does

When a customer submits an order, the form data is automatically saved as a new row in YOUR Google Sheet. So you have all orders in one place — like an "Excel file" but auto-updated.

**Zero cost. No backend. No database. Just Google Sheets + a tiny Apps Script.**

---

## Setup (5 minutes, one-time)

### Step 1: Create the Google Sheet
1. Go to **https://sheets.google.com**
2. Click **+ Blank** to create new spreadsheet
3. Name it: `نجمة الخليج - Orders`
4. In row 1, add these column headers (copy-paste):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Order # | Date | Name | Phone | Email | Marketing | WhatsApp | City | District | Street | Product | Qty | Unit Price | Subtotal | Discount % | Total | Payment |

### Step 2: Open Apps Script
1. In your Sheet, click **Extensions → Apps Script** (top menu)
2. A new tab opens with code editor
3. **Delete** any code already there
4. **Copy-paste** the code below:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.orderNum || '',
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.marketingConsent ? 'YES' : 'NO',
      data.whatsapp || '',
      data.city || '',
      data.district || '',
      data.street || '',
      data.productName || '',
      data.qty || 1,
      data.unitPrice || 0,
      data.subtotal || 0,
      (data.discountPct || 0) + '%',
      data.total || 0,
      data.payment || 'cod'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderNum: data.orderNum }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional) — run this once to verify it works
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OK', message: 'نجمة الخليج Orders API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. **Save** the script (Ctrl+S or click 💾 icon)
6. Name the project: `نجمة الخليج Orders API`

### Step 3: Deploy as Web App
1. Click **Deploy → New deployment** (top right)
2. Click the gear icon ⚙ next to "Select type" → choose **Web app**
3. Configure:
   - **Description**: `نجمة الخليج Orders`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` (this is important — so the form can post to it)
4. Click **Deploy**
5. **Authorize access** — click "Authorize access", choose your Google account, allow permissions
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbw.../exec
   ```

### Step 4: Connect to your website
1. Open `E:\Talegram\Minimax\myzambeel-store\app.js`
2. Find this line (around line 165):
   ```javascript
   const GOOGLE_SHEETS_URL = ''; // Setup instructions in setup.html
   ```
3. Replace with your URL:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
4. Save the file
5. Re-deploy to Vercel (just push the change, Vercel auto-deploys)

### Step 5: Test
1. Submit a test order on your site
2. Check your Google Sheet — a new row should appear
3. If it doesn't, check the Apps Script **Executions** log (left sidebar) for errors

---

## How it works (simple)

```
Customer submits form
        ↓
JavaScript fetch() sends JSON to your Apps Script URL
        ↓
Apps Script receives, appends a new row to your Sheet
        ↓
You see the order in your Sheet (mobile + desktop)
        ↓
You can call/WhatsApp the customer to confirm
```

---

## Optional: Email notification to YOU (the seller)

Add this to your Apps Script (so YOU get an email when a new order comes in):

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([...]);  // (same row as above)

    // Email notification
    MailApp.sendEmail({
      to: 'YOUR_EMAIL@gmail.com',  // ← change to your email
      subject: '🛒 طلب جديد — ' + (data.orderNum || ''),
      body: `
طلب جديد من نجمة الخليج!

الاسم: ${data.name}
الجوال: ${data.phone}
المدينة: ${data.city}
المنتج: ${data.productName}
الكمية: ${data.qty}
الإجمالي: ${data.total} ر.س

افتح Google Sheet للتفاصيل: https://sheets.google.com
      `
    });

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Gmail free tier allows 100 emails/day — more than enough for new orders.

---

## Optional: Customer confirmation email

For automatic confirmation email to the CUSTOMER, you need EmailJS (free 200/month) or another transactional email service. Setup is more complex — let me know if you want me to set it up.

For now, the checkout already opens WhatsApp with the order message (which the customer can see) AND a "mailto:" link if they entered an email. So they get visual confirmation.

---

## Troubleshooting

**Q: Form submitted but no row in Sheet?**
- A: Check Apps Script → Executions (left sidebar) for errors
- Make sure "Who has access" is "Anyone" not "Anyone with Google account"
- Verify the URL is exactly correct (ends with `/exec` not `/dev`)

**Q: Getting 403 / permission error?**
- A: Re-authorize. Deploy → Manage deployments → pencil icon → version: New version → Deploy

**Q: Customer email not getting confirmation?**
- A: Enable EmailJS in app.js (instructions in email-setup.md) — for now WhatsApp works as confirmation

**Q: Want to export Sheet to Excel?**
- A: File → Download → Microsoft Excel (.xlsx). Easy!

---

## What you can do with the data

Once orders flow into your Sheet:
- ✓ See all orders in one place (mobile + desktop)
- ✓ Sort/filter by city, product, date
- ✓ Export to Excel anytime
- ✓ Set up Google Sheets formulas for daily/weekly totals
- ✓ Share with team member (read-only or edit)
- ✓ Connect to Google Data Studio for dashboards
- ✓ Trigger email/SMS via Apps Script on certain conditions

---

**Total setup time: 5 minutes. Total cost: 0. No server, no backend, no monthly fee.**

Questions? Just ask — I can walk you through the deploy step if needed.

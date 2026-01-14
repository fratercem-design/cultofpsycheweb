# Mandrill Email Configuration Guide

## ⚠️ SECURITY FIRST

**If you haven't rotated your Mandrill API key yet, see SECURITY_KEY_ROTATION.md first.**

---

## Step 1: Verify API Key Type (Ping Test)

**Prove your key is Transactional (not Marketing):**

```bash
curl -s https://mandrillapp.com/api/1.0/users/ping.json \
  -H 'Content-Type: application/json' \
  -d '{"key":"YOUR_NEW_MD_KEY"}'
```

**Expected:** `"PONG!"` or simple success response

**If fails:**
- "Invalid key" → Wrong key type, wrong account, or key not saved correctly
- Verify you're using a Transactional API key (starts with `md-`)
- Check key is copied correctly (no extra spaces/characters)

---

## Step 2: Domain Verification (THE BLOCKER)

### A. Add Sending Domain in Mandrill

1. Log into Mailchimp Transactional/Mandrill dashboard
2. Navigate to **Settings** → **Sending Domains**
3. Click **Add Sending Domain**
4. Enter your domain (e.g., `cultofpsyche.com`)
5. Click **Add Domain**

### B. Get DNS Records

Mandrill provides DNS records you MUST add exactly as shown:

**DKIM Records:**
- Usually 1-3 records (TXT or CNAME)
- Copy the EXACT hostname, record type, and value
- Common format: `_mandrill.cultofpsyche.com` or similar
- **Critical:** One missing dot or wrong hostname = verification fails

**SPF Record:**
- **YOU CAN ONLY HAVE ONE SPF RECORD TOTAL**
- If you already have SPF, **EDIT the existing record** (don't add a second!)
- Add Mandrill include: `include:spf.mandrillapp.com`
- Example existing SPF update:
  ```
  v=spf1 include:spf.mandrillapp.com include:OTHER-SERVICE ~all
  ```

### C. Add DNS Records at Domain Registrar

1. Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
2. Navigate to DNS Management
3. Add DKIM records EXACTLY as provided:
   - Record type (TXT or CNAME)
   - Name/host (e.g., `_mandrill`)
   - Value (copy exactly - no modifications)
   - TTL (use default or recommended)

4. Update SPF record:
   - **Find existing SPF record** (if any)
   - **Edit it** to include Mandrill
   - **Do NOT create a second SPF record**

### D. Wait for DNS Propagation

- Can take 15 minutes to 48 hours (usually 1-2 hours)
- Check propagation: https://www.whatsmydns.net/
- **Don't assume it's live** - wait for Mandrill to show "Verified"

### E. Verify in Mandrill

1. In Mandrill dashboard, click **Verify Domain**
2. Status should change to **"Verified"** ✅
3. If verification fails, check:
   - DNS records added correctly
   - DNS propagated (use whatsmydns.net)
   - Record format matches exactly (case-sensitive)

---

## Step 3: From Address Configuration

### Current Setting
```typescript
from_email: 'noreply@cultofpsyche.com',
from_name: 'Cult of Psyche',
```

### Recommendations

**Option A: Use Real Mailbox (Better Deliverability)**
- Use: `hello@cultofpsyche.com` or `support@cultofpsyche.com`
- Even if it forwards, it's better than `noreply`
- Update in `/app/api/mailchimp/route.ts` around line 34

**Option B: Keep `noreply@` (Works if Domain Verified)**
- Requires domain verification (Step 2)
- DKIM and SPF must align
- Slightly lower deliverability than real mailbox

### Alignment Requirements

For deliverability, ensure:
- ✅ Domain is verified in Mandrill
- ✅ DKIM aligns with from_email domain
- ✅ SPF includes Mandrill
- ✅ From domain matches verified domain
- ✅ Consider adding DMARC (Step 5)

---

## Step 4: Test Email Sending (Direct API Test)

**Don't rely only on your form - test the API directly:**

```bash
curl -s https://mandrillapp.com/api/1.0/messages/send.json \
  -H 'Content-Type: application/json' \
  -d '{
    "key":"YOUR_NEW_MD_KEY",
    "message":{
      "from_email":"noreply@cultofpsyche.com",
      "subject":"Mandrill test",
      "text":"If you got this, sending works.",
      "to":[{"email":"psyche@cultofpsyche.com","type":"to"}]
    }
  }'
```

**Expected Response:**
```json
{
  "email": "psyche@cultofpsyche.com",
  "status": "sent",
  "_id": "..."
}
```

**If you see errors:**

**"rejected" + "reject_reason":**
- This tells you exactly what's wrong
- Common reasons:
  - "unsigned" → DKIM not set up
  - "hard-bounce" → Invalid email address
  - "invalid-sender" → From address not verified
- Paste the reject_reason (redact email) to troubleshoot

**"invalid":**
- Usually bad payload format
- Check from_email format
- Check JSON structure

**"queued":**
- Usually fine - email is queued for sending
- Check inbox in a few minutes

---

## Step 5: Add DMARC (Optional but Recommended)

**Not required for "it works" but improves deliverability significantly.**

### Basic DMARC Record

Add as TXT record at: `_dmarc.cultofpsyche.com`

```
v=DMARC1; p=none; rua=mailto:dmarc@cultofpsyche.com; fo=1; adkim=s; aspf=s
```

**Explanation:**
- `p=none` - Monitor only (start here)
- `rua` - Where to send DMARC reports
- `fo=1` - Forensic reporting
- Later you can tighten to `p=quarantine` or `p=reject`

**Benefits:**
- Better inbox placement
- Reduces spoofing
- Shows you're serious about email security

---

## Step 6: Test via Your Application

After API test works:

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/show`
3. Submit email via email capture form
4. Check inbox: `psyche@cultofpsyche.com`
5. Verify:
   - Email arrives (not spam)
   - Formatting looks good
   - Links work

---

## Troubleshooting

### Domain Not Verifying

**Check DNS:**
- Use https://www.whatsmydns.net/
- Verify records propagated
- Check records match EXACTLY (case-sensitive, no extra spaces)

**Common Issues:**
- DKIM records not added correctly
- SPF has multiple records (only one allowed!)
- DNS not propagated yet (wait longer)
- Wrong record type (TXT vs CNAME)

### Email Not Arriving

**Check Mandrill Dashboard:**
- Go to **Activity** → **Message Log**
- Look for your test email
- Check status and error messages

**Common Errors:**
- "Domain not verified" → DNS setup incomplete
- "SPF check failed" → SPF record wrong or multiple SPF records
- "DKIM check failed" → DKIM records incorrect
- "Invalid sender" → From address not aligned

**Check Spam:**
- Emails might go to spam initially
- Domain reputation improves over time
- Proper SPF/DKIM/DMARC helps

### API Key Issues

**"Invalid key":**
- Using marketing key instead of transactional
- Key revoked/expired
- Wrong key copied (extra spaces, etc.)
- Wrong account

**Test with ping:**
```bash
curl -s https://mandrillapp.com/api/1.0/users/ping.json \
  -H 'Content-Type: application/json' \
  -d '{"key":"YOUR_KEY"}'
```

---

## Quick Reference

- **Test Email**: `psyche@cultofpsyche.com`
- **Current From Email**: `noreply@cultofpsyche.com`
- **Domain**: `cultofpsyche.com` (verify in Mandrill)
- **DNS Check**: https://www.whatsmydns.net/
- **Mandrill Dashboard**: https://mandrillapp.com/

---

## Next Steps

1. ✅ API key rotated (if needed - see SECURITY_KEY_ROTATION.md)
2. ✅ Ping test passes
3. ✅ Domain verified in Mandrill
4. ✅ DNS records added and propagated
5. ✅ Direct API test email succeeds
6. ✅ Application email form test works
7. ✅ Run full E2E test (see TESTING_CHECKLIST.md)

---

## Current Code Location

File: `/app/api/mailchimp/route.ts`

Key settings:
- Line ~34: `from_email: 'noreply@cultofpsyche.com'`
- Line ~35: `from_name: 'Cult of Psyche'`
- Line ~33: `subject: 'Welcome to Cult of Psyche Notifications'`

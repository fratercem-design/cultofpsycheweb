# ⚠️ SECURITY: API Key Rotation Required

## CRITICAL: Mandrill Key Exposed

**The Mandrill API key was exposed in chat. It must be rotated immediately.**

### Step 0: Rotate the Mandrill Key (DO THIS FIRST)

1. **Log into Mailchimp Transactional/Mandrill Dashboard**
   - Go to https://mandrillapp.com/ or Mailchimp → Transactional
   - Navigate to **Settings** → **API Keys** (or **API & Webhooks**)

2. **Create New API Key**
   - Click **Add API Key** or **Create Key**
   - Name it (e.g., "Psycheverse Production" or current date)
   - Copy the NEW key immediately (starts with `md-`)

3. **Update Environment Variables**
   - Update `.env.local` with the NEW key
   - Update production environment variables (Vercel, etc.)
   - Update any other locations where the key is stored

4. **Delete/Disable Old Key**
   - In Mandrill dashboard, find the old key (`md-NGONCqExRPWJMUdcAXNqMQ`)
   - Delete or disable it
   - **Do not skip this step**

5. **Verify New Key Works**
   - Run the ping test (see Step 1 below)
   - Test email sending with new key

---

## Testing Your New Key

### Step 1: Verify API Key is Transactional (Ping Test)

Run this curl command with your NEW key:

```bash
curl -s https://mandrillapp.com/api/1.0/users/ping.json \
  -H 'Content-Type: application/json' \
  -d '{"key":"YOUR_NEW_MD_KEY_HERE"}'
```

**Expected Response:** `"PONG!"` or similar success message

**If it fails:**
- "Invalid key" → Wrong key, wrong account, or key not saved
- Check you're using the NEW key (not the old one)
- Verify key is copied correctly (no extra spaces)

---

## Update Environment Variables

After getting your new key:

1. **Update `.env.local`:**
   ```env
   MANDRILL_API_KEY=your_new_key_here
   ```

2. **Update Production (Vercel/etc.):**
   - Go to your hosting platform
   - Update environment variables
   - Use the NEW key

3. **Restart Services:**
   - Restart dev server locally
   - Redeploy production if needed

---

## Security Best Practices Going Forward

- ✅ **Never commit API keys to git**
- ✅ **Never paste API keys in chat/discussions**
- ✅ **Use environment variables only**
- ✅ **Rotate keys periodically**
- ✅ **Use different keys for dev/staging/prod**
- ✅ **Monitor API key usage for anomalies**

---

## Quick Verification Checklist

- [ ] New Mandrill key created
- [ ] Old key deleted/disabled
- [ ] `.env.local` updated
- [ ] Production env vars updated
- [ ] Ping test passes
- [ ] Email sending test works
- [ ] Old key no longer works (verify it's disabled)

---

**After rotation, continue with MANDRILL_SETUP.md Step 2 (Domain Verification)**

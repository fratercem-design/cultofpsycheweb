# Cult of Psyche Site Audit - January 2026

## 🎯 Current Status

**Live Site:** https://www.cultofpsyche.com  
**GitHub Repo:** https://github.com/fratercem-design/cultofpsycheweb.git  
**Deployment:** Vercel (auto-deploy from GitHub)

---

## ✅ What's Working

### 1. **Routes & Pages**
- ✅ `/` - Homepage (Vault + Signal landing page)
- ✅ `/live` - Redirects to `/show` (in codebase)
- ⚠️ `/show` - YouTube show page (404 on live site - needs deployment)
- ✅ `/join` - Email capture page (working)
- ✅ `/teachings` - Placeholder page
- ✅ `/teachings/start-here` - Placeholder page
- ✅ `/recommendations` - Placeholder page
- ✅ `/vault` - Placeholder page
- ✅ `/bio` - Placeholder page

### 2. **Integrations (Codebase)**
- ✅ **YouTube Data API v3**
  - Channel data fetching (`/api/youtube`)
  - Live stream detection (`/api/youtube/live`)
  - Video list with metadata
  - Optimized quota usage (cached channel ID, 60s polling)
  
- ✅ **Mailchimp API**
  - Email subscription (`/api/mailchimp`)
  - Adds subscribers to list
  - Duplicate handling
  
- ✅ **Mandrill API**
  - Transactional email confirmation
  - Welcome emails after subscription
  - HTML email templates

- ⚠️ **Supabase** (Environment variables configured, not actively used)
- ⚠️ **Stripe** (Environment variables configured, not actively used)

---

## ❌ Issues Found

### 1. **Critical: Live Site Not Up to Date**
- `/show` route returns 404 on live site
- `/live` shows old placeholder content instead of redirecting to `/show`
- Social media links show placeholders (`@yourchannel`, `@yourhandle`) instead of `@cultofpsyche`
- **Fix:** Redeploy latest code from GitHub to Vercel

### 2. **Social Media Links Mismatch**
- **Live Site:** Shows `https://youtube.com/@yourchannel`
- **Codebase:** Has `https://youtube.com/@cultofpsyche`
- **Fix:** Deployment needed - codebase is correct

### 3. **YouTube Integration Not Active on Live**
- `/show` page not accessible (404)
- YouTube integration only works when `/show` is accessible
- **Fix:** Ensure `/show` route is deployed

---

## 🔧 Integrations Overview

### **Active Integrations**

1. **YouTube Data API v3** ✅
   - **Endpoint:** `/api/youtube`
   - **Features:**
     - Channel information (name, avatar, stats)
     - Latest 50 videos with metadata
     - Thumbnails, titles, descriptions
     - View counts, durations, publish dates
   - **Environment Variable:** `YOUTUBE_API_KEY`
   - **Optimizations:**
     - Cached channel ID (saves ~100 units per request)
     - 60-second live check interval
     - Error handling with timeout (10s)

2. **Mailchimp** ✅
   - **Endpoint:** `/api/mailchimp`
   - **Features:**
     - Email subscription to list
     - Duplicate email handling
     - Status management
   - **Environment Variables:**
     - `MAILCHIMP_API_KEY`
     - `MAILCHIMP_LIST_ID`
     - `MAILCHIMP_SERVER` (us17)

3. **Mandrill** ✅
   - **Features:**
     - Transactional email sending
     - Welcome emails after subscription
     - HTML email templates
   - **Environment Variable:** `MANDRILL_API_KEY`
   - **From Email:** `noreply@cultofpsyche.com`

### **Configured But Not Active**

4. **Supabase** ⚠️
   - **Environment Variables:**
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
   - **Status:** Variables configured, no active integration

5. **Stripe** ⚠️
   - **Environment Variables:**
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_PRICE_NEOPHYTE`
     - `STRIPE_PRICE_IPSIMMUS`
     - `STRIPE_PRICE_ADEPT`
     - `STRIPE_PRICE_PRIEST`
     - `STRIPE_WEBHOOK_SECRET`
   - **Status:** Variables configured, no active integration

---

## 📋 Action Items

### **Immediate (Required for Site Functionality)**
1. ✅ Verify Vercel deployment is using latest code from `master` branch
2. ✅ Redeploy to ensure `/show` route is accessible
3. ✅ Verify environment variables are set in Vercel:
   - `YOUTUBE_API_KEY`
   - `MAILCHIMP_API_KEY`
   - `MAILCHIMP_LIST_ID`
   - `MAILCHIMP_SERVER`
   - `MANDRILL_API_KEY`

### **Recommended**
1. Add `YOUTUBE_CHANNEL_ID` to Vercel env vars to further optimize quota usage
2. Test email capture on `/join` page
3. Test YouTube integration on `/show` page after deployment
4. Verify social media links are updated on live site

### **Future Enhancements**
1. Integrate Supabase for content management
2. Integrate Stripe for membership/payments
3. Add analytics tracking
4. Add SEO meta tags
5. Add sitemap.xml
6. Add robots.txt

---

## 🌐 Routes Summary

| Route | Status | Purpose | Notes |
|-------|--------|---------|-------|
| `/` | ✅ Working | Homepage | Vault + Signal landing page |
| `/show` | ❌ 404 on live | YouTube show page | Needs deployment |
| `/live` | ⚠️ Old content | Redirect to `/show` | Should redirect, shows old page |
| `/join` | ✅ Working | Email capture | Mailchimp integration |
| `/teachings` | ✅ Working | Placeholder | Ready for content |
| `/teachings/start-here` | ✅ Working | Placeholder | Ready for content |
| `/recommendations` | ✅ Working | Placeholder | Ready for content |
| `/vault` | ✅ Working | Placeholder | Ready for content |
| `/bio` | ✅ Working | Placeholder | Ready for content |

---

## 🔗 API Endpoints

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/youtube` | GET | Fetch channel & videos | ✅ Working |
| `/api/youtube/live` | GET | Check live status | ✅ Working |
| `/api/mailchimp` | POST | Subscribe email | ✅ Working |

---

## 📝 Environment Variables Checklist

**Required for Site Functionality:**
- [x] `YOUTUBE_API_KEY` - YouTube Data API v3 key
- [x] `MAILCHIMP_API_KEY` - Mailchimp API key
- [x] `MAILCHIMP_LIST_ID` - Mailchimp list ID
- [x] `MAILCHIMP_SERVER` - Mailchimp server (us17)
- [x] `MANDRILL_API_KEY` - Mandrill API key

**Optional (Optimization):**
- [ ] `YOUTUBE_CHANNEL_ID` - Hardcoded channel ID (saves quota)

**Configured But Not Used:**
- [x] Supabase variables (for future use)
- [x] Stripe variables (for future use)

---

## ✅ Deployment Checklist

Before marking site as complete:
1. [ ] Verify `/show` route works on live site
2. [ ] Verify `/live` redirects to `/show`
3. [ ] Test YouTube integration on live site
4. [ ] Test email capture on `/join` page
5. [ ] Verify social media links are correct
6. [ ] Check all navigation links work
7. [ ] Test on mobile devices
8. [ ] Test on different browsers
9. [ ] Verify environment variables are set in Vercel
10. [ ] Check console for errors

---

**Last Updated:** January 13, 2026  
**Next Steps:** Redeploy to Vercel to sync live site with codebase

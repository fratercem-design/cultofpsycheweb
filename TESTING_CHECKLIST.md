# Cult of Psyche - End-to-End Testing Checklist

## Phase: "It works, now prove it works"

This is your launch rehearsal. Run through this checklist ruthlessly.

---

## A) Mandrill Email Configuration (BLOCKER - Do First) 🔴

### Step 0: Security - Rotate API Key (IF EXPOSED)
- [ ] **See SECURITY_KEY_ROTATION.md** if key was exposed
- [ ] Create new Mandrill API key in dashboard
- [ ] Update `.env.local` with new key
- [ ] Update production environment variables
- [ ] Delete/disable old key
- [ ] Verify new key works with ping test

### Step 1: Verify API Key Type (Ping Test)
- [ ] Run ping test to confirm Transactional key:
  ```bash
  curl -s https://mandrillapp.com/api/1.0/users/ping.json \
    -H 'Content-Type: application/json' \
    -d '{"key":"YOUR_NEW_MD_KEY"}'
  ```
- [ ] Expected: `"PONG!"` or success response
- [ ] If fails: Check key type, account, or key format

### Step 2: Domain Verification (CRITICAL)
- [ ] Log into Mailchimp Transactional/Mandrill dashboard
- [ ] Navigate to Sending → Sending Domains
- [ ] Add your sending domain (e.g., `cultofpsyche.com` or your actual domain)
- [ ] Copy the DNS records provided (DKIM, SPF, etc.)
- [ ] Add DNS records at your domain registrar/host
  - [ ] DKIM record(s) added exactly as provided
  - [ ] SPF record updated (if needed - remember: only ONE SPF record allowed!)
  - [ ] Wait for DNS propagation (can take 24-48 hours, usually faster)
- [ ] Verify domain shows as "Verified" in Mandrill dashboard

### Step 3: From Address Configuration
- [ ] Decide on "From" email address (recommended: `hello@cultofpsyche.com` or `support@cultofpsyche.com`)
- [ ] Update `from_email` in `/app/api/mailchimp/route.ts` if different from current
- [ ] Current setting: `noreply@cultofpsyche.com` (needs domain verification first)
- [ ] Verify address is allowed in Mandrill sending settings

### Step 4: Test Email Sending

#### A. Direct API Test (Do This First)
- [ ] Send test email via API (bypasses your app code):
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
- [ ] Check response: Should show `"status": "sent"` or `"queued"`
- [ ] If "rejected": Check `reject_reason` - this tells you exactly what's wrong
- [ ] Check inbox: `psyche@cultofpsyche.com`

#### B. Application Form Test
- [ ] Use your development server
- [ ] Submit test email via the email capture form
- [ ] Check inbox for confirmation email
- [ ] Test with multiple email providers:
  - [ ] Gmail
  - [ ] Outlook/Hotmail
  - [ ] Another provider (Yahoo, etc.)
- [ ] Verify:
  - [ ] Email arrives (not in spam)
  - [ ] Email formatting looks correct
  - [ ] Links work (if any)
  - [ ] Images load (if any)
  - [ ] Sender shows correctly

**If email fails:**
- Check API test first (separates "Mandrill config" vs "app code" issues)
- 90% of the time it's DNS (DKIM/SPF not propagated or wrong)
- Check DNS propagation: https://www.whatsmydns.net/
- Check Mandrill dashboard → Activity → Message Log for errors
- Look for `reject_reason` in API response

---

## B) End-to-End Test Checklist 🧪

Run this on a clean browser session. Test like you're a first-time visitor.

### 1. Live Detection Test

#### Scenario A: Channel is LIVE
- [ ] Start a live stream on your YouTube channel
- [ ] Visit `/show` page
- [ ] **Check:** Red banner appears at top with "🔴 LIVE NOW"
- [ ] **Check:** Video player shows live stream (not playlist)
- [ ] **Check:** Live stream loads and plays
- [ ] **Check:** Page title/description reflects live status (if applicable)
- [ ] Hard refresh page (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] **Check:** Live status persists after refresh
- [ ] Wait 30+ seconds
- [ ] **Check:** Page still shows live (polling works)

#### Scenario B: Channel is NOT Live
- [ ] Ensure you're NOT streaming
- [ ] Visit `/show` page
- [ ] **Check:** NO red banner visible
- [ ] **Check:** Video player shows 24/7 playback (playlist)
- [ ] **Check:** Video autoplays (or play button is visible)
- [ ] Hard refresh page
- [ ] **Check:** 24/7 playback persists

#### Scenario C: Live Status Transition
- [ ] Start with channel NOT live (verify 24/7 playback)
- [ ] Start a live stream
- [ ] Wait 30-60 seconds (polling interval)
- [ ] **Check:** Page automatically switches to live stream
- [ ] **Check:** Red banner appears
- [ ] End live stream
- [ ] Wait 30-60 seconds
- [ ] **Check:** Page switches back to 24/7 playback
- [ ] **Check:** Red banner disappears

### 2. Player Behavior Test

#### Autoplay Functionality
- [ ] Visit page when NOT live
- [ ] **Check:** Video attempts to autoplay
- [ ] If autoplay blocked by browser:
  - [ ] **Check:** Play button is clearly visible
  - [ ] **Check:** User can click to play
- [ ] Test in multiple browsers:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari (if available)
  - [ ] Edge

#### Video Playback
- [ ] **Check:** Video plays smoothly
- [ ] **Check:** Controls are accessible
- [ ] **Check:** Fullscreen works
- [ ] **Check:** Volume controls work

#### Live Stream Player
- [ ] When live, **check:** Live stream loads
- [ ] **Check:** Stream quality is appropriate
- [ ] **Check:** Stream doesn't buffer excessively
- [ ] **Check:** Can interact with YouTube controls

### 3. 24/7 Fallback Playback Test

#### Playlist Functionality
- [ ] Visit page when NOT live
- [ ] **Check:** First video plays
- [ ] Let video play to end (or skip to end if possible)
- [ ] **Check:** Next video in playlist starts automatically
- [ ] **Check:** Videos continue playing in sequence
- [ ] **Check:** Loop works (after last video, returns to first)

#### Error Handling
- [ ] **Check:** If a video becomes unavailable/private:
  - [ ] System skips to next video (gracefully)
  - [ ] OR shows clear error message
  - [ ] OR doesn't break entire player
- [ ] **Check:** Empty video list doesn't crash page
- [ ] **Check:** Network errors are handled gracefully

### 4. Email Capture Test

#### Valid Email Submission
- [ ] Enter valid email address
- [ ] Click "Subscribe" button
- [ ] **Check:** Form shows loading state
- [ ] **Check:** Success message appears
- [ ] **Check:** Form clears/resets
- [ ] **Check:** Email appears in Mailchimp audience/list
- [ ] **Check:** Confirmation email is received (see Mandrill test above)

#### Invalid Email Handling
- [ ] Enter invalid email (e.g., "notanemail")
- [ ] **Check:** Browser validation prevents submission (or)
- [ ] **Check:** Clear error message appears
- [ ] Try: `test@` (incomplete)
- [ ] Try: `@example.com` (missing local part)
- [ ] **Check:** All invalid formats are caught

#### Duplicate Email Handling
- [ ] Submit email address
- [ ] Wait for success
- [ ] Submit SAME email address again
- [ ] **Check:** Either:
  - Shows "already subscribed" message, OR
  - Shows success silently (both are acceptable)
- [ ] **Check:** Doesn't create duplicate in Mailchimp

#### Form UI/UX
- [ ] **Check:** Form is clearly visible
- [ ] **Check:** Placeholder text is helpful
- [ ] **Check:** Button is clearly labeled
- [ ] **Check:** Form styling matches site theme
- [ ] **Check:** Form works on mobile (responsive)

### 5. Confirmation Email Test

#### Email Delivery
- [ ] Submit email via form
- [ ] **Check:** Email arrives within 1-2 minutes
- [ ] **Check:** Email NOT in spam folder
- [ ] **Check:** "From" address shows correctly
- [ ] **Check:** Subject line is clear

#### Email Content
- [ ] **Check:** HTML renders correctly
- [ ] **Check:** Styling looks good
- [ ] **Check:** Text is readable
- [ ] **Check:** Branding matches site
- [ ] **Check:** All links work (if any)
- [ ] **Check:** Images load (if any)
- [ ] **Check:** Plain text version is readable (if sent)

#### Email in Different Clients
- [ ] Test in Gmail (web)
- [ ] Test in Outlook (web/desktop)
- [ ] Test in mobile email client
- [ ] Test in Apple Mail (if available)
- [ ] **Check:** Rendering is consistent

### 6. Environment Variables & Error Handling (Failure Injection Tests)

#### Missing Variables Test
- [ ] Temporarily remove `YOUTUBE_API_KEY` from `.env.local`
- [ ] Restart server
- [ ] Visit page
- [ ] **Check:** Site fails gracefully (shows error, doesn't crash)
- [ ] **Check:** Error message is clear to developers
- [ ] **Check:** Logs are useful (not cryptic)
- [ ] Restore variable

- [ ] Temporarily remove `MAILCHIMP_API_KEY`
- [ ] Try email submission
- [ ] **Check:** Shows appropriate error message
- [ ] **Check:** Doesn't expose sensitive information
- [ ] **Check:** UI shows clean error state
- [ ] Restore variable

- [ ] Temporarily set invalid Mandrill key
- [ ] Try email submission
- [ ] **Check:** Shows clean error message
- [ ] **Check:** Logs show clear error (not 500 crash)
- [ ] Restore valid key

#### Offline/Fallback Testing
- [ ] Simulate channel with no live stream
- [ ] **Check:** Fallback playback always works
- [ ] **Check:** No crashes if live detection fails
- [ ] **Check:** Graceful degradation

#### Rate Limiting / Caching
- [ ] Rapidly refresh page 10+ times
- [ ] **Check:** YouTube API isn't hit on every request
- [ ] **Check:** Some caching is in place (even short-term)
- [ ] **Check:** Live status polling is throttled (30s intervals)

### 7. Mobile & Responsive Test

#### Mobile Viewport
- [ ] Test on mobile device (or browser dev tools)
- [ ] **Check:** Layout is readable
- [ ] **Check:** Video player is appropriately sized
- [ ] **Check:** Email form is usable
- [ ] **Check:** Navigation works
- [ ] **Check:** Text is readable (not too small)
- [ ] **Check:** Buttons are tappable (not too small)

#### Tablet Viewport
- [ ] Test on tablet-size viewport
- [ ] **Check:** Layout adapts well
- [ ] **Check:** Grid columns adjust appropriately

#### Desktop Viewport
- [ ] Test on large desktop screen
- [ ] **Check:** Content doesn't stretch too wide
- [ ] **Check:** Max-width constraints work

### 8. Performance Test

#### Load Times
- [ ] **Check:** Page loads in < 3 seconds (ideally < 2s)
- [ ] **Check:** Video player loads reasonably quickly
- [ ] **Check:** Images load progressively
- [ ] **Check:** No blocking resources

#### Network Conditions
- [ ] Test on slow 3G (dev tools)
- [ ] **Check:** Site still functions
- [ ] **Check:** Graceful degradation
- [ ] **Check:** Loading states are visible

---

## C) Production Deployment Setup 🚀

### Pre-Deployment Checklist
- [ ] All tests from Section B passed
- [ ] Mandrill domain verified and tested
- [ ] All environment variables documented
- [ ] Code is clean (no console.logs, test data, etc.)
- [ ] README/documentation is up to date

### Deployment Steps
- [ ] Deploy to Vercel (or your hosting platform)
  ```bash
  # If using Vercel CLI
  vercel --prod
  ```
- [ ] Add ALL environment variables in production dashboard:
  - [ ] `YOUTUBE_API_KEY`
  - [ ] `MAILCHIMP_API_KEY`
  - [ ] `MAILCHIMP_SERVER`
  - [ ] `MAILCHIMP_LIST_ID`
  - [ ] `MANDRILL_API_KEY`
- [ ] Verify environment variables are set correctly
- [ ] Build succeeds without errors

### Domain Configuration
- [ ] Add custom domain in hosting platform
- [ ] Update DNS records:
  - [ ] A record or CNAME as required
  - [ ] Mandrill DNS records (if not already done)
- [ ] Wait for DNS propagation
- [ ] Verify domain works

### Post-Deployment Testing
- [ ] Visit production URL
- [ ] **Re-run ping test from production:**
  - Verify environment variables are set correctly
  - Test API connectivity from production environment
- [ ] Run COMPLETE Section B checklist again on production
- [ ] **DO NOT ASSUME** - test everything again
- [ ] Test email capture on production
- [ ] Test live detection on production
- [ ] Test on multiple devices/browsers
- [ ] Test on different networks

### Common Production Issues
Watch for these "it worked locally" failures:
- [ ] Missing env vars in Vercel/production
- [ ] Wrong env var names (NEXT_PUBLIC_ prefix issues)
- [ ] Domain DNS not pointing correctly
- [ ] Serverless timeouts
- [ ] Fetch caching issues
- [ ] API key not updated in production (using old key)

### Monitoring Setup
- [ ] Set up error tracking (optional but recommended)
- [ ] Monitor API usage/quotas
- [ ] Set up uptime monitoring (optional)
- [ ] Check server logs for errors

---

## Quick Test Script

Run this as a quick sanity check:

```bash
# 1. Start dev server
npm run dev

# 2. Open browser to http://localhost:3000/show

# 3. Check console for errors (F12)

# 4. Test email form with your email

# 5. Check Mailchimp dashboard for new subscriber

# 6. Check email inbox for confirmation
```

---

## Issues Found During Testing

Document any issues here:

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
|       |          |        |       |
|       |          |        |       |
|       |          |        |       |

---

## Sign-Off

- [ ] All critical tests passed
- [ ] All blockers resolved
- [ ] Production deployment successful
- [ ] Production testing completed
- [ ] Ready for launch

**Tested by:** _________________  
**Date:** _________________  
**Production URL:** _________________

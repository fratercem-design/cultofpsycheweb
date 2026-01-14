# Cult of Psyche - Show Page Project Status

## Project Overview
A dedicated show page for the Cult of Psyche YouTube channel (cultofpsyche) with live stream detection, video playback, email capture, and 24/7 functionality.

---

## ✅ What's Been Completed

### 1. **YouTube Integration**
- ✅ YouTube Data API v3 integration configured
- ✅ API route (`/app/api/youtube/route.ts`) to fetch channel data
  - Fetches channel information (name, avatar, subscriber count, video count, view count)
  - Retrieves latest 50 videos with metadata
  - Includes video thumbnails, titles, descriptions, view counts, and durations
- ✅ Live stream detection API route (`/app/api/youtube/live/route.ts`)
  - Checks if channel is currently live streaming
  - Retrieves live video ID when streaming
  - Polls every 30 seconds to detect live status changes
- ✅ YouTube image domains configured in Next.js config
  - `yt3.ggpht.com` (channel thumbnails)
  - `i.ytimg.com` (video thumbnails)

### 2. **Show Page Design & Layout**
- ✅ Dark purple theme matching Cult of Psyche branding
  - Background: `#0f0c15`
  - Accent color: `#a76bff`
  - Card backgrounds: `#1a1625`
- ✅ Responsive layout with header and footer
- ✅ Channel header section displaying:
  - Channel avatar (circular)
  - Channel name with gradient text
  - Subscriber count, video count, total views
  - Channel description
- ✅ Video grid displaying latest episodes
  - Responsive grid (1-4 columns based on screen size)
  - Video thumbnails with hover effects
  - Video titles, view counts, and publish dates
  - Direct links to YouTube videos

### 3. **Live Stream Features**
- ✅ Red live banner component (`/app/components/LiveBanner.tsx`)
  - Animated pulsing banner
  - Displays "🔴 LIVE NOW" message
  - Shows across the entire site when streaming
- ✅ Live stream video player
  - Automatically displays live stream when detected
  - Embedded YouTube player with autoplay
  - Full-width responsive player
- ✅ Live status polling
  - Checks for live status every 30 seconds
  - Automatically updates UI when going live or ending stream

### 4. **24/7 Video Playback**
- ✅ Auto-play video player when not live
  - Plays latest videos in a playlist
  - Continuous playback (plays next video when current ends)
  - Embedded YouTube player with autoplay enabled
  - Loop functionality for continuous playback

### 5. **Email Capture & Mailchimp Integration**
- ✅ Email capture form component (`/app/components/EmailCapture.tsx`)
  - Styled form matching site theme
  - Real-time validation
  - Success/error messaging
  - Loading states
- ✅ Mailchimp API integration (`/app/api/mailchimp/route.ts`)
  - Adds subscribers to Mailchimp audience/list
  - Handles duplicate email addresses gracefully
  - Error handling and user feedback
- ✅ Mandrill confirmation emails
  - Sends welcome email after subscription
  - HTML email template with branding
  - Styled confirmation message

### 6. **Navigation & Components**
- ✅ Header component (`/app/components/Header.tsx`)
  - Site logo/branding
  - Navigation menu (Show, Mantras, Store, Charity, About)
  - Responsive design
- ✅ Footer component (`/app/components/Footer.tsx`)
  - Copyright information
  - Consistent styling

### 7. **Configuration & Environment**
- ✅ Environment variables configured:
  - `YOUTUBE_API_KEY` - YouTube Data API v3 key
  - `MAILCHIMP_API_KEY` - Mailchimp API key
  - `MAILCHIMP_SERVER` - Mailchimp server prefix (us17)
  - `MAILCHIMP_LIST_ID` - Mailchimp audience/list ID
  - `MANDRILL_API_KEY` - Mandrill API key for transactional emails
- ✅ `.env.local.example` template file created
- ✅ Next.js configuration updated for image domains

### 8. **Code Quality**
- ✅ TypeScript types and interfaces defined
- ✅ Error handling implemented
- ✅ ESLint passing with no errors
- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode optimized styling

---

## 🔧 What's Left To Do / Improvements Needed

### 1. **Mandrill Email Configuration** ⚠️ REQUIRED
- [ ] **Verify sending domain** in Mandrill account
  - Current from_email: `noreply@cultofpsyche.com`
  - Needs to be verified domain or changed to verified email
  - Alternative: Use a verified email address from your Mandrill account
- [ ] **Test confirmation emails** are being sent
- [ ] **Customize email template** if desired (currently uses basic template)
- [ ] **Update from_email** in `/app/api/mailchimp/route.ts` if using different address

### 2. **Live Chat Integration** (Optional Enhancement)
- [ ] **Note**: YouTube doesn't allow embedding live chat in separate iframe
  - Live chat appears in YouTube embed player when enabled by streamer
  - Current implementation uses standard YouTube embed
  - Chat will appear in player if enabled in YouTube stream settings
- [ ] Consider alternative: Link to YouTube video for full chat experience

### 3. **Testing & Quality Assurance**
- [ ] Test live stream detection when actually streaming
- [ ] Test email capture form end-to-end
- [ ] Verify Mailchimp subscriptions are working
- [ ] Test confirmation emails are received
- [ ] Test 24/7 playback when not live
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Test error handling scenarios

### 4. **Performance Optimizations** (Optional)
- [ ] Add video loading states/skeleton screens
- [ ] Implement video caching strategy
- [ ] Optimize image loading (Next.js Image component already in use)
- [ ] Consider implementing ISR (Incremental Static Regeneration) for video list

### 5. **Additional Features** (Future Enhancements)
- [ ] Add video search/filter functionality
- [ ] Add video categories/playlists
- [ ] Add social sharing buttons
- [ ] Add RSS feed link
- [ ] Add analytics tracking (Google Analytics, etc.)
- [ ] Add video favorites/watch later functionality
- [ ] Add comments section integration
- [ ] Add video preview on hover
- [ ] Add scheduled stream notifications
- [ ] Add calendar view for upcoming streams

### 6. **Domain & Deployment**
- [ ] Set up production domain
- [ ] Configure environment variables in production
- [ ] Set up CI/CD pipeline (if desired)
- [ ] Configure production build optimizations
- [ ] Set up monitoring and error tracking
- [ ] Configure SSL/HTTPS
- [ ] Set up CDN for static assets

### 7. **Documentation**
- [ ] Create user documentation (if needed)
- [ ] Document API endpoints
- [ ] Create setup guide for deployment
- [ ] Document environment variable requirements

### 8. **Email Template Customization** (Optional)
- [ ] Design custom HTML email template
- [ ] Add Cult of Psyche branding to emails
- [ ] Add unsubscribe link (handled by Mailchimp automatically)
- [ ] Add social media links
- [ ] Add personalized content

---

## 📁 Project Structure

```
psycheverse/
├── app/
│   ├── api/
│   │   ├── youtube/
│   │   │   ├── route.ts          # Fetch channel & videos
│   │   │   └── live/
│   │   │       └── route.ts      # Check live status
│   │   └── mailchimp/
│   │       └── route.ts          # Email subscription
│   ├── components/
│   │   ├── Header.tsx            # Site header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── LiveBanner.tsx        # Live stream banner
│   │   └── EmailCapture.tsx      # Email form
│   ├── show/
│   │   └── page.tsx              # Main show page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage (default Next.js)
│   └── globals.css               # Global styles
├── .env.local                    # Environment variables (not in git)
├── .env.local.example            # Environment template
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies
```

---

## 🔑 Environment Variables Required

```env
# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key

# Mailchimp
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER=us17
MAILCHIMP_LIST_ID=your_list_id

# Mandrill (optional but recommended)
MANDRILL_API_KEY=your_mandrill_api_key
```

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in all required API keys

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Visit the show page:**
   - Open `http://localhost:3000/show`

---

## 📝 Notes

- **Live Stream Detection**: Checks every 30 seconds automatically
- **Video Playback**: When not live, plays latest videos in continuous loop
- **Email Capture**: Subscribes users to Mailchimp list and sends confirmation email
- **Theme**: Dark purple theme matching Cult of Psyche branding
- **Responsive**: Works on desktop, tablet, and mobile devices

---

## 🐛 Known Issues / Limitations

1. **Live Chat**: YouTube doesn't allow separate chat iframe embedding. Chat appears in YouTube player when enabled by streamer.
2. **Mandrill Email**: From email address needs to be verified in Mandrill account.
3. **YouTube API Quota**: Free tier has daily request limits. Monitor usage if high traffic expected.
4. **Video Playback**: 24/7 playback uses YouTube playlist feature, which has limitations on autoplay (browser policies may prevent autoplay).

---

## 📞 Support / Next Steps

1. **Immediate Action Required:**
   - Verify Mandrill sending domain/email
   - Test email capture form end-to-end

2. **Testing:**
   - Test all features in development
   - Test with actual live stream
   - Verify email delivery

3. **Deployment:**
   - Set up production environment
   - Configure production environment variables
   - Deploy to hosting platform

---

**Last Updated:** January 13, 2026
**Project Status:** ✅ Core Features Complete | ⚠️ Configuration Needed

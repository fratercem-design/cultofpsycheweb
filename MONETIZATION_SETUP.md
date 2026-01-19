# Monetization Features Setup Guide

## Overview

This guide covers the monetization features added to the Cult of Psyche site, including Stripe integration, admin tools, and member management.

## Features Implemented

### 1. Support/Join Hub (`/support`)
- **Vault Membership Card**: $10/month subscription via Stripe
- **Vault Lifetime Card**: $100 one-time payment (best value, highlighted)
- **Personal Call Card**: $50 one-time booking payment
- **Etsy Shop Card**: Promotional card with 10% member discount mention
- **Tip Jar**: Cash App option ($psycheawakens)
- **Customer Portal Link**: Manage membership button

### 2. Admin Panel (`/admin`)
- **Content Drops Manager**: Create and manage weekly exclusive content
- **Members Manager**: View active members, grant comp access, remove access
- **Booking Manager**: View upcoming appointments, manage intake notes, track payment status
- **Broadcast Tools**: One-button live alerts and drop notifications

### 3. Members-Only Vault (`/vault`)
- Protected page that checks membership status (monthly or lifetime)
- **Four sections**:
  - **Weekly Drop**: Current week's exclusive content
  - **Archive**: Past weekly drops
  - **Extras**: Bonus posts, downloads, unlisted videos, behind-the-scenes
  - **Members Feed**: Short posts between drops
- **Teaser System**: Public previews (15-30 sec) for non-members to entice signups
- **Founding Member Badge**: First 100 lifetime members get special recognition
- **Etsy Coupon**: Members get 10% off code (VAULT10)
- Shows join CTA for non-members with both pricing options

### 4. Policies Page (`/policies`)
- Refund policy (memberships, digital content, consultations)
- Tarot/spiritual services disclaimer
- Privacy policy

## Stripe Setup

### Required Environment Variables

Add these to your `.env.local` and Vercel:

```env
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_... for testing)
STRIPE_PRICE_MEMBERSHIP=price_... (Stripe Price ID for $10/month subscription)
STRIPE_PRICE_LIFETIME=price_... (Stripe Price ID for $100 one-time payment)
STRIPE_PRICE_BOOKING=price_... (Stripe Price ID for $50 one-time payment)
STRIPE_WEBHOOK_SECRET=whsec_... (from Stripe Dashboard > Webhooks)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com (or http://localhost:3000 for dev)
```

### Stripe Product Setup

1. **Create Vault Membership Product**:
   - Go to Stripe Dashboard > Products
   - Create a new product: "Vault Membership"
   - Set price to $10/month (recurring)
   - Copy the Price ID → use as `STRIPE_PRICE_MEMBERSHIP`

2. **Create Vault Lifetime Product**:
   - Create a new product: "Vault Lifetime"
   - Set price to $100 (one-time payment, not recurring)
   - Copy the Price ID → use as `STRIPE_PRICE_LIFETIME`

3. **Create Booking Product**:
   - Create a new product: "1-Hour Personal Call"
   - Set price to $50 (one-time)
   - Copy the Price ID → use as `STRIPE_PRICE_BOOKING`

4. **Set Up Webhook**:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook signing secret → use as `STRIPE_WEBHOOK_SECRET`

### Customer Portal

The customer portal is automatically available. Users can:
- Update payment methods
- View billing history
- Cancel subscriptions
- Update billing information

Access via the "Manage Membership" button on `/support`.

## Mailchimp Integration

### Tags Setup

Create these tags in Mailchimp:
- `alert_live` - For live stream notifications
- `alert_upload` - For new video upload notifications
- `member_active` - For active monthly members
- `member_lifetime` - For lifetime members
- `member_founding` - For first 100 lifetime members (optional)
- `member_lapsed` - For canceled monthly members

### Automation/Journey Setup

1. **Live Alerts Journey**:
   - Trigger: When tag `alert_live` is added
   - Action: Send email notification

2. **New Upload Alerts Journey**:
   - Trigger: When tag `alert_upload` is added
   - Action: Send email notification

3. **Member Welcome Journey**:
   - Trigger: When tag `member_active` is added
   - Action: Send welcome email with vault access info

### Stripe → Mailchimp Sync

Consider using Mailchimp's Stripe integration to automatically sync:
- Customer data
- Subscription status
- Payment events

This will automatically tag members in Mailchimp.

## Database Considerations

**Note**: The current implementation uses in-memory state for demo purposes. For production, you'll need to:

1. **Set up a database** (Supabase, PostgreSQL, etc.) to store:
   - User accounts and membership status (free, member_monthly, member_lifetime)
   - Founding member tracking (first 100 lifetime members)
   - Content drops (with preview URLs for teasers)
   - Booking records
   - Member access logs

2. **Update API routes** to:
   - Check membership status from database (monthly vs lifetime)
   - Store subscription data from webhooks
   - Track founding members (first 100 lifetime purchases)
   - Manage content drops persistently (with preview URLs)
   - Track bookings

3. **Add authentication** to:
   - Protect admin routes
   - Verify membership status
   - Secure customer portal access

## Admin Panel Access

**Important**: The admin panel (`/admin`) is currently unprotected. For production:

1. Add authentication (NextAuth.js, Clerk, etc.)
2. Add role-based access control
3. Restrict to admin users only

## Testing Checklist

- [ ] Test Stripe checkout flow (use test mode)
- [ ] Test webhook events (use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`)
- [ ] Test customer portal access
- [ ] Test membership status check on `/vault`
- [ ] Test admin content drops creation
- [ ] Test Mailchimp tag assignment
- [ ] Test broadcast tools (manual triggers)

## Next Steps

1. **Install Stripe package**: `npm install stripe`
2. **Set up environment variables** in Vercel
3. **Create Stripe products and prices**
4. **Configure webhook endpoint** in Stripe Dashboard
5. **Set up database** for persistent storage
6. **Add authentication** for admin panel
7. **Test end-to-end flow** in Stripe test mode
8. **Go live** with Stripe live keys

## Support

For issues or questions:
- Stripe Documentation: https://stripe.com/docs
- Mailchimp API: https://mailchimp.com/developer/
- Contact via `/community` page

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

// Note: For Next.js webhooks, you may need to configure the route to accept raw body
// Add this to next.config.ts: export const config = { api: { bodyParser: false } }

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === 'subscription') {
        // User subscribed to monthly membership
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        
        // Here you would:
        // 1. Get or create user in your database
        // 2. Set their role to "member_monthly"
        // 3. Tag them in Mailchimp as "member_active"
        // 4. Store subscription ID for future reference
        
        console.log('New monthly subscription:', {
          customerId,
          subscriptionId,
          email: session.customer_email,
        });
      } else {
        // One-time payment (could be lifetime or booking)
        const customerId = session.customer as string;
        const amount = session.amount_total;
        
        // Check if it's lifetime ($100) or booking ($50)
        if (amount === 10000) { // $100 in cents
          // Lifetime membership
          // Here you would:
          // 1. Get or create user in your database
          // 2. Set their role to "member_lifetime"
          // 3. Check if they're in first 100 (founding member)
          // 4. Tag them in Mailchimp as "member_lifetime"
          
          console.log('New lifetime membership:', {
            customerId,
            email: session.customer_email,
            amount: session.amount_total,
          });
        } else {
          // Booking
          // Here you would:
          // 1. Create booking record
          // 2. Send confirmation email with scheduling link
          // 3. Tag in Mailchimp if needed
          
          console.log('New booking payment:', {
            customerId,
            email: session.customer_email,
            amount: session.amount_total,
          });
        }
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      
      if (subscription.status === 'active') {
        // Ensure user has member access
        console.log('Subscription active:', {
          customerId: subscription.customer,
          subscriptionId: subscription.id,
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      
      // Remove member access
      console.log('Subscription canceled:', {
        customerId: subscription.customer,
        subscriptionId: subscription.id,
      });
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      
      if (invoice.subscription) {
        // Monthly payment succeeded, ensure access is maintained
        console.log('Payment succeeded:', {
          customerId: invoice.customer,
          subscriptionId: invoice.subscription,
        });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      
      // Payment failed - you might want to send an email or restrict access
      console.log('Payment failed:', {
        customerId: invoice.customer,
        subscriptionId: invoice.subscription,
      });
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

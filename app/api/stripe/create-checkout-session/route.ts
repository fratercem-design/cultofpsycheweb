import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

const STRIPE_PRICE_MEMBERSHIP = process.env.STRIPE_PRICE_MEMBERSHIP || '';
const STRIPE_PRICE_LIFETIME = process.env.STRIPE_PRICE_LIFETIME || '';
const STRIPE_PRICE_BOOKING = process.env.STRIPE_PRICE_BOOKING || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;

    if (!type || (type !== 'membership' && type !== 'lifetime' && type !== 'booking')) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "membership", "lifetime", or "booking"' },
        { status: 400 }
      );
    }

    let priceId: string;
    let mode: 'subscription' | 'payment';
    let successUrl: string;
    let cancelUrl: string;

    if (type === 'membership') {
      priceId = STRIPE_PRICE_MEMBERSHIP;
      mode = 'subscription';
      successUrl = `${BASE_URL}/vault?success=true&type=membership`;
      cancelUrl = `${BASE_URL}/support?canceled=true`;
    } else if (type === 'lifetime') {
      priceId = STRIPE_PRICE_LIFETIME;
      mode = 'payment';
      successUrl = `${BASE_URL}/vault?success=true&type=lifetime`;
      cancelUrl = `${BASE_URL}/support?canceled=true`;
    } else {
      // Booking
      priceId = STRIPE_PRICE_BOOKING;
      mode = 'payment';
      successUrl = `${BASE_URL}/support?success=true&type=booking`;
      cancelUrl = `${BASE_URL}/support?canceled=true`;
    }

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        type,
      },
    });

    return NextResponse.redirect(session.url || `${BASE_URL}/support?error=session_creation_failed`, {
      status: 303,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

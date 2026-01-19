import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    // In a real implementation, you'd get the customer ID from the session/auth
    // For now, we'll need to get it from the request or session
    const formData = await request.formData();
    const customerId = formData.get('customer_id') as string;

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required. Please contact support.' },
        { status: 400 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${BASE_URL}/support`,
    });

    return NextResponse.redirect(session.url, {
      status: 303,
    });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}

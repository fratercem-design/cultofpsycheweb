import { NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER;
const MANDRILL_API_KEY = process.env.MANDRILL_API_KEY;

async function sendMandrillEmail(email: string) {
  if (!MANDRILL_API_KEY) {
    return; // Silently fail if Mandrill is not configured
  }

  try {
    const response = await fetch('https://mandrillapp.com/api/1.0/messages/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: MANDRILL_API_KEY,
        message: {
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #a76bff;">Thank you for subscribing!</h2>
              <p>You've been successfully added to the Cult of Psyche notifications list.</p>
              <p>You'll receive updates when we go live and for upcoming shows.</p>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                - Cult of Psyche
              </p>
            </div>
          `,
          text: 'Thank you for subscribing to Cult of Psyche! You\'ll receive updates when we go live and for upcoming shows.',
          subject: 'Welcome to Cult of Psyche Notifications',
          from_email: 'noreply@cultofpsyche.com',
          from_name: 'Cult of Psyche',
          to: [
            {
              email: email,
              type: 'to',
            },
          ],
          important: false,
          track_opens: true,
          track_clicks: true,
          auto_text: true,
          auto_html: false,
          inline_css: true,
          preserve_recipients: false,
        },
      }),
    });

    if (!response.ok) {
      console.error('Mandrill API error:', await response.text());
    }
  } catch (error) {
    console.error('Error sending Mandrill email:', error);
    // Don't fail the subscription if email fails
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER) {
      return NextResponse.json(
        { error: 'Mailchimp not configured' },
        { status: 500 }
      );
    }

    // Mailchimp uses Basic authentication (username can be anything, password is the API key)
    const authString = Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString('base64');
    
    const response = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle duplicate email (already subscribed)
      if (data.title === 'Member Exists') {
        return NextResponse.json({ message: 'Email already subscribed' });
      }
      return NextResponse.json(
        { error: data.detail || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    // Send confirmation email via Mandrill
    await sendMandrillEmail(email);

    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Mailchimp error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

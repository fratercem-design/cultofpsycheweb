import { NextRequest, NextResponse } from 'next/server';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER;

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER) {
      return NextResponse.json(
        { error: 'Mailchimp not configured' },
        { status: 500 }
      );
    }

    // In a real implementation, you would:
    // 1. Get all members with the relevant tag (alert_live or member_active)
    // 2. Trigger a Mailchimp campaign or automation
    // 3. Or use Mailchimp's API to send transactional emails

    // For now, this is a placeholder that logs the action
    console.log(`Broadcast requested: ${type}`);

    // Example: You could trigger a Mailchimp campaign here
    // Or use Mailchimp's Messages API to send to a segment

    return NextResponse.json({
      message: `Broadcast triggered: ${type}`,
      note: 'In production, this would send emails via Mailchimp API or trigger an automation',
    });
  } catch (error) {
    console.error('Broadcast error:', error);
    return NextResponse.json(
      { error: 'Failed to send broadcast' },
      { status: 500 }
    );
  }
}

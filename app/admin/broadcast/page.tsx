'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';

export default function AdminBroadcastPage() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendLiveAlert = async () => {
    if (!confirm('Send live alert to all subscribers with "alert_live" tag?')) {
      return;
    }

    setSending(true);
    setMessage('');

    try {
      // In production, this would call your API to trigger Mailchimp automation
      const response = await fetch('/api/mailchimp/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'live_alert',
        }),
      });

      if (response.ok) {
        setMessage('Live alert sent successfully!');
      } else {
        setMessage('Failed to send live alert.');
      }
    } catch (error) {
      setMessage('Error sending live alert.');
    } finally {
      setSending(false);
    }
  };

  const handleSendDropAlert = async () => {
    if (!confirm('Send "New Drop published" email to all active members?')) {
      return;
    }

    setSending(true);
    setMessage('');

    try {
      // In production, this would call your API to trigger Mailchimp automation
      const response = await fetch('/api/mailchimp/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'new_drop',
        }),
      });

      if (response.ok) {
        setMessage('Drop alert sent successfully!');
      } else {
        setMessage('Failed to send drop alert.');
      }
    } catch (error) {
      setMessage('Error sending drop alert.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Broadcast Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live Alert */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Send Live Alert</h3>
            <p className="text-sm text-gray-400 mb-4">
              Send a notification to all subscribers tagged with "alert_live" that you're going live.
            </p>
            <button
              onClick={handleSendLiveAlert}
              disabled={sending}
              className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Live Alert'}
            </button>
          </div>

          {/* New Drop Alert */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">New Drop Published</h3>
            <p className="text-sm text-gray-400 mb-4">
              Send a notification to all active members that a new exclusive drop is available.
            </p>
            <button
              onClick={handleSendDropAlert}
              disabled={sending}
              className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Drop Alert'}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes('successfully')
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-8 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              • <strong>Live Alert:</strong> Triggers Mailchimp automation/journey for subscribers with
              "alert_live" tag
            </li>
            <li>
              • <strong>Drop Alert:</strong> Sends email to all active members (tagged "member_active")
              about new exclusive content
            </li>
            <li>
              • These buttons trigger manual broadcasts. For automated alerts, set up Mailchimp
              Journeys that trigger on tag changes or events.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

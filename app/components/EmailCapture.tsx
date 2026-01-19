'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  title?: string;
  description?: string;
  showCheckboxes?: boolean;
}

export default function EmailCapture({ 
  title = "Get Alerts",
  description = "Choose what you want to be notified about:",
  showCheckboxes = true 
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [alertLive, setAlertLive] = useState(false);
  const [alertUpload, setAlertUpload] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showCheckboxes && !alertLive && !alertUpload) {
      setStatus('error');
      setMessage('Please select at least one notification preference.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          alertLive: showCheckboxes ? alertLive : true,
          alertUpload: showCheckboxes ? alertUpload : false,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! You\'ll receive notifications based on your preferences.');
        setEmail('');
        setAlertLive(false);
        setAlertUpload(false);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {showCheckboxes && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={alertLive}
                onChange={(e) => setAlertLive(e.target.checked)}
                className="w-5 h-5 rounded border-[var(--border)] bg-[var(--bg)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] cursor-pointer"
              />
              <span className="text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                Notify me when you go live
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={alertUpload}
                onChange={(e) => setAlertUpload(e.target.checked)}
                className="w-5 h-5 rounded border-[var(--border)] bg-[var(--bg)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--card-bg)] cursor-pointer"
              />
              <span className="text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                Notify me when you post new videos
              </span>
            </label>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Submitting...' : 'Subscribe'}
          </button>
        </div>
        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

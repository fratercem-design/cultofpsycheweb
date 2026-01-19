'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'contact',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // In a real implementation, you'd send this to an API endpoint
    // For now, we'll just show a success message
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', type: 'contact', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Community
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          Get in touch, share suggestions, request collaborations, or report issues.
        </p>

        {/* Contact Form */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent)]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2 text-gray-300">
                Type of Inquiry
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="contact">General Contact</option>
                <option value="suggestion">Suggestion</option>
                <option value="collab">Collaboration Request</option>
                <option value="issue">Report an Issue</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent)] resize-y"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-8 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {message && (
              <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </section>

        {/* Code of Conduct */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Community Guidelines & Code of Conduct
          </h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Respect & Boundaries</h3>
              <p className="leading-relaxed">
                We honor all paths and recognize that each seeker's journey is unique. Our community is built on mutual respect, consent, and the understanding that true spirituality serves liberation, not exploitation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Ethical Practice</h3>
              <p className="leading-relaxed">
                This work demands ethical practice, clear boundaries, and authentic connection. We operate with integrity, respect, and responsibility in all interactions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Inclusive Space</h3>
              <p className="leading-relaxed">
                All are welcome regardless of background, experience level, or spiritual path. Discrimination, harassment, or harmful behavior will not be tolerated.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Constructive Dialogue</h3>
              <p className="leading-relaxed">
                Engage with curiosity and openness. Disagreement is welcome when expressed respectfully. Personal attacks or trolling will result in removal from the community.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Privacy & Safety</h3>
              <p className="leading-relaxed">
                Respect others' privacy. Do not share personal information without consent. Report any concerns about safety or violations of these guidelines.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-sm text-gray-400">
                Violations of these guidelines may result in warnings, temporary suspension, or permanent removal from the community. We reserve the right to moderate content and interactions to maintain a safe, respectful environment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

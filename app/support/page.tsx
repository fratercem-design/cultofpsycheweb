import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Support & Join
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose how you'd like to support the work and deepen your practice.
          </p>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Monthly Membership Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                Vault Membership
              </h2>
              <div className="text-4xl font-bold text-[var(--fg)] mb-1">$10<span className="text-lg text-gray-400">/month</span></div>
              <p className="text-sm text-gray-400">Weekly exclusive content</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Weekly exclusive drop (video/audio/post)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Full vault archive access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Members-only feed & extras</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>10% off Etsy shop</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Cancel anytime</span>
              </li>
            </ul>
            <form action="/api/stripe/create-checkout-session" method="POST">
              <input type="hidden" name="type" value="membership" />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
              >
                Join for $10/month
              </button>
            </form>
          </div>

          {/* Lifetime Membership Card */}
          <div className="bg-[var(--card-bg)] border-2 border-[var(--accent)] rounded-lg p-8 hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all duration-300 relative">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold rounded-full">
                BEST VALUE
              </span>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                Vault Lifetime
              </h2>
              <div className="text-4xl font-bold text-[var(--fg)] mb-1">$100</div>
              <p className="text-sm text-gray-400">One-time payment, forever access</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Everything in monthly membership</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Lifetime access to all current & future drops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Never pay again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Founding member badge (first 100)</span>
              </li>
            </ul>
            <form action="/api/stripe/create-checkout-session" method="POST">
              <input type="hidden" name="type" value="lifetime" />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
              >
                Get Lifetime Access
              </button>
            </form>
          </div>

          {/* Etsy Shop Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                Etsy Shop
              </h2>
              <p className="text-sm text-gray-400 mb-4">Shop the Psyche Awakens artifacts</p>
            </div>
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-[var(--bg)] border border-[var(--border)] rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Product {i}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="https://www.etsy.com/shop/psycheawakens"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors text-center"
            >
              Visit Etsy Shop
            </a>
          </div>
        </div>

        {/* Personal Call & Etsy Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Personal Call Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                1-Hour Personal Call
              </h2>
              <div className="text-4xl font-bold text-[var(--fg)] mb-1">$50</div>
              <p className="text-sm text-gray-400">One-time session</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Tarot reading / consulting / strategy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Personalized guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Intake form + follow-up notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>Payment required to confirm</span>
              </li>
            </ul>
            <form action="/api/stripe/create-checkout-session" method="POST">
              <input type="hidden" name="type" value="booking" />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
              >
                Book a Session
              </button>
            </form>
          </div>

          {/* Etsy Shop Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                Etsy Shop
              </h2>
              <p className="text-sm text-gray-400 mb-4">Shop the Psyche Awakens artifacts</p>
              <p className="text-xs text-[var(--accent)] mb-4">Members get 10% off with code in Vault</p>
            </div>
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-[var(--bg)] border border-[var(--border)] rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Product {i}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="https://www.etsy.com/shop/psycheawakens"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors text-center"
            >
              Visit Etsy Shop
            </a>
          </div>
        </div>

        {/* Tip Jar */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Tip Jar
          </h2>
          <p className="text-gray-300 mb-4">
            Want to support the work in a different way? Send a tip via Cash App.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="px-6 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Cash App</p>
              <p className="text-lg font-semibold text-[var(--accent)]">$psycheawakens</p>
            </div>
          </div>
        </div>

        {/* Customer Portal Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">Already a member?</p>
          <form action="/api/stripe/create-portal-session" method="POST">
            <button
              type="submit"
              className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm font-semibold underline"
            >
              Manage Membership
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

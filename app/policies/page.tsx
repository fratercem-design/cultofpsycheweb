import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Policies
        </h1>

        {/* Refund Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">Refund Policy</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Membership Subscriptions</h3>
              <p>
                Monthly membership subscriptions can be canceled at any time. Cancellation takes effect at the end of your current billing period. 
                No refunds are provided for partial billing periods. Once canceled, you will retain access until the end of your paid period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Digital Content</h3>
              <p>
                Due to the digital nature of our content (videos, downloads, resources), all sales are final. 
                We do not offer refunds for digital content purchases or membership fees for content already accessed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Personal Consultations</h3>
              <p>
                Personal consultation sessions (tarot readings, consulting, strategy calls) are non-refundable once booked and paid. 
                If you need to reschedule, please contact us at least 24 hours in advance. No-shows are not eligible for refunds.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Exceptions</h3>
              <p>
                Refunds may be considered on a case-by-case basis for technical issues that prevent access to paid content, 
                or in cases of documented billing errors. Contact us through the{' '}
                <a href="/community" className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                  community page
                </a>{' '}
                to request a refund review.
              </p>
            </div>
          </div>
        </section>

        {/* Tarot Disclaimer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">Tarot & Spiritual Services Disclaimer</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              All tarot readings, spiritual consultations, and related services provided by Cult of Psyche are for 
              <strong className="text-[var(--fg)]"> entertainment and personal reflection purposes only</strong>.
            </p>
            <p>
              These services are not intended to replace professional medical, legal, financial, or psychological advice. 
              We do not diagnose, treat, or cure any medical or psychological conditions. Always consult qualified professionals 
              for matters related to health, legal issues, financial decisions, or mental health.
            </p>
            <p>
              By engaging with our services, you acknowledge that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Readings and consultations are subjective interpretations and should be used as tools for personal reflection</li>
              <li>You are responsible for your own decisions and actions</li>
              <li>We are not liable for any decisions made based on information provided in readings or consultations</li>
              <li>Results and outcomes are not guaranteed</li>
            </ul>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">Privacy Policy</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Information We Collect</h3>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Email address (for subscriptions and communications)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Contact information (for consultations and bookings)</li>
                <li>Usage data (to improve our services)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">How We Use Your Information</h3>
              <p>
                We use collected information to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Process payments and manage subscriptions</li>
                <li>Send notifications and updates (you can opt out anytime)</li>
                <li>Provide customer support</li>
                <li>Improve our services and user experience</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Data Security</h3>
              <p>
                We use industry-standard security measures to protect your information. Payment processing is handled by Stripe, 
                which is PCI-DSS compliant. We do not store full credit card information on our servers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Third-Party Services</h3>
              <p>
                We use third-party services including:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Mailchimp:</strong> Email marketing and automation</li>
                <li><strong>Vercel:</strong> Website hosting</li>
              </ul>
              <p className="mt-2">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Your Rights</h3>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Cancel your subscription at any time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--fg)]">Contact</h3>
              <p>
                For privacy-related questions or requests, contact us through the{' '}
                <a href="/community" className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                  community page
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="border-t border-[var(--border)] pt-8 text-sm text-gray-400">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

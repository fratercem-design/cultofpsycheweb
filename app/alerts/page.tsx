import Header from '../components/Header';
import Footer from '../components/Footer';
import EmailCapture from '../components/EmailCapture';

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Get Alerts
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Never miss a live stream or new upload. Choose what you want to be notified about.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <EmailCapture 
            title="Notification Preferences"
            description="Select which notifications you'd like to receive:"
            showCheckboxes={true}
          />
        </div>

        <div className="mt-12 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            What You'll Receive
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[var(--fg)]">Live Notifications</h3>
                <p className="text-sm">
                  Get notified when we go live on YouTube. Never miss a stream or community discussion.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-[var(--fg)]">New Upload Alerts</h3>
                <p className="text-sm">
                  Be the first to know when we publish new videos, tutorials, or educational content.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            You can update your preferences or unsubscribe at any time. We respect your privacy and will 
            never share your email address.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          The Vault
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          Free resources and member-exclusive downloads.
        </p>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">Vault resources coming soon.</p>
          <Link 
            href="/" 
            className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function StartHerePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Start Here
        </h1>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 mb-8">
          <p className="text-lg text-gray-300 mb-6">
            Welcome to Vault + Signal. Begin your journey into occult wisdom with these foundational teachings.
          </p>
          <p className="text-gray-400 mb-6">
            Getting started guide coming soon.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/teachings" 
              className="px-6 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white rounded-lg transition-colors"
            >
              Explore Teachings
            </Link>
            <Link 
              href="/" 
              className="px-6 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] rounded-lg transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

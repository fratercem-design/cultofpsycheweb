import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Vault + Signal
        </h1>
        <p className="text-xl sm:text-2xl text-gray-400 mb-8">
          Occult wisdom for the modern seeker
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
          A curated collection of teachings, recommendations, and insights for your spiritual journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/teachings" 
            className="px-8 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
          >
            Explore Teachings
          </Link>
          <Link 
            href="/join" 
            className="px-8 py-3 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors"
          >
            Join the Community
          </Link>
        </div>
      </section>

      {/* Featured Teaching */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Featured Teaching
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-sm rounded-full">
              Practice
            </span>
            <span className="text-gray-400 text-sm">free</span>
          </div>
          <h3 className="text-2xl font-semibold mb-3">The Sacred Pause</h3>
          <p className="text-gray-300 mb-4">
            Discover the power of intentional stillness in a world of constant noise and distraction.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span>2 min read</span>
            <span>•</span>
            <span>January 15, 2024</span>
          </div>
          <Link 
            href="/teachings/the-sacred-pause" 
            className="inline-block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors font-semibold"
          >
            Read Full →
          </Link>
        </div>
      </section>

      {/* Latest Episode */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Latest Episode
        </h2>
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            Check back soon for our latest episode release.
          </p>
          <Link 
            href="/live" 
            className="inline-block px-6 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] rounded-lg transition-colors"
          >
            View Schedule
          </Link>
        </div>
      </section>

      {/* Explore Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Explore
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-colors">
            <h3 className="text-xl font-semibold mb-2">Teachings</h3>
            <p className="text-gray-400 text-sm mb-4">
              Deep dives into occult wisdom, practice, and theory.
            </p>
            <Link 
              href="/teachings" 
              className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm font-semibold"
            >
              Explore →
            </Link>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-colors">
            <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
            <p className="text-gray-400 text-sm mb-4">
              Curated books, tools, creators, and playlists.
            </p>
            <Link 
              href="/recommendations" 
              className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm font-semibold"
            >
              Explore →
            </Link>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-colors">
            <h3 className="text-xl font-semibold mb-2">The Vault</h3>
            <p className="text-gray-400 text-sm mb-4">
              Free resources and member-exclusive downloads.
            </p>
            <Link 
              href="/vault" 
              className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm font-semibold"
            >
              Explore →
            </Link>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Ready to Dive Deeper?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join our community to access exclusive teachings, resources, and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/join" 
            className="px-8 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
          >
            Join Now
          </Link>
          <Link 
            href="/teachings/start-here" 
            className="px-8 py-3 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors"
          >
            Start Your Journey
          </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          About Cult of Psyche
        </h1>

        {/* Origin Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">Our Origin</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Cult of Psyche emerged from a deep calling to bridge ancient wisdom with modern understanding. 
              In a world where spiritual seeking often feels fragmented or commercialized, we saw a need for 
              authentic, grounded teachings that honor both tradition and personal transformation.
            </p>
            <p>
              The name "Cult of Psyche" reflects our commitment to the soul's journey—Psyche, the Greek 
              goddess of the soul, represents the transformative path from mortal seeking to divine wisdom. 
              Like Psyche's trials, we believe that true spiritual growth comes through direct experience, 
              shadow work, and the integration of all aspects of self.
            </p>
            <p>
              What started as personal exploration has evolved into a community dedicated to ethical practice, 
              authentic connection, and the liberation that comes from understanding both light and shadow.
            </p>
          </div>
        </section>

        {/* What the Channel Is */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">What We Are</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Cult of Psyche is a YouTube channel and community focused on occult wisdom, spiritual practice, 
              and transformative teachings. We explore topics including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Traditional and modern occult practices</li>
              <li>Shadow work and psychological integration</li>
              <li>Mythology, symbolism, and sacred texts</li>
              <li>Practical magic and ritual work</li>
              <li>Ethical considerations in spiritual practice</li>
              <li>Community building and mutual support</li>
            </ul>
            <p>
              Our approach is grounded, practical, and respectful of diverse paths. We don't claim to have 
              all the answers, but we're committed to asking the right questions and sharing what we've 
              learned along the way.
            </p>
          </div>
        </section>

        {/* What People Can Expect */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">What to Expect</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              When you engage with Cult of Psyche, you can expect:
            </p>
            <div className="space-y-3">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-[var(--fg)]">Regular Content</h3>
                <p className="text-sm">
                  Live streams, video uploads, and community discussions covering a wide range of topics 
                  in occultism, spirituality, and personal growth.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-[var(--fg)]">Ethical Practice</h3>
                <p className="text-sm">
                  All teachings emphasize ethical considerations, consent, boundaries, and responsible practice. 
                  We believe spirituality should serve liberation, not exploitation.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-[var(--fg)]">Community Support</h3>
                <p className="text-sm">
                  A welcoming space for seekers at all levels. Whether you're just beginning or have been 
                  on this path for years, you'll find value and connection here.
                </p>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-[var(--fg)]">Honest Exploration</h3>
                <p className="text-sm">
                  We don't shy away from difficult topics. Shadow work, challenging questions, and the 
                  complexities of spiritual practice are all part of the conversation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[var(--fg)]">Connect With Us</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://youtube.com/@cultofpsyche"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
            >
              YouTube Channel
            </a>
            <Link
              href="/community"
              className="px-6 py-3 border-2 border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/recommended"
              className="px-6 py-3 border-2 border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors"
            >
              Recommended Streamers
            </Link>
          </div>
        </section>

        {/* Values Statement */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="space-y-3 text-gray-300">
            <p className="leading-relaxed">
              <strong className="text-[var(--fg)]">Integrity:</strong> We operate with honesty, transparency, 
              and ethical responsibility in all our work.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[var(--fg)]">Respect:</strong> We honor all paths and recognize that 
              each seeker's journey is unique and valid.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[var(--fg)]">Liberation:</strong> True spirituality serves freedom, 
              empowerment, and authentic self-expression—never exploitation or control.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[var(--fg)]">Community:</strong> We believe in mutual support, 
              shared learning, and building connections that uplift rather than divide.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

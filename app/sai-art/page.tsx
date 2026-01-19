import Header from '../components/Header';
import Footer from '../components/Footer';

// Placeholder data - in production, this would come from a CMS or API
const artPieces = [
  {
    id: 1,
    title: 'Psyche Awakening',
    image: '/api/placeholder/600/800',
    description: 'Digital art piece exploring themes of transformation',
    available: true,
  },
  {
    id: 2,
    title: 'Sacred Geometry',
    image: '/api/placeholder/600/800',
    description: 'Geometric patterns and spiritual symbolism',
    available: true,
  },
  {
    id: 3,
    title: 'Mystic Portal',
    image: '/api/placeholder/600/800',
    description: 'Portal to other realms of consciousness',
    available: false,
  },
  {
    id: 4,
    title: 'Divine Feminine',
    image: '/api/placeholder/600/800',
    description: 'Celebration of the sacred feminine energy',
    available: true,
  },
  {
    id: 5,
    title: 'Cosmic Alignment',
    image: '/api/placeholder/600/800',
    description: 'Alignment of cosmic forces and personal will',
    available: true,
  },
  {
    id: 6,
    title: 'Shadow Work',
    image: '/api/placeholder/600/800',
    description: 'Exploring the depths of shadow and light',
    available: false,
  },
];

export default function SAIArtPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            SAI Art
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of digital art pieces exploring themes of transformation, spirituality, and consciousness.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {artPieces.map((piece) => (
            <div
              key={piece.id}
              className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20"
            >
              <div className="relative aspect-[3/4] bg-[var(--bg)]">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 border-2 border-gray-500 rounded"></div>
                    <p className="text-sm">Artwork Image</p>
                  </div>
                </div>
                {piece.available && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Available
                  </div>
                )}
                {!piece.available && (
                  <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
                    Sold
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {piece.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{piece.description}</p>
                {piece.available && (
                  <button className="w-full px-4 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors text-sm">
                    Purchase
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Drop Posts Section */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Latest Drops
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-[var(--accent)] pl-4 py-2">
              <h3 className="font-semibold mb-1">New Collection Coming Soon</h3>
              <p className="text-sm text-gray-400">
                Stay tuned for our next art drop. Follow us on social media for updates.
              </p>
            </div>
          </div>
        </section>

        {/* Purchase Info */}
        <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Interested in Purchasing?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            For inquiries about purchasing artwork, commissions, or licensing, please contact us through our{' '}
            <a href="/community" className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
              community page
            </a>.
          </p>
          <a
            href="/community"
            className="inline-block px-8 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

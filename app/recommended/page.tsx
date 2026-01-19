import Header from '../components/Header';
import Footer from '../components/Footer';

// Placeholder data - in production, this would come from a CMS or API
const streamers = [
  {
    id: 1,
    name: 'Streamer Name 1',
    handle: '@streamer1',
    platform: 'YouTube',
    url: 'https://youtube.com/@streamer1',
    thumbnail: '/api/placeholder/400/400',
    blurb: 'Exploring ancient wisdom and modern practice with depth and authenticity.',
    category: 'Occult & Spirituality',
  },
  {
    id: 2,
    name: 'Streamer Name 2',
    handle: '@streamer2',
    platform: 'Twitch',
    url: 'https://twitch.tv/streamer2',
    thumbnail: '/api/placeholder/400/400',
    blurb: 'Deep dives into mythology, symbolism, and transformative teachings.',
    category: 'Mythology & Symbolism',
  },
  {
    id: 3,
    name: 'Streamer Name 3',
    handle: '@streamer3',
    platform: 'YouTube',
    url: 'https://youtube.com/@streamer3',
    thumbnail: '/api/placeholder/400/400',
    blurb: 'Practical magic, ritual work, and ethical spiritual practice.',
    category: 'Practical Magic',
  },
  {
    id: 4,
    name: 'Streamer Name 4',
    handle: '@streamer4',
    platform: 'YouTube',
    url: 'https://youtube.com/@streamer4',
    thumbnail: '/api/placeholder/400/400',
    blurb: 'Shadow work, psychological integration, and personal transformation.',
    category: 'Shadow Work',
  },
];

export default function RecommendedPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Recommended Streamers
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our allies and collaborators—creators we respect and recommend for their authentic approach 
            to occult wisdom and spiritual practice.
          </p>
        </div>

        {/* Streamers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {streamers.map((streamer) => (
            <div
              key={streamer.id}
              className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20"
            >
              <div className="relative aspect-square bg-[var(--bg)]">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-2 border-2 border-gray-500 rounded-full"></div>
                    <p className="text-sm">Streamer Avatar</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                      {streamer.name}
                    </h3>
                    <p className="text-sm text-gray-400">{streamer.handle}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-[var(--accent)]/20 text-[var(--accent)] rounded">
                    {streamer.platform}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{streamer.blurb}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{streamer.category}</span>
                  <a
                    href={streamer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm font-semibold"
                  >
                    Visit →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Curated with Care
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            These recommendations represent creators whose work aligns with our values of ethical practice, 
            authentic teaching, and respectful community building. We only recommend those we've personally 
            engaged with and trust.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Have a recommendation? <a href="/community" className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">Contact us</a> to suggest someone.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

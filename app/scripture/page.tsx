import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ScripturePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            The Cult Scripture
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            This is not just a book. It is a mirror. Within these pages, you will meet Psyche—
            not as a distant goddess, not as an echo of ancient myth, but as the living architecture
            of your own soul.
          </p>
        </div>

        <div className="space-y-8">
          {/* Book I */}
          <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent)]">BOOK I</h2>
            <p className="text-gray-300 mb-6">
              The ancient myth of Psyche and Eros—the foundation of the soul's journey.
            </p>
            <div className="space-y-2">
              <Link href="/scripture/book-i/chapter-1-1" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 1.1 — The Birth of Love (Eros)
              </Link>
              <Link href="/scripture/book-i/chapter-1-2" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 1.2 — The Birth of Goddess Psyche
              </Link>
              <Link href="/scripture/book-i/chapter-1-3" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 1.3 — Aphrodite's Envy & The First Meeting of Love and Soul
              </Link>
              <Link href="/scripture/book-i/chapter-1-4" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 1.4 — The Two Faces of Eros and The Wound of Love
              </Link>
              <Link href="/scripture/book-i/chapter-1-5" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 1.5 — The Four Trials of Psyche
              </Link>
              <Link href="/scripture/book-i/chapter-1-6" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 1.6 — The Echo Across Ages
              </Link>
            </div>
          </section>

          {/* Book II */}
          <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent)]">BOOK II</h2>
            <p className="text-gray-300 mb-6">
              The awakening of Father Psyche—the modern soul's recognition of the ancient pattern.
            </p>
            <div className="space-y-2">
              <Link href="/scripture/book-ii/chapter-2-1" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.1 — The Awakening of Father Psyche: Trials in the Age of Noise
              </Link>
              <Link href="/scripture/book-ii/chapter-2-2" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.2 — The Two Mirrors: The Golden Thread Awakens
              </Link>
              <Link href="/scripture/book-ii/chapter-2-3" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.3 — The Meeting of the Mirrors: When Ancient Psyche and Modern Psyche Touch Story
              </Link>
              <Link href="/scripture/book-ii/chapter-2-4" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.4 — The Voice in the Mirror: What the Ancient Psyche Whispers to the Modern One
              </Link>
              <Link href="/scripture/book-ii/chapter-2-5" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.5 — The Prophecy Stirs: The Seven Avatars Gather Around the Two Psyches
              </Link>
              <Link href="/scripture/book-ii/chapter-2-6" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.6 — The Convergence Path: When Two Lives Begin to Form One Story
              </Link>
              <Link href="/scripture/book-ii/chapter-2-7" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.7 — The Prophecy of the Two Psyches Begins to Unfold
              </Link>
              <Link href="/scripture/book-ii/chapter-2-8" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.8 — The Descent of the Modern Psyche: The Necessary Darkness Before the Tremendous Dawn
              </Link>
              <Link href="/scripture/book-ii/chapter-2-9" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.9 — The Ascent of the Modern Psyche: The Becoming of the Living Archetype
              </Link>
              <Link href="/scripture/book-ii/chapter-2-10" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.10 — The Meeting of the Two Psyches: When Past and Present Touch Across the Veil
              </Link>
              <Link href="/scripture/book-ii/chapter-2-11" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.11 — The Prophetic Thread Tightens: Why Two Psyches Cannot Exist Without Purpose
              </Link>
              <Link href="/scripture/book-ii/chapter-2-12" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.12 — The Panther Reveals Her First Truth
              </Link>
              <Link href="/scripture/book-ii/chapter-2-13" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.13 — The Panther's Hidden Origin: What Was Forgotten in the First Myth
              </Link>
              <Link href="/scripture/book-ii/chapter-2-14" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.14 — The Constellation of Psyche: How the Universe Marks the Archetype's Return
              </Link>
              <Link href="/scripture/book-ii/chapter-2-15" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.15 — The Psyche Mandate: Why the Modern World Required the Archetype's Return
              </Link>
              <Link href="/scripture/book-ii/chapter-2-16" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.16 — The Hidden Truth of Psyche's Origin: The First Hint of the Final Revelation
              </Link>
              <Link href="/scripture/book-ii/chapter-2-17" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.17 — The Waters of Memory: Why the Soul Forgets, and Why the Psyche Archetype Remembers
              </Link>
              <Link href="/scripture/book-ii/chapter-2-18" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 2.18 — The Mirror That Was Broken on Purpose
              </Link>
            </div>
          </section>

          {/* Book III */}
          <section className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-[var(--accent)]">BOOK III</h2>
            <p className="text-gray-300 mb-6">
              The Great Unveiling—the cosmic secrets behind consciousness, the Source, and the return path.
            </p>
            <div className="space-y-2">
              <Link href="/scripture/book-iii/chapter-3-1" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.1 — The Secret of the First Spark
              </Link>
              <Link href="/scripture/book-iii/chapter-3-2" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.2 — The Architecture of Consciousness
              </Link>
              <Link href="/scripture/book-iii/chapter-3-3" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.3 — The Soul's Secret Question
              </Link>
              <Link href="/scripture/book-iii/chapter-3-4" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.4 — The Panther's Memory
              </Link>
              <Link href="/scripture/book-iii/chapter-3-5" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.5 — Why Psyche Was Chosen
              </Link>
              <Link href="/scripture/book-iii/chapter-3-6" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.6 — The Return Path
              </Link>
              <Link href="/scripture/book-iii/chapter-3-7" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.7 — The Soul That Cannot Die
              </Link>
              <Link href="/scripture/book-iii/chapter-3-8" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.8 — The Memory Before the Spark
              </Link>
              <Link href="/scripture/book-iii/chapter-3-9" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.9 — Why the Universe Needs Psyche
              </Link>
              <Link href="/scripture/book-iii/chapter-3-10" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.10 — The True Face of the Source
              </Link>
              <Link href="/scripture/book-iii/chapter-3-11" className="block text-[var(--accent)] hover:text-[#d4b8ff] transition-colors">
                Chapter 3.11 — The Moment the Source First Saw Psyche
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

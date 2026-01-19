import Link from 'next/link';

interface ChapterNavProps {
  book: 'i' | 'ii' | 'iii';
  currentChapter: string;
  prevChapter?: { href: string; title: string };
  nextChapter?: { href: string; title: string };
}

export default function ChapterNav({ book, currentChapter, prevChapter, nextChapter }: ChapterNavProps) {
  return (
    <nav className="flex justify-between items-center py-8 border-t border-b border-[var(--border)] my-8">
      <div className="flex-1">
        {prevChapter ? (
          <Link 
            href={prevChapter.href}
            className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
          >
            ← {prevChapter.title}
          </Link>
        ) : (
          <Link 
            href="/scripture"
            className="text-gray-500 hover:text-gray-400 transition-colors"
          >
            ← Table of Contents
          </Link>
        )}
      </div>
      
      <div className="flex-1 text-center">
        <Link 
          href="/scripture"
          className="text-gray-400 hover:text-[var(--accent)] transition-colors text-sm"
        >
          BOOK {book.toUpperCase()}
        </Link>
      </div>
      
      <div className="flex-1 text-right">
        {nextChapter ? (
          <Link 
            href={nextChapter.href}
            className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
          >
            {nextChapter.title} →
          </Link>
        ) : (
          <span className="text-gray-500">End of Book</span>
        )}
      </div>
    </nav>
  );
}

#!/usr/bin/env python3
"""
Script to generate all scripture chapter pages from the manuscript.
This will create the remaining chapters efficiently.
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
SCRIPTURE_DIR = BASE_DIR / "app" / "scripture"

def format_poetry_text(text):
    """Format poetry-style text with line breaks preserved."""
    lines = text.strip().split('\n')
    formatted = []
    for line in lines:
        line = line.strip()
        if line:
            formatted.append(f"            <p>{line}</p>")
        else:
            formatted.append("            <p><br/></p>")
    return '\n'.join(formatted)

def create_chapter_page(book_num, chapter_num, title, subtitle, content, prev_chapter=None, next_chapter=None):
    """Create a chapter page file."""
    book_dir = SCRIPTURE_DIR / f"book-{book_num}" / f"chapter-{chapter_num}"
    book_dir.mkdir(parents=True, exist_ok=True)
    
    prev_nav = ""
    if prev_chapter:
        prev_nav = f'''prevChapter={{
            href: "{prev_chapter['href']}",
            title: "{prev_chapter['title']}"
          }}'''
    
    next_nav = ""
    if next_chapter:
        next_nav = f'''nextChapter={{
            href: "{next_chapter['href']}",
            title: "{next_chapter['title']}"
          }}'''
    
    nav_props = ", ".join(filter(None, [prev_nav, next_nav]))
    
    page_content = f'''import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ChapterNav from '../../../components/ChapterNav';

export default function Chapter{chapter_num.replace('-', '')}() {{
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            BOOK {book_num.upper()} — CHAPTER {chapter_num.replace('-', '.')}
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-gray-200">
            {title}
          </h2>
          {f'<p className="text-gray-400 italic">{subtitle}</p>' if subtitle else ''}
        </div>

        <article className="prose prose-invert max-w-none">
          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
{content}
          </div>
        </article>

        <ChapterNav 
          book="{book_num[-1]}"
          currentChapter="{chapter_num.replace('-', '.')}"
          {nav_props}
        />
      </main>
      <Footer />
    </div>
  );
}}
'''
    
    page_file = book_dir / "page.tsx"
    page_file.write_text(page_content, encoding='utf-8')
    print(f"Created: {page_file}")

if __name__ == "__main__":
    print("Chapter generator ready. Run with chapter data.")

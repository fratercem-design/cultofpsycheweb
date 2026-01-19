'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface Drop {
  id: string;
  title: string;
  date: string;
  summary: string;
  videoEmbed: string;
  downloadUrl: string;
  tags: string[];
  contentType: 'video' | 'audio' | 'post' | 'download';
  previewUrl?: string; // For teaser previews
}

interface FeedPost {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'update' | 'behind-scenes' | 'quick-tip';
}

export default function VaultPage() {
  const [isMember, setIsMember] = useState(false);
  const [memberType, setMemberType] = useState<'monthly' | 'lifetime' | null>(null);
  const [isFounding, setIsFounding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'weekly' | 'archive' | 'extras' | 'feed'>('weekly');
  
  // In production, this would come from your database/API
  const [weeklyDrop] = useState<Drop | null>({
    id: '1',
    title: 'Weekly Drop: Sacred Symbols Deep Dive',
    date: new Date().toISOString().split('T')[0],
    summary: 'This week we explore the deeper meanings behind sacred symbols and how to incorporate them into your practice.',
    videoEmbed: 'https://youtube.com/watch?v=...',
    downloadUrl: 'https://...',
    tags: ['symbolism', 'ritual', 'practice'],
    contentType: 'video',
  });

  const [archiveDrops] = useState<Drop[]>([]);
  const [extras] = useState<Drop[]>([]);
  const [feedPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    // In production, check if user has active membership via API
    const checkMembership = async () => {
      try {
        // This would call your API to check membership status
        // const response = await fetch('/api/membership/check');
        // const data = await response.json();
        // setIsMember(data.isMember);
        // setMemberType(data.type); // 'monthly' or 'lifetime'
        // setIsFounding(data.isFounding);
        
        // Demo: set to false by default
        setIsMember(false);
        setMemberType(null);
        setIsFounding(false);
      } catch (error) {
        console.error('Error checking membership:', error);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
              The Vault
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Exclusive weekly drops, archive access, and members-only content.
            </p>
          </div>

          {/* Teaser Preview */}
          {weeklyDrop && weeklyDrop.previewUrl && (
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold mb-4">This Week's Drop Preview</h2>
              <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-400">15-30 second preview video</p>
              </div>
              <p className="text-gray-300 mb-4">{weeklyDrop.summary}</p>
            </div>
          )}

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Unlock The Vault</h2>
            <p className="text-gray-300 mb-6">
              Choose your access level to unlock weekly drops, full archive, extras, and members-only feed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support"
                className="px-8 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
              >
                $10/month
              </Link>
              <Link
                href="/support"
                className="px-8 py-3 border-2 border-[var(--accent)] hover:bg-[var(--accent)]/10 text-[var(--fg)] font-semibold rounded-lg transition-colors"
              >
                $100 Lifetime
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                The Vault
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm font-semibold">
                  {memberType === 'lifetime' ? 'Lifetime Member' : 'Monthly Member'}
                </span>
                {isFounding && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                    ✨ Founding Member
                  </span>
                )}
              </div>
            </div>
            <form action="/api/stripe/create-portal-session" method="POST">
              <button
                type="submit"
                className="px-4 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors text-sm"
              >
                Manage Membership
              </button>
            </form>
          </div>
          <p className="text-lg text-gray-300">
            Your exclusive weekly drops, archive, extras, and members-only feed.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--border)] mb-8">
          <nav className="flex gap-4">
            {[
              { id: 'weekly', label: 'Weekly Drop' },
              { id: 'archive', label: 'Archive' },
              { id: 'extras', label: 'Extras' },
              { id: 'feed', label: 'Members Feed' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent text-gray-400 hover:text-[var(--fg)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Weekly Drop */}
        {activeTab === 'weekly' && (
          <div>
            {weeklyDrop ? (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm">
                      This Week
                    </span>
                    <span className="text-sm text-gray-400">{weeklyDrop.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{weeklyDrop.title}</h2>
                  <p className="text-gray-300 text-lg mb-6">{weeklyDrop.summary}</p>
                </div>

                {weeklyDrop.videoEmbed && (
                  <div className="aspect-video bg-black rounded-lg mb-6 overflow-hidden">
                    <iframe
                      src={weeklyDrop.videoEmbed}
                      className="w-full h-full"
                      allow="encrypted-media"
                      allowFullScreen
                      title={weeklyDrop.title}
                    />
                  </div>
                )}

                {weeklyDrop.downloadUrl && (
                  <a
                    href={weeklyDrop.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors mb-4"
                  >
                    Download Resource
                  </a>
                )}

                <div className="flex flex-wrap gap-2 mt-6">
                  {weeklyDrop.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-full text-sm text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">No drop available yet.</p>
                <p className="text-sm text-gray-500">
                  New exclusive content drops will appear here weekly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Archive */}
        {activeTab === 'archive' && (
          <div>
            {archiveDrops.length === 0 ? (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">Archive is empty.</p>
                <p className="text-sm text-gray-500">
                  Past weekly drops will appear here as they're archived.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archiveDrops.map((drop) => (
                  <div
                    key={drop.id}
                    className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2">{drop.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{drop.date}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{drop.summary}</p>
                    <div className="flex gap-2">
                      {drop.videoEmbed && (
                        <a
                          href={drop.videoEmbed}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
                        >
                          Watch →
                        </a>
                      )}
                      {drop.downloadUrl && (
                        <a
                          href={drop.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
                        >
                          Download →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Extras */}
        {activeTab === 'extras' && (
          <div>
            {extras.length === 0 ? (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">No extras available yet.</p>
                <p className="text-sm text-gray-500">
                  Bonus posts, downloads, unlisted videos, and behind-the-scenes content will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6"
                  >
                    <h3 className="text-xl font-bold mb-2">{extra.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{extra.summary}</p>
                    {/* Content based on type */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Members Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {feedPosts.length === 0 ? (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">No feed posts yet.</p>
                <p className="text-sm text-gray-500">
                  Short posts, updates, and behind-the-scenes content will appear here between weekly drops.
                </p>
              </div>
            ) : (
              feedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded text-xs">
                      {post.type}
                    </span>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-300">{post.content}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Etsy Coupon for Members */}
        <div className="mt-12 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Member Perk: 10% Off Etsy Shop</h3>
          <p className="text-gray-300 text-sm mb-4">
            Use code <span className="font-mono bg-[var(--bg)] px-2 py-1 rounded">VAULT10</span> at checkout for 10% off all items.
          </p>
          <a
            href="https://www.etsy.com/shop/psycheawakens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm font-semibold"
          >
            Visit Etsy Shop →
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

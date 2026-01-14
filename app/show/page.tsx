'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  duration: string;
  videoUrl: string;
}

interface Channel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

interface YouTubeData {
  channel: Channel;
  videos: Video[];
}

function formatNumber(num: string): string {
  const number = parseInt(num);
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}

function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  
  const hours = match[1] || '0';
  const minutes = match[2] || '0';
  const seconds = match[3] || '0';
  
  const parts = [];
  if (hours !== '0') parts.push(hours.padStart(2, '0'));
  parts.push(minutes.padStart(2, '0'));
  parts.push(seconds.padStart(2, '0'));
  
  return parts.join(':');
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default function ShowPage() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/youtube');
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch YouTube data';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <div className="text-lg text-[var(--fg)]">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Header />
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[var(--fg)] mb-2">
              Error loading content
            </h1>
            <p className="text-gray-400">
              {error || 'Failed to load YouTube data'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { channel, videos } = data;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      
      {/* Channel Header */}
      <section className="bg-[var(--card-bg)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--border)]">
              <Image
                src={channel.thumbnail}
                alt={channel.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
                {channel.title}
              </h1>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-400 mb-4">
                <span>{formatNumber(channel.subscriberCount)} subscribers</span>
                <span>•</span>
                <span>{formatNumber(channel.videoCount)} videos</span>
                <span>•</span>
                <span>{formatNumber(channel.viewCount)} views</span>
              </div>
              {channel.description && (
                <p className="text-[var(--fg)] opacity-90 line-clamp-3 max-w-2xl">
                  {channel.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Latest Episodes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[var(--card-bg)] rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20"
            >
              <div className="relative aspect-video bg-[var(--bg)]">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{formatNumber(video.viewCount)} views</span>
                  <span>•</span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

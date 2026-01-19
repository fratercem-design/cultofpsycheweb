'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiveBanner from '../components/LiveBanner';
import EmailCapture from '../components/EmailCapture';

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

interface LiveStatus {
  isLive: boolean;
  liveVideoId: string | null;
  title?: string;
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
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({ isLive: false, liveVideoId: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let controller: AbortController | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    
    async function fetchData() {
      try {
        // Fetch channel and videos with timeout
        controller = new AbortController();
        timeoutId = setTimeout(() => controller?.abort(), 10000); // 10 second timeout
        
        const response = await fetch('/api/youtube', { signal: controller.signal });
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to fetch YouTube data (${response.status})`);
        }
        const result = await response.json();
        
        if (!isMounted) return;
        
        // Check if result has error
        if (result.error) {
          throw new Error(result.error);
        }
        
        setData(result);

        // Check for live stream
        const liveResponse = await fetch('/api/youtube/live');
        if (liveResponse.ok) {
          const liveData = await liveResponse.json();
          if (isMounted) {
            setLiveStatus(liveData);
          }
        }
      } catch (err) {
        if (!isMounted) return;
        
        let errorMessage = 'Failed to fetch YouTube data';
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = 'Request timed out. Please check your internet connection and try again.';
          } else {
            errorMessage = err.message;
          }
        }
        console.error('Error fetching YouTube data:', err);
        setError(errorMessage);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchData();

    // Check for live status every 60 seconds (reduced from 30s to save API quota)
    const liveInterval = setInterval(async () => {
      if (!isMounted) return;
      try {
        const liveResponse = await fetch('/api/youtube/live');
        if (liveResponse.ok) {
          const liveData = await liveResponse.json();
          if (isMounted) {
            setLiveStatus(liveData);
          }
        }
      } catch (err) {
        console.error('Error checking live status:', err);
      }
    }, 60000); // 60 seconds instead of 30 to reduce API quota usage
    
    return () => {
      isMounted = false;
      clearInterval(liveInterval);
      // Abort ongoing fetch request if component unmounts
      if (controller) {
        controller.abort();
      }
      // Clear timeout if still pending
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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
          <div className="text-center max-w-2xl px-4">
            <h1 className="text-2xl font-semibold text-[var(--fg)] mb-4">
              Error loading content
            </h1>
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 mb-4">
              <p className="text-gray-400 mb-2">
                {error || 'Failed to load YouTube data'}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                This usually means the YouTube API key is not configured in Vercel.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please add <code className="bg-[var(--bg)] px-2 py-1 rounded">YOUTUBE_API_KEY</code> to your Vercel environment variables.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { channel, videos } = data;
  const videoIds = videos.map(v => v.id);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      
      {/* Live Banner */}
      {liveStatus.isLive && <LiveBanner />}

      {/* Video Player Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            {liveStatus.isLive && liveStatus.liveVideoId ? (
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${liveStatus.liveVideoId}?autoplay=1&cc_load_policy=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="Live Stream"
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoIds[0] || ''}?autoplay=1&playlist=${videoIds.slice(0, 20).join(',')}&loop=1&playnext=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Video Player"
                />
              </div>
            )}
          </div>

          {/* Live Chat / Email Capture */}
          <div className="space-y-6">
            {liveStatus.isLive && liveStatus.liveVideoId ? (
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden">
                <div className="p-3 bg-red-600 text-white font-semibold text-center">
                  🔴 LIVE NOW
                </div>
                <div className="p-4 text-sm text-gray-400">
                  <p>Watch the live stream above. The chat appears on YouTube when enabled.</p>
                  <p className="mt-2">Click the video to open in YouTube for full chat experience.</p>
                </div>
              </div>
            ) : (
              <EmailCapture />
            )}
          </div>
        </div>
      </section>

      {/* Channel Header */}
      <section className="bg-[var(--card-bg)] border-t border-b border-[var(--border)]">
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

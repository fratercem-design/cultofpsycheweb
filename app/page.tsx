'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import EmailCapture from './components/EmailCapture';
import LiveBanner from './components/LiveBanner';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

interface LiveStatus {
  isLive: boolean;
  liveVideoId: string | null;
  title?: string;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({ isLive: false, liveVideoId: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch YouTube videos
        const response = await fetch('/api/youtube');
        if (response.ok) {
          const data = await response.json();
          if (data.videos) {
            setVideos(data.videos.slice(0, 6)); // Get first 6 for featured clips
          }
        }

        // Check live status
        const liveResponse = await fetch('/api/youtube/live');
        if (liveResponse.ok) {
          const liveData = await liveResponse.json();
          setLiveStatus(liveData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Check for live status every 60 seconds
    const liveInterval = setInterval(async () => {
      try {
        const liveResponse = await fetch('/api/youtube/live');
        if (liveResponse.ok) {
          const liveData = await liveResponse.json();
          setLiveStatus(liveData);
        }
      } catch (error) {
        console.error('Error checking live status:', error);
      }
    }, 60000);

    return () => clearInterval(liveInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      
      {/* Live Banner */}
      {liveStatus.isLive && <LiveBanner />}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Cult of Psyche
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Occult wisdom and transformative teachings for the modern seeker
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="#alerts" 
            className="px-8 py-4 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Get Alerts
          </Link>
          <a 
            href="https://youtube.com/@cultofpsyche" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg)] font-semibold rounded-lg transition-colors text-lg"
          >
            Watch on YouTube
          </a>
        </div>
      </section>

      {/* Live Status Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {liveStatus.isLive && liveStatus.liveVideoId ? (
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden">
            <div className="p-4 bg-red-600 text-white font-bold text-center text-lg">
              🔴 LIVE NOW
            </div>
            <div className="w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${liveStatus.liveVideoId}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Live Stream"
              />
            </div>
          </div>
        ) : (
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
              Latest Upload
            </h2>
            {!loading && videos.length > 0 ? (
              <div className="w-full max-w-4xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videos[0].id}?autoplay=0`}
                  className="w-full h-full"
                  allow="encrypted-media"
                  allowFullScreen
                  title={videos[0].title}
                />
              </div>
            ) : (
              <p className="text-gray-400">
                {loading ? 'Loading...' : 'Check back soon for new content.'}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Email Signup Card */}
      <section id="alerts" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmailCapture />
      </section>

      {/* Featured Clips Grid */}
      {videos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Featured Clips
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-video bg-[var(--card-bg)] rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Social Links Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://youtube.com/@cultofpsyche"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[var(--accent)] transition-colors text-lg font-semibold"
          >
            YouTube
          </a>
          <a
            href="https://x.com/psycheawakens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[var(--accent)] transition-colors text-lg font-semibold"
          >
            X (Twitter)
          </a>
          <a
            href="https://instagram.com/psycheawakens"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[var(--accent)] transition-colors text-lg font-semibold"
          >
            Instagram
          </a>
          <a
            href="https://tiktok.com/@cultofpsyche"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[var(--accent)] transition-colors text-lg font-semibold"
          >
            TikTok
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

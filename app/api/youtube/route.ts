import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_NAME = 'cultofpsyche';

interface PlaylistItem {
  contentDetails: {
    videoId: string;
  };
  snippet: {
    title: string;
  };
}

interface VideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured' },
      { status: 500 }
    );
  }

  try {
    // First, get the channel ID from the channel name
    const channelSearchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${CHANNEL_NAME}&type=channel&part=snippet&maxResults=1`;
    
    const channelResponse = await fetch(channelSearchUrl);
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel');
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    const channelId = channelData.items[0].snippet.channelId;

    // Get channel details
    const channelDetailsUrl = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=snippet,statistics,contentDetails`;
    const channelDetailsResponse = await fetch(channelDetailsUrl);
    const channelDetails = await channelDetailsResponse.json();

    // Get the uploads playlist ID
    const uploadsPlaylistId = channelDetails.items[0].contentDetails.relatedPlaylists.uploads;

    // Get videos from the uploads playlist
    const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=50&order=date`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    // Get detailed video information
    const videoIds = (videosData.items as PlaylistItem[]).map((item) => item.contentDetails.videoId).join(',');
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`;
    const videoDetailsResponse = await fetch(videoDetailsUrl);
    const videoDetails = await videoDetailsResponse.json();

    return NextResponse.json({
      channel: {
        id: channelId,
        title: channelDetails.items[0].snippet.title,
        description: channelDetails.items[0].snippet.description,
        thumbnail: channelDetails.items[0].snippet.thumbnails.high.url,
        subscriberCount: channelDetails.items[0].statistics.subscriberCount,
        videoCount: channelDetails.items[0].statistics.videoCount,
        viewCount: channelDetails.items[0].statistics.viewCount,
      },
      videos: (videoDetails.items as VideoItem[]).map((video) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high.url,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        duration: video.contentDetails.duration,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
      })),
    });
  } catch (error) {
    console.error('YouTube API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch YouTube data';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

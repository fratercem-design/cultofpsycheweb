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
      const errorData = await channelResponse.json();
      return NextResponse.json(
        { error: `YouTube API error: ${JSON.stringify(errorData)}` },
        { status: channelResponse.status }
      );
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    // Get channel ID from search results - when type=channel, ID is in id.channelId
    const searchResult = channelData.items[0] as { id?: { channelId?: string }; snippet?: { channelId?: string } };
    const channelId = searchResult.id?.channelId || searchResult.snippet?.channelId;
    
    if (!channelId) {
      return NextResponse.json(
        { error: 'Could not extract channel ID from search results', debug: JSON.stringify(searchResult) },
        { status: 500 }
      );
    }

    // Get channel details
    const channelDetailsUrl = `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=snippet,statistics,contentDetails`;
    const channelDetailsResponse = await fetch(channelDetailsUrl);
    if (!channelDetailsResponse.ok) {
      const errorData = await channelDetailsResponse.json();
      throw new Error(`YouTube API error: ${JSON.stringify(errorData)}`);
    }
    const channelDetails = await channelDetailsResponse.json();

    if (!channelDetails.items || channelDetails.items.length === 0) {
      return NextResponse.json(
        { error: 'Channel details not found' },
        { status: 404 }
      );
    }

    // Get the uploads playlist ID
    const uploadsPlaylistId = channelDetails.items[0].contentDetails.relatedPlaylists.uploads;

    // Get videos from the uploads playlist
    const videosUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=50&order=date`;
    const videosResponse = await fetch(videosUrl);
    if (!videosResponse.ok) {
      const errorData = await videosResponse.json();
      throw new Error(`YouTube API error: ${JSON.stringify(errorData)}`);
    }
    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
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
        videos: [],
      });
    }

    // Get detailed video information
    const videoIds = (videosData.items as PlaylistItem[]).map((item) => item.contentDetails.videoId).join(',');
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`;
    const videoDetailsResponse = await fetch(videoDetailsUrl);
    if (!videoDetailsResponse.ok) {
      const errorData = await videoDetailsResponse.json();
      throw new Error(`YouTube API error: ${JSON.stringify(errorData)}`);
    }
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

import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_NAME = 'cultofpsyche';

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured' },
      { status: 500 }
    );
  }

  try {
    // First, get the channel ID
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
      return NextResponse.json({ isLive: false, liveVideoId: null });
    }

    const searchResult = channelData.items[0] as { id?: { channelId?: string }; snippet?: { channelId?: string } };
    const channelId = searchResult.id?.channelId || searchResult.snippet?.channelId;
    
    if (!channelId) {
      return NextResponse.json({ isLive: false, liveVideoId: null });
    }

    // Check for live broadcasts
    const searchLiveUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&eventType=live&type=video&part=snippet&maxResults=1`;
    const liveResponse = await fetch(searchLiveUrl);
    
    if (!liveResponse.ok) {
      return NextResponse.json({ isLive: false, liveVideoId: null });
    }
    
    const liveData = await liveResponse.json();
    
    if (liveData.items && liveData.items.length > 0) {
      const liveVideoId = liveData.items[0].id?.videoId || liveData.items[0].id;
      return NextResponse.json({
        isLive: true,
        liveVideoId: liveVideoId,
        title: liveData.items[0].snippet?.title || 'Live Now',
      });
    }

    return NextResponse.json({ isLive: false, liveVideoId: null });
  } catch (error) {
    console.error('Live stream check error:', error);
    return NextResponse.json({ isLive: false, liveVideoId: null });
  }
}

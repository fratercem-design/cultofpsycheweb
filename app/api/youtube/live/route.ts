import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_NAME = 'cultofpsyche';

// Cache channel ID to avoid repeated searches (saves 100 units per check)
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UC_cultofpsyche';

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Use cached channel ID to avoid expensive search API calls
    let channelId = CHANNEL_ID;
    
    // Only search if channel ID is not set (costs 100 units - avoid if possible)
    if (!channelId || channelId === 'UC_cultofpsyche' || channelId.startsWith('UC_')) {
      const channelSearchUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${CHANNEL_NAME}&type=channel&part=snippet&maxResults=1`;
      
      const channelResponse = await fetch(channelSearchUrl);
      if (!channelResponse.ok) {
        // Don't throw error for live check - just return not live
        return NextResponse.json({ isLive: false, liveVideoId: null });
      }
      
      const channelData = await channelResponse.json();
      
      if (!channelData.items || channelData.items.length === 0) {
        return NextResponse.json({ isLive: false, liveVideoId: null });
      }

      const searchResult = channelData.items[0] as { id?: { channelId?: string }; snippet?: { channelId?: string } };
      const foundChannelId = searchResult.id?.channelId || searchResult.snippet?.channelId;
      
      if (!foundChannelId) {
        return NextResponse.json({ isLive: false, liveVideoId: null });
      }
      channelId = foundChannelId;
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

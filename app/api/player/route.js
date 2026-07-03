/**
 * CoC API Backend Proxy
 * 
 * This API route acts as a secure proxy between the frontend and the
 * Clash of Clans API. It solves two critical issues:
 * 
 * 1. CORS: The CoC API does not support CORS, so browser-side requests
 *    would be blocked. This server-side route has no such restriction.
 * 
 * 2. Token Security: The API token is sent per-request from the client
 *    but never stored server-side. The server's IP must be whitelisted
 *    on the CoC Developer Portal.
 */

const COC_API_BASE = 'https://api.clashofclans.com/v1';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const token = searchParams.get('token');

  // --- Validation ---
  if (!tag) {
    return Response.json(
      { error: 'Missing player tag. Provide ?tag=YOUR_TAG' },
      { status: 400 }
    );
  }

  if (!token) {
    return Response.json(
      { error: 'Missing API token. Provide ?token=YOUR_TOKEN' },
      { status: 400 }
    );
  }

  // Encode the player tag: ensure # is replaced with %23
  // Users may pass the tag with or without the leading #
  let encodedTag = tag.startsWith('#') ? tag : `#${tag}`;
  encodedTag = encodeURIComponent(encodedTag);

  const url = `${COC_API_BASE}/players/${encodedTag}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      // Don't cache — always fetch fresh data
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      // Map common CoC API errors to friendly messages
      const errorMessages = {
        400: 'Invalid player tag format. Tags look like #ABC123.',
        403: 'Access denied. Your API token may be invalid, or this server\'s IP is not whitelisted on the CoC Developer Portal.',
        404: 'Player not found. Double-check the tag and try again.',
        429: 'Rate limited by the CoC API. Please wait a moment and try again.',
        503: 'The CoC API is temporarily unavailable. Try again later.',
      };

      return Response.json(
        {
          error: errorMessages[response.status] || `CoC API error (${response.status})`,
          detail: data?.message || data?.reason || null,
        },
        { status: response.status }
      );
    }

    // Return the full player data to the frontend
    return Response.json(data);

  } catch (err) {
    console.error('CoC API proxy error:', err);
    return Response.json(
      { error: 'Failed to connect to the Clash of Clans API. Check your network connection.' },
      { status: 502 }
    );
  }
}

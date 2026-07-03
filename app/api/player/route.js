import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

/**
 * CoC API Backend Proxy with Static IP Routing
 * 
 * This API route acts as a secure proxy between the frontend and the
 * Clash of Clans API. It solves three critical issues:
 * 
 * 1. CORS: The CoC API does not support CORS.
 * 2. Token Security: The API token is never exposed to the browser.
 * 3. IP Whitelisting (Vercel): Routes requests through a static proxy (Fixie/QuotaGuard) 
 *    so the CoC API sees a single whitelisted IP instead of dynamic Vercel IPs.
 */

const COC_API_BASE = 'https://api.clashofclans.com/v1';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  const token = searchParams.get('token');

  // --- Validation ---
  if (!tag) {
    return Response.json({ error: 'Missing player tag. Provide ?tag=YOUR_TAG' }, { status: 400 });
  }

  if (!token) {
    return Response.json({ error: 'Missing API token. Provide ?token=YOUR_TOKEN' }, { status: 400 });
  }

  // Encode the player tag: ensure # is replaced with %23
  let encodedTag = tag.startsWith('#') ? tag : `#${tag}`;
  encodedTag = encodeURIComponent(encodedTag);

  const url = `${COC_API_BASE}/players/${encodedTag}`;

  try {
    // 1. Check for the Proxy URL in Vercel Environment Variables
    const proxyUrl = process.env.FIXIE_URL || process.env.QUOTAGUARDSTATIC_URL;
    
    // 2. Set up Axios config
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    };

    // 3. Attach the proxy agent if the environment variable exists
    if (proxyUrl) {
      axiosConfig.httpsAgent = new HttpsProxyAgent(proxyUrl);
    }

    // 4. Make the request using Axios
    const response = await axios.get(url, axiosConfig);
    
    // Return the full player data to the frontend
    return Response.json(response.data);

  } catch (err) {
    console.error('CoC API proxy error:', err.message);
    
    // Handle specific Axios error responses from the CoC API
    if (err.response) {
      const status = err.response.status;
      const data = err.response.data;
      
      const errorMessages = {
        400: 'Invalid player tag format. Tags look like #ABC123.',
        403: 'Access denied. Your API token may be invalid, or this server\'s static IP is not whitelisted on the CoC Developer Portal.',
        404: 'Player not found. Double-check the tag and try again.',
        429: 'Rate limited by the CoC API. Please wait a moment and try again.',
        503: 'The CoC API is temporarily unavailable. Try again later.',
      };

      return Response.json(
        {
          error: errorMessages[status] || `CoC API error (${status})`,
          detail: data?.message || data?.reason || null,
        },
        { status: status }
      );
    }

    // Handle generic connection failures (e.g., bad proxy URL, network down)
    return Response.json(
      { error: 'Failed to connect to the Clash of Clans API through the proxy. Check your network connection.' },
      { status: 502 }
    );
  }
}

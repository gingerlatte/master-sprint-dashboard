export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  const { sub } = req.query;
  if (!sub) return res.status(400).json({ error: 'Missing subreddit' });

  try {
    const response = await fetch(
      `https://www.reddit.com/r/${sub}/new.json?limit=25`,
      { 
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        } 
      }
    );
    if (!response.ok) {
      return res.status(response.status).json({ error: `Reddit returned ${response.status}` });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

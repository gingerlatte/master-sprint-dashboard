export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { sub } = req.query;
  if (!sub) return res.status(400).json({ error: 'Missing subreddit' });
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${sub}/new/.rss?limit=25`,
      { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/rss+xml' } }
    );
    const text = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

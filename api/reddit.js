export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { sub } = req.query;
  if (!sub) return res.status(400).json({ error: 'Missing subreddit' });
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${sub}/new.json?limit=25`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NP-Dashboard/1.0)' } }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

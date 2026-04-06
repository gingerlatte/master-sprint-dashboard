export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { sub } = req.query;
  if (!sub) return res.status(400).json({ error: 'Missing subreddit' });

  try {
    const response = await fetch(
      `https://api.scrapecreators.com/v1/reddit/subreddit?subreddit=${sub}`,
      {
        headers: {
          'x-api-key': process.env.SCRAPECREATORS_API_KEY,
        },
      }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

import googleNewsScraper from "google-news-scraper";

const fetching = async (query) => {}

export const trends = {
  getTrend: async function (req, res) {
    try {
      const articles = await googleNewsScraper({
        searchTerm: req.query.keyword,
        prettyURLs: true,
        timeframe: "1d",
        puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      return res.status(200).json(articles);
    } catch (err) {
      console.log(err.message);
    }
  },
  getTrends: async function (req, res) {
    try {
      const articles = await googleNewsScraper({
        searchTerm: req.query.keyword,
        prettyURLs: true,
        queryVars: {
            hl:"en-US",
            gl:"US",
            ceid:"US:en"
          },
        timeframe: "5d",
        puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      return res.status(200).json(articles);
    } catch (err) {
      console.log(err.message);
    }
  },
};


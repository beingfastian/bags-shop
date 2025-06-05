// next-sitemap.config.ts
const config = {
  siteUrl: 'https://maaozofficialstore.shop', // Replace with your site's URL
  generateRobotsTxt: true, // Optional: Generate robots.txt file
  sitemapSize: 7000, // Optional: Number of URLs per sitemap file
  changefreq: 'weekly', // Optional: How often the page content is likely to change
  priority: 0.7, // Optional: Default priority for URLs
  exclude: ['/404', '/hidden'], // Optional: Exclude specific paths
  //   additionalPaths: async (config: any) => {
  //     // Optionally add dynamic routes here, like product pages, blog posts, etc.
  //     // return ['/custom-path', '/another-path'];
  //   },
};

module.exports= config;

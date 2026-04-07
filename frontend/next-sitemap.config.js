/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://appeallettergenerator.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/icon.png"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/_next/"] },
    ],
  },
  transform: async (config, path) => {
    // Higher priority for main pages
    const highPriority = ["/", "/generate", "/blog"];
    const medPriority =
      path.startsWith("/appeal/") ||
      path.startsWith("/state/") ||
      path.startsWith("/reason/");

    return {
      loc: path,
      changefreq: highPriority.includes(path)
        ? "daily"
        : medPriority
          ? "weekly"
          : "monthly",
      priority: highPriority.includes(path) ? 1.0 : medPriority ? 0.8 : 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};

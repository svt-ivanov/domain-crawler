const url = require('url');
const chalk = require('chalk');

const getPageLinks = require('../services/getPageLinks');
const {
  diff,
  isValidUrl,
  writeToFile,
} = require('../utils/helpers');

const crawledLinks = [];
const internalLinks = [];

async function crawl(link, hostname) {
  try {
    const pageItems = await getPageLinks(link);
    console.log(
      chalk.yellow.bgBlue(`\nCrawled: ${chalk.underline.bold(link)}`)
    );

    if (pageItems.url) {
      crawledLinks.push(pageItems.url);

      pageItems.links.forEach((item) => {
        const parsedUrl = url.parse(item.linkUrl);
        if (isValidUrl(item.linkUrl) && parsedUrl.hostname === hostname) {
          internalLinks.push(item.linkUrl);
        }
      });

      const nextLink = diff(internalLinks, crawledLinks);
      if (nextLink.length > 0) {
        crawl(nextLink[0], hostname);
      } else {
        writeToFile('crawled_links.json', JSON.stringify(crawledLinks, null, 2));
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = crawl;

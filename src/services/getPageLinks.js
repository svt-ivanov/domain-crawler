const axios = require('axios');
const cheerio = require('cheerio');

const { isValidUrl } = require('../utils/helpers');
const { handleLinkError } = require('../utils/errorHandlers');

async function getPageLinks(url) {
  const pageItems = { url, links: [] };

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('a').each((index, elem) => {
      const { href } = elem.attribs;
      if (isValidUrl(href)) {
        pageItems.links.push({ linkUrl: href });
      }
    });
  } catch (error) {
    handleLinkError(error, url);
  }

  return pageItems;
}

module.exports = getPageLinks;

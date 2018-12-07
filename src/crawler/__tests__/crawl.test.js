const crawl = require('../crawl');
const helpers = require('../../utils/helpers');
const getPageLinks = require('../../services/getPageLinks');

jest.mock('../../services/getPageLinks', () => jest.fn());
jest.mock('../../utils/helpers', () => {
  const original = require.requireActual('../../utils/helpers');

  return Object.assign({}, original, { writeToFile: jest.fn() });
});

describe('crawl', () => {
  const url = 'http://crawlerproject.com';
  const hostname = 'crawlerproject.com';

  it('should call "writeToFile" with all of crawled links', async () => {
    const filename = 'crawled_links.json';
    const crawledLinks = [url, 'http://crawlerproject.com/home/'];
    const crawledLinksJSON = JSON.stringify(crawledLinks, null, 2);

    getPageLinks
      .mockImplementationOnce(() => ({
        url,
        links: [{ linkUrl: 'http://crawlerproject.com/home/' }],
      }))
      .mockImplementationOnce(() => ({
        url: 'http://crawlerproject.com/home/',
        links: [],
      }));

    await crawl(url, hostname);

    expect(helpers.writeToFile)
      .toHaveBeenCalledWith(filename, crawledLinksJSON);

    getPageLinks.mockRestore();
  });

  it('should catch error if it is been thrown', async () => {
    const errorThrown = new Error('Some error occured');

    getPageLinks.mockImplementationOnce(() => {
      throw errorThrown;
    });

    try {
      await crawl(url, hostname);
    } catch (error) {
      expect(error.message).toBe(errorThrown.message);
    }
  });
});

const axios = require('axios');

const getPageLinks = require('../getPageLinks');
const errorHandlers = require('../../utils/errorHandlers');
const htmlPageFixture = require('../../../fixtures/htmlPage');

jest.mock('axios');
jest.mock('../../utils/errorHandlers', () => ({
  handleLinkError: jest.fn(),
}));

describe('getPageLinks', () => {
  const url = 'http://crawlerproject.com';
  const expectedPageItems = {
    url,
    links: [
      { linkUrl: 'http://crawlerproject.com/home' },
      { linkUrl: 'http://crawlerproject.com/faq' },
      { linkUrl: 'http://crawlerproject.com/about' },
    ],
  };

  it('should return object containing a page scraped links', async () => {
    const response = { data: htmlPageFixture };
    axios.get.mockResolvedValue(response);

    const result = await getPageLinks(url);

    expect(result).toEqual(expectedPageItems);
  });

  it(`should call "handleLinkError" in case of 
    some error been thrown`, async () => {
    const errorThrown = 'Some error occured';
    axios.get.mockRejectedValue(errorThrown);

    try {
      await getPageLinks(url);
    } catch (error) {
      expect(errorHandlers.handleLinkError).toHaveBeenCalledWith(error);
    }
  });
});

const {
  diff,
  isValidUrl,
  extractResponseErrorInfo,
} = require('../helpers');

describe('helper functions:', () => {
  const url = 'https://crawlerproject.com';

  describe('diff', () => {
    const a = ['foo', 'baz'];
    const b = ['baz', 'bar'];

    it('should return the difference between passed arrays: (a \\ b)', () => {
      const difference = ['foo'];

      expect(diff(a, b)).toEqual(difference);
    });

    it(`should return an empty set if there is no difference
      between passed arrays`, () => {
      expect(diff(['quix'], ['quix'])).toEqual([]);
    });
  });

  describe('isValidUrl', () => {
    it('should return TRUE if passed url is valid', () => {
      expect(isValidUrl(url)).toBe(true);
    });

    it('should return FALSE if passed url is invalid', () => {
      const urls = [
        'htts://abc.com',
        'https:/abc.com',
        'https://.com',
        'http://xyz.',
      ];

      urls.forEach(url => {
        expect(isValidUrl(url)).toBe(false);
      });
    });
  });

  describe('extractResponseErrorInfo', () => {
    const response = {
      status: 404,
      statusText: 'Not Found',
    };

    it('should return an error information with specific details', () => {
      const errorInfoString = `url: ${url}; status code: ${response.status}; status text: ${response.statusText}`;

      const errorInfo = extractResponseErrorInfo(response, url);

      expect(errorInfo.toString()).toEqual(errorInfoString);
    });
  });
});

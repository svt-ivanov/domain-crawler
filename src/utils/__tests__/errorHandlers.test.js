const helpers = require('../helpers.js');
const { handleLinkError } = require('../errorHandlers');

function mockFunctions() {
  const original = require.requireActual('../helpers.js');

  return Object.assign({}, original, {
    extractResponseErrorInfo: jest.fn(),
    writeToFile: jest.fn(),
  });
}

jest.mock('../helpers.js', () => mockFunctions());

describe('errorHandlers functions:', () => {
  describe('handleLinkError', () => {
    const filename = 'link_errors.log';
    const url = 'https://wiprodigital.com';

    describe('in case of http error', () => {
      const response = {
        status: 404,
        statusText: 'Not Found',
      };
      const error = { response };

      it('should call "extractResponseErrorInfo" function with correct arguments', () => {
        handleLinkError(error, url);

        expect(helpers.extractResponseErrorInfo)
          .toHaveBeenCalledWith(response, url);
      });

      it('should call "writeToFile" function with correct arguments', () => {
        const errorInfo = { status: 404 };
        helpers.extractResponseErrorInfo
          .mockImplementation(() => errorInfo);

        handleLinkError(error, url);

        expect(helpers.writeToFile).toHaveBeenCalledWith(filename, errorInfo);
      });
    });

    describe('in case of other types errors', () => {
      const error = new Error('General type error');

      it('should re-throw the passed down error', () => {
        expect(() => handleLinkError(error, url)).toThrow(error);
      });
    });
  });
});

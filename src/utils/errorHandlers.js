const {
  writeToFile,
  extractResponseErrorInfo,
} = require('./helpers');

function handleLinkError(error, url) {
  if (error.response) {
    const errorInfo = extractResponseErrorInfo(error.response, url);
    writeToFile('link_errors.log', errorInfo);
  } else {
    throw error;
  }
}

module.exports = {
  handleLinkError,
};

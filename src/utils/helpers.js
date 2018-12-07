const fs = require('fs');
const chalk = require('chalk');

function diff(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const setDiff = new Set([...setA].filter(x => !setB.has(x)));

  return [...setDiff];
}

function isValidUrl(url) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'
  );

  return pattern.test(url);
}

function extractResponseErrorInfo(response, url) {
  const { status, statusText } = response;

  return {
    url,
    status,
    statusText,
    toString: () => `url: ${url}; status code: ${status}; status text: ${statusText}`,
  };
}

function writeToFile(filename, data) {
  return fs.writeFile(filename, data, error => {
    if (error) {
      console.log(chalk.red(`Error while trying to write file: ${filename}`));
      throw error;
    }
  });
}

module.exports = {
  diff,
  isValidUrl,
  writeToFile,
  extractResponseErrorInfo,
};

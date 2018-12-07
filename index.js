const fs = require('fs');
const url = require('url');
const chalk = require('chalk');

const crawl = require('./src/crawler/crawl');

const seedUrl = 'https://wiprodigital.com';
const { hostname } = url.parse(seedUrl, true);

console.log(chalk.white.bold('\nStart crawling...\n'));

crawl(seedUrl, hostname)
  .catch(error => {
    console.log(chalk.red(`Unhandled error: ${error.message}`));

    fs.writeFileSync('unhandled_errors.log', error);
    process.exit(1);
  });

# Domain crawler
Basic web crawler build on top of **Node.js**. It runs over 
internal domain links and filters out the ones do not belong to
the same origin domain.

## Note:
The implemented code used **async/await** feature which ships with ES2017.
The recommended **Node** version for running this code is **v7.6.0** or above.

## Getting Started
### Run the Project
To start the crawler you need to run the following command in the terminal:
``` javascript
npm start
```
### Linting
To lint the code you need to run the following command in the terminal:
``` javascript
npm run lint
```
### Testing
To start unit tests in a single run:
``` javascript
npm run test
```
or in a watch mode:
``` javascript
npm run test:watch
```
To run tests in a coverage mode:
``` javascript
npm run coverage
```

### Todo
- Crawl over images as well. Currently is scraping only anchor tags links.
- Make the crawler run in a bit less aggressive mode - crawls pages with some timeout/delay set (probably use `setTimeout/setImmediate`)  
- Make the app into a more user interactive CLI tool style - accepting arguments (*URL*s) from CLI; add `bin` property into `package.json` file and make it possible to run as CLI app, etc.


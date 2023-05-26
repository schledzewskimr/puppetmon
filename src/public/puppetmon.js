const puppeteer = require('puppeteer');
const express = require('express');
const nodemon = require('nodemon');

async function captureWebpage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url);

  // Capture the HTML code of the page
  const html = await page.content();

  await browser.close();

  return html;
}

async function serveWebpage(html) {
  const app = express();
  const port = 3000;

  // Serve the HTML content
  app.get('/', (req, res) => {
    res.send(html);
  });

  // Start the server
  const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  // Use Nodemon to watch for changes and restart the server
  nodemon({
    script: 'puppetmon.js',
    ext: 'js',
    ignore: ['public/*'],
  }).on('restart', () => {
    console.log('Server restarted');
  });

  // Close the server when Nodemon is stopped
  process.once('SIGUSR2', () => {
    server.close(() => {
      console.log('Server stopped');
      process.kill(process.pid, 'SIGUSR2');
    });
  });
}

async function captureAndServeWebsite(url) {
  // Capture the webpage using Puppeteer
  const capturedHtml = await captureWebpage(url);

  // Serve the webpage locally
  serveWebpage(capturedHtml);
}

module.exports = captureAndServeWebsite;
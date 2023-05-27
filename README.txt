# Puppetmon

Puppetmon is a Node.js tool that allows you to capture a webpage and serve it locally for testing and development purposes.

## Installation

To install Puppetmon globally, run the following command:

npm install -g puppetmon

## Usage

To use Puppetmon, run the following command:

node puppetmon [website-url]

Replace `[website-url]` with the URL of the webpage you want to capture and serve.

Puppetmon will capture the webpage and serve it locally on `http://localhost:3000`. Any changes made to your files will automatically be reflected when the server restarts.

Create a .js file in the top level with the following code: 

const puppetmon = require('./puppetmon');

// Get the command line argument
const url = process.argv[2];

// Call the function
if (url) {
  puppetmon.captureAndServeWebsite(url);
} else {
  console.log('Please provide a website URL as a command line argument.');
}
//////////////////////////////////////////
// Imports
//////////////////////////////////////////

const express = require('express');
const path = require('path');

// 💡 dotenv loads values from the .env file into process.env
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.API_KEY);

//////////////////////////////////////////
// Constant Variables
//////////////////////////////////////////

const app = express();
let pathToFrontend = path.join(__dirname, '../frontend-complete');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend-complete/dist');
}

//////////////////////////////////////////
// Middleware
//////////////////////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontend);
app.use(logRoutes);
app.use(serveStatic);

//////////////////////////////////////////
// Controllers
//////////////////////////////////////////

// 💡 Use async and await to send the fetch asynchronously
const serveTopArtStories = async (req, res, next) => {
  // 💡 Use try/catch to execute the fetch
  try {
    // 💡 Use process.env to retrieve the API key environment variable
    const url = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const storiesWithTitle = data.results.filter(story => story.title);

    // 💡 send the fetched data to the client
    res.send(storiesWithTitle);
  } catch (error) {
    // 💡 or send an error. 503 means the service is unavailable
    res.status(503).send(error);
  }
}

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
}

app.get('/api/stories', serveTopArtStories);
app.use(serve404); // captures ALL unhandled requests

//////////////////////////////////////////
// Listen
//////////////////////////////////////////

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
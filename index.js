const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./connect');
const urlRoutes = require('./routes/url');
const URL = require('./models/url');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
  const allUrls = await URL.find({});
  res.render('home', {
    urls: allUrls,
    name: 'Atishay'
  })
});

connectDB('mongodb://localhost:27017/url-shortener').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/url', urlRoutes);

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await URL.findOneAndUpdate({ shortUrl: shortUrl }, { $inc: { clicks: 1 } }, { new: true });
  if (!url) {
    return res.status(404).json({ error: 'Short URL not found' });
  }
  res.redirect(url.originalUrl);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
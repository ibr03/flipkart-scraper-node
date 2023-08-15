const axios = require('axios');
const cheerio = require('cheerio');
const FlipkartData = require('../model/products'); //FlipkartData schema and model

const saveFlipkartUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract and save relevant data to the database
    const title = $('span[class="B_NuCI"]').text();
    const price = $('div[class="_30jeq3 _16Jk6d"]').text();
    const description = $('div[class="_1mXcCf RmoJUa"]').text();
    const rating = $('div[class="_2d4LTz"]').text();

    // nested ratings and reviews count
    const parentSpan = $('span[class="_2_R_DZ"]');
    const innerSpans = parentSpan.find('span:not([class="_13vcmD"])');
    const ratings_reviews = []; 
    innerSpans.each((index, element) => {
        ratings_reviews.push($(element).text());
    });

    const [number_of_ratings, number_of_reviews] = ratings_reviews.splice(1);

    // number of media counts
    const media_ul = $('._3GnUWp');
    const media_count = media_ul.find('li').length; // count the number of <li> containing media

    const flipkartData = new FlipkartData({
      userId: req.user.email,
      url,
      title,
      price,
      description,
      rating,
      number_of_ratings,
      number_of_reviews,
      media_count,
    });

    await flipkartData.save();
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const getFlipkartData = async (req, res) => {
  try {
    const userId = req.user.email;
    const flipkartData = await FlipkartData.find({ userId });
    res.json(flipkartData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { saveFlipkartUrl, getFlipkartData };

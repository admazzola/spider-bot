// pl-scraper.js

   const axios = require('axios');
   const cheerio = require('cheerio');

   //const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
   const inputdatafile = require('./app/data/input.json')

   console.log(inputdatafile)

   let prod_array = inputdatafile.products_array

   for(var i=0;i<prod_array.length; i++)
   {
      let url = inputdatafile.base_url + prod_array[i];

      console.log('url is ',url)

      axios(url)
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html);
          const statsTable = $('.variant-inventory > .inventory');
          console.log( statsTable.html() );
        })
        .catch(console.error);

   }

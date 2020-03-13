// pl-scraper.js

const fs = require('fs')

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

   const axios = require('axios');
   const cheerio = require('cheerio');

   //const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
   const inputdatafile = require('./app/data/input.json')

   console.log(inputdatafile)

   let prod_array = inputdatafile.products_array


   let output = [];

   for(var i=0;i<prod_array.length; i++)
   {
      let cat_number = prod_array[i];
      let url = inputdatafile.base_url + cat_number;

      console.log('url is ',url)

      axios(url)
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html);
          const inventoryData = $('.variant-inventory > .inventory');
          console.log( inventoryData.html() );

          output.push({'catalog_number': cat_number, 'quantity':  inventoryData.html() })
          storeData(output,'./app/data/output.json')
        })
        .catch(console.error);

   }

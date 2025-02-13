import axios from "axios";
import * as cheerio from 'cheerio';

const memeSound = async (nameSound) => {
   let URI = `https://www.myinstants.com/en/search/?name=${nameSound}`;
   let { data } = await axios.get(URI);
   let $ = cheerio.load(data);

   let results = [];

   $('.instant').each((index, element) => {
       let instant = {};

       instant.backgroundColor = $(element).find('.circle').attr('style');

       const onclickAttr = $(element).find('button.small-button').attr('onclick');
       const audioMatch = onclickAttr.match(/play\('(\/media\/sounds\/.*?\.mp3)'/);
       instant.audioUrl = audioMatch ? `https://www.myinstants.com${audioMatch[1]}` : null;

       instant.title = $(element).find('button.small-button').attr('title');
       instant.text = $(element).find('.instant-link').text();
       instant.url = $(element).find('.instant-link').attr('href');
       });

       results.push(instant);
   });

   return results;
}

export default memeSound;
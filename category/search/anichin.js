import axios from "axios";
import * as cheerio from "cheerio";

async function anichinSearch(query) {
      try {
         let { data } = await axios.get(`https://anichin.xyz/?s=${encodeURIComponent(query)}`);
         let $ = cheerio.load(data);

         let result = [];
         $(".listupd .bsx a").each((i, el) => {
            let title = $(el).attr("title");
            let link = $(el).attr("href");
            let episode = $(el).find(".bt .epx").text().trim();
            let type = $(el).find(".typez").text().trim();
            let image = $(el).find("img").attr("data-lazy-src") || $(el).find("img").attr("src");

            result.push({ title, episode, type, image, link });
         });

         return result;
      } catch (error) {
         console.error("Gagal mengambil data:", error);
         return [];
    }
}
 
export default anichinSearch;

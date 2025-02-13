import axios from "axios";
import * as cheerio from "cheerio";

async function searchQuotes(query) {
    let url = `https://otakotaku.com/quote/search?q=${query}&q_filter=quote`;
    let { data } = await axios.get(url);
    let $ = cheerio.load(data);

    let results = [];

    $(".kotodama-list").each((i, el) => {
        let link = $(el).find("a.kuroi").attr("href");
        let image = $(el).find(".char-img img").attr("data-src") || "";
        let character = $(el).find(".char-name").text().trim();
        let anime = $(el).find(".anime-title").text().trim();
        let episode = $(el).find(".meta").text().trim();
        let quote = $(el).find(".quote").text().trim();
        let comments = $(el).find(".post-footer .count").text().trim() || "0";

        results.push({
            character,
            anime,
            episode,
            quote,
            image,
            link: `https://otakotaku.com${link}`,
            comments,
        });
    });

    return results;
}

export default searchQuotes;
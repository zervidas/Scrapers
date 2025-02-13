import axios from "axios";
import * as cheerio from "cheerio";

async function nasaGov(query) {
    try {
        let {
            data: s
        } = await axios.get(`https://www.nasa.gov/?search=${query}`);
        const $ = cheerio.load(s);
        const results = [];

        $("a.hds-search-result")
            .each((_, el) => {
                const title = $(el)
                    .find(".hds-search-result-heading")
                    .text()
                    .trim();
                const url = $(el)
                    .attr("href");
                const excerpt = $(el)
                    .find(".hds-search-result-excerpt")
                    .text()
                    .trim();
                const image = $(el)
                    .find(".hds-search-result-thumbnail img")
                    .attr("src");

                results.push({
                    title,
                    url,
                    excerpt,
                    image: image ?
                        `https://www.nasa.gov${image}` : null,
                });
            });

        return results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default nasaGov;
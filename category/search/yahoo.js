import axios from "axios";
import * as cheerio from "cheerio";

async function yahoo(text) {
    try {
        const {
            data: html
        } = await axios.get(
            `https://search.yahoo.com/search?p=${text}&fr=yfp-hrmob&fr2=p%3Afp%2Cm%3Asb&.tsrc=yfp-hrmob&ei=UTF-8&fp=1&toggle=1&cop=mss`
        );
        const $ = cheerio.load(html);
        const results = [];

        $('li.s-card')
            .each((i, el) => {
                const title = $(el)
                    .find('.s-card-hl')
                    .text()
                    .trim();
                const url = $(el)
                    .find('a.s-card-wrapAnchor')
                    .attr('href');
                const duration = $(el)
                    .find('.ctimestamp')
                    .text()
                    .trim();
                const uploadDate = $(el)
                    .find('.s-card-date')
                    .text()
                    .trim();
                const views = $(el)
                    .find('.s-card-views')
                    .text()
                    .trim();

                results.push({
                    title,
                    url,
                    duration,
                    uploadDate,
                    views
                });
            });

        return results
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

export default yahoo;
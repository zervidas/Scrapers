import axios from "axios";
import * as cheerio from "cheerio";

async function HaloDocDetails(url) {
        const {
            data
        } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('h3.section-header__content-text-title')
            .text()
            .trim();
        const subheadline = $('.article-page__article-subheadline')
            .text()
            .trim();
        const summary = $('.article-page__summary')
            .text()
            .trim();
        const reviewer = $('.article-page__reviewer')
            .text()
            .trim();
        const readTime = $('.article-page__reading-time')
            .text()
            .trim();
        const image = $('.article-page__image-container img')
            .attr('src');

        return {
            title,
            subheadline,
            summary,
            review: reviewer,
            readTime,
            imageBase64: image,
    };
}

export default HaloDocDetails;
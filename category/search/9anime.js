import axios from 'axios';
import * as cheerio from 'cheerio';

async function anime9(anime) {
    const {
        data: dataa
    } = await axios.get(`https://9animetv.to/search?keyword=${anime}`);

    const $ = cheerio.load(dataa);

    const result = [];

    $('.flw-item')
        .each((i, element) => {
            const title = $(element)
                .find('.film-name a')
                .attr('title');
            const url = 'https://9animetv.to' + $(element)
                .find('.film-name a')
                .attr('href');
            const imgSrc = $(element)
                .find('.film-poster-img')
                .attr('data-src');
            const quality = $(element)
                .find('.tick-quality')
                .text();
            const subOrDub = $(element)
                .find('.tick-sub')
                .text() || $(element)
                .find('.tick-dub')
                .text();
            const episode = $(element)
                .find('.tick-eps')
                .text()
                .replace(/\s+/g, ' ')
                .trim();

            result.push({
                title,
                url,
                imgSrc,
                quality,
                subOrDub,
                episode
            });
        });

    return result;
}

export default anime9;
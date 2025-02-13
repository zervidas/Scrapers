import axios from "axios";
import * as cheerio from "cheerio";

async function HalooDoccc(penyakitan) {
        const {
            data
        } = await axios.get(`https://www.halodoc.com/obat-dan-vitamin/search/${penyakitan}`);
        const $ = cheerio.load(data);
        const obatList = [];

        $('li.custom-container__list__container')
            .each((index, element) => {
                const title = $(element)
                    .find('.hd-base-product-search-card__title')
                    .text()
                    .trim();
                const subtitle = $(element)
                    .find('.hd-base-product-search-card__subtitle')
                    .text()
                    .trim();
                const price = $(element)
                    .find('.hd-base-product-search-card__price')
                    .text()
                    .trim();
                const image = $(element)
                    .find('.hd-base-image-mapper__img')
                    .attr('src');
                const link = $(element)
                    .find('.hd-base-product-search-card__content a')
                    .attr('href');

                obatList.push({
                    title,
                    subtitle,
                    price,
                    image,
                    link: `https://www.halodoc.com${link}`,
                });
            });

     return obatList;
}
    
export default HalooDoccc;
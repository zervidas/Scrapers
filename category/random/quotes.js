import axios from 'axios';
import * as cheerio from 'cheerio';

async function quotes() {
    try {
        let {
            data
        } = await axios.get(`https://quotes.toscrape.com/random`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            }
        });

        let $ = cheerio.load(data);
        let quoteText = $('.quote .text')
            .text()
            .trim();
        let author = $('.quote .author')
            .text()
            .trim();
        let tags = [];

        $('.quote .tags .tag')
            .each((i, el) => {
                tags.push($(el)
                    .text()
                    .trim());
            });

        return {
            quote: quoteText,
            author: author,
            tags: tags
        };
    } catch (error) {
        console.error('Error fetching quote:', error.message);
        return null;
    }
}

export default quotes;
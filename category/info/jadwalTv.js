import axios from 'axios';
import * as cheerio from 'cheerio';

export async function jadwal(tv) {
    try {
        let {
            data
        } = await axios.get(`https://www.jadwaltv.net/channel/${tv}`);
        let $ = cheerio.load(data);

        let hasil = [];

        $('table.table-bordered tbody tr')
            .each((i, el) => {
                let jam = $(el)
                    .find('td')
                    .eq(0)
                    .text()
                    .trim();
                let acara = $(el)
                    .find('td')
                    .eq(1)
                    .text()
                    .trim();

                if (jam && acara) {
                    hasil.push({
                        jam,
                        acara
                    });
                }
            });

        return hasil;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
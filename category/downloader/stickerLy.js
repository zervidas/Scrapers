import axios from "axios";
import * as cheerio from "cheerio";

const stickerLy = async (urlSticker) => {
    try {
        let { data: a } = await axios.get(urlSticker);
        let $ = cheerio.load(a);

        let stickers = [];
        $('#content_images .sticker_img').each((i, el) => {
            stickers.push($(el).attr('src'));
        });

        return stickers;
    } catch (error) {
        console.error(error);
    }
};

export default stickerLy;
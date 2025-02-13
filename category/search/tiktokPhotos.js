import axios from 'axios';
import fs from 'fs';

export async function tiktokPhoto(query, counts) {
    try {
        const payload = {
            keywords: query,
            count: counts,
            cursor: 0,
            web: 1,
            hd: 1
        };

        const URI = 'https://tikwm.com/api/photo/search';
        const {
            data
        } = await axios.post(URI, payload);

        return data.data.videos;
    } catch (error) {
        throw new Error(`Failed to fetch TikTok photos: ${error.message}`);
    }
}

export default tiktokPhoto;
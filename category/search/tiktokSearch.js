import axios from "axios";
import FormData from "form-data";

const ttSearch = async (query, count) => {
    try {
        let d = new FormData();
        d.append("keywords", query);
        d.append("count", count);
        d.append("cursor", 0);
        d.append("web", 1);
        d.append("hd", 1);

        let h = {
            headers: {
                ...d.getHeaders()
            }
        }

        let { data } = await axios.post("https://tikwm.com/api/feed/search", d, h);

        const baseURL = "https://tikwm.com";

        const videos = data.data.videos.map(video => {
            return {
                ...video,
                play: baseURL + video.play,
                wmplay: baseURL + video.wmplay,
                music: baseURL + video.music,
                cover: baseURL + video.cover,
                avatar: baseURL + video.avatar
            };
        });

        return videos;
    } catch (e) {
        console.log(e);
    }
}

export default ttSearch;
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function animeSearchByImage(path) {
    if (!path) throw new Error("Invalid Buffer");

    const data = new FormData();
    data.append("image", fs.createReadStream(path));

    const headers = {
        ...data.getHeaders(),
    };

    const URI = "https://api.trace.moe/search";
    const {
        data: response
    } = await axios.post(URI, data, {
        headers
    });

    return response
}

export default animeSearchByImage;
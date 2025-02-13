import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function anomakiCdn(buffer, filename) {
    try {
        const d = new FormData();
        d.append("files", buffer, filename);

        const headers = {
            headers: {
                ...d.getHeaders()
            }
        };

        const { data: p } = await axios.post("https://cdn.anomaki.web.id/api/upload", d, headers);
        const valid = "https://cdn.anomaki.web.id" + p[0].url;

        return valid;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default anomakiCdn;
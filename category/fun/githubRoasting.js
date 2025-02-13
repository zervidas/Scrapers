import axios from "axios";

async function githubRoasting(reponame) {
    if (!reponame) {
        throw new Error("Masukkan Nama Repository Github.")
    }

    try {
        let {
            data: s
        } = await axios.post(
            `https://github-roaster.programordie.workers.dev/${reponame}`
        )

        return s.roast;
    } catch (errors) {
        throw new Error(errors.message)
    }
}

export default githubRoasting;
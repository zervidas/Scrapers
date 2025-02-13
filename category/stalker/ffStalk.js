import axios from "axios";

async function ffStalk(userId) {
    if (!userId) throw new Error("User ID tidak ditemukan");

    try {
        const payload = {
            campaignUrl: "",
            catalogId: 68,
            gameId: userId,
            itemId: 13,
            paymentId: 752,
            productId: 3,
            product_ref: "REG",
            product_ref_denom: "REG"
        };

        const url =
            "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store";

        const {
            data
        } = await axios.post(url, payload);

        const gameDetail = [{
            userId,
            userName: data?.data?.gameDetail?.userName || "Unknown"
        }];

        return gameDetail;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
}

export default ffStalk;
import axios from "axios";

const quotesAnime = {
   generate: async () => {
      let URI = "https://jg160007-api.vercel.app/random-quotes-anime/select/random";
      let { data } = await axios.get(URI);
      return data;
   }
};

export default quotesAnime;
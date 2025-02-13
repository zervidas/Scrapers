import axios from "axios";
import FormData from "form-data";

const gemini = {
   chat: async (question) => {
      let d = new FormData();
      d.append("content", `User: ${question}`);
      d.append("model", "@google/gemini-2.0-flash-exp");
      
      let head = {
         headers: {
            ...d.getHeaders()
         }
      };
      
      let { data: ak } = await axios.post("https://mind.hydrooo.web.id/v1/chat", d, head);
      
      return ak.result;
   }
};

export default gemini;
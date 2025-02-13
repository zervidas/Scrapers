import axios from "axios";
import FormData from "form-data";

const Hoshino = {
   chat: async (question) => {
      let d = new FormData();
      d.append("content", `User: ${question}`);
      d.append("model", "@custom/hoshinoo-ba-idn.lang");
      
      let head = {
         headers: {
            ...d.getHeaders()
         }
      };
      
      let { data: ak } = await axios.post("https://mind.hydrooo.web.id/v1/chat", d, head);
      
      return ak.result;
   }
};

export default Hoshino;
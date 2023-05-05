import { Configuration, OpenAIApi } from "openai";
import {data} from "./Constants"

const configuration = new Configuration({
  apiKey: data.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
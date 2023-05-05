import React, { useState } from "react";
import axios from "axios";
import HeadingDisplay from "./HeadingDisplay";
import { data } from "../Constants";


function Image() {
  const [imageUrl, setImageUrl] = useState("");
  const [promptVal, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    try {
      
      setIsLoading(true);

      const response = await axios.post("https://api.openai.com/v1/images/generations", {
        model: "image-alpha-001",
        prompt: promptVal,
        size: "256x256",
        response_format: "url"
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.OPENAI_API_KEY}`
        }
      });
      
      setImageUrl(response.data.data[0].url);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const promptChangeHandler = (event) => {
    setPrompt(event.target.value)
    console.log(promptVal)
  }
  
  const clearTextHandler = (event) => {
    setImageUrl("");
    setPrompt("");
  }
  


  return (
    <div>
      <HeadingDisplay title="Image Generation using Dall-E2 openAI" />
      <input placeholder="You can write your own question here OR select from above sample questions" type="text" size="100" name="prompt" value={promptVal} onChange={promptChangeHandler}/>

      <button className='btn btn-primary' onClick={generateImage}>Generate Image</button>
      <button className='btn btn-danger'  onClick={clearTextHandler}>Clear Text</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <p>{imageUrl && <img src={imageUrl} alt="Generated artifact from server" />}</p>}
      
    </div>
  );
}

export default Image;

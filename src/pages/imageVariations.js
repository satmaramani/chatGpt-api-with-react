import React, { useState } from "react";
import axios from "axios";
import HeadingDisplay from "./HeadingDisplay";
import { data } from "../Constants";


function Image() {
  const [variations, setVariations] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [promptVal, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [numImages, setNumImages] = useState();

  const generateImage = async () => {
    try {
        
        if(isNaN(numImages) || (typeof(numImages)==="undefined"))
        {
            alert("Please select How many images you want");
            return false;
        }
        if(promptVal==="")
        {
            alert("Please provide some input");
            return false;
        }
      setIsLoading(true);

      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: "image-alpha-001",
        prompt: promptVal,
        size: "256x256",
        response_format: "url",
        num_images: numImages,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.OPENAI_API_KEY}`
        }
      });
      
      setVariations(response.data.data);
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
  
  const numImagesHandler =(event) => {
    let num = parseInt(event.target.value);

    if(isNaN(num))
    {
        setNumImages(1) 
        num=1;   
    }
    console.log("Number of images " + num)
    setNumImages(num)
    
    
  }

  return (
    <div>
      <HeadingDisplay title="Image Variations using Dall-E2 openAI" />
      <input placeholder="You can write your own question here OR select from above sample questions" type="text" size="100" name="prompt" value={promptVal} onChange={promptChangeHandler}/>

      <select name="Number of Images" onChange={numImagesHandler}>
        <option>How Many Images</option>
            <option >1</option>
            <option >2</option>
            <option >3</option>

      </select> <br /><br />
      <button className='btn btn-primary' onClick={generateImage}>Generate Image</button> &nbsp;
      <button className='btn btn-danger'  onClick={clearTextHandler}>Clear Text</button>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        variations.map((variation) => (
          <img key={variation.id} src={variation.url} alt={variation.caption} />
        ))
      )}
    </div>
  );
}

export default Image;

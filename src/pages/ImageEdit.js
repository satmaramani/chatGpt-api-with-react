import React, { useState } from "react";
import axios from "axios";
import { data } from "../Constants";
import HeadingDisplay from "./HeadingDisplay";

function ImageEdit() {
  const [imageUrl, setImageUrl] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [promptVal, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("prompt", promptVal);
    formData.append("size", "256x256");

    console.log("This is my prompt value " + promptVal);

    try {
      const response = await axios.post("https://api.openai.com/v1/images/edits", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${data.OPENAI_API_KEY}`
        }
      });
      
      setImageUrl(URL.createObjectURL(file));
      setEditedImageUrl(response.data.data[0].url);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePromptChange = (event) => {
    
    setPrompt(event.target.value);
  };

  return (
    <div>
        <HeadingDisplay title="Image Editing using Dall-E2 openAI" />
        <textarea value={promptVal} onChange={handlePromptChange} />

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      
      
      {isLoading && <p>Loading...</p>}
      {!isLoading && <p><>
      <b>Uploaded Image</b> : {imageUrl && <img src={imageUrl} alt="Uploaded Image" />} <br />
      <b>Edit Image</b> {editedImageUrl && <img src={editedImageUrl} alt="Edited Image" />} <br />
      </></p>}
    </div>
  );
}

export default ImageEdit;

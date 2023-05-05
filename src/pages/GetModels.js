import React, { useState, useEffect } from 'react';
import { data } from "../Constants";
import HeadingDisplay from "./HeadingDisplay";
import GetModelDetails from "./GetModelDetails";

function GetModels() {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.OPENAI_API_KEY}`
      },
      body: JSON.stringify()
    })
    .then(response => response.json())
    .then(data => setModels(data.data))
    .catch(error => console.log(error))
    .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
        <HeadingDisplay title="Available Models" />
      
      <ul>
        There are <b>{models.length}</b> Models in Chat GPT API as shown below <br /><br />
        {models.map(model => (
          <><li className="btn btn-primary" key={model.id} >{model.id}
          <GetModelDetails modelId={model.id} /></li><br /><br /><br /></>
        ))}
      </ul>
    </div>
  );
}

export default GetModels;

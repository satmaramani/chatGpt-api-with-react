import React, { useState } from 'react';
import axios from 'axios';
import { data } from "../Constants";

const API_KEY = data.OPENAI_API_KEY;

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateSpeech = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/speeches/generate',
        {
          text,
          voice: 'text-english-000',
          speed: 1.0,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
          responseType: 'arraybuffer',
        }
      );

      const blob = new Blob([response.data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} />
      <button onClick={generateSpeech}>Generate Speech</button>
      {isLoading ? <p>Loading ...</p> : audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default TextToSpeech;

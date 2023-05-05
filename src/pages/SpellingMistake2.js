import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { data } from '../Constants';
import HeadingDisplay from './HeadingDisplay';

function OpenAIEdit() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const configuration = new Configuration({
      apiKey: data.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEdit({
      model: 'text-davinci-edit-001',
      input: prompt,
      instruction: 'Fix the spelling mistakes',
    });
    setOutput(response?.data?.choices[0]?.text);
    setIsLoading(false);
  };

  const clearFields = () => {
    setPrompt("")
  }
  return (
    <div className='mx-auto'>
      <HeadingDisplay title="Spelling corrections" />
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input size="100" type="text" value={prompt} onChange={handleInputChange} />
        </label>&nbsp;&nbsp;
        <button className='btn btn-primary' type="submit">Submit</button>&nbsp;&nbsp;
        <button className='btn btn-danger' type="reset" onClick={clearFields}>Reset</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {output && (
        <div>
          <h2>Output:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

export default OpenAIEdit;

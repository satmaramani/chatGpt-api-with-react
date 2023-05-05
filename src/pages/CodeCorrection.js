import React, { useEffect, useState } from 'react';
import { sample_questions_code_correction } from '../Constants';
import openai from "../openAiConf";
import HeadingDisplay from "./HeadingDisplay";


function CodeCorrection() {

  const [promptVal, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionClick = (question) => {
    setPrompt(question);
    console.log(question);
    
  };

  const [questions, setQuestions] = useState('');
  useEffect(()=>{
    const sample_question_temp = <div>
      <HeadingDisplay title="Code Corrections"/>

      {sample_questions_code_correction.map((item, index) => (
    <div key={index}>
      <h1>Sample Questions </h1>
        {item.completions.map((question, questionIndex) => (
            <>
            <div key={questionIndex} onClick={() => handleQuestionClick(question.question)} value={question.question}>
                <span><b>Question No. {questionIndex + 1}</b>:</span> {question.question}
            </div>
            </>
        ))}
    </div>
))}
    </div>

    setQuestions(sample_question_temp);
  }, [])
  
  const promptChangeHandler = (event) => {
    setPrompt(event.target.value)
    
  }

  const promptValTranslate = ` Correct this code : ${promptVal}`;

  const generateText = async () => {
    setIsLoading(true);
    const prompt = promptValTranslate;
    const result = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt,
      max_tokens: 50,
    });

    const translatedText = result?.data?.choices[0]?.text;

    setGeneratedText(translatedText);
    setIsLoading(false);
  };

  const clearTextHandler =() => {
    setGeneratedText("");
    setPrompt("");
  }

  return (
    <div>
      {questions} <br />
      <textarea rows="6" cols="50" placeholder="Copy to explain the code" type="text" size="100" name="prompt" value={promptVal} onChange={promptChangeHandler} /> <br />
      <button className='btn btn-primary' onClick={generateText}>Generate Text</button>
      <button className='btn btn-danger' onClick={clearTextHandler}>Clear Text</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && generatedText && <p>{generatedText}</p>}
    </div>
  );
}

export default CodeCorrection;

import React, { useEffect, useState } from 'react';
import { sample_questions_translation } from '../Constants';
import openai from "../openAiConf";
import HeadingDisplay from "./HeadingDisplay";

function Translation() {

  const [promptVal, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [destLanguage, setDestLanguage] = useState("Hindi");
  
  const handleQuestionClick = (question) => {
    setPrompt(question);
    console.log(question);
    
  };

  const [questions, setQuestions] = useState('');
  useEffect(()=>{
    const sample_question_temp = <div>
        <HeadingDisplay title="Text Translations"/>
      {sample_questions_translation.map((item, index) => (
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

  const promptValTranslate = ` Traslate this text from  ${sourceLanguage} to ${destLanguage} : ${promptVal}`;
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

  const sourceLangHandler =(event) => {
    
    setSourceLanguage(event.target.value)
  }

  const destLangHandler =(event) => {
    
    // alert(sourceLanguage)
    // alert(event.target.value)
    if(sourceLanguage===event.target.value)
    {
        alert("Source and Destination Language cant be same");
        setDestLanguage("")
        return false;
    }
    setDestLanguage(event.target.value)
    
  }


  
  return (
    <div>
      {questions} <br />
      <h6>Select the Source Language</h6>

      <select name="source_lang" onChange={sourceLangHandler}>
      <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Marathi">Marathi</option>

      </select>
      <br />

      <h6>Select the Destination Language</h6>

      <select name="dest_lang" onChange={destLangHandler}>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Marathi">Marathi</option>
      </select>
      <br />


      <input placeholder="You can write your own question here OR select from above sample questions" type="text" size="100" name="prompt" value={promptVal} onChange={promptChangeHandler}/>
      <button className='btn btn-primary' onClick={generateText}>Generate Text</button>
      <button className='btn btn-danger' onClick={clearTextHandler}>Clear Text</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && generatedText && <><br /><br /><h4><u>{promptValTranslate}</u> </h4><br /><p>{generatedText}</p></>}
    </div>
  );
}

export default Translation;

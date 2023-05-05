import React, { useEffect, useState } from 'react';
import { sample_questions_learnings } from '../Constants';
import openai from "../openAiConf";
import HeadingDisplay from "./HeadingDisplay";

function Learnings() {

  const [promptVal, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assistantVal, setAssistantVal] = useState("");
  const [systemVal, setSystemVal] = useState("");
  

  const handleQuestionClick = (question) => {
    setPrompt(question);
    console.log(question);
    
  };

  const [questions, setQuestions] = useState('');
  useEffect(()=>{
    const sample_question_temp = <div>
      {sample_questions_learnings.map((item, index) => (
    <div key={index}>
       <HeadingDisplay title="Learn and Response"/>
       {/* {item.completions.map((question, questionIndex) => (
            <>
            <div key={questionIndex} onClick={() => handleQuestionClick(question.system)} value={question.system}>
                <span><b>Question No. {questionIndex + 1}</b>:</span> {question.system}
            </div>
            </>
        ))} */}
    </div>
))}
    </div>

    setQuestions(sample_question_temp);
  }, [])
  
  const promptChangeHandler = (event) => {
    setPrompt(event.target.value)
    
  }

  const assistantChangeHandler = (event) => {
    setAssistantVal(event.target.value)
    
  }

  const systemChangeHandler = (event) => {
    setSystemVal(event.target.value)
    
  }
  const systemText = systemVal;
//   const assistantText = "We have only 2 type of grains wheat and rice price of rice is 40 Rs kg and wheat is 20 Rs kg ";
  const assistantText = assistantVal;
  
  const promptWithAdminAndSystem = `System: ${systemText}\nAssistant: ${assistantText}\nUser: ${promptVal}\n`;

  const generateText = async () => {
    setIsLoading(true);
    const prompt = promptWithAdminAndSystem;
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
    setAssistantVal("")
    setSystemVal("")
  }

  return (
    <div>
      {questions} <br />

      <label><b>System</b></label>
      <input placeholder="You are system in Infogain" 
        type="text" size="150" name="system" value={systemVal} onChange={systemChangeHandler}/> <br /><br />


      <label><b>Assistant</b></label>
      <input placeholder="You are assistant in Infogain" 
        type="text" size="150" name="assistant" value={assistantVal} onChange={assistantChangeHandler}/> <br /><br />

        <label><b>User Query</b></label><br />
      <input placeholder="You can write your own question here OR select from above sample questions" 
        type="text" size="100" name="prompt" value={promptVal} onChange={promptChangeHandler}/> <br /><br />
      <button className='btn btn-primary' onClick={generateText}>Generate Text</button>
      <button className='btn btn-danger' onClick={clearTextHandler}>Clear Text</button>
      {isLoading && <p>Loading...</p>}
      {!isLoading && generatedText && <p>{generatedText}</p>}
    </div>
  );
}

export default Learnings;

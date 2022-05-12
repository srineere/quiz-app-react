import './App.css';
import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

import questions from "./questions.js";

function App() {

// hooks
const [totalCorrect, setTotalCorrect] = useState(0);
const [currentQuestion, setCurrentQuestion] = useState(-1);
const [isSubmit, setIsSubmit] = useState(false);


//  All Question Screen Component
function AllQuestions(){  

    function questionChange(id){
        setCurrentQuestion(id);
    }

    return(
        <div className='container my-5 py-5 grid grid-cols-4 gap-5 pl-2'>
            {questions.map(question => (

                question.isVisited === false ?
                    <div className='flex justify-center content-center 
                        border-2 rounded shadow-md border-babyblue
                        hover:bg-babyblue hover:shadow-lg 
                        focus:bg-babyblue-1 focus:shadow-lg focus:outline-none focus:ring-0 
                        active:bg-babyblue-1 active:shadow-lg 
                        transition duration-150 ease-in-out'>
                            <div className='inline-block px-6 py-2.5 w-16 h-16 font-medium leading-tight uppercase' 
                                onClick={()=>questionChange(question.id)}>
                                    <span className='flex font-gilroy text-2xl justify-center content-center'>
                                        {question.id+1}
                                    </span>
                            </div>
                    </div>
                    :
                    <div className='flex justify-center content-center 
                        border-2 rounded shadow-md border-crayola
                        hover:bg-crayola hover:text-white hover:shadow-lg 
                        focus:bg-crayola-2 focus:shadow-lg focus:outline-none focus:ring-0 
                        active:bg-crayola-1 active:shadow-lg 
                        transition duration-150 ease-in-out'>
                            <div className='inline-block px-6 py-2.5 w-16 h-16 font-medium leading-tight uppercase' 
                                onClick={()=>questionChange(question.id)}>
                                    <span className='flex font-gilroy text-2xl justify-center content-center'>
                                        {question.id+1}
                                    </span>
                            </div>
                    </div>
                
            ))}
        </div>
    )
}

// Each Question Screen Component
function Question(){
    // Timer
    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    const expiryTimestamp = time
    const {
        seconds,
        minutes,
        pause,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
            
    if(seconds === 0){
        // pause();
        questions[currentQuestion].isVisited = true;
        questions[currentQuestion].isWrong = true;
    }

    // Helper functions

    function correctOrNot(answer) {
        const correctIndex = questions[currentQuestion].correctIndex;
        pause();
        if(questions[currentQuestion].isVisited===false){
            questions[currentQuestion].attempted = answer;
            questions[currentQuestion].isVisited = true;

            if (answer === correctIndex) {
                setTotalCorrect(totalCorrect + 1);
                questions[currentQuestion].isCorrect = true;
            }
            else {
                console.log("Wrong");
                questions[currentQuestion].isWrong = true;
            }
        }
    }

    function next(){
        setCurrentQuestion(currentQuestion+1);
    }

    function previous(){
        setCurrentQuestion(currentQuestion-1);
    }

    function back(){
        setCurrentQuestion(-1);
    }

    return(
        <div className='container py-2 my-2'>
        <div className=' space-x-2 justify-center'>
            
            <h1 className='text-2xl md:text-4xl font-gilroy font-medium leading-tight text-gray-800 mb-2.5 mt-0'>
            {questions[currentQuestion].question}
            </h1>

            <div className='grid py-1 grid-cols-2 gap-2 font-inter'>
                {questions[currentQuestion].answers.map((answer, index) => (
                    questions[currentQuestion].isVisited === true && questions[currentQuestion].attempted === index ?
                    <div className='border-2 rounded bg-crayola p-4 m-1 text-md md:text-lg'
                        onClick={()=>correctOrNot(index)}>
                            {answer}
                    </div>
                    :
                    <div className='border-2 rounded border-babyblue p-4 m-1 text-md md:text-lg
                            hover:bg-babyblue hover:shadow-lg 
                            focus:bg-babyblue-2 focus:shadow-lg focus:outline-none focus:ring-0 
                            active:bg-babyblue-2 active:shadow-lg transition duration-150 ease-in-out'
                            onClick={()=>correctOrNot(index)}>
                                {answer}
                    </div>
                ))}    
            </div>

            { questions[currentQuestion].isVisited  ? 
                <div className='col-start-1 col-end-2'>
                    Correct Answer: {questions[currentQuestion].answers[questions[currentQuestion].correctIndex]}
                </div>
                : null }
        </div>


        <div className='grid grid-cols-8 gap-3 py-5 font-inter'>
            <div className='col-start-1 col-end-3 rounded-full border-2 py-3 border-crayola
                hover:bg-crayola hover:text-white hover:shadow-lg 
                focus:bg-crayola-2 focus:shadow-lg focus:outline-none focus:ring-0 
                active:bg-crayola-1 active:shadow-lg transition duration-150 ease-in-out' 
                    onClick={()=>back()}>
                        Back
            </div>

            {currentQuestion===0 ?
                <div className='col-start-4 col-end-5 rounded-xl border-2 py-3 opacity-60 md:px-3'>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </div>
                </div> :
                <div className='col-start-4 col-end-5 rounded-xl border-2 py-3 md:px-3
                    hover:bg-[#565d70] hover:text-white hover:shadow-lg 
                    focus:bg-crayola-2 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-[#484d5c] active:shadow-lg transition duration-150 ease-in-out'  
                    onClick={()=>previous()}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </div>
                </div>
            }

            {currentQuestion===questions.length-1 ? 
                <div className='col-start-5 col-end-6 rounded-xl border-2 py-3 md:px-3 opacity-60'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </div>  :
                <div className='col-start-5 col-end-6 rounded-xl border-2 py-3 md:px-3
                    hover:bg-[#565d70] hover:text-white hover:shadow-lg focus:bg-crayola-2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#484d5c] active:shadow-lg transition duration-150 ease-in-out'  
                    onClick={()=>next()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                </div>
            }
            
            <div className='col-start-7 col-end-9 rounded-full border-2 py-3 border-pantone' >
                {seconds===0 ? 
                    currentQuestion===questions.length-1 ?
                        back() :
                        setCurrentQuestion(currentQuestion+1)
                    :
                    <div>
                        <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                }</div>
        </div>
        

        </div>
    ) 
}

// Sumbit Screen Component
function Submit(){
    
    // Resets the quiz
    function reset(){
        for(let i=0;i<questions.length;i++){
            questions[i].isVisited = false;
            questions[i].attempted = -1;
            questions[i].isCorrect = false;
            questions[i].isWrong = false;
        }
        setCurrentQuestion(-1);
        setTotalCorrect(0);
        setIsSubmit(false);
        
    }

    let totalAttempted = 0;
    for(let i=0; i<questions.length; i++){
        if(questions[i].isVisited===true){
            totalAttempted++;
        }
    }
    
    return(
        <div className='container py-4 my-4'>
            
            <div className='font-inter font-medium leading-tight text-4xl mt-0 mb-2 py-5'>
                You attempted <span className='text-marine'>{totalAttempted}</span> out of <span className='text-crayola'>{questions.length}</span> questions.
            </div>
            <div></div>
            <div className='font-inter font-medium leading-tight text-4xl mt-0 mb-2 py-5'>
                You got <span className='text-marine'>{totalCorrect}</span> out of <span className='text-crayola'>{totalAttempted}</span> correct.      
            </div>
            
            <div className=' rounded-full border-2 border-marine py-5 my-6 font-gilroy text-xl
                hover:bg-marine-1 hover:shadow-lg focus:bg-marine-2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-marine-2 active:shadow-lg transition duration-150 ease-in-out' 
                onClick={()=>reset()}>
                    Start again?
            </div>
        </div>
    )
}

// Home Component
  return (
      <div className='flex justify-center items-center h-screen 
        bg-gradient-to-r from-[#edf6ff] to-[#b4d7f9]'>

    <div className="App rounded-2xl shadow-2xl  container max-w-xl m-auto  items-center justify-start h-5/6 w-4/5 bg-white px-6">
      
      <div className='container  rounded-full my-5 p-1 rounded '>
        <h1 className="text-2xl md:text-5xl font-gilroy border-solid font-bold mt-0 ">
            Quiz
        </h1>
      </div>

      { isSubmit ? 
        <Submit/> :
        <div className='container'>
        
        <div className='container grid grid-cols-6 gap-4'>
            <div className='col-start-1 col-end-3'>
                <p className='
                    inline-block px-6 py-2.5  border-2 rounded shadow-md font-inter
                    border-marine text font-medium leading-tight uppercase '>
                     {totalCorrect} / {questions.length}
                </p>
            </div>
            <div className='col-start-5 col-end-7 col-span-2'>
                <div className='
                    inline-block px-6 py-2.5 rounded shadow-md font-inter
                    bg-marine text-white font-medium leading-tight uppercase 
                    hover:bg-marine-1 hover:shadow-lg focus:bg-marine-2 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-marine-2 active:shadow-lg transition duration-150 ease-in-out' 
                    onClick={()=>{setIsSubmit(true)}}>
                        Submit
                </div>
            </div>
        </div>    
        {currentQuestion!==-1 ? 
            <Question  setQuestionIndex={setCurrentQuestion}/> : 
            <AllQuestions/>
        }
        
        </div>
      }
      
      
    </div>
    </div>
  );
}

export default App;

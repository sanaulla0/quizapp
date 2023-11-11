import React,{useState,useEffect} from 'react';

import positive from '../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3';
import negative from '../../assets/wrong-47985.mp3';
import Button from '../Button';

function Index() {

 const [questions, setQuestions] = useState([
  {
    questionText: 'The capital of France is ______.',
    answer: ['Paris','delhi','hyd'],
    userAnswer: '',
    flagged : false,
    isCompleted : false,
  },
  
    

]);

const [currentQuestion, setCurrentQuestion] = useState(0);
const [showScore, setShowScore] = useState(false);
const [score, setScore] = useState(0);
const [attempt, setAttempt] = useState(2);

const handleAnswerChange = (event) => {
  const newQuestions = [...questions];
  newQuestions[currentQuestion].userAnswer = event.target.value;
  console.log("check",newQuestions);
  setQuestions(newQuestions);
};

useEffect(() => {
	if (showScore) {
			localStorage.removeItem('flaggedQuestions');
	}
}, [showScore]);

useEffect(() => {

  const  resumeQuestions = JSON.parse(localStorage.getItem('resume'));
  if (resumeQuestions!=null) {
   setCurrentQuestion(resumeQuestions); 
   }
}, []);

const checkAnswer = (questionIndex) => {

  const currentQuestionData = questions[currentQuestion];
  console.log("data",currentQuestionData);
  let userAnswer = currentQuestionData.answer;
  if (!questions[currentQuestion].isCompleted) {
  if(userAnswer.some((correctAnswer) => correctAnswer.toLowerCase() === currentQuestionData.userAnswer.toLowerCase())){
  
                
 
    setScore(score + 1);
    state.audio1.play();
  } else {
    setAttempt(attempt - 1);
    state.audio2.play();
  }

  const nextQuestion = currentQuestion + 1;
  localStorage.setItem("resume",JSON.stringify(currentQuestion));
  if (nextQuestion < questions.length && attempt >= 1) {
    setCurrentQuestion(nextQuestion);
    const updatedQuestions = [...questions];
				updatedQuestions[questionIndex].isCompleted = true;
  } else {
    setShowScore(true);
    localStorage.removeItem('resume');
  }
};
}

const flagQuestion = (questionIndex) => {
	const updatedQuestions = [...questions];
	updatedQuestions[questionIndex].flagged = true;
 localStorage.setItem('flaggedQuestions',JSON.stringify(updatedQuestions));
};

const unflagQuestion = (questionIndex) => {
	const updatedQuestions = [...questions];
	updatedQuestions[questionIndex].flagged = false;
	localStorage.setItem('flaggedQuestions',JSON.stringify(updatedQuestions));
};

const reviewFlaggedQuestions = () => {
	const flaggedQuestionIndex = questions.findIndex((question) => question.flagged);
	if (flaggedQuestionIndex !== -1) {
		  setCurrentQuestion(flaggedQuestionIndex);
		
	}
};

const Finish = ()=>{
	setShowScore(true);
	localStorage.removeItem('flaggedQuestions');
	localStorage.removeItem('resume');
}
let state = {
  audio1 : new Audio(positive),
audio2 : new Audio(negative)
}


const Next = ()=>{
  if(currentQuestion < questions.length-1){
    setCurrentQuestion(currentQuestion+1);
  }
  else{
          // alert("questions over")
  }
  
}
const prev = ()=>{
  if(currentQuestion >0 ){
    setCurrentQuestion(currentQuestion-1);
  }
    else{
      setCurrentQuestion(0);
    }

}

const renderQuestion = () => {
  const currentQuestionData = questions[currentQuestion];

  if (showScore) {
    return (
      <div className='score-section'>
        You scored {score} out of {questions.length}
      </div>
    );
  } else {
    return (
      <div>
        <div className='question-count'>
          <div>
          <Button text={"Prev"} outlined={true} onClick={prev}>prev</Button>
							   <Button text={"Next"} outlined={true}
                  onClick={Next}>Next</Button>
          </div>
       
          <h3><span>Question {currentQuestion + 1}</span></h3>
          

          <div >
          <h4>No Of Attempts Left: {attempt}</h4>
          </div>
          
        </div>
        <div className='div1'>
         <h2 className='text'>{currentQuestionData.questionText}</h2> 
         <div >
          { questions[currentQuestion].flagged ? 
					 (
						 <Button text={"Unflag"} onClick={() => unflagQuestion(currentQuestion)}>Unflag</Button>
  ) : (
    <Button text={"Flag"} onClick={() => flagQuestion(currentQuestion)}></Button>
		)
					}
 </div>
</div>
          <div className='input'>
          <input 
            type='text'
            value={currentQuestionData.userAnswer}
            onChange={(e)=>handleAnswerChange(e)}
          />
<div  className='check1'>
          <Button text={"Check"} onClick={()=>checkAnswer(currentQuestion)}>Check</Button>
        </div>

          </div>

          
       
        

        <div className='flag1'>
					<Button text={"Flagged Questions"} onClick={reviewFlaggedQuestions}>Flagged Questions</Button>

          <div>
				      <Button text={"Finish"} onClick={Finish}>Finish</Button>
					</div>

					</div>

         
          


      </div>
    );
  }
};

return (
  <div className='app1'>
    {renderQuestion()}
  </div>
);
}

export default Index;
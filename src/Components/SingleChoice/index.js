import React,{useState ,useEffect} from 'react'
import positive from '../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3';
import negative from '../../assets/wrong-47985.mp3';
import '@fortawesome/fontawesome-svg-core/styles.css';



function Index() {

 const [questions,setQuestions] = useState([
		{
			questionText: 'Delhi is the Capital of India?',
			answerOptions: [
				{ answerText: 'correct', isCorrect: true },
				{ answerText: 'incorrect', isCorrect: false },
			
			],
			flagged : false,
		 isCompleted : false,
		},
		{
			questionText: '2+2 = 4 ?',
			answerOptions: [
    { answerText: 'correct', isCorrect: true },
				{ answerText: 'incorrect', isCorrect: false },
			],
			flagged : false,
			isCompleted : false,
		},
		{
			questionText: 'Dhoni is the president of IPL ?',
			answerOptions: [
    { answerText: 'correct', isCorrect: false },
				{ answerText: 'incorrect', isCorrect: true },
			],
			flagged : false,
			isCompleted : false,
		},
		{
			questionText: 'Fish can live on Earth?',
			answerOptions: [
    { answerText: 'correct', isCorrect: false },
				{ answerText: 'incorrect', isCorrect: true},
   ],
			flagged : false,
			isCompleted : false,
		},
		{
			questionText: 'India is a second largest country in population?',
			answerOptions: [
				{ answerText: 'correct', isCorrect: true },
				{ answerText: 'incorrect', isCorrect: false },
			],
			flagged : false,
			isCompleted : false,
		},
		{
			questionText: '2 divided by 0 is 0?',
			answerOptions: [
    { answerText: 'correct', isCorrect: false},
				{ answerText: 'incorrect', isCorrect: true },
			],
			flagged : false,
			isCompleted : false,
		},


 ])


 const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const[attempt,setAttempt] = useState(2);
 const [selected, setSelected] = useState(Array(questions[currentQuestion].answerOptions.length).fill(false));



 const handleAnswerOptionClick = (index) => {
  const newSelectedOptions = [...selected];
  newSelectedOptions[index] = !newSelectedOptions[index];
  setSelected(newSelectedOptions);

		// const updatedQuestions = [...questions];
  // updatedQuestions[currentQuestion].isCompleted = newSelectedOptions.some((selected) => selected);
  // setQuestions(updatedQuestions)
};

 let state = {
		      audio1 : new Audio(positive),
        audio2 : new Audio(negative)
	}


	 	
	const checked = (questionIndex) => {
  const currentQuestionAnswers = questions[currentQuestion].answerOptions.map((option) => option.isCorrect);
  const areSelectedOptionsCorrect = selected.every((selected, index) => selected === currentQuestionAnswers[index]);

		if (!questions[currentQuestion].isCompleted) {
  if (areSelectedOptionsCorrect) {
    setScore(score + 1);
    state.audio1.play();
  } else {
			setAttempt(attempt-1);
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
	
}
else{
	    alert('you already answerd.')
}
	};
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

 useEffect(() => {

 	const  resumeQuestions = JSON.parse(localStorage.getItem('resume'));
 	if (resumeQuestions!=null) {
		setCurrentQuestion(resumeQuestions); 
		}
 }, []);

const reviewFlaggedQuestions = () => {
	const flaggedQuestionIndex = questions.findIndex((question) => question.flagged);
	if (flaggedQuestionIndex !== -1) {
		  setCurrentQuestion(flaggedQuestionIndex);
		console.log("check me" , flaggedQuestionIndex);
	}
};

useEffect(() => {
	if (showScore) {
			localStorage.removeItem('flaggedQuestions');
	}
}, [showScore]);


const Finish = ()=>{
	setShowScore(true);
	localStorage.removeItem('flaggedQuestions');
	localStorage.removeItem('resume');
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

	return (
		<>
		<div className='app'>
		
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length} 
				</div>
			) : (
				<>
					<div className='question-section'>
						<div>
							   <button onClick={prev}>prev</button>
							   <button onClick={Next}>Next</button>
						</div>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}/{questions.length}</span>

       <div>
								  <h4>No Of Attempts Left : {attempt}</h4>
							</div>

</div>
							<div className='question-text'><h2>{questions[currentQuestion].questionText}</h2>
							
									
						{ questions[currentQuestion].flagged ? 
					 (
						 <button onClick={() => unflagQuestion(currentQuestion)}>Unflag</button>
  ) : (
    <button onClick={() => flagQuestion(currentQuestion)}>Flag</button>
		)
					}

							</div>
							<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption,index) => (
        <div key={index}>
        <label>
          <input
            type='checkbox'
            checked={selected[index]}
            onChange={() => handleAnswerOptionClick(index)}
          />
          {answerOption.answerText}
        </label>
        </div>
      
						))}
					</div>

						
				



					</div>
					
				
					<div className='check'>
     <button onClick={()=>checked(currentQuestion)}>Check</button>
					
					<div className='flag'>
					<button onClick={reviewFlaggedQuestions}>Flagged Questions</button>
					</div>

					<div className='finish'>
				      <button onClick={Finish}>Finish</button>
					</div>

					</div>  

					 
				
					
				
					</>
			)}
			
			
  
		
			
		</div>

		</>
	);
}


  
 






        
    



export default Index;
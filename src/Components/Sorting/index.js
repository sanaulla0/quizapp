import React,{useState,useEffect} from 'react';
import positive from '../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3';
import negative from '../../assets/wrong-47985.mp3';
// import './styles.css';

const SortingQuiz = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Sort these countries by population:', 
    options: [
      { id: 2, name: 'B' },
      { id: 1, name: 'A' },
      { id: 3, name: 'C' },
      { id: 4, name: 'D'},
    ],
    flag : false,
    isCompleted : false
  },
    { id: 1, text: 'Sort below items:', 
    options: [
      { id: 2, name: '2', },
      { id: 1, name: '1',},
      { id: 4, name: '4',},
      { id: 3, name: '3',},
    ],
    flag : false,
    isCompleted : false
  },
    { id: 1, text: 'Sort BODMASS', 
    options: [
      { id: 2, name: 'OF'},
      { id: 1, name: '()'},
      { id: 3, name: 'DIV'  },
      { id: 4, name: 'MUL'  },
    ],
    flag : false,
    isCompleted : false
  },
    { id: 1, text: 'Sort BODMASS', 
    options: [
      { id: 2, name: 'MUL'  },
      { id: 1, name: 'DIV' },
      { id: 3, name: 'ADD' },
      { id: 4, name: 'SUB'  },
    ],
    flag : false,
    isCompleted : false
  },
   
    // Add more questions as needed
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const[attempt,setAttempt] = useState(2);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const draggedCountry = questions[currentQuestion].options.find(
      (country) => country.id === draggedId
    );

    const updatedOptions = questions[currentQuestion].options.filter(
      (country) => country.id !== draggedId
    );

    updatedOptions.splice(targetIndex, 0, draggedCountry);

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = {
      ...questions[currentQuestion],
      options: updatedOptions,
    };

    setQuestions(updatedQuestions);
  };

  const handleCheck = (questionIndex) => {
    const sortedCountries = questions[currentQuestion].options.map((country) => country.id);
    const isCorrect = JSON.stringify(sortedCountries) === JSON.stringify(sortedCountries.sort());
    if (!questions[currentQuestion].isCompleted) {
    if (isCorrect) {
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
  let state = {
    audio1 : new Audio(positive),
  audio2 : new Audio(negative)
}

const reviewFlaggedQuestions = () => {
	const flaggedQuestionIndex = questions.findIndex((question) => question.flagged);
	if (flaggedQuestionIndex !== -1) {
		  setCurrentQuestion(flaggedQuestionIndex);
		console.log("check me" , flaggedQuestionIndex);
	}
};

const Finish = ()=>{
	setShowScore(true);
	localStorage.removeItem('flaggedQuestions');
	localStorage.removeItem('resume');
}

const getBackgroundColor = (id) => {
  // Add your logic here to determine the background color based on the ID
  switch (id) {
    case 1:
      return 'lightblue';
    case 2:
      return 'lightgreen';
    case 3:
      return 'lightcoral';
    case 4:
      return 'lightyellow';
    default:
      return 'white';
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

 useEffect(() => {
   if (showScore) {
       localStorage.removeItem('flaggedQuestions');
   }
 }, [showScore]);
 

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
    <div className='app'>
      {showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length} 
				</div>
			) : (
        <>
        <div>
        <button onClick={prev}>Prev</button>
          <button onClick={Next}>Next</button>


          <h2>Question{currentQuestion + 1}/{questions.length}</h2>
      <h3>{questions[currentQuestion].text}</h3>

        

      <div className="countries" onDragOver={(e) => handleDragOver(e)}>
        {questions[currentQuestion].options.map((country, index) => (
          <div
            key={country.id}
            draggable
            onDragStart={(e) => handleDragStart(e, country.id)}
            onDrop={(e) => handleDrop(e, index)}
            className="country"
            style={{ backgroundColor: getBackgroundColor(country.id) , width : '10rem', height:"2rem" }}
          >
            {country.name}
          </div>
        ))}


<div className='f1'>
					<button onClick={reviewFlaggedQuestions}>Flagged Questions</button>
          <button onClick={Finish}>Finish</button>
					</div>

      </div>
      


      </div>
     
      
      <button className='chk' onClick={()=>handleCheck(currentQuestion)}>Check Answer</button>
            
      { questions[currentQuestion].flagged ? 
					 (
						 <button className='set' onClick={() => unflagQuestion(currentQuestion)}>Unflag</button>
  ) : (
    <button  className='set' onClick={() => flagQuestion(currentQuestion)}>Flag</button>
		)
					}

					
      </>
 )} 

    </div>
    
      
  );
};

export default SortingQuiz;

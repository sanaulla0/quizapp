import React from 'react';
import { Link } from "react-router-dom";
import Button from '../Button';
import './styles.css';

function Index() {


  return (
   <div>
    <h1 style={{color: 'yellow'}} >Start Quiz App</h1>
    <div className='home'>
        
        <Link to='/freechoice'>
         <Button text={"Free Choice"} outlined={true}
          onClick={()=>console.log("button clicked")}
         />
        </Link>
        <Link to='/fillblank'>
         <Button text={"Fill in the Blank"} outlined={true}
          onClick={()=>console.log("button clicked")}
         />
        </Link>
        <Link to='/matrix'>
         <Button text={"Matrix Sorting"} outlined={true}
          onClick={()=>console.log("button clicked")}
         />
        </Link>
        </div>
        <div className='home'>
        
        <Link to='/sorting'>
         <Button text={"Sorting"} outlined={true}
          onClick={()=>console.log("button clicked")}
         />
        </Link>
        <Link to='/singlechoice'>
         <Button text={"True Or False"} outlined={true}
          onClick={()=>console.log("button clicked")}
         />
        </Link>
        <Link to='/multiple'>
         <Button text={"Multiple Choice"} outlined={true}
          onClick={()=>console.log("button clicked")}
         />
        </Link>
        </div>
         
    </div>
  )
}

export default Index;
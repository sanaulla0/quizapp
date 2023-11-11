import Multiple from './Components/Multiple';
import SingleChoice from './Components/SingleChoice';
import FreeChoice from './Components/FreeChoice';
import FillintheBlank from './Components/FillintheBlank';
import MatrixSorting from './Components/MatrixSorting';
import Sorting from './Components/Sorting';
import Home from './Components/Home';
import './App.css';
import { Routes,Route } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
           <Route path='/' element={<Home />} />
                  <Route path='/multiple' element={<Multiple/>} />
                   <Route path='/singlechoice' element={<SingleChoice/>} />
       <Route path='/freechoice' element={<FreeChoice />} />
        <Route path='/fillblank' element={<FillintheBlank />} />
        <Route path='/matrix' element={<MatrixSorting />} />
        <Route path='/sorting' element={<Sorting />} />
      </Routes>
    </div>
  );
}

export default App;

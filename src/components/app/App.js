import Header from '../header/Header';
import RandomChar from '../randomChar/RandomChar';
import Char from '../char/Char';

import vision from '../../resourses/vision.png';
import './App.scss';
import './main.scss';

function App() {
    return ( 
      <div className = "App" >
        
         <Header />
         <main>
            <RandomChar/>
            <Char/>
            <img className="bg-decoration" src={vision} alt="vision"></img>
         </main> 
      </div>
    );
}

export default App;
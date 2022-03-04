import { useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../char/CharList';
import CharInfo from '../char/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import vision from '../../resourses/vision.png';

const MainPage = () => {

   const [selectedChar, setCar] = useState(null);

   const onCharSelected = (id) => {
      setCar(id);
   }

   return (
      <>
         <ErrorBoundary>
            <RandomChar/>
         </ErrorBoundary>
         
         <div className="char__content">
            <ErrorBoundary>
               <CharList onCharSelected={onCharSelected}/>
            </ErrorBoundary>
            
            <ErrorBoundary>
               <CharInfo charId={selectedChar}/>
            </ErrorBoundary>
         </div>
         
         <img className="bg-decoration" src={vision} alt="vision"></img>
      </>
   )
}
export default MainPage;
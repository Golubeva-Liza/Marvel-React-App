import { Component } from 'react';

import Header from '../header/Header';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../char/CharList';
import CharInfo from '../char/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import vision from '../../resourses/vision.png';
import './App.scss';
import './main.scss';

class App extends Component{
   state = {
      selectedChar: null
   }

   onCharSelected = (id) => {
      this.setState({
         selectedChar: id
      })
   }

   render(){
      return ( 
         <div className = "App" >
            <Header />
            <main>
               <RandomChar/>
               <div className="char__content">
                  <CharList onCharSelected={this.onCharSelected}/>
                  <ErrorBoundary>
                     <CharInfo charId={this.state.selectedChar}/>
                  </ErrorBoundary>
               </div>
               
               <img className="bg-decoration" src={vision} alt="vision"></img>
            </main> 
         </div>
      )
   }
}

export default App;
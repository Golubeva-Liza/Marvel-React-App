import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import thor from '../../resourses/thor.jpeg';
import Skeleton from '../skeleton/Skeleton';
import './char.scss';

class Header extends Component {
   state = {
      chars: [],//name, description, thumbnail, homepage, wiki
      loading: true,
      error: false
   }

   marvelService = new MarvelService();

   
   componentDidMount(){
      this.loadChars();
   }

   onCharLoaded = (chars) => {
      this.setState({chars, loading: false});
   }

   onError = () => {
      this.setState({
         loading: false,
         error: true
      })
   }

   loadChars = () => {
      this.setState({
         loading: true
      });
      this.marvelService
         .getAllCharacters()
         .then (this.onCharLoaded)//если в then приходит аргумент и стоит ссылка на функцию (this.onCharLoaded), то аргумент автоматически туда передается
         .catch(this.onError);
   }


   render() {
      const {chars, loading, error} = this.state;   

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinner = loading ? <Spinner/> : null;
      const content = !(loading || error) ? <View chars={chars}/> : null;

      return (
         <div className="char__content">
            <div className="char__list">
               {errorMessage}
               {spinner}
               {content}
               <button className="button button__main button__long">
                  <div className="inner">load more</div>
               </button>
            </div>
   
            <div className="char__info">
               <div className="char__basics">
                  <img src={thor} alt="abyss"/>
                  <div>
                     <div className="char__info-name">thor</div>
                     <div className="char__btns">
                        <a href="#" className="button button__main">
                           <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                           <div className="inner">Wiki</div>
                        </a>
                     </div>
                  </div>
               </div>
               <div className="char__descr">
                  In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
               </div>
               <div className="char__comics">Comics:</div>
               <ul className="char__comics-list">
                  <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                  </li>
                  <li className="char__comics-item">
                        Alpha Flight (1983) #50
                  </li>
                  <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                  </li>
                  <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                  </li>
                  <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                  </li>
                  <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                  </li>
                  <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                  </li>
                  <li className="char__comics-item">
                        Vengeance (2011) #4
                  </li>
                  <li className="char__comics-item">
                        Avengers (1963) #1
                  </li>
                  <li className="char__comics-item">
                        Avengers (1996) #1
                  </li>
               </ul>
               <p className="char__select">Please select a character to see information</p>
               <Skeleton/>
            </div>
      </div>
       )
   }
}

// компоненты разбивают на логические и рендерящие(отображают интерфейс)
const View = ({chars}) => {

   const elements = chars.map(item => {
      const {name, thumbnail, id} = item;
      let imageClassList = 'char__item';

      if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
         imageClassList = `${imageClassList} char__item_empty-img`;
      }
      
      return (
         <li key={id} className={imageClassList}>
            <img src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
         </li>
      )
   });
   
   //динамический блок
   return (
      <ul className="char__grid">
         {elements}       
      </ul>
   )
}
export default Header;
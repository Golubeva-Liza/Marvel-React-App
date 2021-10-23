import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './char.scss';

class CharList extends Component {
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
      const content = !(loading || error) ? <View chars={chars} onCharSelected={this.props.onCharSelected}/> : null;

      return (
            <div className="char__list">
               {errorMessage}
               {spinner}
               {content}
               <button className="button button__main button__long">
                  <div className="inner">load more</div>
               </button>
            </div>
       )
   }
}

// компоненты разбивают на логические и рендерящие(отображают интерфейс)
const View = ({chars, onCharSelected}) => {
   const elements = chars.map(item => {
      const {name, thumbnail, id} = item;
      let imageClassList = 'char__item';

      if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
         imageClassList = `${imageClassList} char__item_empty-img`;
      }

      return (
         <li key={id} className={imageClassList} onClick={() => onCharSelected(id)}>
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
export default CharList;
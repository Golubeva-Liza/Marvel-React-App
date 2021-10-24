import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './char.scss';

class CharList extends Component {
   state = {
      chars: [],//name, description, thumbnail, homepage, wiki
      loading: true,//первичная загрузка
      error: false,
      newLoading: false,//доп загрузка персонажей по кнопке
      offset: 150,
      charEnded: false//если данные закончились, то убираем кнопку загрузки
   }

   marvelService = new MarvelService();

   
   componentDidMount(){
      this.onRequest();//в первый раз вызовется без аргумента, по умолчанию там будет 150
   }

   onRequest = (offset) => {
      this.onNewCharsLoading();
      this.marvelService
         .getAllCharacters(offset)
         .then (this.onCharsLoaded)
         .catch(this.onError);
   }

   onNewCharsLoading = () =>{
      this.setState({
         newLoading: true
      });
   }

   onCharsLoaded = (newChars) => {
      let ended = false;
      if (newChars.length < 9) {
         ended = true
      }
      //зависит от предыдущего state
      this.setState(({offset, chars}) => (
         {
            chars: [...chars, ...newChars],//обновляем персонажей: берем старых и добавляем новых к нему
            loading: false,
            newLoading: false,
            offset: offset + 9,
            charEnded: ended
         }
      ));
   }

   onError = () => {
      this.setState({
         loading: false,
         error: true
      })
   }

   // onCharsLoading = () => {
   //    this.setState({
   //       loading: true
   //    });
   // }
   

   // loadChars = () => {
   //    this.setState({
   //       loading: true
   //    });
   //    this.marvelService
   //       .getAllCharacters()
   //       .then (this.onCharLoaded)//если в then приходит аргумент и стоит ссылка на функцию (this.onCharLoaded), то аргумент автоматически туда передается
   //       .catch(this.onError);
   // }



   render() {
      const {chars, loading, error, newLoading, offset, charEnded} = this.state;   

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinner = loading ? <Spinner/> : null;
      const content = !(loading || error) ? <View chars={chars} onCharSelected={this.props.onCharSelected}/> : null;

      return (
            <div className="char__list">
               {errorMessage}
               {spinner}
               {content}
               <button 
                  className="button button__main button__long"
                  disabled={newLoading}
                  style={{'display': charEnded ? 'none' : 'block'}}
                  onClick={() => this.onRequest(offset)}>
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
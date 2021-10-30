import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './char.scss';

class CharList extends Component {
   state = {
      chars: [],//name, description, thumbnail, homepage, wiki
      loading: true,//первичная загрузка
      error: false,
      newLoading: false,//ставит disabled кнопке, пока данные загружаются после клика на неё
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

   //для установки фокуса на выбранного персонажа
   itemRefs = [];
   setRef = (ref) => {
      this.itemRefs.push(ref);
   }
   focusOnItem = (id) => {
      console.log(this.itemRefs);
      this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
      this.itemRefs[id].classList.add('char__item_selected');
      this.itemRefs[id].focus();
   }


   render() {
      const {chars, loading, error, newLoading, offset, charEnded} = this.state;   

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinner = loading ? <Spinner/> : null;
      const content = !(loading || error) ? <View chars={chars} onCharSelected={this.props.onCharSelected} setRef={this.setRef} focusOnItem={this.focusOnItem}/> : null;

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
const View = ({chars, onCharSelected, setRef, focusOnItem}) => {
   const elements = chars.map((item, i) => {
      const {name, thumbnail, id} = item;
      let imageClassList = 'char__item';

      if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
         imageClassList = `${imageClassList} char__item_empty-img`;
      }

      return (
         <li 
            ref={setRef} 
            key={id} 
            tabIndex={0} 
            className={imageClassList} 
            onClick={() => {
               onCharSelected(id);
               focusOnItem(i);
            }}
            onKeyPress={(e) => {
               if (e.key === ' ' || e.key === "Enter") {
                  onCharSelected(id);
                  focusOnItem(i);
               }
            }}
         >
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

CharList.propTypes = {
   onCharSelected: PropTypes.func
}
export default CharList;
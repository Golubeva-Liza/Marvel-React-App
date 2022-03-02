import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './char.scss';

const CharList = (props) => {

   const [chars, setChars] = useState([]);//name, description, thumbnail, homepage, wiki
   const [loading, setLoading] = useState(true);//первичная загрузка
   const [error, setError] = useState(false);
   const [newLoading, setNewLoading] = useState(false);//ставит disabled кнопке, пока данные загружаются после клика на неё
   const [offset, setOffset] = useState(150);
   const [charEnded, setCharEnded] = useState(false);//если данные закончились, то убираем кнопку загрузки

   const marvelService = new MarvelService();

   //съимулировать componentDidMount поможет useEffect с пустым массивом зависимостей
   useEffect(() => {
      onRequest();//в первый раз вызовется без аргумента, по умолчанию там будет 150
   }, [])

   const onRequest = (offset) => {
      onNewCharsLoading();
      marvelService
         .getAllCharacters(offset)
         .then (onCharsLoaded)
         .catch(onError);
   }

   const onNewCharsLoading = () =>{
      setNewLoading(true);
   }

   const onCharsLoaded = (newChars) => {
      let ended = false;
      if (newChars.length < 9) {
         ended = true
      }
      setChars(chars => [...chars, ...newChars]);//обновляем персонажей: берем старых и добавляем новых к нему
      setLoading(loading => false);
      setNewLoading(newLoading => false);
      setOffset(offset => offset + 9);
      setCharEnded(charEnded => ended)
   }

   const onError = () => {
      setError(true);//тут не важно, что было раньше - произошла ошибка
      setLoading(loading => false);
   }

   //для установки фокуса на выбранного персонажа
   const itemRefs = useRef([]);
   const focusOnItem = (id) => {
      // console.log(this.itemRefs);
      itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
      itemRefs.current[id].classList.add('char__item_selected');
      itemRefs.current[id].focus();
   }

   // компоненты разбивают на логические и рендерящие(отображают интерфейс)
   function renderChars(arr){
      const elements = arr.map((item, i) => {
         const {name, thumbnail, id} = item;
         let imageClassList = 'char__item';
         if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            imageClassList = `${imageClassList} char__item_empty-img`;
         }

         return (
            <li 
               ref={el => itemRefs.current[i] = el} //в массив под номер i записывается el - тот элемент, на котором ref был вызван, то есть li (list-item)
               key={id} 
               tabIndex={0} 
               className={imageClassList} 
               onClick={() => {
                  props.onCharSelected(id);
                  focusOnItem(i);
               }}
               onKeyPress={(e) => {
                  if (e.key === ' ' || e.key === "Enter") {
                     props.onCharSelected(id);
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

   const charItems = renderChars(chars);
   const errorMessage = error ? <ErrorMessage/> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(loading || error) ? charItems : null;

   return (
      <div className="char__list">
         {errorMessage}
         {spinner}
         {content}
         <button 
            className="button button__main button__long"
            disabled={newLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
         </button>
      </div>
   )

}

CharList.propTypes = {
   onCharSelected: PropTypes.func
}
export default CharList;
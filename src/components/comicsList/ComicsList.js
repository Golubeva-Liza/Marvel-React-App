import './comicsList.scss';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {

   const [comics, setComics] = useState([]);//массив объектов
   const [newLoading, setNewLoading] = useState(false);//ставит disabled кнопке, пока данные загружаются после клика на неё
   const [comicsEnded, setComicsEnded] = useState(false);//если данные закончились, то убираем кнопку загрузки
   const [offset, setOffset] = useState(120);
   const {loading, error, getComics} = useMarvelService();


   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
      //если initial = true, значит это первичная загрузка, если повторная
      initial ? setNewLoading(false) : setNewLoading(true);
      getComics(offset)
         .then(onCharsLoaded);
   }
   const onCharsLoaded = (newComics) => {
      let ended = false;
      if (newComics.length < 8) {
         ended = true;
      }
      setComics(comics => [...comics, ...newComics]);//обновляем комиксы: берем старых и добавляем новых к нему
      setNewLoading(newLoading => false);
      setOffset(offset => offset + 9);
      setComicsEnded(charEnded => ended);
   }

   //вывод списка комиксов
   function renderComics(arr){
      const elements = arr.map((item, i) => {
         const {price, thumbnail, id, homepage, title} = item;
         let imageClassList = 'comics__item';
         if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
            imageClassList = `${imageClassList} comics__item_empty-img`;
         }

         return (
            // <li 
            //    ref={el => itemRefs.current[i] = el} //в массив под номер i записывается el - тот элемент, на котором ref был вызван, то есть li (list-item)
            //    key={id} 
            //    tabIndex={0} 
            //    className={imageClassList} 
            //    onClick={() => {
            //       props.onCharSelected(id);
            //       focusOnItem(i);
            //    }}
            //    onKeyPress={(e) => {
            //       if (e.key === ' ' || e.key === "Enter") {
            //          props.onCharSelected(id);
            //          focusOnItem(i);
            //       }
            //    }}
           
            <li 
               className={imageClassList}
               key={id}
               tabIndex={0} 
            >
               <a href={homepage}>
                  <img src={thumbnail} alt={title} className="comics__item-img"/>
                  <div className="comics__item-name">{title}</div>
                  <div className="comics__item-price">{price}$</div>
               </a>
            </li>
         )
      });
      
      return (
         <ul className="comics__grid">
            {elements}       
         </ul>
      )
   }


   const comicsItems = renderComics(comics);
   const errorMessage = error ? <ErrorMessage/> : null;
   const spinner = loading && !newLoading ? <Spinner/> : null;
   return (
      <div className="comics__list">
         {errorMessage}
         {spinner}
         {comicsItems}
         <button 
            className="button button__main button__long"
            disabled={newLoading}
            style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
         >
            <div className="inner">load more</div>
         </button>
      </div>
   )
}

export default ComicsList;
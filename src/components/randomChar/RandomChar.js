import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resourses/mjolnir.png';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomChar = (props) => {

   const [char, setChar] = useState({});//name, description, thumbnail, homepage, wiki
   const {loading, error, getCharacter, clearError} = useMarvelService();

   useEffect(() => {
      updateChar();

      const timerId = setInterval(updateChar, 60000);

      return () => {
         clearInterval(timerId)
      }
   }, []);

   const onCharLoaded = (newChar) => {
      setChar(char => newChar);
   }

   const updateChar = () => {
      clearError(); //если в прошлом запросе по рандомному персу выдало ошибку, то она очистится при нажатии кнопки try it
      const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
      getCharacter(id)
         .then(onCharLoaded);//если в then приходит аргумент и стоит ссылка на функцию (this.onCharLoaded), то аргумент автоматически туда передается
      }

   const errorMessage = error ? <ErrorMessage/> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(loading || error) ? <View char={char}/> : null;
   
   return (
      <div className="randomchar">
         {errorMessage}
         {spinner}
         {content}
         {/* {loading ? <Spinner/> : <View char={char}/>} */}
         <div className="randomchar__static">
            <p className="randomchar__title">
               Random character for today!<br/>
               Do you want to get to know him better?
            </p>
            <p className="randomchar__title">
               Or choose another one
            </p>
            <button onClick={updateChar} className="button button__main">
               <div className="inner">try it</div>
            </button>
            <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
         </div>
      </div>
   )
}

// компоненты разбивают на логические и рендерящие(отображают интерфейс)
const View = ({char}) => {
   const {name, thumbnail, homepage, wiki} = char;
   let {description} = char;

   let imageClassList = "randomchar__img";

   //если нет описания
   if (!description){
      description = 'У данного персонажа нет описания. Нажмите homepage, чтобы узнать о нём больше.';
   }
   //если описание очень большое
   if (description.length > 190){
      description = description.slice(0, 190) + ' ...';
   }

   //если картинки персонажа нет
   if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
      imageClassList = `${imageClassList} randomchar__img_empty`;
   }
   
   //динамический блок
   return (
      <div className="randomchar__block">
         <img src={thumbnail} alt="Random character" className={imageClassList}/>
         <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
               {description}
            </p>
            <div className="randomchar__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
            </div>
         </div>
      </div>
   )
}
export default RandomChar;
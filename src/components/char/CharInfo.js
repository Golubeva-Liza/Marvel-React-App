import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import Skeleton from '../skeleton/Skeleton';
import './char.scss';

const CharInfo = (props) => {

   const [char, setChar] = useState(null);//id, name, description, thumbnail, homepage, wiki
   const {loading, error, getCharacter, clearError} = useMarvelService();

   useEffect(() => {
      updateChar();
   }, [props.charId])
   //будет вызов обновления персонажа тогда, когда поменялся пришедший в пропсы id

   const onCharLoaded = (newChar) => {
      setChar(newChar);
   }

   const updateChar = () => {
      const {charId} = props;
      if (!charId){
         return;
      }

      clearError();

      getCharacter(charId)
         .then(onCharLoaded);
   }

   const skeleton = char || loading || error ? null: <Skeleton/>;
   const errorMessage = error ? <ErrorMessage/> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(loading || error || !char) ? <View char={char}/> : null;
   //если нет загррузки и ошибки, но есть персонаж

   return (
      <div className="char__info">
         {skeleton}
         {errorMessage}
         {spinner}
         {content}
      </div>
      )
}

const View = ({char}) => {
   const {name, description, thumbnail, homepage, wiki, comics} = char;

   let classList = 'char__basics';
   if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"){
      classList = `${classList} char__basics_empty-img`;
   }

   let comicsElements;
   if (comics.length === 0){
      comicsElements = "Комиксов не найдено";
   } else {
      //но если комиксов будет очень много, то такой метод ударит по производительности, тк map по всем элементам все равно пройдет
      //тогда заменить другим методом
      comicsElements = comics.map((item, i) => {
         if (i + 1 > 10){
            return ('')
         }
         return (
            <li key={i} className="char__comics-item">
               {item.name}
            </li>
         )
      })
   }
   

   return (
      <>
         <div className={classList}>
            <img src={thumbnail} alt={name}/>
            <div>
               <div className="char__info-name">{name}</div>
               <div className="char__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="char__descr">
            {description}
         </div>
         <div className="char__comics">Comics:</div>
         <ul className="char__comics-list">
            {comicsElements}
         </ul>
      </>
   )
}

CharInfo.propTypes = {
   charId: PropTypes.number,//валидация, чем должно являться
   //если не будет совпадать с типом, то в консоли выдаст предупреждение
}
//см документацию, там можно проверить с помощью PropTypes на наличие вообще пропса,
//а также задание пропсов по умолчанию

export default CharInfo;
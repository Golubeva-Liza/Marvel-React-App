import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
   const {loading, error, request} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=89726f2c4d7b607d0908d5098be94492';
   const _defaultOffset = 150;
   const _defaultLimit = 9;

   const getAllCharacters = async (offset = _defaultOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);//?
   }

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);//подставляется в char
   }

   const _transformCharacter = (char) =>{
      return {
         id: char.id,
         name: char.name,
         description: char.description,
         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension, //превью
         homepage: char.urls[0].url,
         wiki: char.urls[1].url,
         comics: char.comics.items
      }
   }

   return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;
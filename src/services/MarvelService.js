import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
   const {loading, error, request, clearError} = useHttp();

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

   const getSingleComic = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
   }

   const getComics = async (offset = _defaultOffset) => {
      const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics);
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

   const _transformComics = (comics) =>{
      return {
         id: comics.id,
         title: comics.title,
         descr: comics.description,
         price: comics.prices[0].price,
         thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension, //фото
         homepage: comics.urls[0].url,
         pageCount: comics.pageCount,
         lang: comics.textObjects[0].language,
      }
   }

   return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getSingleComic}
}

export default useMarvelService;
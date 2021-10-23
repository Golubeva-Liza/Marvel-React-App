import img from './error.gif';
const ErrorMessage = () => {
   return (
      //получение статичного файла - используется редко
      // <img src={process.env.PUBLIC_URL + '/...'}/>//ссылка на папку public
      //лучше картинку использовать рядом с компонентом, если она с ним связана
      <img src={img} alt="Error" style={{margin: '0 auto', height: 250 }}/>
   )
}
export default ErrorMessage;
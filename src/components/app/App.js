import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Router - компонент, кот. оборачивает все ссылки и страницы (маршруты), по кот. будет переходить пользователб
import Header from '../header/Header';
import './App.scss';
import './main.scss';
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';

const App = () => {
   
   return ( 
      //маршрутизатор для работы всех страниц и ссылок в пределах одного компонента
      //switch нужен, тк пути проверяются не строго и слэш, означающий главную страницу, входит во всех другие ссылки
      //но он тоже проверяет, есть ли такая часть в строке и выводит первый найденный путь: '/comics' - выведет '/'
      //помимо switch нужно прописать exact - проверяет полное совпадение пути

      //в 6ой версии Switch переименован в Routes и стал более мощным, поэтому exact теперь нет
      //также компонент внутри Route теперь помешается в качестве атрибута element
      <Router>
         <div className = "App" >
            <Header />
            <main>
               <Routes>
                  <Route path='/' element={<MainPage/>}/>
                  <Route path='/comics' element={<ComicsPage/>}/>
                  {/* вручную прописываем этот id */}
                  <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                  <Route path='*' element={<Page404/>}/>
                  {/* звездочка в пути означает, что это любые страницы, кроме вышеперечисленных*/}
               </Routes>
            </main> 
         </div>
      </Router>
   )
}

export default App;
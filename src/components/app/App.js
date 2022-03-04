import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Router - компонент, кот. оборачивает все ссылки и страницы (маршруты), по кот. будет переходить пользователб
import Header from '../header/Header';
import './App.scss';
import './main.scss';
import {MainPage, ComicsPage} from '../pages';

const App = () => {
   
   return ( 
      //маршрутизатор для работы всех страниц и ссылок в пределах одного компонента
      //switch нужен, тк пути проверяются не строго и слэш, означающий главную страницу, входит во всех другие ссылки
      //но он тоже проверяет, есть ли такая часть в строке и выводит первый найденный путь: '/comics' - выведет '/'
      //помимо switch нужно прописать exact - проверяет полное совпадение пути
      <Router>
         <div className = "App" >
            <Header />
            <main>
               <Switch>
                  <Route exact path='/'>
                     <MainPage/>
                  </Route>
                  
                  <Route exact path='/comics'>
                     <ComicsPage/>
                  </Route>
               </Switch>
            </main> 
         </div>
      </Router>
   )
}

export default App;
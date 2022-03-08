import { Link, NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
      <header className="app__header">
         <h1 className="app__header-title">
               <Link to="/">
                  <span>Marvel </span>
                  information portal
               </Link>
         </h1>
         <nav className="app__header-menu">
            {/* в шестой версии exact у NavLink переименован в end */}
            {/* также были удалены activeStyle и activeClassName */}
            {/* isActive - автоматический параметр */}
            <ul>
               <li><NavLink end style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} to="/">Characters</NavLink></li>
               /
               {/* здесь убрали end, чтобы у страниц, вложенных в comics, тоже подсвечивалась активная страница */}
               <li><NavLink style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} to="/comics">Comics</NavLink></li>
            </ul>
         </nav>
      </header>
    )
}
export default Header;

//когда происходит клик по Link, то Router замечает это действие и ищет подходящий Route (path)
//NavLink - позволяет добавлять класс активности на активную ссылку (как в меню)
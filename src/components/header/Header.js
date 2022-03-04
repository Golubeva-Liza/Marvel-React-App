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
            <ul>
               <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/">Characters</NavLink></li>
               /
               <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/comics">Comics</NavLink></li>
            </ul>
         </nav>
      </header>
    )
}
export default Header;

//когда происходит клик по Link, то Router замечает это действие и ищет подходящий Route (path)
//NavLink - позволяет добавлять класс активности на активную ссылку (как в меню)
//activeStyle={{}} или activeClassName="fsfsfs"
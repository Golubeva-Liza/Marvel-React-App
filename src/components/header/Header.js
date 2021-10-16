import './header.scss';

const Header = () => {
    return (
      <header className="app__header">
         <h1 className="app__header-title">
               <a href="#">
                  <span>Marvel </span>
                  information portal
               </a>
         </h1>
         <nav className="app__header-menu">
               <ul>
                  <li><a href="#">Characters</a></li>
                  /
                  <li><a href="#">Comics</a></li>
               </ul>
         </nav>
      </header>
    )
}
export default Header;
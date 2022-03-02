import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class Form extends Component {
   // constructor(props) {
   //    super(props);
   //    this.myRef = React.createRef();//теперь её нужно присвоить к нужному элементу
   // }
   //можно убрать конструктор и оставить просто myRef
   //рефы можно создавать сколько угодно

   //как сделать, чтобы при запуске приложения устанавливался фокус на первый инпут?
   //ref - ссылка на элемент или компонент в dom дереве, отрисованном элементе на странице. есть на него ссылка и мы можем с ним что-то сделать
   // componentDidMount(){
   //    this.myRef.current.focus();//focus - dom api
   // }//вызывается после рендер, когда верстка готова
   //ссылка хранится в свойстве current
   
   //ref можно навесить на компонент, тогда создастся ссылка на экземпляр
   //отписку от ref делать не нужно, как с обработчиками событий (удаляем в componentWillUnmount), тк в таком случае в this.myRef просто установится null


   //другой способ создания рефов (без React.createRef())
   setInputRef = (elem) => {
      this.myRef = elem;
   }
   focusFirstTI = () => {
         this.myRef.focus();//тогда здесь не будет current при колбэк рефе
      }

   // focusFirstTI = () => {
   //    this.myRef.current.focus();
   // }
   
   state = {
      advOpen: false
   }

   handleClick = () =>{
      console.log('click');//повесим на форму, но будет срабатывать и на подсказке, не смотря на то, что в dom она находится вне формы
      this.setState(({advOpen}) => ({
         advOpen: !advOpen
      }))
   }
   //появляется реклама через 3 секунды, как загрузилась форма
   componentDidMount(){
      setTimeout(this.handleClick, 3000)
   }

   //таким образом, появляение рекламы зависит от формы, при этом в дом находясь в вообще другом месте
   

   render() {
      return (
         <Container>
            <form onClick={this.handleClick} className="w-50 border mt-5 p-3 m-auto" style={{'overflow': 'hidden', 'position': 'relative'}}>
               <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                  {/* создана ссылка ref*/}
                  <input ref={this.setInputRef} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                  {/* <TextInput ref={this.myRef}/> */}
               </div>
               <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
               </div>
               {
                  this.state.advOpen ? 
                     <Portal>
                        <Msg/>
                     </Portal> : null
               }
               
            </form>
         </Container>
      )
   }
}

//хотим отрендерить компонент в другом месте dom, при этом не нарушая структуру внутри react (где был прописан, там и останется)
//создание портала
const Portal = (props) => {
   const node = document.createElement('div');
   document.body.appendChild(node);//вне div class="root", куда мы рендерим все приложение (под ним)

   return ReactDOM.createPortal(props.children, node);//что рендерим и куда
}
//props.children - те компоненты, которые будут внутри portal

const Msg = () => {
   return(
      <div 
         style={{'width': '500px', 
                  'height': '150px', 
                  'backgroundColor': 'red', 
                  'position': 'absolute', 
                  'right': '0', 
                  'bottom': '0'}}>
         Hello
      </div>
   )
}



//.........................................................
//ref нельзя назначать на функциональные компоненты
//выскочит ошибка, тк функциональные компоненты не создают экземпляров.
// const TextInput = () => {
//    return (
//       <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
//    )
// }

class TextInput extends Component {
   doSmth = () => {
      console.log('smth');
      //вот здесь прописать установка фокуса
   }

   render(){
      return (
         <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
      )
   }
}
//но на экземпляре компонента нельзя напрямую вызвать dom api, например, установку фокуса, тк это будет уже обращение к объекту, а не dom элементу
//поэтому метод по установке фокуса надо прописывать уже в самом компоненте

// и тогда там будет не фокус, а так: вызываем метод компонента с установкой фокуса
// componentDidMount(){
//    this.myRef.current.doSmth();
// }

function App() {
   return ( 
      <Form/>
   );
}

export default App;
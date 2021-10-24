import { Component } from "react";
import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
   state = {
      error: false
   }

   // static getDerivedStateFromError(error){
   //    return {error: true};
   // }//обновляет state

   componentDidCatch(error, errorInfo){
      console.log(error, errorInfo);
      this.setState({
         error: true
      })
   }

   render () {
      if (this.state.error){
         return <ErrorMessage/>
      }

      return this.props.children;//компонент, который был передан сюда вовнутрь
   }
}

export default ErrorBoundary;

//предохранители ловят не все ошибки. он ловят ошибки при запуске рендер, в методах жизненного цикла и в конструкторах дочерних компонентах (компонентах, которые были переданы внутри компонента-предохранителя)

//они не ловят ошибки, которые:
//- произошли внутри обработчиков событий (тк вне рендера)
//- асинхронные операции
//- в самом предохранителе


//степень охвата кода - на наше усмотрение, но мелкие компонента нет смысла оборачивать
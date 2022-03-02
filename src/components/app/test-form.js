import { useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

//пользовательские хукки - механизм повторного использования логики с состоянием, состояния и эффекты внутри него полностью изолированы
//их лучше называть с use

function useValidateInput(initialValue) {
   const [value, setValue] = useState(initialValue);

   const onChange = e => {
      setValue(e.target.value);
   }

   const validateInput = () => {
      return value.search(/\d/) >= 0;
   }

   return {value, onChange, validateInput}; //{value: value, onChange: onChange}
}



const Form = () => {
   // const [text, setText] = useState('');
   // const [textArea, setTextArea] = useState('');
   //если полей ввода очень много, то придется повторять большое количество кода

   const emailInput = useValidateInput('');
   const textArea = useValidateInput('');
   //валидация значения поля email
   // const validateInput = (value) => {
   //    return value.search(/\d/) >= 0; //true или false, можно с помощью тернарного оператора
   // }

   const validateColor = emailInput.validateInput() ? 'text-danger' : null;

   return (
      <Container>
         <form className="w-50 border mt-5 p-3 m-auto">
               <div className="mb-3">
                  <input value={`${emailInput.value} / ${textArea.value}`} type="text" className="form-control" readOnly/>
                  <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                  <input 
                     onChange={emailInput.onChange} 
                     type="email" 
                     value={emailInput.value}//при изменении значения поля input сазу подставляем актуальное значение
                     className={`form-control ${validateColor}`} 
                     id="exampleFormControlInput1" 
                     placeholder="name@example.com"/>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                  <textarea 
                     onChange={textArea.onChange}
                     value={textArea.value}
                     className="form-control" 
                     id="exampleFormControlTextarea1" 
                     rows="3">
                  </textarea>
               </div>
         </form>
      </Container>
   )
}

function App() {
    return (
        <Form/>
    );
}

export default App;

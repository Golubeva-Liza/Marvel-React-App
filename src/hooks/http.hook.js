import { useState, useCallback } from "react";

//собственный хук по работе с запросами на сервер
export const useHttp = () => {
   const [loading, setLoading] = useState(false);//включается, когда идет запрос
   const [error, setError] = useState(null);//включается, когда запрос произошел с ошибкой

   const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
      
      //перед тем, как отправить запрос, вкл загрузку
      setLoading(true);

      try{
         const response = await fetch(url, {method, body, headers});

         if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
         }

         const data = await response.json();

         //данные получены
         setLoading(false);
         return data;

      } catch (e){
         setLoading(false);
         setError(e.message);//текст ошибки
         throw e;
      }
   }, []);


   //очищает ошибки. чтобы, если есть ошибка, мы могли дальше пользоваться приложением. иначе ничего работать после нее не будет
   const clearError = useCallback(() => setError(null), []);

   return {loading, error, request, clearError};
}

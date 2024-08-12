import { useState } from 'react'
import ReactDOM from 'react-dom';

export const useGetSearch = (searchString = "", limit = 0) => {

    const [error, setError] = useState(null)

    const getSearch = async (searchString = "", limit = 0) => {
      
          let arrayFromString = Array.from(searchString);
              arrayFromString[0] = arrayFromString[0].toUpperCase()
        const complateString = arrayFromString.join('')  
        
        if(complateString.length < 1) {
          return { data: [], textFromBack: "Введите текста для поиска", url: ""}
        }

        if(complateString.length == 1 || complateString.length >= 1) {
        
          try {
              const url = `https://gruzomir25.ru/api/products?populate=*&filters[$or][0][title][$startsWith]=${complateString}&filters[$or][1][article]][$startsWith]=${complateString}`;
              const response = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}` //  Замените на ваш ключ
                }
              });
            
              if (response.ok) { //  Проверяем, что запрос прошел успешно
                const data = await response.json();
                return { data: data, textFromBack: 'Я должен отрисовать данные по title', url: url, complateString: complateString.length };
              } else {
                //  Обрабатываем ошибку
                console.error("Ошибка запроса:", response.status);
                return { data: [], textFromBack: "Ошибка запроса" };
              }
          } 
          catch (error) {
            console.error("Ошибка:", error);
            return { data: [], textFromBack: "Произошла ошибка" };
          }
        }
    }

    return { getSearch, error }
    
}
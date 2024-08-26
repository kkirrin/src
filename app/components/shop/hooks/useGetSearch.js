import { useState } from 'react';
import ReactDOM from 'react-dom';

export const useGetSearch = (searchString = "", limit = 0) => {
  const [error, setError] = useState(null);

  const getSearch = async (searchString = "", limit = 0) => {
    let arrayFromString = Array.from(searchString);
    arrayFromString[0] = arrayFromString[0].toUpperCase();
    const complateString = arrayFromString.join('');

    if (complateString.length < 1) {
      return { data: [], textFromBack: "Введите текста для поиска", url: "" };
    }

    if (complateString.length == 1 || complateString.length >= 1) {
      const result = queryString(complateString);
      return result;
    }
  };

  async function queryString(complateString, iteration = 1) {
    if (iteration <= 3) {
      try {
        let url = `https://gruzomir25.ru/api/products?populate=*&filters[$or][0][title][$startsWith]=${complateString}&filters[$or][1][title][$contains]=${complateString}&filters[$or][2][article][$containsi]=${complateString}`;
        let response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}` //  Замените на ваш ключ
          }
        });

        if (response.ok) { 
          let data = await response.json();
          if (data.length !== 0) {
            return { data: data, textFromBack: 'Я должен отрисовать данные по title', url: url, complateString: complateString.length };
          } else {
            // Удаляем последний символ и делаем новый запрос
            complateString = complateString.slice(0, -1); 
            return queryString(complateString, iteration++);
          }

        } else {
          //  Обрабатываем ошибку
          console.error("Ошибка запроса:", response.status);
          return { data: [], textFromBack: "Ошибка запроса" };
        }
      } catch (error) {
        console.error("Ошибка:", error);
        return { data: [], textFromBack: "Произошла ошибка" };
      }
    } else {
      return false;
    }
  }

  return { getSearch, error };
};
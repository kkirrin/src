'use client'

import Image from 'next/image'

import { useEffect, useState, useRef } from 'react'
import { useStater } from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import styles from '@/app/css/search.module.css'
import Link from 'next/link'
import { useGetSearch } from './shop/hooks/useGetSearch'
import React from 'react'

export const SearchForm = ({}) => {
    
    const [text, setText] = useState('')
    const [results, setResults] = useState([]);
    console.log(text)

    

    const products = useStater('products')
    const [loading, setLoading] = useState(false) //пока на будущее

    const {getSearch} = useGetSearch();
    const cleanedText = text.replace(/[,/.?!;:/]/g, '');
    
    const setVisible = (visible) => {
      if( !visible ) {
        document.querySelector('.seacrhResultsContainer').style.display = "none";
        console.log(document.querySelector('.seacrhResultsContainer'));
      }
    }
    const timeoutIdRef = useRef(null);

    //  Обновляем getResults, чтобы он вызывался при изменении cleanedText
    useEffect(() => {
        if (cleanedText.length > 1 && results.length === 0) {
            cleanedText.slice(0, -1)
            getResults();
        }
    }, [cleanedText, results]); 

    async function getResults() {
        if (cleanedText.length < 1) {
          setResults([]);
          return;
        }
        if(cleanedText.length === 0) {
          setResults([]);
          return;
        }
       try {

         const result = await getSearch(cleanedText, 0)
         const { data, textFromBack, url, complateString } = result;

         console.log(cleanedText.length)
         if (data.length === 0 && cleanedText.length > 1) {
            const newCleanedText = cleanedText.slice(0, -1);
            setText(newCleanedText); 
            console.log(newCleanedText)
            
          }

        if (data.length === 0) {
            setResults([]);
            return; 
        }
         
         
         console.log(`Данные: ${data}`)
         console.log(`Данные пришли с текстом: ${textFromBack}`)
         console.log(`Данные пришли с url: ${url}`)
         console.log(`Длина complateString: ${complateString}`)
         
         setResults(await data.data)
         console.log(data.data)

         

       } catch {
         console.error("Ошибка при получении результатов поиска");
       }
    }

    async function goToResult() {
        await setTimeout(() => {
            setResults([]);
            console.log(results)

            
        
            setText('');
            console.log(setText)
            
        })
    }

    useEffect(() => {
        console.log("ЗДОРОВААА")
        console.log(`Results: ${results}`)
        console.log(results)
        
    },[results])

    useEffect(() => {
        // Дебаунсинг: очищаем предыдущий таймаут
        clearTimeout(timeoutIdRef.current);
      
        // Дебаунсинг: устанавливаем новый таймаут
        timeoutIdRef.current = setTimeout(() => {
          getResults(); 
        }, 500); // Задержка 500 мс
      
        // Очистка таймаута при размонтировании компонента
        return () => clearTimeout(timeoutIdRef.current);
      }, [text]); 

    return(
        <section className = {`${styles.searchContainer}`} onBlur={() => setVisible(false)}>
            <div className={`${styles.searchForm}`}>
                <div className = {`${styles.searchIcon}`} >
                    <Image  unoptimized src = {'/graySearchIcon.svg'} alt = {'Иконка поиска'} fill />
                </div>    
                <input type='text' placeholder='Поиск' value={text} onChange={(e) => {setText(e.target.value); }} />
             </div>   

             {
                !results[0] ? '' : (<section className = {`${styles.searchResultsContainer}`}>
                    {
                        results.map( (item, index) => {
                            return(
                                <Link key = {`resultSearch_key_${index}_${item.id}`} onClick = {goToResult} className = {`${styles.resultItem}`} href = {`/routes/shop/${item.id}`}>
                                    <h3>{item.attributes.title}</h3>
                                </Link>
                            )
                        })
                    }
                    </section>)
             }
        </section>
    )
}
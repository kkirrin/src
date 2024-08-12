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

    debugger

    const products = useStater('products')
    const [loading, setLoading] = useState(false) //пока на будущее

    const {getSearch} = useGetSearch();
    const cleanedText = text.replace(/[,.?!;:]/g, '');
    
    const setVisible = (visible) => {
      if( !visible ) {
        document.querySelector('.seacrhResultsContainer').style.display = "none";
        console.log(document.querySelector('.seacrhResultsContainer'));
      }
    }
    const timeoutIdRef = useRef(null);

    async function getResults() {
        if(cleanedText.length < 1) {
            setResults([]);
            return;
        }
        if(cleanedText.length === 0) {
          setResults([]);
          return;
        }
       
        
            // Начальное значение состояния results
            let tempresults = [];
            
            const {data, textFromBack, url, complateString} = await getSearch(cleanedText, 0)
            console.log(data, complateString)

            debugger
            
            console.log(`Данные: ${data}`)
            console.log(`Данные пришли с текстом: ${textFromBack}`)
            console.log(`Данные пришли с url: ${url}`)
            console.log(`Длина complateString: ${complateString}`)
            
            setResults(await data.data)
            console.log(data.data)

            debugger
       
    }

    async function goToResult() {
        await setTimeout(() => {
            setResults([]);
            console.log(results)

            debugger
        
            setText('');
            console.log(setText)
            debugger
        })
    }

    useEffect(() => {
        console.log("ЗДОРОВААА")
        console.log(`Results: ${results}`)
        console.log(results)
        debugger
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
'use client'

import React, { use, useEffect, useState } from 'react'

import {useStater} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

import styles from '@/app/css/shop.module.css'
import {useParams} from "next/navigation";
import {ProductCard} from "@/app/components/shop/ProductCard";
import {Loader} from "@/app/components/micro/Loader";

const Pagintaion = ({pageNumber = 1, setPageNumber = f => f, maxPages = 1}) => {

    const [mobile, setMobile] = useState(false)
    const [selectPage, setSelectPage] = useState(1);
    const [step, setStep] = useState(9);

    useEffect(() => {
    },[selectPage])

    useEffect(() => {
        setSelectPage(pageNumber)
    },[pageNumber])

    useEffect(() =>{
        if(window) {
            if(window.innerWidth > 900) {
                setStep(9)
            } else {
                setStep(3)
            }
        }
        if(window) {
            if(window.innerWidth > 900) {
                setMobile(false)
            } else {
                setMobile(true)
            }
        }
    })

    return(
        <>

            <div className={styles.pagination} role = "navbar">
 
                <button

                    onClick = {
                                () => {
                                    if(!mobile){
                                        if(selectPage > 1)
                                            setSelectPage(selectPage - 1)
                                    }
                                }
                            }
                    onTouchEnd={() => {
                                if(selectPage > 1)
                                    setSelectPage(selectPage - 1)
                            }}
                    key = {`key_pagination_-1`}>{"<"}

                </button>
                    
                
                {
                    [...Array(step)].map((item, index) => {

                            return <button

                                    key = {`key_pagination_${index}`}

                                    onClick={() => {

                                        if(!mobile){
                                              if(index+selectPage < (maxPages+1)) setPageNumber((pageNumber != 1) ? index + selectPage : index + 1);
                                        }
                    
                                    }}

                                    onTouchEnd={() => {

                                        if(index+selectPage < (maxPages+1))
                                        setPageNumber((pageNumber != 1) ? index + selectPage : index + 1);
                                    
                                    }}

                                    style = {{

                                        visibility: ((index+selectPage) <= maxPages) ? "visible" : "hidden",
                                        pointerEvents: ((index+selectPage) <= maxPages) ? "all" : "none",
                                        backgroundColor: ((index+selectPage) <= maxPages && selectPage == (index+selectPage)) ? "#bbbcbf" : null,

                                    }}

                                    className={`${(selectPage == (index+selectPage)) ? styles.activePagination : styles.noActivePagination} ${(index+selectPage+1 > maxPages) ? styles.noHavePage : ''}`}>

                                    {(selectPage == 1) ? index+1 : index + selectPage}

                            </button>
                    }) 
                }

               <button
                    onClick = {
                                () => {

                                    if(!mobile){
                                        if(selectPage < maxPages) setPageNumber(pageNumber + 1)
                                    }
                                }
                            }
                    onTouchEnd={() => {
                                if (selectPage < maxPages)  setPageNumber(selectPage + 1)
                            }}
                    key = {`key_pagination_-2`}>{">"}

                </button>
                
            </div>
        </>
    )
}

export default  Pagintaion;


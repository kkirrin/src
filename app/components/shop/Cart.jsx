'use client'

import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useStater } from '@/hooks/useStater';
import { useActions } from '@/hooks/useActions';

import styles from '@/app/css/cart.module.css'

export const Cart = ({}) => {

    const data = useStater('cart');

    const [scroll, setScroll] = useState(0);
    const [showFixCart, setShowFixCart] = useState(true);

    useEffect(() => {

        if(window) {
            window.addEventListener('scroll', () => {
                setScroll(window.scrollY);
            });

            return () => {
                window.removeEventListener('scroll',()=>{});
            }
        }
    },[])

    useEffect(() => {

    },[scroll])

    useEffect(() => {
        console.log(typeof data != 'undefined' &&  typeof data.data != 'undefined')
    },[data.length])

    useEffect( () => {},[data,scroll])

    return(
        <>
        <Link className = {`${styles.link}`} href = "/routes/shop/cart" >
            <div key = {`headerCartKey`} className = {`${styles.headerCart} ${styles.cartIcon}`}>
                    <QuntityCard quantityItems={data.length}/>
                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
            </div>
        </Link>
            {
                (showFixCart) ?
                             <Link className = {`${styles.link}`} href = "/routes/shop/cart" >
                                <div key = {`fixedCartKey`} className = {`${styles.fixedCart} ${styles.cartIcon}`}>
                                    <QuntityCard quantityItems={data.length}/>
                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                             </Link>  
                              : null
            }
        </>
    )
}

const QuntityCard = ({quantityItems}) => {
 
    useEffect(() => {},[quantityItems])
    return(
        <>
            <p key = {`counterKeys_${quantityItems}`} className = {`${styles.countItems}`}>{quantityItems}</p>
        </>
    )
}

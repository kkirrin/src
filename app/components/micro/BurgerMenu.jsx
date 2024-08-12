'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'

import styles from '@/app/css/header.module.css'

import {NavigationBar} from '@/app/components/micro/Navigation'

const BurgerMenu = () => {

    const [open, setOpen] = useState(false)

    return(
        <>
            <div onClick = {() => setOpen(!open)} className = {`${styles.burgerIcon}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className = {`${styles.burgerContainer} ${(open) ? styles.openBurger : styles.closedBurger}`}>
                <div onClick = {() => setOpen(!open)} className = {`${styles.burgerIcon}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className = {`${styles.logoContainer}`}>
                    <div className = {`${styles.imgContainer }`}>
                        <Image  unoptimized alt = "Логотип компании грузомир" src = "/logo.png" fill/>
                    </div>
                    <h4>Грузомир</h4>
                </div>
                <NavigationBar burgerSetter = {setOpen} />
            </nav> 
        </>
    ) 
}

export default BurgerMenu;

'use client'

import React, {useState,useEffect, useRef} from 'react';
import Image from 'next/image'
import Link from "next/link"

import { useStater } from '@/hooks/useStater'
import { useActions } from '@/hooks/useActions'

import styles from '@/app/css/header.module.css'

import { CallBack } from '@/app/components/micro/CallBack';
import { Cart } from '@/app/components/shop/Cart'
import { SearchForm } from '@/app/components/SearchForm'
import { NavigationBar } from '@/app/components/micro/Navigation';
import   BurgerMenu from '@/app/components/micro/BurgerMenu'


export const Header = ({}) => {

  const state = useStater('pages');

  return(
    <header className = {`${styles.headerContainer}`}>
      <Link href = "/">
          <div className = {`${styles.logoContainer}`}>

            <div className = {`${styles.imgContainer }`}>
              <Image  unoptimized alt = "Логотип компании грузомир" src = "/logo.png" fill/>
            </div>
            <h4>Грузомир</h4>
          </div>
      </Link>

      <div className = {`${styles.burgerContainerIcon}`}>
        <BurgerMenu />
      </div>

      <NavigationBar place = {'header'}/>
      <Cart />
      <SearchForm />
      <CallBack />

    </header>
  )
}

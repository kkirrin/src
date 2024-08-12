'use client'

import Image from 'next/image'
import React, {useState, useEffect} from "react"
import Head from 'next/head'

import styles from '@/app/css/mainpage.module.css'

import {useActions} from "@/hooks/useActions";

import { ProductRow } from './components/shop/ProductRow'
import { Slider } from './components/Slider'
import { Partners } from './components/Partners'
import { Services } from './components/Services'
import { Forms } from './components/Forms'
import {useStater} from "@/hooks/useStater";

export default function Home() {

  const {setProducts} = useActions()

  const [statusLoad, setStatusLoad] = useState(false);

  const products = useStater('products')


  useEffect(() => {

  })

  return (
    <>
    <Head>
      <title>Грузомир - главная страница магазин запчастей</title>
    </Head>

    <main className={styles.main}>

      <Slider />

      <Partners />

      <Services place = "main" />

      <ProductRow place = "main" />

      <Forms place = "main" />

    </main>
    </>
  )
}

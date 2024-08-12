'use client'
import React, {Suspense} from 'react'
import Image from 'next/image'
import Head from 'next/head'

import styles from '@/app/css/mainpage.module.css'

import {useRouter} from 'next/navigation'

import {useGetCategoriesQuery} from "@/redux/api/categories.api";

import { Forms } from '@/app/components/Forms'
import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";
import {useGetContactsQuery} from "@/redux/api/pages.api";



const data = [
  {
    name: 'Режим работы',
    html: `
          <span>Без перерывов</span></br>
          <p>Пн-Пт с 9:00 до 18:00</p></br>
          <p>Сб-Вс с 9:00 до 14:00</p></br>
    `,
  },
  {
    name: 'Реквизиты',
    html: `<span>
            ООО "Грузомир"Дальневосточный банк ПАО
            ”Сбербанк России”, г. Уссурийск
          </span></br>
            <p><strong>ИНН</strong> 250 809 6440 </p>
            <p><strong>КПП</strong> 250 801 001 </p>
            <p><strong>БИК</strong> 040 813 608 </p>
            <p><strong>К/с</strong> 301 018 106 000 000 00608 </p>
            <p><strong>Р/с</strong> 407 028 104 501 800 15923 </p
            `,
  },
  {
    name: 'Адрес',
    html: `
          <p>
             г. Чочва, р-н Пупкина, ул. Затупкина
          </p> `,
  },
  {
    name: 'Телефон',
    html: `
          <p>
            8 (999) 999 - 99 - 99
          </p> `,
  },
  {
    name: 'Почта',
    html: `
          <p>
            Info@gmail.com
          </p> `,
  },
]

export default function Page({}) {

  const {isLoading, error, data} = useGetContactsQuery();

  const router = useRouter();

  useEffect(() => {console.log(typeof data != 'undefined' &&  typeof data.data != 'undefined')},[data])

  return (
    <>
      <Head>
        <title>Грузомир - страница контакты починить грузовик</title>
      </Head>
    <main className={`${styles.main} ${styles.contentpage}`}>

      <section className={`${styles.mapContainer}`}>
        {
          (isLoading) ? <Loader />
                      : (typeof data != 'undefined' &&  typeof data.data != 'undefined') ? <Suspense fallback={<Loader />}><iframe src={`${data.data.attributes.MapLink}`} frameBorder="1" allowFullScreen="true"></iframe></Suspense>
                      : <h3>Ошибка получения данных: Страница: Контакты</h3>
        }
        {
          (isLoading) ? <Loader />
              : (typeof data != 'undefined' &&  typeof data.data != 'undefined') ? <Suspense fallback={<Loader />}><iframe src={`${data.data.attributes.tourLink}`} frameBorder="1" allowFullScreen="true"></iframe></Suspense>
                  : <h3>Ошибка получения данных: Страница: Контакты</h3>
        }
      </section>

      <section className={`${styles.conactsContainer}`}>
        {
          (isLoading) ? <Loader />
                      : (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                         <>
                          <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data.attributes.id}>
                            <div className = {`${styles.wrapperTitle}`}>
                              <h2 className={`${styles.infoTitle}`}>Время работы</h2>
                            </div>
                            <div className = {`${styles.wrapperInfoContent}`}>
                              <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data.attributes.worktime}}></div>
                            </div>
                          </section>
                           <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data.attributes.id}>
                             <div className = {`${styles.wrapperTitle}`}>
                               <h2 className={`${styles.infoTitle}`}>Реквизиты</h2>
                             </div>
                             <div className = {`${styles.wrapperInfoContent}`}>
                               <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data.attributes.requisites}}></div>
                             </div>
                           </section>
                           <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data.attributes.id}>
                             <div className = {`${styles.wrapperTitle}`}>
                               <h2 className={`${styles.infoTitle}`}>Адрес</h2>
                             </div>
                             <div className = {`${styles.wrapperInfoContent}`}>
                               <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data.attributes.adress}}></div>
                             </div>
                           </section>
                           <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data.attributes.id}>
                             <div className = {`${styles.wrapperTitle}`}>
                               <h2 className={`${styles.infoTitle}`}>Телефоны</h2>
                             </div>
                             <div className = {`${styles.wrapperInfoContent}`}>
                               <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data.attributes.phone}}></div>
                             </div>
                           </section>
                           <section className={`${styles.infoContainer} ${styles.infoSection}`} key={data.data.attributes.id}>
                             <div className = {`${styles.wrapperTitle}`}>
                               <h2 className={`${styles.infoTitle}`}>Эл. почты</h2>
                             </div>
                             <div className = {`${styles.wrapperInfoContent}`}>
                               <div className={`${styles.infoContent}`} dangerouslySetInnerHTML={{__html: data.data.attributes.email}}></div>
                             </div>
                           </section>
                         </>
                        : <h3>Ошибка получения данных: Страница: Контакты</h3>


        }
      </section>

      <Forms type = 'main' />

    </main>
    </>
  )
}

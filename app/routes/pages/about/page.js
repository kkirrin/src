'use client'

import Image from 'next/image'
import Head from 'next/head'

import {useEffect} from "react";
import {useRouter} from 'next/navigation'
import {useGetAboutAsQuery} from "@/redux/api/pages.api";

import styles from '@/app/css/mainpage.module.css'

import {Loader} from "@/app/components/micro/Loader";

const data = [
  {
    name: '> 5 лет',
    desc: 'Опыта успешной работы',
  },
  {
    name: '> 1000',
    desc: 'Довольных клиентов',
  },
  {
    name: '> 10 000',
    desc: 'Запчастей в наличии и с доставкой',
  }
]

const imageData = [
  ,
  '/noImage.svg',
]

export default function Page({}) {

  const {isLoading, error, data} = useGetAboutAsQuery();
  const router = useRouter();

  useEffect(() => {
      console.log(typeof data != 'undefined' &&  typeof data.data != 'undefined')
  },[data])

  return (
    <>
        <Head>
            <title>Грузомир - страница о нас запчасти для грузовиков </title>
        </Head>
    <main className={`${styles.main} ${styles.contentpage}`}>

        <div className = {`${styles.upBlock}`}>

                    <div className = {`${styles.left}`}>
                        <h2>Уверенность в дороге начинается <br /> с<strong> качественных запчастей </strong></h2>
                    </div>
                    <div className = {`${styles.right}`}>
                        <p>
                           Мы занимаемся продажей автозапчастей более 5 лет и можем гарантировать качество отпускаемой продукции!
                        </p>
                    </div>

        </div>

        <section className = {`${styles.advantagesContainer}`}>
            {
                (isLoading) ? <Loader /> :
                    (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                        <div className = {`${styles.advantageItem}`} key = {`keyAdvantages_${data.id}`}>
                            <h3> {">"} {data.data.attributes.oneNumber} лет</h3>
                            <p>{data.data.attributes.firstText}</p>
                        </div>
                        : <h3>Ошибка получения данных</h3>
            }
            {
                (isLoading) ? <Loader /> :
                    (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                        <div className = {`${styles.advantageItem}`} key = {`keyAdvantages_${data.id}`}>
                            <h3> {">"} {data.data.attributes.secondNumber} </h3>
                            <p>{data.data.attributes.secondText}</p>
                        </div>
                        : <h3>Ошибка получения данных</h3>
            }
            {
                (isLoading) ? <Loader /> :
                    (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                        <div className = {`${styles.advantageItem}`} key = {`keyAdvantages_${data.id}`}>
                            <h3> {">"} {data.data.attributes.threeNumber} </h3>
                            <p>{data.data.attributes.threeText}</p>
                        </div>
                        : <h3>Ошибка получения данных</h3>
            }
        </section>

        <section className = {`${styles.imagesPageContainer}`}>
            {
                (isLoading) ? <Loader /> :
                     (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                              <article className = {`${styles.imageItem}`} key = {`keyImage_${data.id}`}>
                                  <Image  unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes.firstImage.data.attributes.url}`} alt = {`altImage_${data.id}`} fill/>
                              </article>
                            : <article className = {`${styles.imageItem}`} key = {`keyImage_BADIMAGE`}>
                                  <Image  unoptimized src = {'/noImage.svg'} alt = {`altImage_${'Нет изображения. Проверьте соединение'}`} width = {50} height={50}/>
                              </article>

            }
            {
                (isLoading) ? <Loader /> :
                    (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                        <article className = {`${styles.imageItem}`} key = {`keyImage_${data.id}`}>
                            <Image  unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes.secondImage.data.attributes.url}`} alt = {`altImage_${data.id}`} fill/>
                        </article>
                        : <article className = {`${styles.imageItem}`} key = {`keyImage_BADIMAGE`}>
                            <Image  unoptimized src = {'/noImage.svg'} alt = {`altImage_${'Нет изображения. Проверьте соединение'}`} width = {50} height={50}/>
                        </article>

            }
         </section>

        <div 
            dangerouslySetInnerHTML={{__html:  (isLoading) ? '' : (typeof data != 'undefined' &&  typeof data.data != 'undefined')  ? `${data.data.attributes.undertext}` : ' Ошибка получения данных. Проверьте интернет'}}
            className = {`${styles.fullText}`}>
        </div>

    </main>
    </>
  )
}

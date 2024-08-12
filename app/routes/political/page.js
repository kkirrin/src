'use client'

import Image from 'next/image'
import Head from 'next/head'

import styles from '@/app/css/mainpage.module.css'

import {useRouter} from 'next/navigation'

export default function Page({}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Грузомир - Политика конфиденциальности ремонт грузовиков</title>
      </Head>
      <main className={`${styles.main} ${styles.contentpage}`}>
        <h3>Политика конфиденциальности</h3>

      </main>
    </>
  )
}

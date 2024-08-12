'use client'

import '@/app/css/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//Redux
import {ReduxWrapper} from "@/app/ReduxWrapper"
//Components
import {Header} from  "@/app/components/main/Header"
import {Footer} from "@/app/components/main/Footer"


export default function RootLayout({ children }) {
  return (
    <ReduxWrapper>
      <html lang="ru">
        <title>Грузомир – Запчасти для грузовиков. Широкий ассортимент, низкие цены</title>
        <meta name="description" content="'Грузомир' - специализированный интернет-магазин запчастей для грузовых автомобилей. Широкий ассортимент оригинальных и неоригинальных деталей от ведущих производителей по доступным ценам. Быстрая доставка по России. Гарантия качества." />
        <body className={inter.className}>
        <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ReduxWrapper>
  )
}

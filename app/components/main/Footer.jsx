'use client'
import React, {useState,useEffect, useRef} from 'react';
import Image from 'next/image'
import Link from 'next/link'

import {useGetContactsQuery} from "@/redux/api/pages.api";

import styles from '@/app/css/footer.module.css'

import {Loader} from "@/app/components/micro/Loader";

const dataFooter = {
  logo: '/logo.png',
  tel: `8 999 999 99 99`,
  email: `info@gmail.com`,
  address: `г. Чочва, р-н Пупкина, ул. Затупкина`,


}

export const Footer = ({}) => {

  const {isLoading, error, data} = useGetContactsQuery();

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {},[data])

  return(
    <footer className = {`${styles.footerContainer}`}>
        <div className = {`${styles.footerCenterBlock}`}>
          <div className = {`${styles.footerRightComponent}`}>
            <Image  unoptimized alt = "Логотип компании грузумомир" src = {"/footerLogo.png"} fill/>
          </div>
          <div className = {`${styles.footerLeftComponent}`}>
            {
              (isLoading) ? <Loader />
                          : (typeof data != 'undefined' &&  typeof data.data != 'undefined')
                          ?
                                <>
                                  <a href = {`tel:${data.data.attributes.footerTel}`} target = "_blank">{data.data.attributes.footerTel}</a>
                                  <div className= {`${styles.leftContacts}`}>
                                    <a href = {`mailto:${data.data.attributes.footerMail}`} target = "_blank">{data.data.attributes.footerMail}</a>
                                    <a href = {`adress:${data.data.attributes.footerAddress}`} target = "_blank">{data.data.attributes.footerAddress}</a>
                                  </div>
                                  <div className = {`${styles.footerDawnLeftBlock}`}>
                                    <p>© {year} Грузомир </p> <Link href = "/routes/political">Политика конфиденциальности</Link>
                                  </div>
                                </>
                          : <h3>Ошибка...Компонент: Footer</h3>
            }
          </div>
        </div>
    </footer>
  )
}

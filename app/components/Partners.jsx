'use client'

import Image from 'next/image'

import { useStater } from "@/hooks/useStater"
import {useGetPartnersQuery} from "@/redux/api/partners.api"

import styles from "@/app/css/mainpage.module.css"

import {Loader} from "@/app/components/micro/Loader";
import {useEffect} from "react";

import partners from "@/app/images/partners.png"
import cat from "@/app/images/cat.png";
import cum from "@/app/images/cum.png";
import daf from "@/app/images/daf.png";
import fuzo from "@/app/images/fuzo.png";
import hino from "@/app/images/hino.png";
import isuzu from "@/app/images/isuzu.png";
import mazda from "@/app/images/mazda.png";
import mits from "@/app/images/mits.png";
import nissan from "@/app/images/nissan.png";
import ud from "@/app/images/ud.png";
import volvo from "@/app/images/volvo.png";
import romatsu from "@/app/images/romatsu.png";


const dataImages = [cat, cum, daf, fuzo, hino, isuzu, mazda, mits, nissan, ud, volvo, romatsu]

console.log(dataImages[1].src)
console.log(partners)


export const Partners = ({}) => {

    //const data = useStater('partners');

    const {isLoading, error, data} = useGetPartnersQuery();
    useEffect(() => {
        console.log(typeof data != 'undefined' &&  typeof data.data != 'undefined')
    })
    return(
        <section className = {`${styles.partnersContainer}`}>
            {
                dataImages.map((image) => {
                    return <Image className = {`${styles.partnersImages}`} unoptimized src={image.src} alt={"Логотипы партнеров"} width={150} height={150} />;
                })
            }
        </section>
    )
}

/* Бывший прямой потомок: .partnersContainer
{
    (isLoading) ? <Loader /> :
        (typeof data != 'undefined' &&  typeof data.data != 'undefined') ? data.data.map((item, index) => {
            if(!item.attributes) return

                    return(
                        <div key = {`partKey_${index}`} className = {`${styles.partner}`}>
                            <Image  unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.Logo.data.attributes.url}`} alt = {item.attributes.Logo.data.attributes.alt} fill />
                        </div>
                    )
                })
    : <h3>Ошибка получения данных :(</h3>
}

*/
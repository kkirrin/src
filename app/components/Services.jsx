'use client'
import Image from 'next/image'
import {useEffect} from "react";

import styles from '@/app/css/service.module.css'

import { Loader } from '@/app/components/micro/Loader'

import { useStater } from '@/hooks/useStater'

import {useGetServicesQuery} from "@/redux/api/pages.api";


export const Services = ({}) => {

    const {isLoading, error, data} = useGetServicesQuery();

    useEffect(() => {},[data])

    return(
        <section className = {`${styles.serviceContainer}`}>
     
                <div className = {`${styles.upBlock}`}>

                    <div className = {`${styles.left}`}>
                        <h2>У нас вы можете найти:</h2>
                    </div>
                    <div className = {`${styles.right}`}>
                        <p>
                            Осуществляя услуги по ремонту и обслуживанию вашего автомобиля, вы получаете дополнительные скидки в нашем магазине.
                        </p>
                    </div>
                    
                </div>

                <div className = {`${styles.downBlock}`}>

                    {
                            (!data) ? (<Loader />)
                                    :
                            data.data.map((item, index) => {

                                return(
                                    <article key = {`serviceKey_${index}`} className = {`${styles.service}`}>

                                        <div className={`${styles.serviceIco}`}>
                                            <Image  unoptimized src = {`https://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.ico.data.attributes.url}`} alt = {item.attributes.name} fill/>
                                        </div>

                                        <h3>{item.attributes.name}</h3>

                                        {
                                            (false) ? <p>{item.attributes.desc}</p> : null
                                        }
                                        
                                    </article>
                                )
                            })
                    }

                    <article key = {`serviceKey_lastInfo`} className = {`${styles.service} ${styles.serviceInfoText}`}>
                
                        <h3>Также производим подборку запчастей и доставку по краю и в другие регионы</h3>
        
                    </article>

                </div>
            

          
        </section>
    )
}

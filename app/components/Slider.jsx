'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from '@/app/css/slider.module.css'

import { useStater } from '@/hooks/useStater'

import {Forms} from "@/app/components/Forms";
import {Loader} from "@/app/components/micro/Loader";

import {useGetSlidersQuery} from "@/redux/api/pages.api";


export const Slider = ({}) => {

const slides = useStater('slides')

  const [selectSlide, setSelectSlide] = useState(0)
  const [sliderSpeed, setSliderSpeed] = useState(3000)

  const {isLoading, error, data} = useGetSlidersQuery()

  const nextSlide = () => {
    if(typeof data != 'undefined') {
      if(selectSlide < data.data.length - 1) {
        setSelectSlide(selectSlide + 1);
      } else {
        setSelectSlide(0)
      }
    }
  }
  //useEffect(
  //  () => {
  //    const interval = setInterval(() => {
  //      nextSlide()
  //    }, sliderSpeed)
  //    return () => clearInterval(interval)
  //  }
  //)

  return(
    <section className = {`${styles.sliderContainer}`}>
      {
        (!isLoading) ?
            (typeof data != 'undefined' &&  typeof data.data != 'undefined') ?
                data.data.map ((slide, index) => {
                  return(
                      <article
                          style = {
                            (index === 0) ?
                                {marginLeft: `-${selectSlide*100}%`}
                                : null
                          }
                          onMouseMove= {()=>{setSliderSpeed(500000)}}
                          onMouseLeave={()=>{setSliderSpeed(3000)}}
                          key = {`slidekey_${index}`}
                          className = {`${styles.sliderItem}`}>

                        <div className = {`${styles.textSlider}`}>
                        
                          <h2>{slide.attributes.header}</h2>
                        </div>

                        <Forms place = {'slider'} />

                        <div className = {`${styles.sliderBg}`}>
                          <Image  unoptimized alt = {slide.attributes.alt} src = {`https://${process.env.NEXT_PUBLIC_URL_API}${slide.attributes.src.data.attributes.url}`} fill />
                        </div>
                      </article>
                  )
                })
                : <h3>Слайдеры отсутствуют</h3>
            : <Loader />
      }

    <SliderController slides = {slides} />

    </section>
  )
}

const SliderController = ({slides}) => {
  return(
    <div className = {`${styles.dotContainer}`}>
    {
       (slides) ? slides.map ((slide, index) => {
          return(
            <div key = {`dotKey_${index}`} className = {`${styles.dot}`}></div>
          )
        }) : null
     }
    </div>
  )
}

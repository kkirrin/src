'use client'

import React, {useRef} from 'react'
import Image from 'next/image'

import styles from '@/app/css/forms.module.css'

export const Forms = ({place = 'main'}) => {

  const formRef = useRef();
  const refButton = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    refButton.current.innerText = "Отправлено!"

    const dataForm = new FormData(formRef.current);
          dataForm.append('to','greatjavadev@gmail.com')

    const formJSON = {};

          dataForm.forEach(function(value, key){
              formJSON[key] = value;
          });

    //Отправка данных
    const request = fetch(`https://${process.env.NEXT_PUBLIC_SENDMAIL}`, {
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_JWT_ORDER,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "data": formJSON,
      })
    })
    const result = await request;
    console.log(await result)
  }

  switch (place) {
    case "callback":
      return(
        <form onSubmit = {handleSubmit} ref = {formRef}>
          <input type = "name" name = "name" placeholder = "Имя" />
          <input type = "tel" name = "tel" placeholder = "Телефон" />
          <input type = "text" name = "text" placeholder = "Комментарий" />
          <button onClick = {f => f} type = "submit">Отправить</button>
        </form>
      )
      break;
    case "slider":
      return(
        <form onSubmit = {handleSubmit} className = {`${styles.sliderForm}`} ref = {formRef}>
          <h3>оставьте заявку</h3>
          <input type = "name" name = "name" placeholder = "Имя" />
          <input type = "tel" name = "tel" placeholder = "Телефон" />
          <input type = "text" name = "text" placeholder = "Комментарий" />
          <button onClick = {handleSubmit} type = "submit">Отправить</button>
        </form>
      )
      break;
    case "main":
      return(
        <div className={`${styles.mainContainerForm}`}>
          <div className = {`${styles.imgContainer}`}>
            <Image  unoptimized src={'/formbg0.png'} alt = {``} fill/>
          </div>
          <form id = "mainForm" onSubmit = {handleSubmit} className = {`${styles.mainForm}`} ref = {formRef}>
            <h3>заполните заявку</h3>
            <p>
            Свяжемся с вами и бесплатно проконсультируем по любым вопросам
            </p>
            <div>
              <input type = "name" name = "subject" placeholder = "Имя" />
              <input type = "tel" name = "text" placeholder = "Телефон" />
            </div>
            <button ref = {refButton} type = "submit">Отправить</button>
          </form>
          <div className = {`${styles.imgContainer}`}>
            <Image  unoptimized src={'/formbg1.png'} alt = {``} fill/>
          </div>
        </div>
      )
      break;
    default:
      <form ref = {formRef}>
      </form>
  }
}

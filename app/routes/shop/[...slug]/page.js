'use client'

import Image from 'next/image'
import Head from 'next/head'
import styles from '@/app/css/mainpage.module.css'
import productStyles from '@/app/css/product.module.css'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useActions } from '@/hooks/useActions'
import { useGetProductsId } from '@/app/components/shop/hooks/useGetProductsId'

export default function Home({ params, searchParams }) {

  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [textToCart, setTextToCart] = useState('В корзину')

  const decodeParams = Number.parseInt(decodeURI(params.slug))

  const { getProductsById, error } = useGetProductsId(decodeParams)
  const {addToCart} = useActions();

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const {data} = await getProductsById()
        setProduct(data)

      } catch (err) {

        console.error('Ошибка получения товара:', err)

      }
      
    }

    fetchProduct()

  }, [decodeParams, getProductsById])

  const plus = () => {
    if (quantity < product.attributes.stock) {
      setQuantity(quantity + 1)
    }
  }

  const minus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = (product) => {

    const makeMutableProduct = structuredClone(product);
          makeMutableProduct.attributes.quantityForBuy = quantity;

    addToCart(makeMutableProduct);

    setTextToCart('Добавлено!');
    setTimeout(() => {
        setTextToCart('Добавить еще?');
    }, 1000);

  }
  
    console.log(`PRODUCTS AAAAAAAAAAAAAAAAAAA:`, product)
    // const img = product?.attributes?.imgs?.data[0]?.attributes?.url
    const desc = product?.attributes?.description ? product?.attributes?.description : ''
    console.log(desc)

  return (
    <>
      <Head>
        <title>
          Грузомир - {product ? `${product.title}` : `Товары для ремонта грузовиков`}
        </title>
      </Head>
      <main className={styles.main}>
        {product ? (
          <section className={productStyles.singleProduct}>
            <article className={`${productStyles.imageBlock}`}>
              <div className={`${productStyles.singleProductImg}`}>
                {
                    (product.attributes?.imgs?.data?.[0]?.attributes?.url == null || product.attributes.imgs.data[0].attributes.url === 0) ? 
                      <Image 
                          unoptimized
                          src={`https://${process.env.NEXT_PUBLIC_URL_API}/testProduct.png`} // URL по умолчанию
                          alt={product.title}
                          fill
                      /> :
                      <Image 
                          unoptimized
                          src={`https://${process.env.NEXT_PUBLIC_URL_API}${product.attributes.imgs.data[0].attributes.url}`} // Использование URL из атрибутов
                          alt={product.title}
                          fill
                      />
              }
                </div>
            </article>
            <article className={`${productStyles.infoBlock}`}>
              <h1 className={`${productStyles.title}`}>{product.attributes.title}</h1>

              <div className={`${productStyles.singleProductStock}`}>
                <p className={`${productStyles.stock}`}>Количество: {product.attributes.stock}</p>
                <h2 className={`${productStyles.price}`}>Цена: {product.attributes.price} ₽</h2>
              </div>

              <div className={productStyles.singleProductAddToCart}>
                <div className={`${productStyles.productCardQuntity}`}>
                  <button onClick={minus} className={`${productStyles.productCardButton}`}>
                    <Image unoptimized src="/minus.svg" alt="Кнопка для уменьшения количества товара" fill />
                  </button>
                  <p>{quantity}</p>
                  <button onClick={plus} className={`${productStyles.productCardButton}`}>
                    <Image unoptimized src="/plus.svg" alt="Кнопка для увеличения количества товара" fill />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`${productStyles.addToCartButton}`}
                >
                  {textToCart}
                </button>
              </div>
              <div className={`${productStyles.attrBlock}`}>
                <h3 className={`${productStyles.attrHeader}`}>Характеристики</h3>
                <div className={`${productStyles.attrList}`}>
                  {/* {
                    (product.attributes.Attributes) ? 
                        Object.entries(product.attributes.Attributes).map(([key, value], index) => {
                          return (
                            <div key={`${key}_${index}`} className={`${productStyles.attrRow}`}>
                              <p>{value.name}</p>
                              <p></p>
                              <p>{value.value}</p>
                            </div>
                          )
                        })
                        : 
                    null
                  } */}

                  {desc}
                </div>
              </div>
              <div className={`${productStyles.termsBlock}`}>
                <h3>Условия доставки</h3>
                <p>
                  До 3 рабочих дней после оплаты. При отсутствии запрашиваемой детали на основном складе ГРУЗОМИР, мы
                  предлагаем поставку с удаленного склада.
                </p>
              </div>
            </article>
          </section>
        ) :  <p style = {{margin: "auto"}}>Попытка загрузки товара</p>
      
        }
      </main>
    </>
  )
}
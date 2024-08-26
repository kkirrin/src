'use client'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useStater } from '@/hooks/useStater'
import { useGetProducts } from '@/app/components/shop/hooks/useGetProducts'
import { useActions } from '@/hooks/useActions'
import { Loader } from '@/app/components/micro/Loader'
import { ProductCard } from '@/app/components/shop/ProductCard'
import Filters from '@/app/components/shop/Filters'
import Pagination from '@/app/components/shop/Pagination'
import styles from '@/app/css/mainpage.module.css'
import stylesShop from '@/app/css/shop.module.css'
import { SearchForm } from '@/app/components/SearchForm'
import Link from 'next/link'

export default function Page({}) {

  const router = useRouter();
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState(-1)
  const [categoryShow, setCategoryShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1)
  const [meta, setMeta] = useState(null)

  const { getProducts } = useGetProducts()
  
  useEffect(() => {
    setPageNumber(1)
  }, [categoryFilter])

  useEffect(() => {

    const fetchProducts = async () => {

      setIsLoading(true)

      try {

        const { data, meta } = await getProducts(categoryFilter, pageNumber, 9)
        
        console.log(categoryFilter)
        setProducts(await data)
        console.log(`DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:${data}`)
        setMeta(meta)

      } catch (error) {

        console.error('Error fetching products:', error)

      } finally {

        setIsLoading(false)

      }

    }

    fetchProducts()

  }, [categoryFilter, pageNumber])


  useEffect(() => { },[products])

  console.log(`PRODUCTS AAAAAAAAAAAAAAAAAAA:${products}`)

  const handleCategoryClick = () => {
    setCategoryShow(!categoryShow);
    console.log(document.querySelector('.shop_filtersBlock__zYWiU nav'));
    document.querySelector('.shop_filtersBlock__zYWiU nav').classList.toggle('is-active');
  };


  const reloadWindow = () => {
    window.location.reload();
  }

  return (
    <>
      <Head>
        <title>Грузомир - товары для ремонта грузовиков</title>
      </Head>
      <main className={styles.main}>
        <div className={stylesShop.searchFormShopInner}>
          <SearchForm />
        </div>
        <section className={stylesShop.shopContainer}>
          <div className={stylesShop.filtersContainer}>
          <div className={stylesShop.allCategory}>
                <h3 onClick={reloadWindow}>Все категории</h3>
            </div>

          
            <Filters
            
              filter={'category'}
              filterSetters={setCategoryFilter}
            />

          </div>

          <div className={stylesShop.shopBlock}>
            {isLoading ? (
              <Loader />
            ) : products.length > 0 ? (

              (categoryFilter === -1) ?

                products.map((product, index) => {
                  return <ProductCard key={`${product.title}_${index}`} product={product} />
                })
                :
                products.map((product, index) => {
                  return <ProductCard key={`${product.title}_${index}`} product={product} />
                })
                
            ) 
              : (
                <Loader />
            )}

            {

              (meta) ?
                        <Pagination pageNumber = {pageNumber} setPageNumber = {setPageNumber} maxPages={((meta.pagination.total/meta.pagination.limit).toFixed(0))} />
                     : null

            }
           

          </div>
        </section>
      </main>
    </>
  )
}
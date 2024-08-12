'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import styles from '@/app/css/shop.module.css'
import { ProductCard } from '@/app/components/shop/ProductCard'
import { Loader } from '@/app/components/micro/Loader'
import { useGetProducts } from '@/app/components/shop/hooks/useGetProducts'

export const ProductRow = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { getProducts } = useGetProducts()
    const downBlockRef = useRef(null)

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)

            try {
                const { data } = await getProducts()
                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        console.log("Здорова из Row")
        console.log(products)
    }, [products])

    const handleWheel = (e) => {
        if (downBlockRef.current) {
            downBlockRef.current.scrollLeft += e.deltaY*10;
        }
    }

    return (
        <section className={`${styles.productContainer}`}>
            <div className={`${styles.upBlock}`}>
                <div className={`${styles.left}`}>
                    <h2>
                        запчасти для грузовиков<br />
                        <strong>в Уссурийске</strong>
                    </h2>
                </div>
                <div className={`${styles.right}`}>
                    <p>
                        В магазине «Грузомир» каждый автовладелец сможет подобрать на свое авто как оригинальные запчасти, так и их качественные аналоги
                    </p>
                </div>
            </div>
            <div
                className={`${styles.downBlock}`}
                ref={downBlockRef}
                onWheel={handleWheel}
                style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
            >
                {products.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))}
            </div>
            <Link className={`${styles.buttonToShop}`} href='/routes/shop'>
                В каталог
            </Link>
        </section>
    )
}
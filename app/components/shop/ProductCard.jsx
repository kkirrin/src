import { useState, Suspense} from "react"
import { useActions } from '@/hooks/useActions'

import Image from "next/image"
import Link from "next/link"

import styles from '@/app/css/shop.module.css'

export const ProductCard = ({product = {
    id: 1,
    image: "/testProduct.png",
    title: "Вал среднего редуктора вход (без масл. насоса)",
    stock: 20,
}}) => {

    const [quantity, setQuantity] = useState(1);
    const [textToCart,setTextToCart] = useState('В корзину');

    const plus = () => (quantity < 100) ? setQuantity(quantity + 1) : null;
    const minus = () => (quantity > 1) ? setQuantity(quantity - 1) : null;

    const {addToCart} = useActions();

    const handleAddToCart = (product) => {

        const makeMutableProduct = structuredClone(product);
              makeMutableProduct.attributes.quantityForBuy = quantity;

        addToCart(makeMutableProduct);
        
        setTextToCart('Добавлено!');
        setTimeout(() => {
            setTextToCart('Добавить еще?');
        }, 1000);

    }

    return(
        <Suspense fallback={<div>Загрузка...</div>}>

            <article className = {`${styles.productCard}`}>

            <Link className = {styles.productCartLink} href = {`/routes/shop/${product.id}`}>
                <div className = {`${styles.productCardImage}`}>
                    
                     {
                        (typeof product.image != "undefined") ? 
                            <Image  unoptimized src= {`https://${process.env.NEXT_PUBLIC_URL_API}${product.image[0]}`} alt = {product.attributes.title} fill />
                                                              :
                            <Image  unoptimized src= {`https://${process.env.NEXT_PUBLIC_URL_API}/testProduct.png`} alt = {product.attributes.title} fill />                         
                     }
                   
                </div>

                <div className = {styles.stock}>
                    <div className = {styles.iconStock}>
                        <Image  unoptimized alt = "Иконка в наличии" src = {"/check.svg"} fill />
                     </div>
                     <p>В наличии</p>
                </div>

                <h3 className = {`${styles.productCardTitle}`}>{product.attributes.title}</h3>
                <h4 className = {`${styles.productCardPrice}`}>{product.attributes.price} ₽</h4>

            </Link>

                <div className = {styles.productCartDownBlock}>
                    <div className = {`${styles.productCardQuntity}`}>
                        <button onClick ={minus} className = {`${styles.productCardButton}`}><Image  unoptimized src = {"/minus.svg"} alt = "Кнопка для уменьшения количества товара" fill/></button>
                        <p>{quantity}</p>
                        <button onClick ={plus} className = {`${styles.productCardButton}`}><Image  unoptimized src = {"/plus.svg"}  alt = "Кнопка для увеличения количества товара" fill/></button>
                    </div>
                    <button
                        onClick = {() => handleAddToCart(product)}
                        className = {`${styles.addToCartButton}`}>
                        {textToCart}
                    </button>
                </div>
            </article>
        </Suspense>
    )
}

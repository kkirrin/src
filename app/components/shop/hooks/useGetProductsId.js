import { useState } from 'react'
import ReactDOM from 'react-dom';

export const useGetProductsId = (id = -1, filters = "", limit = 100) => {

    if(id === -1) return;

    const [error, setError] = useState(null)

    const getProductsById = async () => {
        try {
            const response = await fetch(`https://gruzomir25.ru/api/products/${id}?sort[0]=title:asc&pagination[start]=0&pagination[limit]=${limit}&populate=*`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_KEY}`,
                },
            })

            if (!response.ok) {
                throw new Error('Ошибка получения товаров - Не получилось сделать запрос. NOK')
            }

            const data = await response.json()
            return data

        } catch (err) {

            setError(err)
            throw err

        }
    }

    return { getProductsById, error }
    
}
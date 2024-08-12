import { useState } from 'react'
import ReactDOM from 'react-dom';

export const useGetProducts = (filters = "", limit = -1) => {

    const [error, setError] = useState(null)

    const getProducts = async (categoryFilter = -1, pageNumber = 1, limit = 9) => {

        try {
                
            const response = await fetch(`https://gruzomir25.ru/api/products?pagination[start]=${pageNumber}&pagination[limit]=${limit}${(categoryFilter != -1) ? `&filters[categories][id][$in]=${categoryFilter}`: ''}&populate=*`, {

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

    return { getProducts, error }
    
}
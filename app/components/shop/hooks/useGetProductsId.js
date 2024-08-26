import { useState } from 'react'
import ReactDOM from 'react-dom';

export const useGetProductsId = (id = -1, filters = "", limit = 100) => {

    if(id === -1) return;

    const [error, setError] = useState(null)

    const getProductsById = async () => {
        try {
            const response = await fetch(`https://gruzomir25.ru/api/products/${id}?sort[0]=title:asc&pagination[start]=0&pagination[limit]=${limit}&populate=*`, {
                headers: {
                    Authorization: `Bearer 8ace6239d648e5f99253cda0aed242fad0c2a9e78a920e174265145ab571a9edec54fe7c5cbc9db66968b2e365e417f39104bd6f35512b95c1627869265b3d25a532d5afb3b88645e2fe764e555eaeec7b7ca2c39a813dd4eb71ef9da334d8d24d1d37f8b84561054c738cc2714f95d3dfe321f393b86f886beae4d7b32b36ac`,
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
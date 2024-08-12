import {api} from './api'

export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                mode: "cors",
                url: '/products?populate=*',
                method: 'GET',
            }),

        }),
    })
})

export const {useGetProductsQuery} = api;

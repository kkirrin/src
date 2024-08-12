import {api} from './api'

export const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                mode: "cors",
                url: '/categories?populate=*&pagination[start]=0&pagination[limit]=1000',
                method: 'GET',
            }),
        }),
    })
})



export const {useGetCategoriesQuery} = api;
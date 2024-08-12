import {api} from './api'

export const slidersApi = api.injectEndpoints({
    endpoints: builder => ({
        getSliders: builder.query({
            query: () => ({
                mode: "cors",
                url: "/sliders?populate=*",
                method: 'GET',
            })
        })
    })
})

export const serviceApi = api.injectEndpoints({
    endpoints: builder => ({
        getServices: builder.query({
            query: () => ({
                mode: "cors",
                url: "/services?populate=*",
                method: 'GET',
            })
        })
    })
})

export const contactsApi = api.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => ({
                mode: "cors",
                url: "/contactpage/",
                method: "GET",
            })
        })
    })
})

export const aboutAs = api.injectEndpoints({
    endpoints: builder => ({
        getAboutAs: builder.query({
            query: () => ({
                mode: "cors",
                url: "/aboutas?populate=*",
                method: "GET",
            })
        })
    })
})
export const {useGetSlidersQuery, useGetServicesQuery, useGetContactsQuery, useGetAboutAsQuery} = api;

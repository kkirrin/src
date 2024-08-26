import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//const BASE_URL = process.env.NEXT_PUBLIC_URL_API
//console.log(BASE_URL)

  export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['category'],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://gruzomir25.ru/api`,
          mode: "cors",
          method: 'PATCH',
          credentials: "same-origin",
          prepareHeaders: (headers) => {
                const accessToken = true //localStorage.getItem("token");
                if (accessToken) {
                    headers.set("authorization", `Bearer 8ace6239d648e5f99253cda0aed242fad0c2a9e78a920e174265145ab571a9edec54fe7c5cbc9db66968b2e365e417f39104bd6f35512b95c1627869265b3d25a532d5afb3b88645e2fe764e555eaeec7b7ca2c39a813dd4eb71ef9da334d8d24d1d37f8b84561054c738cc2714f95d3dfe321f393b86f886beae4d7b32b36ac`);
                }
                return headers;
          },
        }
    ),
    endpoints: (builder) => ({
      main: builder.query({
        query: () => '/',
      }),
    })
  })


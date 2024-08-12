import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "Главная",
        href: "/",
        loader: false,
    },
    {
        name: "Каталог",
        href: "/routes/shop",
        loader: false,
    },
    {
        name: "О компании",
        href: "/routes/pages/about",
        loader: false,
    },
    {
        name: "Контакты",
        href: "/routes/pages/contacts",
        loader: false,
    },
]

 export const navSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
    }
})

export const {reducer} = navSlice;
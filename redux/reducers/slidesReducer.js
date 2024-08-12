import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        header: "продажа запчастей и автосервис для грузовых автомобилей и спецтехники",
        desc: "Согласно предыдущему, рекламное сообщество консолидирует культурный креатив. Взаимодействие корпорации и клиента",
        alt: "alt",
        src: "/testSlider.png",
    }
]

const slidesReducer = createSlice({
    name: 'slides',
    initialState,
    reducers: {
    },
})

export const {reducer} = slidesReducer;
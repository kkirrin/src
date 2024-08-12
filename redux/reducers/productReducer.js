import {createSlice, current} from "@reduxjs/toolkit";

const initialState = [
    
]

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            //console.log(action.payload)
            if(Array.isArray(action.payload)) {
                
                const tempProducts = action.payload.map((item, index) => {
                    //console.log(item)
                    return ({
                            id: item.id,
                            id1c: item.attributes.id1c,
                            category: (item.attributes?.categories?.data) ? item.attributes.categories.data.map(item => item.id) : [],
                            image: (item.attributes?.imgs?.data) ? item.attributes.imgs.data.map(item => item.attributes.url) : '/noImage.svg',
                            title: item.attributes.title,
                            description: item.attributes.description, //Сейчас нету, так на будущее
                            stock: Number.parseInt(item.attributes.stock),
                            storeplace: item.attributes.storeplace,
                            attributes: (item.attributes.Attributes?.attributes) ? item.attributes.Attributes.attributes.map(item => {
                                if(item.type === "Number") {
                                    return({
                                        name: item.name,
                                        type: item.type,
                                        value: Number.parseInt(item.value)
                                    })
                                }
                                return item
                            }) : [],
                            quantitySales: Number.parseInt(item.attributes.quantitySales),
                            price: Number.parseInt(item.attributes.price),
                        })
                })

                state = tempProducts;
                //console.log(state)
            }
        }
    },
})

export const {actions, reducer} = productSlice;

import { createSlice } from '@reduxjs/toolkit'
import products from "../../components/products-page/Products";

const initialState = {
    searchTagData: [],
    isProductsOrRestaurants: "products",
    selectedValue: "",
    selectedName: '',
    sort_by: ""
}

export const searchTag = createSlice({
    name: 'storeData',
    initialState,
    reducers: {
        setSearchTagData: (state, action) => {
            state.searchTagData = action.payload
        },
        setProductsOrRestaurants: (state, action) => {
            state.isProductsOrRestaurants = action.payload
        },
        setSelectedValue: (state, action) => {
            state.selectedValue = action.payload
        },
        setSelectedName: (state, action) => {
            state.selectedName = action.payload
        },
        setSort_by: (state, action) => {
            state.sort_by = action.payload
        }

        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setSort_by, setSearchTagData, setProductsOrRestaurants, setSelectedName, setSelectedValue } = searchTag.actions
export default searchTag.reducer

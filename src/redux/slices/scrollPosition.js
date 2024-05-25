import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSticky: false,
  categoryIsSticky:false,
  foodTypeIsSticky:false,
  restaurantIsSticky:false,
    newRestaurant:false
}

export const scrollPosition = createSlice({
  name: 'scrollPosition',
  initialState,
  reducers: {
    setSticky: (state,action) => {
      state.isSticky=action.payload
    },
    setCategoryIsSticky: (state,action) => {
      state.categoryIsSticky=action.payload
},
    setFoodTypeIsSticky: (state,action) => {
      state.foodTypeIsSticky=action.payload
    },
    setRestaurantIsSticky: (state,action) => {
      state.restaurantIsSticky=action.payload
    },
      setNewRestaurant:(state,action) => {
        state.newRestaurant=action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { setSticky,setCategoryIsSticky,setFoodTypeIsSticky,setRestaurantIsSticky,setNewRestaurant} = scrollPosition.actions
export default scrollPosition.reducer

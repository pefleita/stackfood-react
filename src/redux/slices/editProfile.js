import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditProfile: false,
}
const editProfileSlice = createSlice({
    name: 'edit-profile',
    initialState,
    reducers: {
        setEditProfile: (state, action) => {
            state.isEditProfile = action.payload;
        }
    }
});

export const { setEditProfile } = editProfileSlice.actions;
export default editProfileSlice.reducer;
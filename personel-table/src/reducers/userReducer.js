import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    adducer: false
};

// eslint-disable-next-line no-undef
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAdducer: (state, action) => {
            state.adducer = action.payload;
        },
      

    },
})

export const {  setAdducer: setAdduser} = userSlice.actions

export default userSlice.reducer

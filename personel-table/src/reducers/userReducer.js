import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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
        setAddusers: (state, action) => {
            console.log("state.users : ", action.payload);
            state.users = action.payload;
        },
    },
})

export const { setAdducer, setAddusers } = userSlice.actions

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3004/users');
        dispatch(setAddusers(response.data));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export default userSlice.reducer

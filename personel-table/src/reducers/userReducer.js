import { createSlice } from '@reduxjs/toolkit';
import { fetchData, addUserToServer, deleteUserFromServer } from '../Services';

const initialState = {
    users: [],
    adducer: false
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAdducer: (state, action) => {
            state.adducer = action.payload;
        },
        setUsers: (state, action) => {
            console.log("state.users : ", action.payload);
            state.users = action.payload;
        },
    },
})

export const { setAdducer, setUsers } = userSlice.actions

export const fetchUsers = () => async (dispatch) => {
    try {
        const data = await fetchData(); // fetchData fonksiyonunu kullan
        dispatch(setUsers(data));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
export const addUser = (newUser) => async (dispatch) => {
    try {
        const addedUser = await addUserToServer(newUser); // addUserToServer fonksiyonunu kullan
        dispatch(fetchUsers());
        return addedUser;
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        await deleteUserFromServer(userId); // deleteUserFromServer fonksiyonunu kullan
        dispatch(fetchUsers());
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

export default userSlice.reducer

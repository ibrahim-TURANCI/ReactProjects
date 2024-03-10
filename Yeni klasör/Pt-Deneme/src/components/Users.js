/* // users.js
const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS':
            return action.payload;
        case 'ADD_USER':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default usersReducer; */
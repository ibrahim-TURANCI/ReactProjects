import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    // Diğer reducer'lar buraya eklenebilir
});

export default rootReducer;
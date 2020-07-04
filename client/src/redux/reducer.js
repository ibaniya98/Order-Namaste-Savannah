import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const customReducer = combineReducers({
    cart: cartReducer
});

export default customReducer;
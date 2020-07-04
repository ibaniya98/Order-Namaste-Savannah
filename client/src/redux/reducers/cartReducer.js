import {
    INITIALIZE_CART,
    ADD_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM
} from '../actions/cartActions';

const initialState = {
    items: [],
    loading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_CART:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case UPDATE_ITEM:
            const items = [...state.items];
            const itemIndex = items.findIndex((item) => {
                return item.cartId === action.payload.cartId
            });
            items[itemIndex] = action.payload;

            return {
                ...state,
                items
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.cartId !== action.payload.cartId)
            }
        default:
            return state;
    }
}
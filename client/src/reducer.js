// TODO - Separate reducer based on their functionality as more features are added
function customReducer(state, action) {
    if (!state) {
        state = {
            cart: []
        }
    }

    let newState = Object.assign({}, state);
    newState.cart = [...state.cart];

    switch (action.type) {
        case "initialize_cart":
            newState.cart = action.cart;
            break;
        case "clear_cart":
            newState.cart = [];
            break;
        case "add_item":
            newState.cart.push(action.item);
            break;
        case "update_item":
            const itemIndex = newState.cart.findIndex((item) => item.cartId === action.item.cartId);
            newState.cart[itemIndex] = action.item;
            break;
        case "remove_item":
            newState.cart = newState.cart.filter(item => item.cartId !== action.item.cartId);
            break;
        default:
    }

    return newState;
}

export default customReducer;
function cartReducer(state, action) {
    if (!state) {
        state = {
            items: []
        }
    }

    // Ensure the state has cart as an array
    if (!state.items || !(state.items instanceof Array)) {
        state.items = []
    }

    let newState = Object.assign({}, state);
    newState.items = [...state.items];

    switch (action.type) {
        case "initialize_cart":
            newState.items = action.items;
            break;
        case "clear_cart":
            newState.items = [];
            break;
        case "add_item":
            newState.items.push(action.item);
            break;
        case "update_item":
            const itemIndex = newState.items.findIndex((item) => item.cartId === action.item.cartId);
            newState.items[itemIndex] = action.item;
            break;
        case "remove_item":
            newState.items = newState.items.filter(item => item.cartId !== action.item.cartId);
            break;
        default:
    }

    return newState;

}

export default cartReducer;
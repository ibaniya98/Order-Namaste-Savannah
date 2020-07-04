export const INITIALIZE_CART = 'INITIALIZE_CART';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

const STORAGE_NAME = 'namaste-savannah-cart';
const STORAGE = window.localStorage;

/**
 * TODO 
 * - add expiration date for the cart
 * - update the items in the cart to match server side data
 * - Maybe store cart info on server side if user is logged in instead of local storage?
 */
const getCartItems = () => {
    let cart = JSON.parse(STORAGE.getItem(STORAGE_NAME));
    if (!cart) {
        cart = []
    };
    return cart;
}

const saveCartItems = (cart) => {
    STORAGE.setItem(STORAGE_NAME, JSON.stringify(cart));
}

export const initializeCart = () => (dispatch) => {
    dispatch({
        type: INITIALIZE_CART,
        payload: getCartItems()
    })
}

export const addItemToCart = (cartItem) => (dispatch) => {
    let existingCartItems = getCartItems();
    existingCartItems = [cartItem, ...existingCartItems];
    saveCartItems(existingCartItems);

    dispatch({
        type: ADD_ITEM,
        payload: cartItem
    });
}

export const updateCartItem = (cartItem) => (dispatch) => {
    let existingCartItems = getCartItems();
    const itemIndex = existingCartItems.findIndex((item) => item.cartId === cartItem.cartId);
    existingCartItems[itemIndex] = cartItem;

    dispatch({
        type: UPDATE_ITEM,
        payload: cartItem
    });
}

export const removeItemFromCart = (cartItem) => (dispatch) => {
    let existingCartItems = getCartItems();
    existingCartItems = existingCartItems.filter(item => item.cartId !== cartItem.cartId);
    saveCartItems(existingCartItems);

    dispatch({
        type: DELETE_ITEM,
        payload: cartItem
    });
}
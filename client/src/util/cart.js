// TODO - Cookies, User session on server, local storage???

const STORAGE_NAME = 'namaste-savannah-cart';
const STORAGE = window.localStorage;

const isValidCart = () => {
    let cart = JSON.parse(STORAGE.getItem(STORAGE_NAME));
    return !(cart === null || !cart instanceof Array);
}

const initializeCart = async () => {
    return new Promise((resolve) => {
        setInterval(() => {
            if (!isValidCart()) {
                setCart([]);
            }
            resolve(getCartItems());
        }, 1000);
    });
    // Also need to validate if the items and their options still exists
    // Update their prices as needed
    // Add a timestamp to clear the old items?
}

const getCartItems = () => {
    return isValidCart() ? JSON.parse(STORAGE.getItem(STORAGE_NAME)) : [];
}

const setCart = (items) => {
    STORAGE.setItem(STORAGE_NAME, JSON.stringify(items));
    return items;
}

const getItemSubTotal = (quantity, option, modifiers) => {
    let unitPrice = 0;
    unitPrice += option.price;
    modifiers.forEach(modifier => {
        unitPrice += modifier.price;
    });
    return unitPrice * quantity;
}

export default { initializeCart, setCart, getCartItems, getItemSubTotal };
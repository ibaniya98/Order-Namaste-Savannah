const getItemSubTotal = (cartItem) => {
    const { quantity, selectedOption, selectedModifiers } = cartItem;
    let unitPrice = 0;
    unitPrice += selectedOption.price;
    selectedModifiers.forEach(modifier => {
        unitPrice += modifier.price;
    });
    return unitPrice * quantity;
}

const getCartSubtotal = (items) => {
    return items.reduce((total, currentItem) => {
        return total + getItemSubTotal(currentItem);
    }, 0);
}

const getCartItemsCount = (items) => {
    return items.reduce((total, item) => {
        return total + item.quantity
    }, 0);
}


export default { getItemSubTotal, getCartSubtotal, getCartItemsCount };
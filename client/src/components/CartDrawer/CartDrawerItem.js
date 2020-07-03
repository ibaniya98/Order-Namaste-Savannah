import React from 'react';

import { Button } from 'antd';

import CartUtil from '../../util/cart';

const CartDrawerItem = (props) => {
    let { cartItem, removeItem } = props;

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <strong>{cartItem.quantity + ' x'}</strong>
                </div>
                <div className="col-7">
                    <h5>{cartItem.item.itemName}</h5>
                    {
                        cartItem.selectedOption.title &&
                        <p>{cartItem.selectedOption.title}</p>
                    }
                    {
                        cartItem.selectedModifiers && cartItem.selectedModifiers.length > 0 &&
                        <p>{cartItem.selectedModifiers.map(modifier => modifier.title).join(" | ")}</p>
                    }

                    <Button type="link" danger
                        className="px-0"
                        onClick={() => removeItem(cartItem)}
                    >
                        Remove
                    </Button>

                </div>
                <div className="col-3">
                    <strong>
                        $ {CartUtil.getItemSubTotal(cartItem).toFixed(2)}
                    </strong>
                </div>
            </div>
            <hr />
        </>
    )
}

export default CartDrawerItem;
import React from 'react';
import { Statistic } from 'antd';

import CartUtil from '../../util/cart';

const TAX_RATE = 0.07; //TODO - determine this on runtime based on location?

const CartStats = (props) => {
    const { cartItems } = props;

    const cartSubtotal = CartUtil.getCartSubtotal(cartItems);
    const estimatedTax = cartSubtotal * TAX_RATE;
    const total = cartSubtotal + estimatedTax;
    const taxRateDisplay = `Est. Tax (${(TAX_RATE * 100).toFixed(2)} %)`;

    return (
        <div className="row p-1 mt-2">
            <div className="col-12 col-lg-4 d-flex justify-content-center mb-2">
                <Statistic title="Total Items" value={CartUtil.getCartItemsCount(cartItems)}
                    valueStyle={{ textAlign: "center" }}
                />
            </div>

            <div className="col-12 col-lg-8 d-flex justify-content-around ">
                <Statistic title="Subtotal" value={cartSubtotal} precision={2} prefix="$" valueStyle={{ textAlign: "center" }} />
                <p className="display-4 lead">+</p>
                <Statistic title={taxRateDisplay} value={estimatedTax} precision={2} prefix="$" valueStyle={{ textAlign: "center" }} />
                <p className="display-4  lead">=</p>
                <Statistic title="Order Total" value={total} precision={2} prefix="$" valueStyle={{ textAlign: "center" }} />
            </div>
        </div>
    )
}

export default CartStats;
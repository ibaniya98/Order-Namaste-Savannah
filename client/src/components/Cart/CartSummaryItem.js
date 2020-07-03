import React from 'react';
import './styles.css';

import CartUtil from '../../util/cart';
import { Button } from 'antd';

const IMAGE_PLACHOLDER = 'https://namaste-savannah-photos.s3.amazonaws.com/menu/placeholder.png';

const CartSummaryItem = (props) => {
    const { cartItem, isEditable, showModal, removeItem } = props;
    const basicItem = cartItem.item;

    let imageSrc = basicItem.image?.location || IMAGE_PLACHOLDER;

    return (
        <div className="row cart-summary-item mb-5">
            <div className="d-none d-lg-block col-lg-3 image-container">
                <img src={imageSrc} alt="" style={{ width: '100%' }} />
            </div>
            <div className="col-12 col-lg-9">
                <div className="d-flex justify-content-between">
                    <h5 className="my-0">{basicItem.itemName}</h5>
                    <h5 className="my-0">$ {CartUtil.getItemSubTotal(cartItem).toFixed(2)}</h5>
                </div>

                <hr className="my-2" />

                <div className="row">
                    <div className="col-9">
                        <p className="lead my-0">{basicItem.category}</p>
                        {basicItem.description && <p>{basicItem.description}</p>}
                        {
                            cartItem.selectedOption.title && (
                                <p>
                                    <strong>Option: </strong> {cartItem.selectedOption.title}
                                </p>
                            )
                        }
                        {
                            cartItem.selectedModifiers?.length > 0 && (
                                <p>
                                    <strong>Extra: </strong>
                                    {cartItem.selectedModifiers.map(modifier => modifier.title).join(", ")}
                                </p>
                            )
                        }
                    </div>
                    <div className="col-3 lead d-flex justify-content-end align-items-center">
                        <h4>x {cartItem.quantity}</h4>
                    </div>
                </div>

                {
                    isEditable && (
                        <div className="d-flex justify-content-between my-2">
                            <Button type="primary" shape="round"
                                onClick={() => { showModal(cartItem) }}>
                                Edit Order
                            </Button>
                            <Button danger type="primary" shape="round"
                                onClick={() => { removeItem(cartItem) }}>
                                Remove
                            </Button>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default CartSummaryItem;
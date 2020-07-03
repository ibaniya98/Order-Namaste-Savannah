import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Drawer, Result, Button } from 'antd';
import CartDrawerItem from './CartDrawerItem';

import CartUtil from '../../util/cart';

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: function (item) {
            return dispatch({
                type: "remove_item", item
            });
        }
    }
}

class CartDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.getCartDrawerItems = this.getCartDrawerItems.bind(this);
        this.getDrawerFooter = this.getDrawerFooter.bind(this);
    }

    getCartDrawerItems() {
        const { cartItems, removeItem } = this.props;

        if (cartItems.length === 0) {
            return <Result
                status="404"
                title="You cart is empty"
                subTitle="Grab some items to get started"
            />
        } else {

            return (
                <>
                    {
                        cartItems.map(cartItem => {
                            return <CartDrawerItem cartItem={cartItem} key={cartItem.cartId} removeItem={removeItem} />
                        })
                    }
                </>
            );
        }
    }

    getDrawerFooter() {
        const { cartItems, onClose } = this.props;
        if (cartItems.length === 0) {
            return <Link to="/" onClick={onClose}>Get Started</Link>
        } else {
            return (
                <div className="d-flex flex-column">
                    <div className="row d-flex align-items-center justify-content-center">
                        <h4>Subtotal: $ {CartUtil.getCartSubtotal(cartItems).toFixed(2)}</h4>
                    </div>

                    <Button block type="primary" shape="round" className="my-1">
                        <Link to="/cart" onClick={onClose}>Checkout</Link>
                    </Button>
                </div>
            )
        }
    }

    render() {
        let windowWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        if (windowWidth > 600) {
            windowWidth = 600;
        }

        const { visible, onClose } = this.props;

        return (
            <Drawer title="Cart Summary"
                closable={true}
                placement='right'
                visible={visible}
                onClose={onClose}
                width={windowWidth}
                footer={this.getDrawerFooter()}
            >
                {this.getCartDrawerItems()}
            </Drawer>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartDrawer);


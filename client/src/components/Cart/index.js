import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CartSummaryItem from './CartSummaryItem';
import MenuModal from '../Menu/MenuModal';

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: function () {
            return dispatch({ type: "clear_cart" });
        },
        removeItem: function (item) {
            return dispatch({
                type: "remove_item", item
            })
        }
    }
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemToModify: undefined
        }
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    hideModal() {
        this.setState({
            itemToModify: undefined
        });
    }

    showModal(itemToModify) {
        this.setState({ itemToModify });
    }


    render() {
        const { cart } = this.props;

        let content;
        if (cart.length > 0) {
            content = cart.map(cartItem => {
                return <CartSummaryItem cartItem={cartItem} isEditable key={cartItem.cartId}
                    showModal={this.showModal} removeItem={this.props.removeItem}
                />
            })
        } else {
            content = (
                <div>
                    <h3>Your cart is currently empty</h3>
                    <Link to="/">Get some food</Link>
                </div>
            );
        }

        const { itemToModify } = this.state;
        return (
            <div className="container">
                <h1>Cart Summary</h1>
                <hr />
                {content}

                {itemToModify &&
                    <MenuModal
                        selectedOptionId={itemToModify.selectedOption._id}
                        selectedModifiersId={itemToModify.selectedModifiers.map(modifier => modifier._id)}
                        selectedQuantity={itemToModify.quantity}
                        notes={itemToModify.notes}
                        item={itemToModify.item}
                        isItemUpdate={true}
                        visible={true}
                        hideModal={this.hideModal}
                        cartId={itemToModify.cartId}
                    />
                }
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);


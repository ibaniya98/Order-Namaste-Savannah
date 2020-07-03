import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Pagination } from 'antd'
import CartStats from './CartStats';
import CartSummaryItem from './CartSummaryItem';
import MenuModal from '../Menu/MenuModal';

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.items
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
            itemToModify: undefined,
            currentPage: 1,
            currentPageSize: 5
        }
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    hideModal() {
        this.setState({
            itemToModify: undefined
        });
    }

    showModal(itemToModify) {
        this.setState({ itemToModify });
    }

    changePage(page) {
        this.setState({
            currentPage: page
        });
    }

    render() {
        const { cartItems } = this.props;
        const { currentPage, currentPageSize, itemToModify } = this.state;

        let content;
        if (cartItems.length > 0) {
            const offset = (currentPage - 1) * currentPageSize;
            let paginatedCartItems = cartItems.slice(offset, offset + currentPageSize);

            const itemsToDisplay = paginatedCartItems.map(cartItem => {
                return <CartSummaryItem cartItem={cartItem} isEditable key={cartItem.cartId}
                    showModal={this.showModal} removeItem={this.props.removeItem}
                />
            });

            content = (
                <div>
                    <CartStats cartItems={cartItems} />
                    <Pagination size="small" total={cartItems.length}
                        current={currentPage} pageSize={currentPageSize}
                        hideOnSinglePage
                        onChange={this.changePage}
                        className="my-5 d-flex justify-content-center"
                    />
                    {itemsToDisplay}
                </div>
            );
        } else {
            content = (
                <div>
                    <h3>Your cart is currently empty</h3>
                    <Link to="/">Get some food</Link>
                </div>
            );
        }

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
                        menuItem={itemToModify.item}
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


import React from 'react';
import { connect } from 'react-redux';

import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartDrawer from '../CartDrawer';

import CartUtil from '../../util/cart';

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.items
    }
}

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleDrawer: false
        }

        this.showDrawer = this.showDrawer.bind(this);
        this.hideDrawer = this.hideDrawer.bind(this);
    }

    showDrawer() {
        this.setState({ visibleDrawer: true });
    }

    hideDrawer() {
        this.setState({ visibleDrawer: false });
    }

    render() {
        const { cartItems } = this.props;
        const totalItems = CartUtil.getCartItemsCount(cartItems);

        return (
            <>
                <Badge style={{ backgroundColor: "#1890ff" }} count={totalItems} overflowCount={10}>
                    <ShoppingCartOutlined style={{ fontSize: 32 }} onClick={this.showDrawer} />
                </Badge>
                <CartDrawer visible={this.state.visibleDrawer} onClose={this.hideDrawer} />
            </>
        );
    }
}


export default connect(mapStateToProps, null)(ShoppingCart);
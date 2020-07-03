import React from 'react';
import { Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons';

import CartDrawer from '../CartDrawer';

class ShoppingCartIcon extends React.Component {
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
        const { cart } = this.props;
        const totalItems = cart.reduce((total, item) => {
            return total + item.quantity
        }, 0);

        return (
            <>
                <Badge style={{ backgroundColor: "#1890ff" }} count={totalItems} overflowCount={10}>
                    <ShoppingCartOutlined style={{ fontSize: 32 }} onClick={this.showDrawer} />
                </Badge>
                <CartDrawer visible={this.state.visibleDrawer} onClose={this.hideDrawer}/>
            </>
        );
    }
}


export default ShoppingCartIcon;
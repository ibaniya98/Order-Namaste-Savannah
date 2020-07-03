import React from 'react';
import { Link } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';
import ShoppingCartIcon from '../ShoppingCartIcon';

const Navbar = () => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <Link to="/"> Home</Link>
            </div>

            <div style={{ fontSize: 24 }} >
                <UserOutlined className="mx-3" />
                <ShoppingCartIcon />
            </div>
        </div>
    );
};

export default Navbar;
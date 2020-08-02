import React from 'react';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '../ShoppingCartIcon';
import ProfileIcon from '../Profile/ProfileIcon';

import Logo from './logo.png'

const Navbar = () => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <Link to="/">
                    <img src={Logo} alt="Namaste Savannah Official Logo" height={50} />
                </Link>
            </div>

            <div style={{ fontSize: 24 }} >
                <ProfileIcon />
                <ShoppingCartIcon />
            </div>
        </div>
    );
};

export default Navbar;
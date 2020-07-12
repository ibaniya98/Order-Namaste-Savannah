import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Drawer, List } from 'antd';

const mapStateToProps = (state) => {
    return { ...state.auth };
}

const UnauthenticatedContents = (props) => {
    return (
        <List size="large">
            <List.Item>
                <Link to="/login" onClick={props.onClose}>Log in</Link>
            </List.Item>
            <List.Item>
                <Link to="/register" onClick={props.onClose}>Register</Link>
            </List.Item>
        </List>
    )
}

const AuthenticatedContents = (props) => {
    return (
        <List size="large">
            <List.Item>
                <Link to="/account" onClick={props.onClose}>View Account</Link>
            </List.Item>
            <List.Item>
                <Link to="/orders" onClick={props.onClose}>View Orders</Link>
            </List.Item>
            <List.Item>
                <Link to="/logout" onClick={props.onClose}>Log Out</Link>
            </List.Item>
        </List>
    )
}

const ProfileDrawer = (props) => {
    const { visible, onClose } = props;

    return (
        <Drawer title="Profile"
            closable={true}
            placement='right'
            visible={visible}
            onClose={onClose}
        >
            {props.isAuthenticated ? <AuthenticatedContents {...props} /> : <UnauthenticatedContents {...props} />}
        </Drawer >
    );
}



export default connect(mapStateToProps, null)(ProfileDrawer);


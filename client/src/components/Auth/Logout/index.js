import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Preloader from '../../Preloader/Primary'

import { logout } from "../../../redux/actions/authAction";

const Logout = (props) => {
    React.useEffect(() => {
        props.logout();
    }, [])

    if (!props.isAuthenticated) {
        return <Redirect to="/" />
    }

    return <Preloader />
}

const mapStateToProps = state => {
    return { ...state.auth };
}

export default connect(mapStateToProps, { logout })(Logout)
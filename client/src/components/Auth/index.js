import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login/index';
import Register from './Register/index';

const AuthRoute = () => {
    return (
        <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </>
    );
}

export default AuthRoute;
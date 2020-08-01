import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/index';
import Register from './Register/index';

const AuthRoute = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    );
}

export default AuthRoute;
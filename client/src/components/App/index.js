import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { initializeCart } from '../../redux/actions/cartActions';
import { validateAuthToken } from '../../redux/actions/authAction';

import Navbar from '../Navbar';
import MainContainer from '../MainContainer';
import Preloader from '../Preloader/Primary';
import Cart from '../Cart';
import AuthRoute from '../Auth';

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './styles.css';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  componentDidMount() {
    this.props.initializeCart();
    this.props.validateAuthToken();
  }

  render() {
    if (this.props.cartLoading) {
      return <Preloader />;
    }

    return (
      <Router>
        <Layout>
          <Header style={{ backgroundColor: 'white' }}>
            <Navbar />
          </Header>

          <Content className="mt-5" style={{ minHeight: '100vh' }}>
            <Switch>
              <Route exact path="/" component={MainContainer} />
              <Route exact path="/cart" component={Cart} />
              <AuthRoute />
            </Switch>

          </Content>

          <Footer>Copyright</Footer>
        </Layout >
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartLoading: state.cart.loading,
    isAuthenticating: state.auth.isAuthenticating
  };
}

export default connect(mapStateToProps, { initializeCart, validateAuthToken })(App);

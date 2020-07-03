import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from '../Navbar';
import MainContainer from '../MainContainer';
import Preloader from '../Preloader/Primary';
import Cart from '../Cart';


import { Layout } from 'antd';

import CartUtil from '../../util/cart';
import 'antd/dist/antd.css';
import './styles.css';

const { Header, Content, Footer } = Layout;

const mapDispatchToProps = (dispatch) => {
  return {
    initializeCart: function (cart) {
      return dispatch({
        type: "initialize_cart", cart
      });
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    CartUtil.initializeCart()
      .then(cart => {
        this.props.initializeCart(cart);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.props.initializeCart([]);
        this.setState({ loading: false });
      });
  }

  render() {

    if (this.state.loading) {
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
              <Route path="/cart" component={Cart} />
            </Switch>

          </Content>

          <Footer>Copyright</Footer>
        </Layout >
      </Router>
    );
  }

}

export default connect(null, mapDispatchToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';

class Register extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="display-3 text-center">Register</h1>
                <hr />
                <Form name="normal_registration" className="registration-form">

                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state.auth }
}

export default connect(mapStateToProps, null)(Register);
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import { register } from '../../../redux/actions/authAction';
import { emailValidationRules, passwordValidationRules } from './rules';

import './styles.css';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 12,
            offset: 6,
        }
    },
};

const Register = (props) => {
    if (props.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <div className="container" id="register">
            <h1 className="display-3 text-center">Register</h1>
            <hr />
            <Form
                {...formItemLayout}
                name="normal_registration"
                onFinish={(values) => props.register(values)}
                scrollToFirstError
                className="registration-form"
                size="large"
            >
                <Form.Item name="email" label="E-mail" rules={emailValidationRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="password"
                    label="Password" rules={passwordValidationRules}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit"
                        className="registration-form-button"
                        loading={props.isAuthenticating}
                    >
                        Register
                         </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { ...state.auth }
}

export default connect(mapStateToProps, { register })(Register);
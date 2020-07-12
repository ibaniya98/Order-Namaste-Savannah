import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../../../redux/actions/authAction';

import './styles.css';

class Login extends React.Component {
    onLogin = values => {
        this.props.login(values);
    }

    render() {
        return (
            <div className="container" id="login">
                <h1 className="display-3 text-center">Login</h1>
                <hr />

                <Form name="normal_login" className="login-form"
                    onFinish={this.onLogin}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link to="/forgot" className="login-form-forgot d-none">
                            Forgot password
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                            loading={this.props.isAuthenticating}
                        >
                            Log In
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.auth }
}

export default connect(mapStateToProps, { login })(Login);
import React from 'react';
import { connect } from 'react-redux';
import {
    Modal, message, Radio, Input, Divider,
    Slider, InputNumber, Row, Col, Button, Checkbox
} from 'antd';

import CartUtil from '../../../util/cart';

class MenuModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.item.options[0]._id,
            modifiers: [],
            quantity: 1,
            notes: ""
        }
        this.addToCart = this.addToCart.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.changeModifier = this.changeModifier.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.getSelectedOption = this.getSelectedOption.bind(this);
        this.getSelectedModifiers = this.getSelectedModifiers.bind(this);

    }

    changeOption(e) {
        this.setState({
            option: e.target.value
        });
    }

    changeModifier(modifiers) {
        if (!this.props.item.modifiers.multiSelect) {
            let previousModifiers = this.state.modifiers;

            if (previousModifiers.length === 0) {
                this.setState({ modifiers });
            } else {
                let previousModifier = previousModifiers[0];
                this.setState({
                    modifiers: modifiers.filter(x => x !== previousModifier)
                });
            }
        } else {
            this.setState({ modifiers });
        }
    }

    changeNotes(e) {
        this.setState({
            notes: e.target.value
        });
    }

    changeQuantity(value) {
        this.setState({
            quantity: value
        });
    }

    getSelectedOption() {
        let options = this.props.item.options;
        return options.filter(option => option._id === this.state.option)[0];
    }

    getSelectedModifiers() {
        let modifiers = this.props.item.modifiers;
        if (modifiers && modifiers.values instanceof Array) {
            return modifiers.values.filter(modifier => {
                return this.state.modifiers.includes(modifier._id);
            });
        }
        return [];
    }

    addToCart() {
        if (!this.state.option) {
            message.error("Please select an option");
            return;
        }

        let currentItem = this.props.item;

        let cartItem = {
            item: currentItem,
            selectedOption: this.getSelectedOption(),
            selectedModifiers: this.getSelectedModifiers(),
            quantity: this.state.quantity,
            notes: this.state.notes,
            cartId: Date.now()
        }

        try {
            this.props.addItem(cartItem);
            console.log(cartItem);
            message.success(`Added ${currentItem.itemName} to the cart`);
        } catch (err) {
            message.error(`Failed to add ${currentItem.itemName} to the cart`);
        }
        this.props.hideModal();
    }

    getModifierComponent(modifiers) {
        let component;

        if (modifiers && modifiers.values.length > 0) {

            component = (
                <>
                    <Divider orientation="left">Modifiers</Divider>
                    {!modifiers.multiSelect && <p>*Please select only one option</p>}
                    <Checkbox.Group onChange={this.changeModifier} className="d-flex flex-column align-items-start" value={this.state.modifiers}>
                        {
                            modifiers.values.map(option => {
                                return (
                                    <>
                                        <Checkbox value={option._id} key={option._id}>
                                            {option.title} $ {option.price}
                                        </Checkbox>
                                    </>
                                )
                            })
                        }
                    </Checkbox.Group>
                </>
            );
        }

        return component;
    }

    render() {
        let currentItem = this.props.item;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        let optionRadio = currentItem.options.map(option => {
            return (
                <Radio style={radioStyle} value={option._id} key={option._id}>
                    {option.title} $ {option.price}
                </Radio>
            )
        });

        let modifiersOptions = this.getModifierComponent(currentItem.modifiers);
        let subTotal = CartUtil.getItemSubTotal(this.state.quantity, this.getSelectedOption(), this.getSelectedModifiers());

        let addToCartText = (
            <div className="d-flex justify-content-around">
                <div>
                    Add {this.state.quantity} to Cart
                </div>
                <div>
                    ${subTotal.toFixed(2)}
                </div>
            </div>
        );

        return (
            <Modal title={currentItem.itemName} visible={this.props.visible}
                onCancel={this.props.hideModal} centered="true"
                footer={[
                    <Button key="submit" type="primary" size="large" shape="round"
                        style={{ minWidth: 250 }}
                        onClick={this.addToCart}
                    >
                        {addToCartText}
                    </Button>,
                ]}>
                <p>{currentItem.description}</p>
                <div>
                    <Divider orientation="left">Pick One</Divider>
                    <Radio.Group onChange={this.changeOption} value={this.state.option} >
                        {optionRadio}
                    </Radio.Group>
                </div>

                <div>
                    <Divider orientation="left">Quantity</Divider>
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={1}
                                max={10}
                                onChange={this.changeQuantity}
                                value={this.state.quantity}
                            />
                        </Col>
                        <Col span={4}>
                            <InputNumber
                                min={1}
                                max={10}
                                style={{ margin: '0 16px' }}
                                value={this.state.quantity}
                                onChange={this.changeQuantity}
                            />
                        </Col>
                    </Row>
                </div>

                {modifiersOptions && (<div>{modifiersOptions}</div>)}

                <div>
                    <Divider>Notes</Divider>
                    <Input.TextArea value={this.state.notes}
                        onChange={this.changeNotes}
                        placeholder="Add any special requests"
                        autoSize={{ minRows: 3, maxRows: 5 }} />
                </div>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: function (item) {
            return dispatch({
                type: "add_item", item
            });
        }
    }
}

export default connect(null, mapDispatchToProps)(MenuModal);
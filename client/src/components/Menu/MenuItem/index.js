import React from 'react';
import { Card, Skeleton } from 'antd';

import './styles.css';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getMenuItemImage = this.getMenuItemImage.bind(this);
        this.getImageComponent = this.getImageComponent.bind(this);
    }

    componentDidMount() {
        this.getMenuItemImage();
    }

    getMenuItemImage() {
        let item = this.props.info;
        if (item.image && item.image.location) {
            let image = new Image();
            image.src = item.image.location;
            image.onload = () => { this.setState({ itemImage: item.image.location }) }
        }
    }

    getImageComponent() {
        if (this.state.itemImage) {
            return (<img src={this.state.itemImage} alt={this.props.info.itemName} />);
        }

        return (
            <Skeleton avatar active paragraph={false} title={false} shape={'square'} />
        )
    }

    render() {
        let item = this.props.info;
        let prices = item.options.map(option => option.price);

        let lowestPrice = Math.min(...prices).toFixed(2);

        let image;
        if (item.image && item.image.location) {
            image = this.getImageComponent();
        }

        return (
            <Card title={item.itemName} hoverable={true} cover={image} className="menu-item" >
                <p>
                    {item.description}
                </p>
                <h5>$ {lowestPrice}</h5>
            </Card>
        )
    }
}

export default MenuItem;
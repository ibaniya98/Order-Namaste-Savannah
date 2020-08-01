import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import ProfileDrawer from './ProfileDrawer';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleDrawer: false
        }
        this.showDrawer = this.showDrawer.bind(this);
        this.hideDrawer = this.hideDrawer.bind(this);
    }

    showDrawer() {
        this.setState({ visibleDrawer: true });
    }

    hideDrawer() {
        this.setState({ visibleDrawer: false });
    }

    render() {
        return (
            <>
                <UserOutlined className="mx-3" onClick={this.showDrawer} />
                <ProfileDrawer visible={this.state.visibleDrawer} onClose={this.hideDrawer} />
            </>
        )
    }

}

export default ProfileIcon;
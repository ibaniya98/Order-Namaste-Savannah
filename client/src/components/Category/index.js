import React from 'react';
import { Skeleton, Menu } from 'antd';

const Category = (props) => {
    let categoryComponents = [];
    if (props.categories) {
        categoryComponents = props.categories.map(category => {
            return <Menu.Item key={category}>{category}</Menu.Item>
        });
    }

    return (
        <Skeleton loading={props.loading} active paragraph={false} className="mx-5 justify-content-center">
            <Menu onClick={(e) => { props.changeCategory(e.key) }}
                selectedKeys={[props.activeCategory]}
                mode="horizontal" className="d-flex justify-content-between"
            >
                {categoryComponents}
            </Menu>
        </Skeleton>
    );
}

export default Category;
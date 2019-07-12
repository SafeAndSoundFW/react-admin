import React from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import './style/common.less'

export default class Common extends React.Component {
    // 如果不继承react 是无法使用render的
    render() {
        return (
            <Row className="container">
                <Col span="24" className="simple-page">
                    <Header menuType="second">
                     
                   </Header>

                    <Row className="content">
                        {this.props.children}
                    </Row>
                </Col>
            </Row>
        )


    }

}
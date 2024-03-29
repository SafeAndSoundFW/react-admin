import React from 'react'
import {Row,Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'
import Home from './pages/home'
export default class Admin extends React.Component{
    // 如果不继承react 是无法使用render的
    render(){
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <NavLeft></NavLeft>
                </Col>
                <Col span="20" className="main">
                   <Header>
                       Header
                   </Header>
                    
                    <Row className="content">
                     {/* <Home/> */}
                        {this.props.children}
                     
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
           
        
    }

}
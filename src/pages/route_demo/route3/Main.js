import React from 'react'
import {Link } from 'react-router-dom'
export default class Main extends React.Component {
    render() {
        return (
                <div>
                   this is Main page
                    <Link to="/main/111" replace>一级路由</Link>
                    <Link to="/main/456" replace>二级路由</Link>
                   <hr/>
                   {this.props.children}
                </div>

        )
    }
}
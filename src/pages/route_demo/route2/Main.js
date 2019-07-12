import React from 'react'
import {Link } from 'react-router-dom'
export default class Main extends React.Component {
    render() {
        return (
                <div>
                   this is Main page
                   <Link to="/main/a">二级路由</Link>
                   <hr/>
                   {this.props.children}
                </div>

        )
    }
}
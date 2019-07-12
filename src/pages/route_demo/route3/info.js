import React from 'react'

export default class Info extends React.Component {
    render() {
        return (
            <div>
               这是动态路由。
               动态路由的值是：{this.props.match.params.value}
                </div>

        )
    }
}
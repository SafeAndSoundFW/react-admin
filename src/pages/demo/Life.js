import React from 'react'
import Child from './Child'
import "./index.css"
// 导出一个类，继承自react这个组件
export default class Life extends React.Component{
    // 初始化一个实例出来
    // constructor (props) {
    //     super(props);
    //     this.state ={
    //         count:0    
    //     }
    // }
        state = {
            count:0
        }
    handleAdd = () => {
        this.setState({
            count:this.state.count+1
        })
    }

    handleClick(){
        this.setState({
            count: this.state.count + 1
        })
    }
    render(){
        // let style = {
        //     padding:50
        // }
        return <div className="content">
            <p>React生命周期介绍</p>
            <button onClick={this.handleAdd}>点击一下</button>
            <button onClick={this.handleClick.bind(this)}>点击一下</button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}></Child>
        </div>
    }
}
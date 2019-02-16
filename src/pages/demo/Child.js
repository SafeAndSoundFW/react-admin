import React from 'react'

// 导出一个类，继承自react这个组件
export default class Child extends React.Component {
    // 初始化一个实例出来
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    componentWillMount(){
        console.log('will mount')
    }
    componentDidMount() {
        console.log('did mount')
    }

    componentWillReceiveProps(newProps){
        // 接收父组件传递过来的数据
        console.log('will props' + newProps.name)
    }
    shouldComponentUpdate(){
        // 这是一个 一旦调了setState 就会更新的一个方法
        console.log('should update')

        // 如果不return true的话，后面的就不会走
        return true
    }
    componentWillUpdate(){
        console.log('will update')
    }
    componentDidUpdate() {
        console.log('did update')
    }
    render() {
   
        return <div>
            <p>这里是子组件，测试子组件的生命周期</p>
            <p>{this.props.name}</p>
           
        </div>
    }
}
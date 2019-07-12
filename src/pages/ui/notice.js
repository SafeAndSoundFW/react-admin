import React from 'react'
// import './index.less'
import './ui.less'
import { Card, Button, Spin, Icon, Alert } from 'antd'
import { notification } from 'antd';
export default class notices extends React.Component {
    state = {

    }
    openNotification = (type,direction) =>{
        if (direction) {
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:'发工资了',
            description:'上个月和这个月一起发'
        })
    }
    render() {
  
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() =>this.openNotification('success')}></Button>
                    <Button type="primary" onClick={() =>this.openNotification('info')}></Button>
                    <Button type="primary" onClick={() =>this.openNotification('warning')}></Button>
                    <Button type="primary" onClick={() =>this.openNotification('error')}></Button>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success','topLeft')}></Button>
                    <Button type="primary" onClick={() => this.openNotification('info','topRight')}></Button>
                    <Button type="primary" onClick={() => this.openNotification('warning','bottomLeft')}></Button>
                    <Button type="primary" onClick={() => this.openNotification('error','bottomRight')}></Button>
                </Card>

            </div>
        )
    }
}
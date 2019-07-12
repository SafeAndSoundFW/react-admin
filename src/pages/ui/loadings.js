import React from 'react'
// import './index.less'
import './ui.less'
import { Card, Button, Spin,Icon,Alert } from 'antd'
export default class loadings extends React.Component {
    state = {
     
    }

    render() {
        const icon = <Icon type="loading" style={{fontSize:24}} />
        const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"></Spin>
                    <Spin size="default" style={{margin:'0 10px'}}></Spin>
                    <Spin size="large"></Spin>
                    <Spin indicator={icon} style={{ marginLeft: 10 }}></Spin>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert message="React" description="欢迎来到react高级实战" type="info"></Alert>
                 
                    <Spin>
                        <Alert message="React" description="欢迎来到react高级实战" type="warning"></Alert>
                    </Spin>

                    <Spin tip="加载中..." indicator={iconLoading}>
                        <Alert message="React"  description="欢迎来到react高级实战" type="warning"></Alert>
                    </Spin>
                </Card>
 
            </div>
        )
    }
}
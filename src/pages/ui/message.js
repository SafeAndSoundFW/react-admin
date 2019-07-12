import React from 'react'
// import './index.less'
import './ui.less'
import { Card, Button} from 'antd'
import { notification, message } from 'antd';
export default class notices extends React.Component {
    state = {

    }
 
    showMessage =(type) =>{
        message[type]("恭喜你，react课程")
    }
    render() {

        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={() => this.showMessage('success')}></Button>
                    <Button type="primary" onClick={() => this.showMessage('info')}></Button>
                    <Button type="primary" onClick={() => this.showMessage('warning')}></Button>
                    <Button type="primary" onClick={() => this.showMessage('error')}></Button>
                </Card>
             

            </div>
        )
    }
}
import React from 'react'
import {Card,Carousel} from 'antd'
import './ui.less'
export default class Carousels extends React.Component {

    render() {
        return (
            <div>
                <Card title="图片背景轮播" className='card-wrap'>
                    
                    <Carousel autoplay>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>1</h3>
                        </div>
                    </Carousel>
                    

                </Card>
            </div>
        )
    }

}
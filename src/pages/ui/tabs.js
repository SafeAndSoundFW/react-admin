import React from 'react'
// import './index.less'
import './ui.less'
import { Card, Button,Tabs,Icon,message} from 'antd'

export default class notices extends React.Component {
    state = {

    }
    newTabIndex = 0
    callback = (key) => {
        message.info("Hi,您选择了页签"+key)
    }
    handlecallback = (key) => {

    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    }
    componentWillMount() {
        const panes = [{
            title:'Tab 1',
            content:'Tab 1',
            key:'1'
        }, {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            }, {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }]

            this.setState({
                panes,
                activeKey: panes[0].key
            })
    }
    render() {
        const TabPane = Tabs.TabPane
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                     <Tabs defaultActiveKey='1' onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                             Tab1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Tab2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Tab3
                        </TabPane>
                </Tabs>
                    
                </Card>

                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey='1' onChange={this.handlecallback}>
                        <TabPane tab={<span><Icon type="plus" />Tab111</span>} key="1">
                            Tab1
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab111</span>} key="2">
                            Tab2
                        </TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab111</span>} key="3">
                            Tab3
                        </TabPane>
                    </Tabs>

                </Card>

                <Card title="动态增加删除页签" className="card-wrap">
                    <Tabs  type="editable-card" onChange={this.onChange} activeKey={this.state.activeKey} onEdit={this.onEdit}>
                      {
                          this.state.panes.map((panel) => {
                              return <TabPane tab={panel.title} key={panel.key}/>
                          })
                      }
                    </Tabs>

                </Card>


            </div>
        )
    }
}
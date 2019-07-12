import React from 'react'
import { Card, Button, Modal, Form} from 'antd'
import Utils from './../../utils/utils';
import axios from './../../axios/index';
import ETable from './../../components/Etable';
import BaseForm from './../../components/BaseForm'
import FormItem from 'antd/lib/form/FormItem';
const formItem = Form.Item 
export default class User extends React.Component {
    params = {
        page:1
    }

    state = {}
    formList = [
        {
            type: 'Input',
            label: "用户名",
            palceholder: "请输入用户名称",
            initialValue: '1',
            field: "user_name",
            width: 100
           
        }, {
            type: 'Input',
            label: "用户手机号",
            palceholder: "请输入用户手机号",
            initialValue: '1',
            field: "user_mobile",
            width: 100
        }, {
            type: 'DATE',
            label: "请选择入职日期",
            palceholder: "请选择日期",
            field: "user_date",
            width: 80
        
        }
    ]

    componentDidMount() {
        this.requestList()
    }
    handleFilter = (params) => {
        this.params = params
        this.requestList();
    }
    requestList = () => {
        axios.requestList(this,'/user/list',this.params,true);
        
    }
    handleOperate = (type) => {
        if(type == 'create') {
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        }

    }
    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子'
                    }[state]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },{
                title: '联系地址',
                dataIndex: 'address'

            }, {
                title: '早起时间',
                dataIndex: 'time'

            }
        ]
        return (
            <div>
                <Card> 
                    <BaseForm formList = {this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }} className="operate-wrap">
                    <Button type="primary" onClick={this.handleOpenCity} icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" onClick={this.handleOpenCity} icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={this.handleOpenCity} onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" onClick={this.handleOpenCity} icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        rowSelection={'radio'} />
 
                </div>
                <Modal 
                title={this.state.title} 
                visible={this.state.isVisible}
                onOk={this.handleSubmit}
                onCancel = {() => {
                    this.setState({
                        isVisible:false
                    })

                }}
                width = {600}
                >
                
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component {
    // const formItemLayout = {
        
    // }

    render () {
        return (
            <Form layout="horizontal">
                <FormItem></FormItem>
            </Form>
        )
    }
}
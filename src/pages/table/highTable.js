import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios/index';
import Utils from '../../utils/utils'
export default class BasicTable extends React.Component {
    state = {

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request()
      
    }
    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page,
                }
            }
        }).then(res => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource: res.result.list,
                  
                  
                })

            }

        })

    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: '被选中'
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })

    }
    handleDelete = (() => {
        console.log(111)
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id)
        })
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗${ids.join(',')}`,
            onOk: () => {
                message.success("删除成功")
                this.request()
            }
        })

    })
    handleChange = (pagination,filters,sorter) => {
        this.setState({
            sortOrder: sorter.order

        })

    }
    render() {
        const columns = [
            {
                title: 'id',
                key:'id',
                width: 80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                width: 80,
                dataIndex: 'sex',
                key: 'sex',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                },
            },
            {
                title: '状态',
                width: 80,
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': "我",
                        "2": "你"
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                width: 80,
                key: 'interest',
                dataIndex: 'interest',
                sorter:(a,b) => {
                    return a.interest - b.interest
                },
                sortOrder:this.state.sortOrder
            },
            {
                title: '生日',
                key: 'birthday',
                width: 80,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                width: 80,
                dataIndex: 'address'
            }
        ]
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        return (
            <div>
                <Card title="头部固定">
                    <Table bordered dataSource={this.state.dataSource} columns={columns} pagination={false} scroll={{y:240}}></Table>
                </Card>
                <Card style={{ marginTop: 10 }} title="表格排序">
                    <Table bordered dataSource={this.state.dataSource} columns={columns} onChange={this.handleChange}></Table>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection}
                        columns={columns}
                        pagination={false}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                },

                            }
                        }}
                    >
                    </Table>
                </Card>
                <Card title="Mock-复选" style={{ marginTop: 10 }}>
                    <div>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        pagination={false}
                    >
                    </Table>
                </Card>
                <Card title="分页" style={{ marginTop: 10 }}>

                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={this.state.pagination}
                    >
                    </Table>
                </Card>
            </div>
        )
    }

}
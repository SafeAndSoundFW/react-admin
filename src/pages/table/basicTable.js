import React from 'react';
import { Card, Table, Modal,Button,message} from 'antd';
import axios from './../../axios/index';
import Utils from '../../utils/utils'
export default class BasicTable extends React.Component {
    state = {
        
    }
    params = {
        page:1
    }
   
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
              
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区',
            },
            {
                id: '0',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区',
            },
            {
                id: '0',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区',
            }
        ]
        dataSource.map((item, index) => {
            item.key = index;
        })
        this.setState({
            dataSource,
            dataSource2:[]
        })
        this.request()
    }
    request = () => {
        let _this =this
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page,
                }
            }
        }).then(res => {
            if (res.code == 0) {
                res.result.list.map((item,index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res,(current) => {
                        _this.params.page = current;
                        _this.request()
                    })
                })
                console.log(this.state.dataSource2)

            }

        })
      
    }
    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:'被选中'
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem: record
        })

    }
    handleDelete = (() => {
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
    render() {
     
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                },
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1':"我",
                        "2":"你"
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            }
        ]
        const { selectedRowKeys} = this.state
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }

        return (
            <div>
              <Card>
                    <Table bordered dataSource={this.state.dataSource} columns={columns} pagination={false}></Table>
              </Card>
                <Card style={{marginTop:10}}>
                    <Table bordered dataSource={this.state.dataSource2} columns={columns} pagination={false}></Table>
              </Card>
                <Card style={{ marginTop: 10 }}>
                    <Table 
                    bordered 
                    dataSource={this.state.dataSource2} 
                    rowSelection={rowSelection}
                     columns={columns} 
                     pagination={false}
                     onRow={(record,index) => {
                         return {
                             onClick:() => {
                                 this.onRowClick(record,index);
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
                        dataSource={this.state.dataSource2}
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        pagination={false}
                    >
                    </Table>
                </Card>
                <Card title="分页" style={{ marginTop: 10 }}>
                 
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={this.state.pagination}
                    >
                    </Table>
                </Card>
            </div>
        )
    }

}
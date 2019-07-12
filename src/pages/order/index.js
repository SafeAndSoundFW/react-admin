import React from 'react';
import { Card, Button, Table, Form, Select, Modal } from 'antd'

import axios from './../../axios/index';
import Utils from './../../utils/utils';
import BaseForm from '../../components/BaseForm'
import FormItem from 'antd/lib/form/FormItem';
import { message } from 'antd';
import { DatePicker } from 'antd';
import ETable from './../../components/Etable'
const Option = Select.Option;


export default class City extends React.Component {
    params = {
        page: 1
    }
    formList = [
        {
            type:'SELECT',
            label:"城市",
            palceholder:"全部",
            initialValue:'1',
            field:"city",
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }, { id: '3', name: '天津' }]
        },{
            type:'时间查询',
        },{
            type: 'SELECT',
            label: "订单状态",
            palceholder: "全部",
            initialValue: '1',
            field: "order_status",
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    state = {
        list: [],
        pagination: '',
        orderInfo:{},
        selectedRowKeys:'',
        orderConfirmVisible:false
    }
    componentDidMount() {
        this.requestList()

    }
    handleFilter = (params) => {
        this.params = params;
        console.log(params)
        this.requestList()
    }

    requestList = () => {
        let _this = this
        console.log(axios)
        axios.requestList(this, '/open_city',this.params,true)
        // axios.ajax({
        //     url: '/open_city',
        //     data: {
        //         params: {
        //             page: this.params
        //         }
        //     }
        // }).then(res => {
        //     console.log(res.result.item_list)
        //     this.setState({
        //         list: res.result.item_list.map((item, index) => {
        //             item.key = index;
        //             return item;
        //         }),
        //         pagination: Utils.pagination(res, (current) => {
        //             console.log(current)
        //             _this.params.page = current;
        //             _this.requestList()
        //         })
        //     })
        // })

    }
    
    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })

    }
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title:'信息',
                content:'请选择一条信息'
            })
            return
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:item.id
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisible: true
                })
            }
        })


    }
    // 订单结束
    handleOrderFinish = () => {
        let id = this.state.selectedItem.id;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: id
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: false
                })
            }
        })

    }
    handleOpenSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo)
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if (res.code == '0') {
                message.success('开通成功')
                this.setState({
                    isShowOpenCity: false
                })
                this.requestList()

            }
        })

    }
    // onRowClick = (record, index) => {
    //     let selectKey = [index];
       
    //     this.setState({
    //         selectedRowKeys: selectKey,
    //         selectedItem: record
    //     })

    // }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条信息'
            })
            return
        }
        window.open("/#/common/order/detail/2959165")

    }
    render() {
        const { selectedRowKeys } = this.state.selectedRowKeys
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode == 1 ? '停车点' : '禁停区'
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '禁停区'
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_id'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time'
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }

        ]
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 10
            }
        }
        
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit = {this.handleFilter}></BaseForm>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity} onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable columns={columns} 
                    dataSource={this.state.list}
                     pagination={this.state.pagination} 
                     selectedRowKeys={this.state.selectedRowKeys} 
                     selectedIds={this.state.selectedIds}
                     selectedItem={this.state.selectedItem}
                      updateSelectedItem={Utils.updateSelectedItem.bind(this)} 
                      rowSelection={'checkbox'}/>
                    {/* <Table bordered columns={columns} dataSource={this.state.list} pagination={this.state.pagination} rowSelection={rowSelection} onRow={(record, index) => {
                        return {
                            onClick: () => {
                                this.onRowClick(record, index);
                            },

                        }
                    }}/> */}
                </div>
                <Modal title="开通城市" visible={this.state.isShowOpenCity} onCancel={
                    () => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }
                }
                    onOk={this.handleOpenSubmit}>
                    <OpenCityForm wrappedComponentRef={(inst) => { this.cityForm = inst; }} />
                </Modal>

                <Modal title="结束订单" visible={this.state.orderConfirmVisible} onCancel={
                    () => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }
                }
                    onOk={this.handleOrderFinish} >
                    <Form layout="horizontal" >
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.battery}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                    </Form>
                  
                </Modal>
            </div>
        )
    }
}
class OpenCityForm extends React.Component {


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'

                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'

                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>

                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'

                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>

                            </Select>
                        )
                    }


                </FormItem>
                <FormItem label="订单时间" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'

                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间" {...formItemLayout}>
                    {
                        getFieldDecorator('end_time', {
                            initialValue: '1'

                        })(
                            <DatePicker style={{ marginLeft: 5 }} showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                        )

                    }
                </FormItem>
            </Form>
        )
    }

}

OpenCityForm = Form.create({})(OpenCityForm)
// 定义一个子组件
class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市：">
                    {
                        getFieldDecorator('city_id')(
                            <Select palceholder="全部" style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">上海市</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="用车模式：" >
                    {
                        getFieldDecorator('mode')(
                            <Select palceholder="全部" style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="营运模式：">
                    {
                        getFieldDecorator('op_mode')(
                            <Select palceholder="全部" style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="加盟商授权状态：">
                    {
                        getFieldDecorator('op_mode')(
                            <Select palceholder="全部" style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>


            </Form>
        );

    }

}
FilterForm = Form.create({})(FilterForm)
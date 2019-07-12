import React from 'react';
import { Card, Form, Input, Button, Icon, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload} from 'antd';
import { message } from 'antd';
import { InputNumber } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => callback(reader.result));
}

class FormLogin extends React.Component {
    state = {
        loading: false,
    };
    
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                message.success(`${userInfo.userName}${userInfo.userPwd}`)
            }
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, userImg => this.setState({
                userImg,
                loading: false,
            }));
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:5
            },
            wrapperCol:{
                xs:24,
                sm:12
            }

        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:5
                }
            }
        }
        const rowObject = {
            minRows:4,maxRows:6
        }
        return (
            <div>
     
                <Card title="注册表单">
                    <Form  layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '用户名不能为空'
                                    }]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码"  {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码" type="password" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别"  {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                        )
                    }
                        </FormItem>
                        <FormItem label="年龄"  {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: '1',
                                    rules: []
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态"  {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '1',
                                    rules: []
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">咸鱼一条</Option>
                                        <Option value="3">咸鱼一条</Option>
                                        <Option value="4">咸鱼一条</Option>
                                        <Option value="5">咸鱼一条</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好"  {...formItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">咸鱼一条</Option>
                                        <Option value="3">咸鱼一条</Option>
                                        <Option value="4">咸鱼一条</Option>
                                        <Option value="5">咸鱼一条</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚"  {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    initialValue: 'checked',
                                    rules: []
                                })(
                                  <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日"  {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-08'),
                                    rules: []
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD" />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址"  {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    initialValue:'北京市海淀区'
                                })(
                                    <TextArea autosize={rowObject}/>
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间"  {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像"  {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload listType="picture-card" showUploadList={false} action="//jsonplaceholder.typicode.com/posts/" onChange={this.handleChange}>
                                        {this.state.userImg?<img src={this.state.userImg} />:<Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout} >
                            {
                                getFieldDecorator('birthday', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Checkbox>我已阅读<a href="#">慕课网协议</a></Checkbox>
                                )
                            }
                            
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormLogin)
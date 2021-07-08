import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd';

const { Option } = Select;

class SetupProduct extends Component {
  constructor(props) {
    super(props)
    this.state ={

    }
  }
  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={{ portNum: 'china' }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}>
        <Form.Item
          label="产品名称"
          name="username"
          rules={[{ required: true, message: '请输入产品名称' }]}>
          <Input placeholder="请输入产品名称，不能超过20个字符" />
        </Form.Item>

        <Form.Item
          label="产品品牌"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input placeholder="请输入产品名称，支持中英文" />
        </Form.Item>

        <Form.Item label="产品型号" name="password">
          <Input placeholder="请输入产品型号，支持中英文、数字" />
        </Form.Item>
        <Form.Item name="radio-group" label="通信协议"
          rules={[{ required: true, message: 'Please pick an item!' }]}>
          <Radio.Group>
            <Radio value="a">NB</Radio>
            <Radio value="b">NB＋ZigBee</Radio>
            <Radio value="c">bie</Radio>
            <Radio value="c">NB＋ZigBee＋bie</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="radio-group" label="网关子设备协议"
          rules={[{ required: true, message: 'Please pick an item!' }]}>
          <Radio.Group>
            <Radio value="bie">bie</Radio>
            <Radio value="红外">红外</Radio>
            <Radio value="PLC">PLC</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="portNum" label="控制端口数"
          rules={[{ required: true, message: 'Please pick an item!' }]}>
          <Select style={{ width: 200 }}>
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>
      </Form>
    )
  }
}

export default SetupProduct

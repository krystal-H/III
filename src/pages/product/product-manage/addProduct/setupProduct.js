import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd';
import { Notification } from '../../../../components/Notification';

const { Option } = Select;

class SetupProduct extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
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
        ref={this.formRef}
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
          rules={[
            { required: true, message: '请输入中文产品名称' },
            { max: 20, message: '最大输入长度为20' },
            { pattern: new RegExp(/^[\u2E80-\u9FFF]+$/, "g"), message: '请输入中文产品名称' }
          ]}>
          <Input placeholder="请输入中文产品名称，不能超过20个字符" />
        </Form.Item>

        <Form.Item
          label="产品品牌"
          name="password"
          rules={[
            { required: true, message: '请输入中文/英文品牌名称' },
            { pattern: new RegExp(/^[a-zA-Z\u4e00-\u9fa5]+$/, "g"), message: '请输入中文/英文品牌名称' }
          ]}>
          <Input placeholder="请输入中文/英文品牌名称" />
        </Form.Item>

        <Form.Item label="产品型号" name="type"
          rules={[
            { pattern: new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]+$/, "g"), message: '请输入产品型号，支持中英文、数字' }
          ]}>
          <Input placeholder="请输入产品型号，支持中英文、数字" />
        </Form.Item>
        <Form.Item name="agree" label="通信协议"
          rules={[{ required: true, message: '请选择通信协议' }]}>
          <Radio.Group>
            <Radio value="a">NB</Radio>
            <Radio value="b">NB＋ZigBee</Radio>
            <Radio value="c">bie</Radio>
            <Radio value="c">NB＋ZigBee＋bie</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="radio-group" label="网关子设备协议"
          rules={[{ required: true, message: '网关子设备协议' }]}>
          <Radio.Group>
            <Radio value="bie">bie</Radio>
            <Radio value="红外">红外</Radio>
            <Radio value="PLC">PLC</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="portNum" label="控制端口数"
          rules={[{ required: true, message: '控制端口数' }]}>
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

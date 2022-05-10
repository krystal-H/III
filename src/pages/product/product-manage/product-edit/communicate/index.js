import React, { Component } from 'react'
import { Form, Checkbox } from 'antd'
import { productSchemeTypeMap } from '../../../../../configs/text-map';
import { Notification } from '../../../../../components/Notification'
import './index.scss'

class Comunicate extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      productItemData: JSON.parse(sessionStorage.getItem('productItem')) || {},
      checkedValues: []
    }
  }

  
  onFinish = (values) => {
    console.log(values)
    if (this.state.checkedValues.length === 0) {
      return Notification({ type: 'warn', description: '请更改配置通信协议' })
    } else {
      this.props.nextStep()
    }
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  // 选择通信协议
  changeProtocol = (values) => {
    console.log(values)
    this.setState({
      checkedValues: values
    })
  }

  // 获取方案类型展示
  getSchemeType = () => {
    if (this.state.productItemData.schemeType) {
      return productSchemeTypeMap[this.state.productItemData.schemeType]
    } else {
      return ''
    }
  }

  render() {
    return (
      <div>
        <div className="desc">{this.getSchemeType()}</div>
        <Form ref={this.formRef} className="communicate-form"
          name="control-ref"
          onFinish={this.onFinish}>
          <Form.Item
            name="bindType"
            label="云端通信方式"
            rules={[{ required: true, message: '请选择云端通信方式' }]}>
            <Checkbox.Group className="check-group"
              onChange={(values) => this.changeProtocol(values)} >
              <Checkbox value="wifi">wifi</Checkbox>
              <Checkbox value="BLE">BLE</Checkbox>
              <Checkbox value="GPRS">GPRS</Checkbox>
              <Checkbox value="3G/4G/5G">3G/4G/5G</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Comunicate

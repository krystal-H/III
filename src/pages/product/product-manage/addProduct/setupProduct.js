import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd'
import { Notification } from '../../../../components/Notification'
import { Paths, post } from '../../../../api'
import { connect } from 'react-redux'
import {createProductFormAction} from '../store/ActionCreator'

const { Option } = Select;
const gatewayTypeList = [
  {
    key: 1,
    value: 'Wifi'
  },
  {
    key: 2,
    value: '蓝牙'
  },
  {
    key: 3,
    value: 'zigbee2.0'
  },
  {
    key: 4,
    value: 'zigbee3.0'
  },
  {
    key: 5,
    value: '超级开关/衣柜'
  }
]

const mapStateToProps = state => {
  console.log(state.getIn(['createProductForm']), '步骤3333333页面取得值')
  return {
    schememData: state.getIn(['createProductForm'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProductForm: params => dispatch(createProductFormAction(params))
  }
}

class SetupProduct extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      productBrandList: [], // 产品品牌
      protocolList: [], // 通信协议
    }
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件

    this.getProductBrand()
    this.getCommunicationProtocol()
  }

  // 获取产品品牌
  getProductBrand = () => {
    post(Paths.getProductBrand, {}).then(res => {
      this.setState({
        productBrandList: res.data
      })
    }, () => {
      this.setState({
        productBrandList: []
      })
    })
  }

  // 获取通信协议
  getCommunicationProtocol = () => {
    post(Paths.getCommunicationProtocol, {}).then(res => {
      this.setState({
        protocolList: res.data
      })
    })
  }

  onFinish = (values) => {
    console.log('Success:', values);
    this.props.createProductForm(values)
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  render() {
    const { productBrandList, protocolList } = this.state
    return (
      <Form
        ref={this.formRef}
        name="setupProduct"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        initialValues={{}}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}>
        <Form.Item
          label="产品名称"
          name="productName"
          rules={[
            { required: true, message: '请输入产品名称' },
            { max: 20, message: '最大输入长度为20' },
          ]}>
          <Input placeholder="请输入产品名称，不能超过20个字符" />
        </Form.Item>

        <Form.Item
          label="产品品牌"
          name="brandId"
          rules={[{ required: true, message: '请选择产品品牌' }]}>
          <Select style={{ width: '100%' }}>
            {
              productBrandList.length > 0 && productBrandList.map(item => (
                <Option value={item.brandId} key={item.brandId}>{item.fullName}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="产品型号"
          name="productCode"
          rules={[
            { pattern: new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]+$/, "g"), message: '请输入产品型号，支持中英文、数字' }
          ]}>
          <Input placeholder="请输入产品型号，支持中英文、数字" />
        </Form.Item>
        <Form.Item name="bindType" label="通信协议"
          rules={[{ required: true, message: '请选择通信协议' }]}>
          <Radio.Group>
            {
              protocolList.length > 0 && protocolList.map(item => (
                <Radio
                  value={`${item.bindTypeId}#${item.bindTypeVersion}`}
                  key={`${item.bindTypeId}#${item.bindTypeVersion}`}
                  style={{ marginBottom: 8 }} >
                  {item.bindTypeName}
                </Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item name="gatewayType" label="网关子设备协议"
          rules={[{ required: true, message: '网关子设备协议' }]}>
          <Radio.Group>
            {
              gatewayTypeList.map(item => (
                <Radio value={item.key} key={item.key}>{item.value}</Radio>
              ))
            }
            <Radio value="bie">bie</Radio>
            <Radio value="红外">红外</Radio>
            <Radio value="PLC">PLC</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="portNumber" label="控制端口数"
          rules={[{ required: true, pattern: new RegExp(/^[0-9]+$/, "g"), message: '请输入控制端口数，支持数字' }]}
        >
          <Input placeholder="请输入控制端口数，支持数字" />
        </Form.Item>
      </Form>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetupProduct)

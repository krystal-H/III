import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd'
import { Notification } from '../../../../components/Notification'
import { Paths, post } from '../../../../api'
import { connect } from 'react-redux'
import {
  createProductFormAction,
  createProductCategoryAction,
  createProductSchemeAction,
  createProductSchemekeyAction,
  createProductSchemeBtnKeyAction
} from '../store/ActionCreator'

const { Option } = Select;
const gatewayTypeList = ['Wifi', '蓝牙', 'zigbee2.0', 'zigbee3.0', '超级开关/衣柜']

const mapStateToProps = state => {
  // console.log(state.getIn(['product', 'createProductCategory']), '步骤3333333页面取得值')
  return {
    createProductCategory: state.getIn(['product', 'createProductCategory']),
    schememData: state.getIn(['product', 'createProductScheme']),
    saveProductForm: state.getIn(['product', 'createProductForm'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProductForm: params => dispatch(createProductFormAction(params)),
    createProduct_Category: params => dispatch(createProductCategoryAction(params)),
    createProductScheme: params => dispatch(createProductSchemeAction(params)),
    createProductSchemekey: params => dispatch(createProductSchemekeyAction(params)),
    createProductSchemeBtnKey: params => dispatch(createProductSchemeBtnKeyAction(params)),
  }
}

class SetupProduct extends Component {
  formRef = React.createRef()
  constructor(props) {
    // console.log(props, '***********')
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

  // 保存后重置数据
  resetData = () => {
    this.props.createProductForm({})
    this.props.createProduct_Category({})
    this.props.createProductScheme({})
    this.props.createProductSchemekey('1')
    this.props.createProductSchemeBtnKey(0)
  }

  onFinish = (values) => {
    console.log('Success:', values);
    this.props.createProductForm(values)
    const params = {
      ...this.props.createProductCategory,
      ...this.props.schememData,
      ...values
    }
    console.log('调用提交的接口', params)
    post(Paths.createProduct, { ...params }).then(res => {
      Notification({ description: '创建成功！', type: 'success' })
      this.props.handleCancel()
      this.resetData()
      this.props.getProductListNew()
    }, () => {
      Notification({ description: '创建失败！', type: 'error' })
    })
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  render() {
    const { productBrandList, protocolList } = this.state
    const { saveProductForm } = this.props
    return (
      <Form
        ref={this.formRef}
        name="setupProduct"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        initialValues={{
          productName: saveProductForm.productName || '',
          brandId: saveProductForm.brandId || ''
        }}
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
        {
          this.props.createProductCategory.deviceTypeName.indexOf('网关') !== -1 &&
          <Form.Item name="gatewayType" label="网关子设备协议"
            rules={[{ required: true, message: '网关子设备协议' }]}>
            <Radio.Group>
              {
                gatewayTypeList.map((item, index) => (
                  <Radio value={index + 1} key={item}>{item}</Radio>
                ))
              }
            </Radio.Group>
          </Form.Item>
        }
        {
          this.props.createProductCategory.controlClass == 1 &&
          <Form.Item name="portNumber" label="控制端口数"
            rules={[{ required: true, pattern: new RegExp(/^[0-9]+$/, "g"), message: '请输入控制端口数，支持数字' }]}
          >
            <Input placeholder="请输入控制端口数，支持数字" />
          </Form.Item>
        }
      </Form>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetupProduct)

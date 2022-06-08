import React, { Component } from 'react'
import { Form, Radio } from 'antd'
import { productSchemeTypeMap } from '../../../../../configs/text-map';
import { Notification } from '../../../../../components/Notification'
import { get, Paths, post } from '../../../../../api'
import './index.scss'

class Comunicate extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      productItemData: JSON.parse(sessionStorage.getItem('productItem')) || {},
      checkedValues: '',
      protocolList: [], // 操作系统
    }
  }

  componentDidMount() {
    this.getSystemData()
    this.systemShowDetail()
  }

  // 获取操作系统
  getSystemData = () => {
    get(Paths.getSystemType).then(res => {
      this.setState({
        protocolList: res.data
      })
    })
  }

  // 详情回显
  systemShowDetail = () => {
    post(Paths.systemShow, { productId: this.props.productId }).then(res => {
      if (res.code === 0) {
        this.formRef.current.setFieldsValue({ systemType: res.data.systemType })
        this.setState({
          checkedValues: res.data.systemType
        })
      }
    })
  }

  // 保存系统数据
  saveSystemData = () => {
    const params = {
      productId: this.props.productId,
      ...this.formRef.current.getFieldsValue('systemType')
    }
    post(Paths.saveSystem, params).then(res => {
      this.systemShowDetail()
      this.props.nextStep()
    })
  }

  onFinish = (values) => {
    console.log(values)
    if (!this.state.checkedValues) {
      return Notification({ type: 'warn', description: '请选择操作系统' })
    } else {
      this.saveSystemData()
    }
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  // 选择系统
  changeProtocol = (e) => {
    console.log(e.target.value)
    this.setState({
      checkedValues: e.target.value
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
    const { protocolList } = this.state
    return (
      <div>
        <div className="desc">{this.getSchemeType()}</div>
        <Form ref={this.formRef} className="communicate-form"
          name="control-ref"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Form.Item
            name="systemType"
            label="操作系统"
            rules={[{ required: true, message: '请选择操作系统' }]}>
            <Radio.Group
              onChange={(val) => this.changeProtocol(val)}
              className="checkbox-group">
              {
                protocolList && protocolList.map(item => (
                  <Radio value={item.baseTypeId} key={item.baseTypeId}>
                    {item.baseTypeName}
                  </Radio>
                ))
              }
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Comunicate

import React, { Component } from 'react'
import { Form, Checkbox } from 'antd'
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
      checkedValues: [],
      protocolList: [], // 通信协议
    }
  }

  componentDidMount() {
    this.getCommunicationProtocol()
    this.feibiaoModeDetail()
  }

  // 获取通信协议
  getCommunicationProtocol = () => {
    post(Paths.getCommunicationProtocol, {}).then(res => {
      this.setState({
        protocolList: res.data
      })
    })
  }


  // 详情回显
  feibiaoModeDetail = () => {
    post(Paths.feiBiaoMode, { productId: this.props.productId }).then(res => {
      const communicationModeList = res.data && res.data.map((item) => {
        return `${item.bindType}#${item.bindTypeVersion}`
      })
      this.formRef.current.setFieldsValue({ communicationModeList })
    })
  }

  // 保存通信方式
  saveFeiBiao = () => {
    const params = { 
      productId: this.props.productId, 
      communicationModeList: this.state.checkedValues 
    }
    params.communicationModeList = params.communicationModeList.map((item) => {
      return {
        bindType: Number(item.split('#')[0]),
        bindTypeVersion: Number(item.split('#')[1])
      }
    })
    post(Paths.saveFeibiao, params).then(res => {
      this.feibiaoModeDetail()
      this.props.nextStep()
    })
  }

  onFinish = (values) => {
    console.log(values)
    if (this.state.checkedValues.length === 0) {
      return Notification({ type: 'warn', description: '请更改配置通信方式' })
    } else {
      this.saveFeiBiao()
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
    const { protocolList } = this.state
    return (
      <div>
        <div className="desc">{this.getSchemeType()}</div>
        <Form ref={this.formRef} className="communicate-form"
          name="control-ref"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Form.Item
            name="communicationModeList"
            label="云端通信方式"
            rules={[{ required: true, message: '请选择云端通信方式' }]}>
            <Checkbox.Group
              onChange={(val) => this.changeProtocol(val)}
              className="checkbox-group">
              {
                protocolList && protocolList.map(item => (
                  <Checkbox
                    value={`${item.bindTypeId}#${item.bindTypeVersion}`}
                    key={`${item.bindTypeId}#${item.bindTypeVersion}`}>
                    {item.bindTypeName}
                  </Checkbox>
                ))
              }
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Comunicate

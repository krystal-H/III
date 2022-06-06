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
      showProtocolList: [] // 展示通信方式
    }
  }

  componentDidMount() {
    this.getCommunicationProtocol()

  }

  // 获取通信协议
  getCommunicationProtocol = () => {
    post(Paths.getCommunicationProtocol, {}).then(res => {
      this.feibiaoModeDetail(res.data)
    })
  }

  // 详情回显
  feibiaoModeDetail = (list) => {
    post(Paths.feiBiaoMode, { productId: this.props.productId }).then(res => {
      let arrName = []
      res.data && res.data.forEach(item => {
        list.forEach(item2 => {
          if (item.bindType == item2.bindTypeId) {
            arrName.push(item2.bindTypeName)
          }
        })
      })
      console.log(arrName, '----arrName')
      this.setState({
        showProtocolList: arrName
      })
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
    const { showProtocolList } = this.state
    return (
      <div>
        <div className="desc">{this.getSchemeType()}</div>
        <Form ref={this.formRef} className="communicate-form" name="control-ref" >
          <Form.Item name="communicationModeList" label="云端通信方式">
            <div>
              {
                showProtocolList.length && showProtocolList.map((item, index) => {
                  return <span className='pro-item' key={index}>{item}</span>
                })
              }
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Comunicate

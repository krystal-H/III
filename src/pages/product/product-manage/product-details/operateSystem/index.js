import React, { Component } from 'react'
import { Form } from 'antd'
import { productSchemeTypeMap } from '../../../../../configs/text-map';
import { get, Paths, post } from '../../../../../api'
import './index.scss'

class Comunicate extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      productItemData: JSON.parse(sessionStorage.getItem('productItem')) || {},
      checkedValues: '',
      showProtocolStr: ''
    }
  }

  componentDidMount() {
    this.getSystemData()
  }

  // 获取操作系统
  getSystemData = () => {
    get(Paths.getSystemType).then(res => {
      this.systemShowDetail(res.data)
    })
  }

  // 详情回显
  systemShowDetail = (list) => {
    post(Paths.systemShow, { productId: this.props.productId }).then(res => {
      if (res.code === 0) {
        let str = ''
        list.forEach(item => {
          if (item.baseTypeId == res.data.systemType) {
            str = item.baseTypeName
          }
        })
        this.setState({
          showProtocolStr: str
        })
      }
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
    const { showProtocolStr } = this.state
    return (
      <div>
        <div className="desc">{this.getSchemeType()}</div>
        <Form ref={this.formRef} className="operate-form" name="control-ref">
          <Form.Item name="systemType" label="操作系统" >
            <span className='pro-item'>{showProtocolStr}</span>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Comunicate

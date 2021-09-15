import React, { Component } from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import {createProductSchemekeyAction} from '../store/ActionCreator'
import { Paths, post } from '../../../../api'
import SwitchTab from './switchTab'

import "./addProduct.scss"

const { TabPane } = Tabs;

const mapStateToProps = state => {
  return {
    activeKey: state.getIn(['product', 'createProductSchemekey'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeKey: params => dispatch(createProductSchemekeyAction(params)) 
  }
}

class SwitchFreeDep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // currentActiveKey: props.activeKey,
      btnList1: [], // 免开发
      btnList2: [], // MCU
      btnList3: [], // Soc
      thirdCategoryId: props.thirdCategoryId
    }
    this.refSwitchTab = null
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
    this.getScheme()
  }

  // 获取方案数据
  getScheme() {
    post(Paths.getScheme, { deviceTypeId: this.state.thirdCategoryId }).then(res => {
      for (let key in res.data) {
        this.setState({ [`btnList${key}`]: res.data[key] })
      }
    })
  }

  // 切换方案
  handleChange = (activeKey) => {
    // 调用子组件方法重置tab选中
    this.refSwitchTab.resetIndex()
    this.setState(() => {
      return { currentActiveKey: activeKey }
    })
    // 修改store中存的值
    this.props.changeKey(activeKey)
  }

  render() {
    const { currentActiveKey, btnList1, btnList2, btnList3 } = this.state
    const { thirdCategoryId } = this.props
    return (
      <Tabs onChange={(activeKey) => this.handleChange(activeKey)} destroyInactiveTabPane>
        {/* 免开发方案 */}
        {
          btnList1.length > 0 &&
          <TabPane tab="免开发方案" key="1">
            <SwitchTab
              tip="免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。"
              btnList={btnList1}
              deviceTypeId={thirdCategoryId}
              onRef={ref => { this.refSwitchTab = ref }} />
          </TabPane>
        }

        {/* MCU方案 */}
        {
          btnList2.length > 0 &&
          <TabPane tab="独立MCU方案" key="2">
            <SwitchTab
              tip="独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。"
              btnList={btnList2}
              deviceTypeId={thirdCategoryId}
              onRef={ref => { this.refSwitchTab = ref }} />
          </TabPane>
        }

        {/* Soc方案 */}
        {
          btnList3.length > 0 &&
          <TabPane tab="SoC方案" key="3">
            <SwitchTab
              tip="SoC方案，不提供通用固件程序，需自行开发模组固件。"
              btnList={btnList3}
              deviceTypeId={thirdCategoryId}
              onRef={ref => { this.refSwitchTab = ref }} />
          </TabPane>
        }

        {/* 无配置方案 */}
        {
          btnList1.length === btnList2.length === btnList3.length === 0 &&
          <div>
            暂无数据
          </div>
        }
      </Tabs>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchFreeDep)

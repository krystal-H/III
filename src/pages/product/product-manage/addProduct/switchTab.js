import React, { Component } from 'react'
import { Button, Tabs, Table } from 'antd';

const { TabPane } = Tabs;

class SwitchTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      planActiveKey: '1',
      btnIndex: 0,
      summaryText: '', // 概述
      propertyText: '', // 特点
      suitableText: '', // 适合
    }
    this.columns = [
      {
        title: '功能名称',
        dataIndex: 'name',
      },
      {
        title: '标识符',
        dataIndex: 'age',
      },
      {
        title: '数据类型',
        dataIndex: 'address',
      }
    ];
    this.dataSource = [];
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
    this.getInitMsg()
  }
  // 切换tab
  handleChange(activeKey) {
    this.setState({ planActiveKey: activeKey })
  }
  // 切换方案下的按钮
  changeBtn(index, type, item, e) {
    this.setState({ btnIndex: index, planActiveKey: '1' }, this.getPlanMsg)
  }
  // 获取对应方案的信息
  getInitMsg() {
    this.setState({
      summaryText: '通信模组负责与云端信息的交互，通过串口与主控板（即MCU）进行通信，需要在MCU上进行协议解析与外设控制的开发。',
      propertyText: '独立MCU能提供更丰富的系统资源。',
      suitableText: '复杂的智能硬件设备。'
    })
  }
  getPlanMsg(){
    this.setState({
      summaryText: '无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。', // 概述
      propertyText: '无需开发', // 特点
      suitableText: '功能简单的硬件设备。', // 适合
    })
  }
  // 重置tab选中项，父组件调用
  resetIndex() {
    this.setState({ btnIndex: 0, planActiveKey: '1' })
  }
  render() {
    let { btnIndex, planActiveKey, summaryText, propertyText, suitableText } = this.state
    let { tip, btnList } = this.props
    return (
      <div className="dep-plan-block">
        <p className="dep-plan-tip">{tip}</p>
        {
          btnList ? btnList.map((item, index) => (
            <Button className={`dep-btn ${btnIndex === index ? "active-btn" : ""}`}
              key={item.key}
              onClick={(e) => this.changeBtn(index, 'btnIndex', item, e)}>{item.value}</Button>
          )) : null
        }
        <div className="dep-plan-cont">
          <Tabs activeKey={planActiveKey} tabPosition="left" onChange={activeKey => this.handleChange(activeKey)}>
            <TabPane tab="方案简介" key="1">
              <div className="dep-brief">
                <div className="dep-brief-img"></div>
                <div className="flex1 dep-brief-cont-box">
                  <div className="dep-brief-cont">
                    <p className="dep-brief-cont-title">概述：</p>
                    <p className="dep-brief-cont-desc">{summaryText}</p>
                  </div>
                  <div className="dep-brief-cont">
                    <p className="dep-brief-cont-title">特点：</p>
                    <p className="dep-brief-cont-desc">{propertyText}</p>
                  </div>
                  <div className="dep-brief-cont">
                    <p className="dep-brief-cont-title">适合：</p>
                    <p className="dep-brief-cont-desc">{suitableText}</p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="方案功能点" key="2">
              <div className="pad20">
                <Table columns={this.columns} dataSource={this.dataSource} pagination={false} size="small" />
              </div>
            </TabPane>
            <TabPane tab="方案控制面板" key="3">
              <div className="dep-brief">
                <div className="dep-brief-img"></div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default SwitchTab

import React, { Component } from 'react'
import { Tabs } from 'antd';
import "./addProduct.scss";
import SwitchTab from './switchTab'

const { TabPane } = Tabs;

class SwitchFreeDep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentActiveKey: '1',
    }
    this.refSwitchTab = null
  }
  // 切换方案
  handleChange = (activeKey) => {
    // 调用子组件方法重置tab选中
    this.refSwitchTab.resetIndex()
    this.setState(() => {
      return { currentActiveKey: activeKey };
    });
  };
  render() {
    const { currentActiveKey } = this.state
    const btnList = [
      {
        key: '1',
        value: '气体感觉报警器_NB'
      },
      {
        key: '2',
        value: '气体感觉报警器_zigbee'
      }
    ]
    const btnList2 = [
      {
        key: '1',
        value: 'MCU气体感觉报警器_NB'
      },
      {
        key: '2',
        value: 'MCU气体感觉报警器_zigbee'
      }
    ]
    const btnList3 = [
      {
        key: '1',
        value: 'Soc气体感觉报警器_NB'
      },
      {
        key: '2',
        value: 'Soc气体感觉报警器_zigbee'
      }
    ]
    return (
      <Tabs activeKey={currentActiveKey} defaultActiveKey="1" onChange={(activeKey) => this.handleChange(activeKey)}>
        <TabPane tab="免开发方案" key="1">
          <SwitchTab
            tip="免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。"
            btnList={btnList}
            onRef={ref => { this.refSwitchTab = ref }} />
        </TabPane>
        <TabPane tab="独立MCU方案" key="2">
          <SwitchTab
            tip="独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。"
            btnList={btnList2}
            onRef={ref => { this.refSwitchTab = ref }} />
        </TabPane>
        <TabPane tab="SoC方案" key="3">
          <SwitchTab
            tip="SoC方案，不提供通用固件程序，需自行开发模组固件。"
            btnList={btnList3}
            onRef={ref => { this.refSwitchTab = ref }} />
        </TabPane>
      </Tabs>
    )
  }
}

export default SwitchFreeDep

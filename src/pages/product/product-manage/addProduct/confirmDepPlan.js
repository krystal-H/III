import React, { Component } from 'react'
import { Tabs } from 'antd'
import "./addProduct.scss"
import { Paths, post, get } from '../../../../api'
import SwitchTab from './switchTab'

const { TabPane } = Tabs;

class SwitchFreeDep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentActiveKey: '1',
      btnList: [], // 免开发
      btnList2: [], // MCU
      btnList3: [], // Soc
    }
    this.refSwitchTab = null
  }

  componentDidMount() {
    this.getScheme()
  }

  // 获取方案数据
  getScheme() {
    get(`${Paths.getScheme}/2`, {}).then(res => {
      for (let key in res.data) {
        switch (key) {
          case '1':
            this.setState({ btnList: res.data[key] })
            break;
          case '2':
            this.setState({ btnList2: res.data[key] })
            break;
          case '3':
            this.setState({ btnList3: res.data[key] })
            break;
          default:
            break;
        }
      }
    })
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
    const { currentActiveKey, btnList, btnList2, btnList3 } = this.state
    return (
      <Tabs activeKey={currentActiveKey} defaultActiveKey="1" onChange={(activeKey) => this.handleChange(activeKey)}>
        {/* 免开发方案 */}
        {
          btnList.length > 0 &&
          <TabPane tab="免开发方案" key="1">
            <SwitchTab
              tip="免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。"
              btnList={btnList}
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
              onRef={ref => { this.refSwitchTab = ref }} />
          </TabPane>
        }

        {/* 无配置方案 */}
        {
          btnList.length === btnList2.length === btnList3.length === 0 &&
          <div>
            暂无数据
          </div>
        }
      </Tabs>
    )
  }
}

export default SwitchFreeDep

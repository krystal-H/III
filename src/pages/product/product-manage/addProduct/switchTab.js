import React, { Component } from 'react'
import { Button, Tabs, Table } from 'antd'
import { Paths, post, get } from '../../../../api'

const { TabPane } = Tabs

class SwitchTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      planActiveKey: '0',
      btnIndex: 0,
      summaryText: '', // 概述
      propertyText: '', // 特点
      suitableText: '', // 适合
      picture: '', // 图片
      currentSchemList: [],
      currentPhysicalModelId: '', // 物模型id
      dataSource: []
    }
    this.columns = [
      {
        title: '功能名称',
        dataIndex: 'name',
      },
      {
        title: '标识符',
        dataIndex: 'identifier',
      },
      {
        title: '数据类型',
        dataIndex: 'address',
      }
    ];
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
  }

  //props发生变化时触发
  componentWillReceiveProps(props) {
    this.setState({
      currentSchemList: props.btnList,
      currentPhysicalModelId: props.btnList[0].physicalModelId
    }, () => {
      this.getPlanMsg(0)
      this.getPhysicalModelId(this.state.currentPhysicalModelId)
    })
  }

  // 切换tab
  handleChange(activeKey) {
    this.setState({ planActiveKey: activeKey })
    // 获取物模型id，获取功能点数据
    this.getPhysicalModelId(this.props.btnList[activeKey].physicalModelId)
  }

  // 切换方案下的按钮
  changeBtn(index, type, item, e) {
    this.setState({
      btnIndex: index,
      planActiveKey: '0'
    }, () => {
      this.getPlanMsg(index)
    })
  }

  // 获取功能点
  getPhysicalModelId(physicalModelId) {
    get(`${Paths.getPhysicalModelId}/${physicalModelId}`, {}).then(res => {
      console.log(res, '******')
      if (res.code === 0) {
        this.setState({
          dataSource: res.data.standard
        })
      } else {
        this.setState({ dataSource: [] })
      }
    })
  }

  // 获取对应方案的信息
  getPlanMsg(index) {
    this.setState({
      summaryText: this.state.currentSchemList[index].summarize || '',
      propertyText: this.state.currentSchemList[index].feature || '',
      suitableText: this.state.currentSchemList[index].illustrate || ''
    })
  }

  // 重置tab选中项，父组件调用
  resetIndex() {
    this.setState({ btnIndex: 0, planActiveKey: '0' })
  }

  render() {
    let { btnIndex, planActiveKey, summaryText, propertyText, suitableText, picture, dataSource } = this.state
    let { tip, btnList } = this.props
    return (
      <div className="dep-plan-block">
        <p className="dep-plan-tip">{tip}</p>
        {
          btnList ? btnList.map((item, index) => (
            <Button className={`dep-btn ${btnIndex === index ? "active-btn" : ""}`}
              key={item.schemaId}
              onClick={(e) => this.changeBtn(index, 'btnIndex', item, e)}>{item.name}</Button>
          )) : null
        }
        <div className="dep-plan-cont">
          <Tabs activeKey={planActiveKey} tabPosition="left" onChange={activeKey => this.handleChange(activeKey)}>
            <TabPane tab="方案简介" key="0">
              <div className="dep-brief">
                <div className="dep-brief-img">
                  <img src={picture} alt="图片" />
                </div>
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
            <TabPane tab="方案功能点" key="1">
              <div className="pad20">
                <Table columns={this.columns} dataSource={dataSource} pagination={false} size="small" />
              </div>
            </TabPane>
            <TabPane tab="方案控制面板" key="2">
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

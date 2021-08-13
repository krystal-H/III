import React, { Component } from 'react'
import { Button, Tabs, Table } from 'antd'
import { Paths, post, get } from '../../../../api'
import { createProductSchemeAction, createProductSchemeBtnKeyAction } from '../store/ActionCreator'
import { connect } from 'react-redux'
import { cloneDeep, uniq, difference } from 'lodash'

const { TabPane } = Tabs

const mapStateToProps = state => {
  // console.log(state.getIn(['product', 'createProductScheme']), '步骤二222222页面取得值')
  // console.log('页面的btnindex', state.getIn(['product', 'createProductSchemeBtnKey']))
  return {
    schememData: state.getIn(['product', 'createProductScheme']),
    btnkey: state.getIn(['product', 'createProductSchemeBtnKey'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createSchemem: params => dispatch(createProductSchemeAction(params)),
    changeBtnIndex: params => dispatch(createProductSchemeBtnKeyAction(params))
  }
}

class SwitchTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      planActiveKey: '0',
      btnIndex: props.btnkey,
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
    // console.log(this.props.schememData, '步骤二222222页面取得值')
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
    console.log(this.props.btnList, 'this.props.btnListthis.props.btnList')
    this.setState({
      currentSchemList: this.props.btnList,
      currentPhysicalModelId: this.props.btnList[0].physicalModelId
    }, () => {
      this.getPlanMsg(0)
    })
  }

  // 切换tab
  handleChange(activeKey) {
    // console.log(activeKey, this.props.btnList, '切换tab')
    this.setState({ planActiveKey: activeKey })
    // 获取物模型id，获取功能点数据
    if (activeKey == 1) {
      this.getPhysicalModelId(this.state.currentPhysicalModelId)
    }
  }

  // 切换方案下的按钮
  changeBtn(index, type, item, e) {
    this.setState({
      btnIndex: index,
      planActiveKey: '0',
      currentPhysicalModelId: item.physicalModelId
    }, () => {
      this.props.changeBtnIndex(index)
      this.getPlanMsg(index)
    })
  }

  // 获取功能点
  getPhysicalModelId(physicalModelId) {
    post(Paths.getPhysicalModelId, { id: physicalModelId }).then(res => {
      this.setState({ dataSource: res.data })
    }, () => {
      this.setState({
        dataSource: []
      })
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

  // 保存方案数据
  saveSchemeData() {
    const currentList = cloneDeep(this.state.currentSchemList)
    const need = currentList[this.state.btnIndex]
    const params = {
      schemeId: need.schemeId, // 方案id
      schemeTypeId: need.schemeTypeId, // 方案类型id
      physicalModelId: need.physicalModelId, // 物模型id
      panelId: need.panelId, // 面板id
      moduleId: need.moduleId // 模组id
    }
    this.props.createSchemem(params)
  }

  // 重置tab选中项，父组件调用
  resetIndex() {
    // btnIndex: 0, planActiveKey: '0' // 为了保存操作数据暂时不重置  btnIndex
    this.setState({ planActiveKey: '0' })
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
              key={item.schemeId}
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
                <Table columns={this.columns} dataSource={dataSource} rowKey="identifier" pagination={false} size="small" />
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchTab)

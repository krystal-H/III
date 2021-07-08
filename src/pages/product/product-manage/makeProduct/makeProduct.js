import React, { Component } from 'react'
import { Modal, Steps, Input, Button, Select, Tabs, Skeleton, Table } from 'antd';
import "./makeProduct.scss";

const { Step } = Steps;
// const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const stepList = [
  {
    title: '选择对应品类',
    content: 'First-content',
  },
  {
    title: '确定开发方案',
    content: 'Second-content',
  },
  {
    title: '开发硬件',
    content: 'Last-content',
  },
];
let list1 = [
  {
    key: 1,
    value: '家居安防'
  },
  {
    key: 2,
    value: '电工照明'
  },
  {
    key: 3,
    value: '大家电'
  },
  {
    key: 4,
    value: '厨房电器'
  },
]
let list2 = [
  {
    key: 1,
    value: '气体感应报警1'
  },
  {
    key: 2,
    value: '气体感应报警11'
  },
  {
    key: 3,
    value: '气体感应报警111'
  },
  {
    key: 4,
    value: '气体感应报警1111'
  },
]
const stepStyle = {
  cursor: 'pointer'
}


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export default class MakeProductModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepcurrent: 1, // 步骤
      category: '', // 产品品类
      currentIndex: 0, // 一级选中品类
      currentIndex2: null, // 二级品类
      isDisabled: false, // 下一步按钮是否可点
      btnIndex: 0,
      planActiveKey1: '1',
      planActiveKey: '1'
    }
  }
  // 下一步
  clickNext = (index, e) => {
    this.setState({ stepcurrent: ++index });
  }
  // 上一步
  clickPrevious = (index, e) => {
    this.setState({ stepcurrent: --index });
  }
  // 搜索
  searchCont(e) {
    e.target.value = e.target.value.trim();
    if (e.target.value) {
      this.setState({ category: e.target.value }, this.getList)
    }
  }
  // 获取品类
  getList() {

  }
  // 选择品类
  selectItem(index, type, item) {
    this.setState({ [type]: index });
    // 判断选择品类后，赋值，下一步可点 todo
  }
  // 切换方案
  handleChange = (activeKey) => {
    this.setState(() => {
      return { planActiveKey1: activeKey };
    });
  };
  // 切换
  handleChange2(activeKey) {
    this.setState({
      planActiveKey: activeKey
    })
  }
  // 切换按钮
  changeBtn(index, type, item, e) {
    this.setState({
      btnIndex: index,
      planActiveKey: '1'
    }, this.getPlan)
  }
  // 获取对应方案的信息
  getPlan() {

  }
  render() {
    const { stepcurrent, currentIndex, currentIndex2, isDisabled, btnIndex, planActiveKey1, planActiveKey } = this.state
    const { cancelHandle, visible } = this.props
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
    return (
      <Modal
        title="创建产品"
        centered
        destroyOnClose
        maskClosable={false}
        visible={visible}
        width={900}
        onCancel={cancelHandle}
        wrapClassName={'add-modal'}
        footer={[
          stepcurrent !== 0 && <Button key="previous" onClick={(e) => this.clickPrevious(stepcurrent, e)}>上一步</Button>,
          <Button type="primary" key="next" disabled={isDisabled} onClick={(e) => this.clickNext(stepcurrent, e)}>下一步</Button>
        ]}>
        <div className="add-product">
          <div className="step-box">
            <Steps current={stepcurrent}>
              {stepList.map((item, index) => (
                <Step key={item.title} title={item.title} style={stepStyle} />
              ))}
            </Steps>
          </div>
          {/* 选择对应品类 */}
          {stepcurrent === 0 && <>
            {/* 搜索 */}
            <div className="search-box">
              <Select
                showSearch
                allowClear
                style={{ width: 674 }}
                placeholder="搜索产品品类"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">气体感应报警</Option>
                <Option value="2">气体感应报警</Option>
                <Option value="3">气体感应报警</Option>
                <Option value="4">气体感应报警</Option>
                <Option value="5">气体感应报警</Option>
              </Select>
              <div>找不到想要的品类？&nbsp;&nbsp;&nbsp;<span className="submit-item">提交工单</span></div>
            </div>
            {/* 一级品类 */}
            <div className="level1-box">
              {
                list1 ? list1.map((item, index) => (
                  <div className={`level1-box-item ${currentIndex === index ? "onwActive" : ""}`}
                    key={item.value}
                    onClick={this.selectItem.bind(this, index, 'currentIndex', item)}>{item.value}</div>
                )) : null
              }
            </div>
            {/* 二级品类 */}
            <div className="level2-box">
              {
                list2 ? list2.map((item, index) => (
                  <div className={`level2-box-item ${currentIndex2 === index ? "twoActive" : ""}`}
                    key={item.value}
                    onClick={this.selectItem.bind(this, index, 'currentIndex2', item)}>
                    {item.value}
                    {currentIndex2 === index && <span className="selected-icon"></span>}
                  </div>
                )) : null
              }
            </div>
          </>}
          {/* 确定开发方案 */}
          {
            stepcurrent === 1 && <>
              <Tabs activeKey={planActiveKey1} defaultActiveKey="1" onChange={(activeKey) => this.handleChange(activeKey)}>
                <TabPane tab="免开发方案" key="1">
                  <div className="dep-plan-block">
                    <p className="dep-plan-tip">免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。</p>
                    {
                      btnList ? btnList.map((item, index) => (
                        <Button className={`dep-btn ${btnIndex === index ? "active-btn" : ""}`}
                          key={item.key}
                          onClick={(e) => this.changeBtn(index, 'btnIndex', item, e)}>{item.value}</Button>
                      )) : null
                    }
                    <div className="dep-plan-cont">
                      <Tabs activeKey={planActiveKey} tabPosition="left" onChange={activeKey => this.handleChange2(activeKey)}>
                        <TabPane tab="方案简介" key="1">
                          <div className="dep-brief">
                            <div className="dep-brief-img"></div>
                            <div className="flex1 dep-brief-cont-box">
                              <div className="dep-brief-cont">
                                <p className="dep-brief-cont-title">概述：</p>
                                <p className="dep-brief-cont-desc">无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。</p>
                              </div>
                              <div className="dep-brief-cont">
                                <p className="dep-brief-cont-title">特点：</p>
                                <p className="dep-brief-cont-desc">无需开发。</p>
                              </div>
                              <div className="dep-brief-cont">
                                <p className="dep-brief-cont-title">适合：</p>
                                <p className="dep-brief-cont-desc">功能简单的硬件设备。</p>
                              </div>
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab="方案功能点" key="2">
                          <div className="pad20">
                            <Table columns={columns} dataSource={data} pagination={false} size="small" />
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
                </TabPane>
                <TabPane tab="独立MCU方案" key="2">
                  独立MCU方案
                </TabPane>
                <TabPane tab="SoC方案" key="3">
                  SoC方案
                </TabPane>
              </Tabs>
            </>
          }
        </div>
      </Modal>
    )
  }
}
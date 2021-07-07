import React, { Component } from 'react'
import { Modal, Steps, Input, Button, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import DoubleBtns from "../../../../components/double-btns/DoubleBtns";
import "./makeProduct.scss";

const { Step } = Steps;
const { Search } = Input;

const stepList = [
  {
    title: '选择对应品类',
    content: 'First-content',
  },
  {
    title: '确定面板',
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
    value: '气体感应报警'
  },
  {
    key: 2,
    value: '气体感应报警'
  },
  {
    key: 3,
    value: '气体感应报警'
  },
  {
    key: 4,
    value: '气体感应报警'
  },
]
const stepStyle = {
  cursor: 'pointer'
}

export default class MakeProductModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepcurrent: 0, // 步骤
      category: '', // 产品品类
      currentIndex: 0, // 一级选中品类
      currentIndex2: null, // 二级品类
    }
  }
  // 切换步骤条
  clickStep = (index, e) => {
    this.setState({ stepcurrent: ++index });
  }
  // 搜索
  searchCont(value = '') {
    value = value.trim();
    this.setState({ category: value }, this.getList)
  }
  // 获取品类
  getList() {

  }
  // 选择品类
  selectItem(index, type) {
    this.setState({ [type]: index });
  }
  render() {
    const { stepcurrent, currentIndex, currentIndex2 } = this.state
    const { cancelHandle, visible } = this.props
    return (
      <Modal
        title="创建产品"
        centered
        destroyOnClose
        maskClosable={false}
        visible={visible}
        width={900}
        onCancel={cancelHandle}
        footer={<DoubleBtns key="back" preBtn={false} nextHandle={(e) => this.clickStep(stepcurrent, e)} />}>
        <div className="add-product">
          <div className="step-box">
            <Steps current={stepcurrent}>
              {stepList.map((item, index) => (
                <Step key={item.title} title={item.title} style={stepStyle} />
              ))}
            </Steps>
          </div>
          {/* 搜索 */}
          <div className="search-box">
            <Search placeholder="搜索产品品类" maxLength={20} onSearch={value => this.searchCont(value)} style={{ width: 674 }} />
            <div>找不到想要的品类？&nbsp;&nbsp;&nbsp;<span>提交工单</span></div>
          </div>
          {/* 一级品类 */}
          <div className="level1-box">
            {
              list1 ? list1.map((item, index) => (
                <div className={`level1-box-item ${currentIndex === index ? "onwActive" : ""}`}
                  key={item.value}
                  onClick={this.selectItem.bind(this, index, 'currentIndex')}>{item.value}</div>
              )) : null
            }
          </div>
          {/* 二级品类 */}
          <div className="level2-box">
            {
              list2 ? list2.map((item, index) => (
                <div className={`level2-box-item ${currentIndex2 === index ? "twoActive" : ""}`}
                  key={item.value}
                  onClick={this.selectItem.bind(this, index, 'currentIndex2')}>
                  {item.value}
                  {/* <CheckOutlined /> */}
                  {currentIndex2 === index && <span className="selected-icon"></span>}
                </div>
              )) : null
            }
            {/* <div className="level2-box-item">气体感应报警</div>
            <div className="level2-box-item">气体感应报警</div>*/}
          </div>
        </div>
      </Modal>
    )
  }
}
import React, { Component } from 'react'
import { Modal, Steps, Button, Select } from 'antd';
import "./addProduct.scss";
import ConfirmDepPlan from './confirmDepPlan';
import SetupProduct from './setupProduct';

const { Step } = Steps;
const { Option } = Select;

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
    title: '建立产品信息',
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

export default class MakeProductModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepcurrent: 0, // 步骤
      category: '', // 产品品类
      currentIndex: 0, // 一级选中品类
      currentIndex2: null, // 二级品类
      isDisabled: false, // 下一步按钮是否可点
    }
    this.refSetupProduct = null
  }
  // 下一步
  clickNext = (index, e) => {
    if (index === 2) { // 表单提交
      this.refSetupProduct.formRef.current.submit()
    } else {
      this.setState({ stepcurrent: ++index });
    }
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
  render() {
    const { stepcurrent, currentIndex, currentIndex2, isDisabled } = this.state
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
        wrapClassName={'add-modal'}
        footer={[
          stepcurrent !== 0 && <Button key="previous" onClick={(e) => this.clickPrevious(stepcurrent, e)}>上一步</Button>,
          <Button type="primary" key="next" disabled={isDisabled} onClick={(e) => this.clickNext(stepcurrent, e)}>{stepcurrent === 2 ? '确认创建' : '下一步'}</Button>
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
          {stepcurrent === 1 && <ConfirmDepPlan />}
          {/* 建立产品信息 */}
          {stepcurrent === 2 && <SetupProduct onRef={ref => this.refSetupProduct = ref} />}
        </div>
      </Modal>
    )
  }
}
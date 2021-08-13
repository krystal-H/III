import React, { Component } from 'react'
import { Modal, Steps, Button, Select } from 'antd';
import "./addProduct.scss";
import ConfirmDepPlan from './confirmDepPlan';
import SetupProduct from './setupProduct';
import { Paths, post, get } from '../../../../api'
import { cloneDeep, uniq, difference } from 'lodash'
import { Notification } from '../../../../components/Notification';
import { connect } from 'react-redux';
import { createProductCategoryAction } from "../store/ActionCreator";

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
const stepStyle = {
  cursor: 'pointer'
}

const mapStateToProps = state => {
  // console.log(state.getIn(['createProductCategory']), '步骤一页面取得值')
  return {
    createProductCategory: state.getIn(['product', 'createProductCategory']),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: param => dispatch(createProductCategoryAction(param)),
  }
}

class MakeProductModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepcurrent: 0, // 步骤
      currentIndex: 0, // 二级选中品类
      currentIndex2: null, // 三级品类
      isDisabled: false, // 下一步按钮是否可点
      thirdCategoryList: [], // 三级品类
      secondCategoryList: [], // 二级品类
      needShowThirdList: [],

      thirdCategoryId: '', // 第一步选择的三级品类id
    }
    this.refScheme = null
    this.refSetupProduct = null
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件

    this.getThirdCategory()
    this.getSecondCategory()
  }

  // 获取所有的三级品类
  getThirdCategory = () => {
    get(Paths.getThirdCategory, {}).then(res => {
      if (res.code === 0) {
        this.setState({
          thirdCategoryList: res.data
        })
      }
    })
  }

  // 获取所有的二级品类
  getSecondCategory = () => {
    get(Paths.getSecondCategory, {}).then(res => {
      if (res.code === 0) {
        this.setState({
          secondCategoryList: res.data
        })
        res.data[0].deviceTypeList && this.setState({ needShowThirdList: res.data[0].deviceTypeList })
      }
    })
  }

  // 根据三级id查二级品类
  getSecondById = (id) => {
    post(Paths.getSecondById, { deviceTypeId: id }).then(res => {
      if (res.code === 0) {
        const secondList = cloneDeep(this.state.secondCategoryList)
        const _index = secondList.findIndex(item => item.subCategoryId === res.data.subCategoryId)
        this.setState({
          currentIndex: _index,
          needShowThirdList: res.data.deviceTypeList
        }, () => {
          const thirdList = cloneDeep(this.state.needShowThirdList)
          const _index = thirdList.findIndex(item => item.deviceTypeId === id)
          this.setState({
            currentIndex2: _index
          })
        })
      }
    })
  }

  // 选择品类
  selectCategory(index, type, currentItem) {
    if (type === 'currentIndex') { // 点击二级品类循环查找需要显示的三级
      const second = cloneDeep(this.state.secondCategoryList)
      const needList = second.filter(item => item.subCategoryId === currentItem.subCategoryId)
      this.setState({
        needShowThirdList: needList[0] && needList[0].deviceTypeList
      })
    }
    this.setState({
      currentIndex2: null,
      [type]: index,
    })
  }

  // 搜索
  searchHandle = (val) => {
    if (val) this.getSecondById(val)
  }

  // step1  选择品类数据处理
  judgeStep1 = (index) => {
    // console.log(this.state.currentIndex2, '选择品类的索引')
    if (!this.state.currentIndex2 && this.state.currentIndex2 !== 0) {
      return Notification({ description: '请选择对应品类！', type: 'warn' })
    }
    const need = cloneDeep(this.state.needShowThirdList)
    need.forEach((item, i) => {
      if (i === this.state.currentIndex2) {
        // console.log('选择的品类deviceTypeId', item.deviceTypeId)
        this.props.createCategory({
          deviceTypeId: item.deviceTypeId,
          deviceSubtypeId: item.defaultDeviceSubtype.deviceSubtypeId,
          devSubKeyId: item.defaultDeviceSubtype.devSubKeyId
        })
        this.setState({
          thirdCategoryId: item.deviceTypeId
        }, () => {
          this.setState({ stepcurrent: ++index });
        })
      }
    })
  }

  // 下一步
  clickNext = (index, e) => {
    if (index === 0) { // 选择品类
      this.judgeStep1(index)
    } else if (index === 1) { // 确定方案
      this.refScheme.refSwitchTab.saveSchemeData()
      this.setState({ stepcurrent: ++index });
    } else if (index === 2) { // 建立产品信息
      this.refSetupProduct.formRef.current.submit()
    }
  }

  // 上一步
  clickPrevious = (index, e) => {
    this.setState({ stepcurrent: --index });
  }

  render() {
    const { stepcurrent, currentIndex, currentIndex2, isDisabled, thirdCategoryList, secondCategoryList, needShowThirdList, thirdCategoryId } = this.state
    const { cancelHandle, visible, getProductListNew } = this.props
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
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onSelect={val => this.searchHandle(val)}
              >
                {
                  thirdCategoryList && thirdCategoryList.length > 0 &&
                  thirdCategoryList.map(item => (
                    <Option key={item.deviceTypeId} value={item.deviceTypeId}>{item.deviceTypeName}</Option>
                  ))
                }
              </Select>
              <div>找不到想要的品类？&nbsp;&nbsp;&nbsp;<span className="submit-item">提交工单</span></div>
            </div>
            {/* 二级品类 */}
            <div className="level1-box">
              {
                secondCategoryList ? secondCategoryList.map((item, index) => (
                  <div className={`level1-box-item ${currentIndex === index ? "onwActive" : ""}`}
                    key={item.subCategoryId}
                    onClick={this.selectCategory.bind(this, index, 'currentIndex', item)}>{item.subCategoryName}</div>
                )) : null
              }
            </div>
            {/* 三级品类 */}
            <div className="level2-box">
              {
                needShowThirdList ? needShowThirdList.map((item, index) => (
                  <div className={`level2-box-item ${currentIndex2 === index ? "twoActive" : ""}`}
                    key={item.deviceTypeId}
                    onClick={this.selectCategory.bind(this, index, 'currentIndex2', item)}>
                    {item.deviceTypeName}
                    {currentIndex2 === index && <span className="selected-icon"></span>}
                  </div>
                )) : null
              }
            </div>
          </>}
          {/* 确定开发方案 */}
          {stepcurrent === 1 &&
            <ConfirmDepPlan
              onRef={ref => this.refScheme = ref}
              thirdCategoryId={thirdCategoryId} />}
          {/* 建立产品信息 */}
          {stepcurrent === 2 &&
            <SetupProduct
              onRef={ref => this.refSetupProduct = ref}
              handleCancel={cancelHandle}
              getProductListNew={getProductListNew}/>
          }
        </div>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeProductModal)

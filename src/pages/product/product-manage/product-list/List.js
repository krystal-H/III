import React, { PureComponent } from 'react';
import { Input, Select, Button, Table, Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { productStatusText } from '../../../../../src/configs/text-map';
import ProductIcon from '../../../../components/product-components/product-icon/ProductIcon';
import ActionConfirmModal from '../../../../components/action-confirm-modal/ActionConfirmModal';
import { Notification } from '../../../../components/Notification';
import PageTitle from '../../../../components/page-title/PageTitle';
import { post, Paths } from '../../../../api';
import AddProductModal from '../addProduct/addProduct'

import './List.scss';

const { Search } = Input;
const { Option } = Select;

const statusList = ['开发中', '已发布', '审核中']
class List extends PureComponent {
  constructor(props) {
    super(props)
    this.defaultListParams = { // 产品列表相关默认请求参数
      current: 1,
      size: 6,
      productName: '',
      mode: '', // 产品状态
    }
    this.state = {
      dataSource: [], // 产品列表
      pager: {}, // 分页信息
      listParams: cloneDeep(this.defaultListParams), // 获取产品列表相关请求参数

      selectedItem: null, // 当前正在操作（复制/删除）的产品

      deleteVisible: false, // 删除弹窗
      deleteLoading: false, // 删除loading
      deleteInputValue: '', // 删除弹框中输入的产品名称确认

      copyModalVisible: false, // 复制弹窗
      copyLoading: false, // 复制loading
      copyInputValue: '', // 复制弹窗中输入的产品名称确认

      isClicked: false, // 创建产品按钮

      oldProIngVisiable: false,//开发中的旧产品提示框
    }
    this.columns = [
      {
        title: "产品", dataIndex: "productName", key: "productName", width: 380,
        render: (text, record, index) => {
          return (
            <div className="pro-show" >
              <ProductIcon icon={record.productIcon}></ProductIcon>
              <div className="pro-show-cont">
                <div className="pro-show-cont-title">{text}</div>
                <div className="pro-show-cont-item">产品ID：{record.productId}</div>
                <div className="pro-show-cont-item">型号：{record.productCode}</div>
              </div>
            </div>
          )
        }
      },
      { title: "品类", dataIndex: "deviceType", key: "deviceType" },
      { title: "智能化方案", dataIndex: "schemeName", key: "schemeName" },
      { title: "通信协议", dataIndex: "bindTypeStr", key: "bindTypeStr" },
      {
        title: "状态", dataIndex: "status", key: "status",
        render: (text) => (<span className={`status status-${text}`}>{productStatusText['' + text] || ''}</span>)
      },
      {
        title: "操作", key: "",
        width: 250,
        render: (text, record) => (
          <div className="operation">
            <span className="continue" onClick={() => this.clickProductInfo(record)}>{record.status === 1 ? '开发详情' : '继续开发'}</span>
            {
              (record.status === 0 || record.status === 1) &&
              <span className="copy mar25" onClick={() => this.setVoice(record)}>语音</span>
            }
            {
              record.isOldProduct === 0 &&
              <span className="copy mar25" onClick={() => this.operateProduct(record, 'copyModalVisible')}>复制</span>
            }
            {
              record.status === 0 &&
              <span className="delete mar25" onClick={() => this.operateProduct(record, 'deleteVisible')}>删除</span>
            }
          </div>
        )
      }
    ]
  }

  componentDidMount() {
    this.getProductListNew()
    sessionStorage.removeItem('productItem')
  }

  // 获取产品列表
  getProductListNew = () => {
    post(Paths.getProductListNew, { ...this.state.listParams }, { loading: true })
      .then(res => {
        const pager = {
          current: res.data.current,
          size: res.data.size,
          pages: res.data.pages,
          total: res.data.total
        }
        this.setState({
          dataSource: res.data.records,
          pager
        })
      })
  }

  // 搜索
  searchProduct = (value = '') => {
    const listParams = cloneDeep(this.state.listParams);
    listParams.productName = value.trim()
    listParams.current = 1
    this.setState({
      listParams
    }, () => { this.getProductListNew() })
  }

  // select切换
  handleChange = (value) => {
    const listParams = cloneDeep(this.state.listParams)
    listParams.mode = value
    listParams.current = 1
    this.setState({
      listParams
    }, () => { this.getProductListNew() })
  }

  // 翻页
  changePage = (current, pageSize) => {
    let newparams = { ...this.state.listParams }
    newparams.current = current
    // newparams.size = pageSize
    this.setState({
      listParams: newparams
    }, () => { this.getProductListNew() })
  }

  // 跳转语音配置
  setVoice(record) {
    sessionStorage.setItem('productItem', JSON.stringify(record))
    this.props.history.push({
      pathname: `/open/product/proManage/voiceSetting/${record.productId}`,
      // state:{stepnum:step-1}
    });
  }

  // 继续开发  ——> detail 
  // 产品状态 statusStr -开发中，1-已发布，2-审核中）
  clickProductInfo(record) {
    let { status, isOldProduct, productId, step = 1 } = record;
    //未发布的老产品禁止操作 弹窗提示
    if (isOldProduct && status !== 1) {
      this.toggleOldProVisiable()
      return
    }

    //否则 老产品跳到老的详情页面 detail；新产品根据状态跳到详情页details 或者 编辑页edit
    let pathroute = 'details';
    if (status !== 1) {
      pathroute = 'edit';
    } else if (isOldProduct) {
      pathroute = 'detail';
    }
    // 保存当前产品，为后边继续开发取数据使用
    sessionStorage.setItem('productItem', JSON.stringify(record))
    sessionStorage.setItem("stepnum", step - 1)
    this.props.history.push({
      pathname: `/open/product/proManage/${pathroute}/${productId}`,
      // state:{stepnum:step-1}
    });
  }

  // 列表 “删除”、“复制” 操作
  operateProduct(item, type) {
    let { mode } = item
    if (mode === 2) { return false; }
    this.setState({
      [type]: true,
      selectedItem: item
    })
  }

  // 弹窗 “取消” 操作
  modalCancelHandle(type = 'copyModalVisible', inputValue) {
    this.setState({
      [type]: false,
      [inputValue]: ''
    })
  }

  // 删除弹窗 “确认” 操作
  deleteModalOKHandle = () => {
    let { selectedItem, deleteInputValue } = this.state
    let _value = deleteInputValue.trim(),
      { productId } = selectedItem
    if (!_value || _value !== 'delete') {
      return Notification({ type: 'warn', message: '异常操作', description: '请输入"delete"来确认删除！' })
    }
    this.setState({ deleteLoading: true }, () => {
      post(Paths.deleteProductNew, { productId })
        .then(data => {
          Notification({ type: 'success', description: '删除成功！' })
          this.setState({
            deleteVisible: false,
            deleteInputValue: ''
          })
          this.getProductListNew()
        })
        .finally(() => this.setState({ deleteLoading: false }))
    })
  }
  // 复制弹窗 “确认” 操作
  copyModalOKHandle = () => {
    let { copyInputValue, selectedItem } = this.state;
    let _value = copyInputValue.trim(),
      { productId } = selectedItem;

    if (!_value) {
      return Notification({ type: 'warn', message: '异常操作', description: '请输入产品名称！' })
    }
    this.setState({ copyLoading: true }, () => {
      post(Paths.copyProductNew, { productId, productName: _value })
        .then(data => {
          if (data.code === 0) Notification({ type: 'success', description: '复制成功！' })
          this.setState({ // 清空查询参数，重新请求列表
            listParams: cloneDeep(this.defaultListParams),
            copyModalVisible: false,
            copyInputValue: ''
          }, () => { this.getProductListNew() })
        }).finally(() => { this.setState({ copyLoading: false }) })
    })
  }

  // 弹窗输入框change
  inputOnChangeHandle(type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  // 创建产品
  createProduct = (isClicked = false) => {
    this.setState({
      isClicked: !isClicked
    })
  }
  toggleOldProVisiable = () => {
    this.setState({
      oldProIngVisiable: !this.state.oldProIngVisiable
    })
  }

  changeVisible = () => {
    this.setState({ isClicked: false })
  }

  render() {
    const { listParams, selectedItem, deleteVisible,
      deleteLoading, deleteInputValue, copyModalVisible,
      copyLoading, copyInputValue, isClicked, dataSource, pager, oldProIngVisiable } = this.state
    return (
      <section className="page-wrapper">
        <PageTitle title="我的智能产品" />
        <div className="page-header comm-shadowbox">
          <div className="page-header-left">
            <Search placeholder="产品名称/ID/型号"
              allowClear
              onSearch={value => this.searchProduct(value)}
              style={{ width: 465, margin: '0 22px' }} />
            <Select allowClear onChange={this.handleChange} placeholder="产品状态" style={{ width: 120 }}>
              {
                statusList.map((item, index) => (
                  <Option value={index} key={item}>{item}</Option>
                ))
              }
            </Select>
          </div>
          <div className="page-header-right">
            <Button type="primary" onClick={this.createProduct.bind(this, false)}>创建产品</Button>
          </div>
        </div>
        {/* table */}
        <div className="bg-wrapper flex1 flex-column comm-shadowbox">
          <div className="page-table-wrapper flex-column flex1">
            <Table
              rowKey='productId'
              dataSource={dataSource}
              columns={this.columns}
              pagination={{
                defaultCurrent: 1,
                current: listParams.current,
                onChange: this.changePage,
                pageSize: 6,
                total: pager.total,
                showSizeChanger: false,
                showQuickJumper: pager.pages > 5,
                showTotal: (total) => <span>共 <a>{total}</a> 条</span>
              }}
            />
          </div>
        </div>
        {/* 删除弹框 */}
        {
          selectedItem && deleteVisible &&
          <ActionConfirmModal
            visible={deleteVisible}
            modalOKHandle={this.deleteModalOKHandle}
            modalCancelHandle={this.modalCancelHandle.bind(this, 'deleteVisible', 'deleteInputValue')}
            targetName={selectedItem.productName}
            confirmLoading={deleteLoading}
            title={'删除产品'}
            needWarnIcon={true}
            descText={'即将删除的产品'}
            tipText={'产品的所有信息将完全被删除，无法找回，请谨慎操作'}>
            <Input className="modal-content-input"
              onChange={e => { this.inputOnChangeHandle('deleteInputValue', e) }}
              onPressEnter={this.deleteModalOKHandle}
              placeholder="请输入“delete”确认删除该产品"
              maxLength={20}
              value={deleteInputValue}
            />
          </ActionConfirmModal>
        }
        {/* 复制弹窗 */}
        {
          selectedItem && copyModalVisible &&
          <ActionConfirmModal
            visible={copyModalVisible}
            modalOKHandle={this.copyModalOKHandle}
            modalCancelHandle={this.modalCancelHandle.bind(this, 'copyModalVisible', 'copyInputValue')}
            targetName={selectedItem.productName}
            confirmLoading={copyLoading}
            title={'复制产品'}
            descText={'即将复制的产品'}
            tipText={'创建与原产品的功能和服务配置一样的新产品'}>
            <Input className="modal-content-input"
              onChange={e => { this.inputOnChangeHandle('copyInputValue', e) }}
              onPressEnter={this.copyModalOKHandle}
              value={copyInputValue}
              maxLength={20}
              placeholder="新产品名称" />
          </ActionConfirmModal>
        }
        {/* 创建产品 */}
        {
          isClicked &&
          <AddProductModal
            visible={isClicked}
            cancelHandle={this.createProduct.bind(this, true)}
            getProductListNew={() => { this.getProductListNew() }}
          >
          </AddProductModal>
        }

        {/* 开发中的旧产品 弹窗提示 */}
        <Modal title="更新升级" visible={oldProIngVisiable} onOk={this.toggleOldProVisiable} onCancel={this.toggleOldProVisiable}>
          <p> clife平台全新升级，老版本的开发中或审核中状态的产品，需要在新平台重新创建</p>
        </Modal>
      </section>
    )
  }
}

export default List

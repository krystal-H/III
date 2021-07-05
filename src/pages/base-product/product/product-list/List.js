import React, { PureComponent } from 'react';
import { Input, Select, Button, Table, Pagination } from 'antd';
import './List.scss';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { getProductListAction } from '../store/ActionCreator';
import { productStatusText } from '@src/configs/text-map';
import ProductIcon from '../../../../components/product-components/product-icon/ProductIcon';
import ActionConfirmModal from '../../../../components/action-confirm-modal/ActionConfirmModal';
import { Notification } from '../../../../components/Notification';
import { post, Paths } from '../../../../api';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = state => {
  return {
    productList: state.getIn(['product', 'productList']).toJS()
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductList: data => dispatch(getProductListAction(data)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.defaultListParams = { // 产品列表相关默认请求参数
      pageIndex: 1,
      pageRows: 8,
      productName: ''
    }
    this.state = {
      status: 'all', // 状态  后端需增加字段？？？？？？
      listParams: cloneDeep(this.defaultListParams), // 获取产品列表相关请求参数

      selectedItem: null, // 当前正在操作（复制/删除）的产品

      deleteVisible: false, // 删除弹窗
      deleteLoading: false, // 删除loading
      deleteInputValue: '', // 删除弹框中输入的产品名称确认

      copyModalVisible: false, // 复制弹窗
      copyLoading: false, // 复制loading
      copyInputValue: '' // 复制弹窗中输入的产品名称确认
    }
    this.columns = [
      {
        title: "产品", dataIndex: "productName", key: "productName",
        render: (text, record, index) => {
          return (
            <div className="pro-show" >
              <ProductIcon icon={record.productIcon}></ProductIcon>
              <div className="pro-show-cont">
                <div className="pro-show-cont-title">{text}</div>
                <div className="pro-show-cont-item">产品ID：{record.productId}</div>
                <div className="pro-show-cont-item">型号：adehfuweh</div>
              </div>
            </div>
          )
        }
      },
      { title: "品类", dataIndex: "productClassName", key: "productClassName" },
      { title: "智能化方案", dataIndex: "", key: "" },
      { title: "通信协议", dataIndex: "bindTypeName", key: "bindTypeName" },
      {
        title: "状态", dataIndex: "mode", key: "mode",
        render: (text) => (<span className={`status status-${text}`}>{productStatusText['' + text] || ''}</span>)
      },
      {
        title: "操作", key: "",
        render: (text, record, index) => (
          <div className="operation">
            <span className="continue" onClick={this.clickProductInfo.bind(this, record.mode, record.productId)}>继续开发</span>

            {
              record.mode !== 2 && <span className="copy mar25" onClick={this.operateProduct.bind(this, record, 'copyModalVisible')}>复制</span>
            }
            {
              record.mode !== 2 && <span className="delete" onClick={this.operateProduct.bind(this, record, 'deleteVisible')}>删除</span>
            }
          </div>
        ),
      }
    ]
  }
  componentDidMount() {
    this.getProductList()
  }
  // 搜索
  searchProduct = (value = '') => {
    value = value.trim();
    let listParams = cloneDeep(this.state.listParams);
    listParams.productName = value;
    listParams.pageIndex = 1;
    this.setState({
      listParams
    }, this.getProductList)
  }
  // 获取产品列表
  getProductList() {
    // this.props.getProductList({...this.state.listParams, status: this.state.status});
    this.props.getProductList({ ...this.state.listParams });
  }
  // select切换
  handleChange = (value) => {
    this.setState({ status: value })
  }
  //分页页码改变
  changePage = (pageIndex) => {
    let newparams = { ...this.state.listParams };
    newparams.pageIndex = pageIndex;
    this.setState({
      listParams: newparams
    }, this.getProductList)
  }
  // 继续开发  ——> detail 
  // 产品状态 mode：（0-开发中，1-已发布，2-审核中）
  clickProductInfo(mode, productId) {
    let pathroute = 'details';
    if (mode !== 1) { pathroute = 'edit'; }
    this.props.history.push({
      pathname: `/open/base/product/${pathroute}/${productId}`
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
  modalCancelHandle = (type = 'copyModalVisible', inputValue) => {
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
      post(Paths.delectProduct, { productId }, { needVersion: 1.1 })
        .then(data => {
          if (data.code === 0) {
            Notification({ type: 'success', description: '删除成功！' });
          }
          this.setState({
            deleteVisible: false,
            deleteInputValue: ''
          })
          this.getProductList()
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
      post(Paths.copyProduct, { productId, productName: _value }, { needVersion: 1.1 })
        .then(data => {
          if (data.code === 0) { Notification({ type: 'success', description: '复制成功！' }); }
          this.setState({ // 清空查询参数，重新请求列表
            listParams: cloneDeep(this.defaultListParams),
            copyModalVisible: false,
            copyInputValue: ''
          }, this.getProductList)
        }).finally(() => { this.setState({ copyLoading: false }) })
    })
  }
  // 弹窗输入框change
  inputOnChangeHandle(type, e) {
    this.setState({
      [type]: e.target.value
    })
  }
  render() {
    let { listParams, selectedItem, deleteVisible, deleteLoading, deleteInputValue, copyModalVisible, copyLoading, copyInputValue } = this.state
    let { productList } = this.props,
      { list, pager } = productList
    return (
      <section className="page-wrapper">
        <p className="page-title">我的智能产品</p>
        <div className="page-header">
          <div className="page-header-left">
            <Search placeholder="产品名称/ID/型号" maxLength={20} onSearch={value => this.searchProduct(value)} style={{ width: 465, margin: '0 22px' }} />
            <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="all">全部状态</Option>
              <Option value="dev">开发中</Option>
              <Option value="done">开发完成</Option>
            </Select>
          </div>
          <div className="page-header-right">
            <Button type="primary">制作产品</Button>
          </div>
        </div>
        {/* table */}
        <div className="bg-wrapper flex1 flex-column">
          <div className="page-table-wrapper flex-column flex1">
            <Table
              rowKey='productId'
              dataSource={list}
              columns={this.columns}
              pagination={false}
            />
            <footer className="list-pagination">
              {
                pager && pager.totalRows > 0 ?
                  <Pagination className="self-pa"
                    total={pager.totalRows}
                    current={listParams.pageIndex}
                    defaultCurrent={1}
                    defaultPageSize={listParams.pageRows}
                    onChange={this.changePage}
                    showTotal={total => <span>共 <a>{total}</a> 条</span>}
                    showQuickJumper
                    hideOnSinglePage
                  />
                  : null
              }
            </footer>
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
      </section>
    )
  }
}

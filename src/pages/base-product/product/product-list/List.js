import React, { PureComponent } from 'react';
import { Input, Select, Button, Table, Pagination } from 'antd';
import './List.scss';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { getProductListAction } from '../store/ActionCreator';
import { productStatusText } from '@src/configs/text-map';
import ProductIcon from '../../../../components/product-components/product-icon/ProductIcon';

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
      selectedItem: null, // 当前正在操作（复制/删除）的产品
      listParams: cloneDeep(this.defaultListParams) // 获取产品列表相关请求参数
    }
  }
  componentDidMount() {
    this.getProductList()
  }
  // 获取产品列表
  getProductList() {
    let { listParams } = this.state;
    this.props.getProductList(listParams);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  //分页页码改变
  changePage = (pageIndex) => {
    let newparams = { ...this.state.listParams };
    newparams.pageIndex = pageIndex;
    this.setState({
      listParams: newparams
    }, this.getProductList)
  }
  render() {
    console.log(this.props)
    let { listParams } = this.state
    let { productList } = this.props,
      { list, pager } = productList
    let columns = [
      { title: "产品", dataIndex: "productName", key: "productName",
        render: (text, record,index) => {
          return (
            <div className="pro-show">
              <ProductIcon icon={record.productIcon}></ProductIcon>
              <div>
                <div>睡眠检测器</div>
                <div>产品id：12345</div>
                <div>型号：adehfuweh</div>
              </div>
            </div>
          )
        }
      },
      { title: "品类", dataIndex: "", key: "" },
      { title: "智能化方案", dataIndex: "", key: "" },
      { title: "通信协议", dataIndex: "", key: "" },
      {
        title: "状态", dataIndex: "mode", key: "mode",
        render: (text, record, index) => (
          <span className={`status status-${text}`}>{productStatusText['' + text] || ''}</span>
        )
      },
      {
        title: "操作", key: "opt_detail",
        render: (text, record, index) => (
          <span>
            继续开发
            {/* <Link key="detail" to={'/open/base/device/onlineDevice/details/' + record.deviceId}>查看</Link> */}
          </span>
        ),
      }
    ]
    return (
      <section className="page-wrapper">
        <p className="page-title">我的智能产品</p>
        <div className="page-header h-flex">
          <div className="h-flex-left">
            <Search placeholder="产品名称/ID/型号" maxLength={20} onSearch={value => this.searchProduct(value)} style={{ width: 465, margin: '0 22px' }} />
            <Select defaultValue="all" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="all">全部状态</Option>
              <Option value="dev">开发中</Option>
              <Option value="done">开发完成</Option>
            </Select>
          </div>
          <div className="h-flex-right">
            <Button type="primary">制作产品</Button>
          </div>
        </div>
        <div className="bg-wrapper flex1 flex-column">
          <div className="page-table-wrapper flex-column flex1">
            <Table
              rowKey='productId'
              dataSource={list}
              columns={columns}
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
      </section>
    )
  }
}

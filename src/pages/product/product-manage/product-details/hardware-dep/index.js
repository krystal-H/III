import React, { Component } from 'react'
import { Table, Tooltip, Modal } from 'antd'
import { CaretRightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Paths, post } from '../../../../../api'
import defaultImg from '../../../../../assets/images/commonDefault/hardware.png'
import "./index.scss"
import { Link } from 'react-router-dom';
import demoAppOfficial from '../../../../../assets/images/demoAppOfficial.jpg';

class Hardware extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '固件名称/固件Key',
        dataIndex: 'burnFileName',
      },
      {
        title: '关联硬件',
        dataIndex: 'moduleName',
      },
      {
        title: '芯片平台',
        dataIndex: 'originalModuleTypeName',
      },
      {
        title: '固件类型',
        dataIndex: 'type'
      },
      {
        title: '当前版本',
        dataIndex: 'burnFileVersion'
      },
      {
        title: '操作',
        render: (text, record, index) => (
          // 免开发方案不显示固件升级
          this.state.productItemData.schemeType != 1 &&
          <Link to={{ pathname: '/open/product/otaUpdate/list', search: `?productId=${props.productId}` }} target="_blank">
            <div className="table-operation">固件升级</div>
          </Link>
        )
      }
    ]
    this.state = {
      dataSource: [], // 固件列表
      allInfo: {}, // 返回信息
      selectedId: '1', // 模组的id
      productItemData: JSON.parse(sessionStorage.getItem('productItem')) || {},
      showImg: '',
      imgUrl: '',
      officeVis: false
    }
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
    this.getMoudleInfo(this.state.productItemData.moduleId)
  }

  // 获取展示模组及固件信息
  getMoudleInfo = (moduleId = '') => {
    post(Paths.getMoudleInfo, {
      productId: this.props.productId,
      moduleId
    }, { loading: true }).then(res => {
      this.setState({ allInfo: res.data })
      if (res.data.firmwareDefList) {
        this.setState({ dataSource: res.data.firmwareDefList })
        this.setState({ currentModuleId: res.data.moduleId })
        // 更新存的 模组id
        let copyData = this.state.productItemData
        copyData.moduleId = res.data.moduleId
        sessionStorage.setItem('productItem', JSON.stringify(copyData))
      }
    })
  }
  openImg = (url) => {
    this.setState({ showImg: true, imgUrl: url })
  }
  onFinish = (values) => {
    console.log('验证是否通过:', values);
    this.props.nextStep()
  }

  // 下载说明书
  downInstructions = (readmePdf) => {
    readmePdf ? window.open(readmePdf) : alert('暂无数据！')
  }

  // 获取方案类型展示
  getSchemeType = () => {
    if (this.state.productItemData.schemeType) {
      switch (this.state.productItemData.schemeType) {
        case 1:
          return '免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。'
        case 2:
          return '独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。'
        case 3:
          return 'SoC方案，不提供通用固件程序，需自行开发模组固件。'
        case 4:
          return '云接入方案，支持已上市的产品，云对云方式接入clife平台。'
        default:
          break;
      }
    } else {
      return ''
    }
  }

  // 获取下载资料
  downloadData = () => {
    post(Paths.downloadData, {
      productId: this.props.productId,
      moduleId: this.state.currentModuleId
    }).then(res => {
      res.data ? window.location = res.data : alert('暂无数据！')
    })
  }
  //关闭图片
  callImg = () => {
    this.setState({ showImg: false })
  }
  render() {
    const { dataSource, allInfo, productItemData, showImg, imgUrl, officeVis } = this.state
    return (
      <div className="hardware-dev-page">
        <div className="hardware-wrap">
          <div className="desc">{this.getSchemeType()}</div>
          {/* 已选模组 */}
          <div className="module-box">
            <div className="module-header">
              <div className="module-tip">已选模组</div>
            </div>
            <div className="module-cont">
              <div className="flex-s">
                <div className="module-cont-left">
                  <img style={{ width: '100%' }} src={allInfo.modulePicture || defaultImg} alt=""
                    onClick={() => { this.openImg(allInfo.modulePicture || defaultImg) }}
                  />
                </div>
                <div className="module-cont-right">
                  <div className="module-title">{allInfo.moduleName || '-'}</div>
                  <div className="flex">
                    <div className="desc-item"><span className="desc-item-title">芯片：</span>{allInfo.originalModuleTypeName || '-'}</div>
                    <div className="desc-item"><span className="desc-item-title">尺寸：</span>{allInfo.sizeThickness}x{allInfo.sizeWidth}x{allInfo.sizeHeight}</div>
                    <div className="desc-item"><span className="desc-item-title">适用：</span>{allInfo.applyScope || '-'}</div>
                  </div>
                  <div className="desc-item">
                    <span className="desc-item-title">特性：</span>
                    1.配网方式: {allInfo.netTypeName || '-'}；
                    2.支持协议: {allInfo.bindTypeName || '-'}；
                    3.通信通讯速率: {allInfo.communicateSpeed || '-'}bps；
                    4.是否支持文件传输: {allInfo.supportFileTransfer === 0 ? '否' : '是'}
                  </div>
                  <div className="more" onClick={() => this.downInstructions(allInfo.readmePdf)}>说明书<CaretRightOutlined /></div>
                </div>
              </div>
              <div className="module-right-box">
                {
                  allInfo.price && <div className="price">¥{allInfo.price}/个</div>
                }
                {/* <div className="apply-btn">批量采购</div> */}
              </div>
            </div>
          </div>
          {/* 已生成固件 */}
          <div className="module-box">
            {/* 有固件信息 */}
            <div className="module-tip mar-t-b">已生成固件</div>
            {
              allInfo.firmwareDefList &&
              <Table rowKey="id"
                columns={this.columns}
                dataSource={dataSource}
                pagination={false}
                size="small" />
            }
            {/* 无固件信息 */}
            {
              !allInfo.firmwareDefList === 0 &&
              <div className="no-match-firmware">
                <div className="no-match-firmware-img">
                  <img src={require('../../../../../assets/images/no-source-tip.png')} alt="" />
                </div>
                <div className="no-match-firmware-tip">您选择的模组暂无通用固件程序，请自行开发模组固件。</div>
              </div>
            }
          </div>
          {/* 开发调试 */}
          <div className="module-box">
            <div className="module-tip mar30">开发调试</div>
            <div className="debug">
              <div className="flex-c">
                <img className="debug-icon" src={require('../../../../../assets/images/product/pcb.png')} alt="" />
                {
                  productItemData.schemeType === 1 &&
                  <>
                    <div>设计PCB</div>
                    <div className="blue" onClick={() => this.downloadData()}>参考电路原理图</div>
                  </>
                }
                {
                  productItemData.schemeType === 2 &&
                  <>
                    <div>MCU SDK开发</div>
                    <div className="blue">
                      <span onClick={() => this.downloadData()}>下载MCU开发资料包</span>
                      <Tooltip
                        title={'包含MCU SDK、串口协议、模组调试助手等。SDK根据您产品的基本信息和功能定义生成对应的模组代码。若您的产品信息和功能定义发生变化，请重新生成。'}
                        placement="top">
                        <QuestionCircleOutlined className="tooltip-icon" />
                      </Tooltip>
                    </div>
                  </>
                }
                {
                  productItemData.schemeType === 3 &&
                  <>
                    <div>SDK开发</div>
                    <div className="blue">
                      <span onClick={() => this.downloadData()}>下载SDK开发资料包</span>
                      <Tooltip
                        title={'包含SDK等文件'}
                        placement="top">
                        <QuestionCircleOutlined className="tooltip-icon" />
                      </Tooltip>
                    </div>
                  </>
                }
              </div>
              <div className="line">
                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
              </div>
              <div className="flex-c">
                <img className="debug-icon" src={require('../../../../../assets/images/product/func.png')} alt="" />
                <div>功能测试</div>
                <div className="mar8">（请先配网以及通信安全机制的配置）</div>
                {/* <div className="blue">进入调试验证</div> */}
              </div>
              <div className="line">
                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
              </div>
              <div className="flex-c">
                <img className="debug-icon" src={require('../../../../../assets/images/product/network.png')} alt="" />
                <div>联网验证</div>
                <div className="blue" onClick={() => this.setState({ officeVis: true })}>下载“数联智能”App</div>
              </div>
            </div>
          </div>
        </div>
        {/* 固件升级 */}
        {
          showImg && <Modal title="图片展示" width='970px' visible={showImg} footer={null} onCancel={() => { this.callImg() }}>
            <div style={{ textAlign: 'center' }}>
              <img src={imgUrl} style={{ maxWidth: '800px' }} alt="" />
            </div>
          </Modal>
        }
        {/* 下载数联app */}
        {
          officeVis &&
          <Modal title="安装“数联智能”App"
            width='470px'
            visible={officeVis}
            footer={null}
            onCancel={() => this.setState({ officeVis: false })}>
            <div className='down-office-modal' >
              <img src={demoAppOfficial} alt="pic" />
              <div>手机扫描二维码下载</div>
            </div>
          </Modal>
        }
      </div>
    )
  }
}

export default Hardware

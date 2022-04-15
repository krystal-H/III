import React, { Component } from 'react'
import { Table, Tooltip, Empty, Modal } from 'antd'
import { CaretRightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Paths, post, get } from '../../../../../api'
import ReplaceModule from './replaceModule'
// import ModuleDetail from './moduleDetail'
import FreeApplyModal from './freeApply'
import ModifyFirmwareModal from './modifyFirmware'
import demoAppOfficial from '../../../../../assets/images/demoAppOfficial.jpg';
import ConfigCommunication from './configCommunication'
import { Notification } from '../../../../../components/Notification'
import "./index.scss"

class Hardware extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replaceModalVisible: false,  // 更换模组
            freeApplyVisible: false, // 免费申请
            modifyFirmwareVisible: false, // 修改固件
            replaceFirmwareVisible: false, // 更换固件
            dataSource: [], // 固件列表
            allInfo: {}, // 返回信息
            currentModuleId: '', // 模组id
            firmwareId: '', // 修改固件id
            productItemData: JSON.parse(sessionStorage.getItem('productItem')) || {},
            officeVis: false,
            configCommunicationVisible: JSON.parse(sessionStorage.getItem('productItem')) && JSON.parse(sessionStorage.getItem('productItem')).moduleId == -1, // 配置通信协议boolean
            protocolList: [], // 通信协议
            networkWayList: [], // 配网方式列表
            downloadInfo: {} // 下载资料显示
        }
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
                render: (text, record, index) => {
                    if (this.state.productItemData.schemeType === 1) {
                        return <div className="table-operation" onClick={(e) => this.modifyFirmware(record.id, e)}>修改固件</div>
                    } else if (this.state.productItemData.schemeType === 2) {
                        return <div className="table-operation" onClick={(e) => this.goReplaceFirmware(record.id, e)}>更换固件</div>
                    }
                }
            }
        ]
    }

    componentDidMount() {
        this.getCommunicationProtocol()
        this.getBindTypeNetworkType()
        if (this.state.productItemData.moduleId != -1) {
            this.getMoudleInfo(this.state.productItemData.moduleId)
        }
    }

    // 获取展示模组及固件信息
    getMoudleInfo = (moduleId = '') => {
        post(Paths.getMoudleInfo, {
            productId: this.props.productId,
            moduleId
        }, { loading: true }).then(res => {
            this.setState({ allInfo: res.data })
            this.downloadData(res.data.moduleId)
            if (res.data.firmwareDefList) {
                this.setState({ dataSource: res.data.firmwareDefList })
                this.setState({ currentModuleId: res.data.moduleId })
                // 更新存的 模组id
                let copyData = JSON.parse(sessionStorage.getItem('productItem')) || {}
                copyData.moduleId = res.data.moduleId
                this.setState({ productItemData: copyData })
                sessionStorage.setItem('productItem', JSON.stringify(copyData))
            }
        })
    }

    onFinish = () => {
        if (this.state.productItemData.moduleId == -1) {
            return Notification({ type: 'warn', description: '请更改配置通信协议' })
        } else {
            this.props.nextStep()
        }
    }

    // 修改固件
    modifyFirmware = (id, e) => {
        console.log(id, '-----')
        this.setState({ firmwareId: id }, () => {
            this.setState({ modifyFirmwareVisible: true })
        })
    }

    // 更换固件id
    goReplaceFirmware = (id) => {
        this.setState({ firmwareId: id }, () => {
            this.setState({ replaceFirmwareVisible: true })
        })
    }

    // 弹窗确定
    handleModalOk = (id, type) => {
        console.log('确定选中的id', id)
        if (type === 'module') {
            this.getMoudleInfo(id.join(''))
            this.setState({ replaceModalVisible: false })
        } else if (type === 'firmware') {
            if (this.state.productItemData.moduleId != -1) {
                this.getMoudleInfo(this.state.productItemData.moduleId)
            }
            this.setState({ replaceFirmwareVisible: false })
        }

    }

    // 弹窗取消
    handleModalCancel = (type) => {
        if (type === 'module') {
            this.setState({ replaceModalVisible: false })
        } else if (type === 'firmware') {
            this.setState({ replaceFirmwareVisible: false })
        }
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
    downloadData = (moduleId) => {
        if (!moduleId) return this.setState({ downloadInfo: {} })
        post(Paths.downloadHardWareData, {
            productId: this.props.productId,
            moduleId: moduleId
        }).then(res => {
            console.log(res)
            if (res.code === 0) {
                this.setState({ downloadInfo: res.data })
            }
            // res.data ? window.location = res.data : alert('暂无数据！')
        })
    }


    // 获取通信协议
    getCommunicationProtocol = () => {
        post(Paths.getCommunicationProtocol, {}).then(res => {
            this.setState({
                protocolList: res.data
            })
        })
    }

    // 获取配网方式
    getBindTypeNetworkType = () => {
        get(Paths.getBindTypeNetworkTypeMap, {}).then(res => {
            this.setState({
                networkWayList: res.data
            })
        })
    }

    // 配网协议修改
    handleCommunicationOk = (res, params) => {
        let copyData = JSON.parse(sessionStorage.getItem('productItem')) || {}
        copyData.moduleId = res.moduleId
        copyData.netTypeId = params.netTypeId
        copyData.bindType = params.bindType
        copyData.bindTypeVersion = params.bindTypeVersion
        copyData.gatewayType = params.gatewayType || ''
        copyData.bindTypeStr = params.bindTypeStr
        // 前端自己保存数据，自己回显，只能更新存储里的内容了
        sessionStorage.setItem('productItem', JSON.stringify(copyData))
        this.getMoudleInfo(res.moduleId)
        this.setState({ configCommunicationVisible: false })
    }

    render() {
        const { replaceModalVisible, freeApplyVisible, modifyFirmwareVisible, replaceFirmwareVisible,
            dataSource, allInfo, currentModuleId, firmwareId, productItemData, officeVis,
            configCommunicationVisible, protocolList, networkWayList, downloadInfo } = this.state
        return (
            <div className="hardware-page">
                <div className="hardware-wrap">
                    <div className="desc">{this.getSchemeType()}
                        <a onClick={() => this.setState({ configCommunicationVisible: true })}>更改通信协议</a>
                    </div>
                    {/* 已选模组 */}
                    <div className="module-box">
                        <div className="module-header">
                            <div className="module-tip">已选模组</div>
                            <div className="replace-btn" onClick={() => this.setState({ replaceModalVisible: true })}>更换模组</div>
                        </div>
                        {
                            productItemData.moduleId == -1 &&
                            <div className="flex-c border" style={{ margin: '18px 0' }}><Empty /></div>
                        }
                        {
                            productItemData.moduleId != -1 &&
                            <div className="module-cont">
                                <div className="flex-s">
                                    <div className="module-cont-left">
                                        <img src={allInfo.modulePicture || require('../../../../../assets/images/commonDefault/hardware.png')} alt="" />
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
                                    <div className="apply-btn" onClick={() => { this.setState({ freeApplyVisible: true }) }}>免费申请</div>
                                </div>
                            </div>
                        }
                    </div>
                    {/* 已生成固件 */}
                    <div className="module-box">
                        {/* 有固件信息 */}
                        <div className="module-tip mar-t-b">已生成固件</div>
                        {
                            productItemData.schemeType != 3 && allInfo.firmwareDefList &&
                            <Table
                                rowKey="id"
                                columns={this.columns}
                                dataSource={dataSource}
                                pagination={false}
                                size="small" />
                        }
                        {/* 无固件信息 */}
                        {
                            productItemData.schemeType == 3 &&
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
                                    productItemData.schemeType === 1 && <div>设计PCB</div>
                                }
                                {
                                    productItemData.schemeType === 2 && <div>MCU SDK开发</div>
                                }
                                {
                                    productItemData.schemeType === 3 && <div>SDK开发</div>
                                }
                                {/* 下边的内容是根据模组来回变化的虽不合理，产品设计如此，不用怀疑，没有方案的维度做限制，已讨论过无果 */}
                                {
                                    Object.keys(downloadInfo).length == 0 && <div className='mar8'>暂无可用资料</div>
                                }
                                {
                                    downloadInfo.schemeType == 1 && downloadInfo.referenceCircuitDiagram &&
                                    <div className="blue mar8 lineNor"
                                        onClick={() => window.location = downloadInfo.referenceCircuitDiagram}>参考电路原理图</div>
                                }
                                {
                                    downloadInfo.schemeType == 2 && downloadInfo.burnFile &&
                                    <>
                                        <div className="blue mar8 lineNor"
                                            onClick={() => window.location = downloadInfo.burnFile}>模组固件</div>
                                    </>
                                }
                                {
                                    downloadInfo.schemeType == 3 &&
                                    <div className="blue mar8 lineNor">
                                        {
                                            downloadInfo.sourceSDK &&
                                            <div onClick={() => window.location = downloadInfo.sourceSDK}>原厂SDK</div>
                                        }
                                        {
                                            downloadInfo.clifeSDK &&
                                            <div onClick={() => window.location = downloadInfo.clifeSDK}>clifeSDK</div>
                                        }
                                    </div>
                                }

                                {/* {
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
                                } */}
                            </div>
                            <div className="line">
                                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
                            </div>
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/func.png')} alt="" />
                                <div>功能测试</div>
                                <div className="mar8 lineNor">（请先完成第四步中配网以及通信安全机制的配置）</div>
                                {/* <div className="blue">进入调试验证</div> */}
                            </div>
                            <div className="line">
                                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
                            </div>
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/network.png')} alt="" />
                                <div>联网验证</div>
                                <div className="blue lineNor" onClick={() => this.setState({ officeVis: true })}>下载“数联智能”App</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 通信协议配置——弹窗 */}
                {
                    configCommunicationVisible &&
                    <ConfigCommunication
                        visible={configCommunicationVisible}
                        protocolList={protocolList}
                        networkWayList={networkWayList}
                        productId={productItemData.productId}
                        deviceTypeName={productItemData.deviceType}
                        handleOk={(res, params) => this.handleCommunicationOk(res, params)}
                        handleCancel={() => this.setState({ configCommunicationVisible: false })}
                    />
                }

                {/* 更换模组 */}
                {replaceModalVisible &&
                    <ReplaceModule
                        title="更换模组"
                        opeType="module"
                        replaceModalVisible={replaceModalVisible}
                        handleOk={(id) => this.handleModalOk(id, 'module')}
                        handleCancel={this.handleModalCancel}
                        schemeId={productItemData.schemeId}
                        productId={productItemData.productId}
                        moduleId={currentModuleId} />
                }

                {/* 免费申请 */}
                {
                    freeApplyVisible &&
                    <FreeApplyModal
                        type="1"
                        firmwareName={allInfo.burnFileName || ''}
                        moduleName={allInfo.moduleName || ''}
                        freeApplyVisible={freeApplyVisible}
                        handleCancel={() => this.setState({ freeApplyVisible: false })}
                        handleFreeApply={() => {
                            this.setState({ freeApplyVisible: false })
                            this.getMoudleInfo(currentModuleId)
                        }} />
                }
                {/* 修改固件 */}
                {
                    modifyFirmwareVisible &&
                    <ModifyFirmwareModal
                        modifyFirmwareVisible={modifyFirmwareVisible}
                        firmwareId={firmwareId}
                        productId={this.props.productId}
                        moduleName={allInfo.moduleName}
                        handleOk={() => {
                            this.setState({ modifyFirmwareVisible: false })
                            this.getMoudleInfo(currentModuleId)
                        }}
                        handleCancelFirmware={() => {
                            this.setState({ modifyFirmwareVisible: false })
                        }} />
                }
                {/* 更换固件 */}
                {
                    replaceFirmwareVisible &&
                    <ReplaceModule
                        title="更换固件"
                        opeType="firmware"
                        desc="clife为您提供经检测认证的通用固件，会直接在您采购的模组内烧录完成，并自动分配设备编码。通讯模组通用固件包含连接clife和数据透传功能。产品功能固件需要您自行研发。"
                        replaceModalVisible={replaceFirmwareVisible}
                        firmwareId={firmwareId}
                        productId={this.props.productId}
                        handleOk={(id) => this.handleModalOk(id, 'firmware')}
                        handleCancel={this.handleModalCancel}
                        moduleId={currentModuleId} />
                }
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

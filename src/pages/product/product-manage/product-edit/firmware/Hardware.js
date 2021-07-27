import React, { Component } from 'react'
import { Button, Tabs, Table, Tooltip } from 'antd';
import "./hardware.scss";
import { CaretRightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReplaceModule from './replaceModule';
import ModuleDetail from './moduleDetail';
import FreeApplyModal from './freeApply';
import ModifyFirmwareModal from './modifyFirmware';

export default class Hardware extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: '固件名称/固件Key',
                dataIndex: 'value1',
            },
            {
                title: '关联硬件',
                dataIndex: 'value2',
            },
            {
                title: '芯片平台',
                dataIndex: '',
            },
            {
                title: '固件类型',
                dataIndex: ''
            },
            {
                title: '当前版本',
                dataIndex: ''
            },
            {
                title: '操作',
                render: (text, record, index) => (
                    <div className="table-operation" onClick={(e) => this.modifyFirmware(record.value2, e)}>
                        修改固件
                    </div>
                    // <div className="table-operation" onClick={(e) => this.goReplaceFirmware(record.value2, e)}>
                    //     更换固件
                    // </div>
                )
            }
        ];
        this.dataSource = [
            {
                key: '1',
                value1: '瑞昱SOC线上灯光固件',
                value2: 'WR3L Wi-Fi模组',
            },
            {
                key: '2',
                value1: '瑞昱SOC线上灯光固件 2Mkey4ua8kaadg8ywr',
                value2: 'Wi-Fi模组',
            }
        ];
        this.state = {
            replaceModalVisible: false,
            selectedId: '1', // 模组的id
            detailVisible: false, // 模组详情
            freeApplyVisible: false, // 免费申请
            modifyFirmwareVisible: false, // 修改固件
            replaceFirmwareVisible: false, // 更换固件
        }
    }
    componentDidMount() {
        this.props.onRef && this.props.onRef(this) // onRef绑定子组件到父组件
    }
    onFinish = (values) => {
        console.log('验证是否通过:', values);
        this.props.nextStep()
    };
    // 修改固件
    modifyFirmware = (val, e) => {
        console.log(val, '-----')
        this.setState({ modifyFirmwareVisible: true })
    }
    // handleCancelFirmware = () => {
    //     this.setState({ modifyFirmwareVisible: false })
    // }
    // 更换固件
    goReplaceFirmware = () => {
        this.setState({ replaceFirmwareVisible: true })
    }
    // 弹窗确定
    handleModalOk = (id) => {
        console.log('确定选中的id', id)
        this.setState({ replaceModalVisible: false })
    }
    // 弹窗取消
    handleModalCancel = (type) => {
        console.log('取消')
        if (type === 'module') {
            this.setState({ replaceModalVisible: false })
        } else if (type === 'firmware') {
            this.setState({ replaceFirmwareVisible: false })
        }

    }
    // 更换模组
    // replace = () => {
    //     this.setState({ replaceModalVisible: true })
    // }
    // 下载说明书
    downInstructions = () => {
        alert('暂无！')
    }
    // 获取模组详情
    getDetail = () => {
        this.setState({ detailVisible: true })
    }
    // 关闭抽屉
    // onCloseDrawer = () => {
    //     this.setState({ detailVisible: false })
    // }
    // 免费申请
    // onFreeApply = () => {
    //     this.setState({ freeApplyVisible: true })
    // }
    // 关闭免费申请
    // handleFreeApply = () => {
    //     this.setState({ freeApplyVisible: false })
    // }
    render() {
        const { replaceModalVisible, selectedId, detailVisible, freeApplyVisible, modifyFirmwareVisible, replaceFirmwareVisible } = this.state
        return (
            <div className="hardware-page">
                <div className="hardware-wrap">
                    <div className="desc">免开发方案，只需选择推荐模组、以及配置固件信息，快速实现硬件智能化。</div>
                    {/* 已选模组 */}
                    <div className="module-box">
                        <div className="module-header">
                            <div className="module-tip">已选模组</div>
                            <div className="replace-btn" onClick={() => { this.setState({ replaceModalVisible: true }) }}>更换模组</div>
                        </div>
                        <div className="module-cont">
                            <div className="flex-s">
                                <div className="module-cont-left">图片</div>
                                <div className="module-cont-right">
                                    <div className="module-title">WR3L Wi-Fi模组</div>
                                    <div className="flex">
                                        <div className="desc-item"><span className="desc-item-title">芯片：</span>AP6255</div>
                                        <div className="desc-item"><span className="desc-item-title">尺寸：</span>23×18×4mm</div>
                                        <div className="desc-item"><span className="desc-item-title">适用：</span>小家电，三表，路灯等</div>
                                    </div>
                                    <div className="desc-item">
                                        <span className="desc-item-title">特性：</span>1.支持Wi-Fi通信技术；2.支持Wi-Fi SmartLink配网配网方式；3.通信通讯速率为4800bps
                                    </div>
                                    <div className="more" onClick={this.downInstructions}>说明书<CaretRightOutlined /></div>
                                </div>
                            </div>
                            <div className="module-right-box">
                                <div className="price">¥20.14/个</div>
                                <div className="apply-btn" onClick={() => { this.setState({ freeApplyVisible: true }) }}>免费申请</div>
                            </div>
                        </div>
                    </div>
                    {/* 已生成固件 */}
                    <div className="module-box">
                        {/* 有固件信息 */}
                        <div className="module-tip mar-t-b">已生成固件</div>
                        <Table columns={this.columns} dataSource={this.dataSource} pagination={false} size="small" />
                        {/* 无固件信息 */}
                        {/* <div className="no-match-firmware">
                            <div className="no-match-firmware-img">
                                <img src={require('../../../../../assets/images/product/firmware-icon.png')} alt="" />
                            </div>
                            <div className="no-match-firmware-tip">您选择的模组暂无通用固件程序，请自行开发模组固件。</div>
                        </div> */}
                    </div>
                    {/* 开发调试 */}
                    <div className="module-box">
                        <div className="module-tip mar30">开发调试</div>
                        <div className="debug">
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/pcb.png')} alt="" />
                                <div>设计PCB</div>
                                {/* <div className="blue">参考电路原理图</div> */}
                                <div className="blue">
                                    下载MCU开发资料包
                                    <Tooltip
                                        title={'MCU' ? '包含MCU SDK、串口协议、模组调试助手等' : '包含模组 SDK、Bin文件等'}
                                        placement="top">
                                        <QuestionCircleOutlined className="tooltip-icon" />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="line">
                                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
                            </div>
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/func.png')} alt="" />
                                <div>功能测试</div>
                                <div className="mar8">（请先完成第四步中配网以及通信安全机制的配置）</div>
                                {/* <div className="blue">进入调试验证</div> */}
                            </div>
                            <div className="line">
                                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
                            </div>
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/network.png')} alt="" />
                                <div>联网验证</div>
                                <div className="blue">下载“数联智能”App</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 更换模组 */}
                {replaceModalVisible &&
                    <ReplaceModule
                        title="更换模组"
                        type="module"
                        replaceModalVisible={replaceModalVisible}
                        handleOk={this.handleModalOk}
                        handleCancel={this.handleModalCancel}
                        selectedId={selectedId} />
                }
                {/* 模组详情 */}
                <ModuleDetail
                    visible={detailVisible}
                    onCloseDrawer={() => { this.setState({ detailVisible: false }) }} />

                {/* 免费申请 */}
                {
                    freeApplyVisible &&
                    <FreeApplyModal
                        freeApplyVisible={freeApplyVisible}
                        handleFreeApply={() => { this.setState({ freeApplyVisible: false }) }} />
                }
                {/* 修改固件 */}
                {
                    modifyFirmwareVisible &&
                    <ModifyFirmwareModal
                        modifyFirmwareVisible={modifyFirmwareVisible}
                        handleCancelFirmware={() => { this.setState({ modifyFirmwareVisible: false }) }} />
                }
                {/* 更换固件 */}
                {replaceFirmwareVisible &&
                    <ReplaceModule
                        title="更换固件"
                        type="firmware"
                        desc="clife为您提供经检测认证的通用固件，会直接在您采购的模组内烧录完成，并自动分配设备编码。通讯模组通用固件包含连接clife和数据透传功能。产品功能固件需要您自行研发。"
                        replaceModalVisible={replaceFirmwareVisible}
                        handleOk={this.handleModalOk}
                        handleCancel={this.handleModalCancel}
                        selectedId={selectedId} />
                }

            </div>
        )
    }
}

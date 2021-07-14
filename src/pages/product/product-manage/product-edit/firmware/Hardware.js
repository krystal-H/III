import React, { Component } from 'react'
import { Button, Tabs, Table } from 'antd';
import "./hardware.scss";
import { CaretRightOutlined } from '@ant-design/icons';
import ReplaceModule from './replaceModule';

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
                    <div className="table-operation">
                        修改固件
                    </div>
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
            isModalVisible: true,
            selectedId: '1'
        }
    }
    // 弹窗确定
    handleModalOk = (id) => {
        console.log('确定选中的id', id)
        this.setState({ isModalVisible: false })
    }
    // 弹窗取消
    handleModalCancel = () => {
        console.log('取消')
        this.setState({ isModalVisible: false })
    }
    // 更换模组
    replace = () => {
        this.setState({ isModalVisible: true })
    }
    render() {
        const { isModalVisible, selectedId } = this.state
        return (
            <div className="hardware-page">
                <div className="hardware-wrap">
                    <div className="desc">免开发方案，只需选择推荐模组、以及配置固件信息，快速实现硬件智能化。</div>
                    {/* 已选模组 */}
                    <div className="module-box">
                        <div className="module-header">
                            <div className="module-tip">已选模组</div>
                            <div className="replace-btn" onClick={this.replace}>更换模组</div>
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
                                    <div className="desc-item"><span className="desc-item-title">特性：</span>1.支持Wi-Fi通信技术；2.支持Wi-Fi SmartLink配网配网方式；3.通信通讯速率为4800bps</div>
                                    <div className="more">更多<CaretRightOutlined /></div>
                                </div>
                            </div>
                            <div className="module-right-box">
                                <div className="price">¥20.14/个</div>
                                <div className="apply-btn">免费申请</div>
                            </div>
                        </div>
                    </div>
                    {/* 已生成固件 */}
                    <div className="module-box">
                        <div className="module-tip mar-t-b">已生成固件</div>
                        <Table columns={this.columns} dataSource={this.dataSource} pagination={false} size="small" />
                    </div>
                    {/* 开发调试 */}
                    <div className="module-box">
                        <div className="module-tip mar30">开发调试</div>
                        <div className="debug">
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/pcb.png')} alt="" />
                                <div>设计PCB</div>
                                <div className="blue">参考电路原理图</div>
                            </div>
                            <div className="line">
                                <img src={require('../../../../../assets/images/product/arrowLine.png')} alt="" />
                            </div>
                            <div className="flex-c">
                                <img className="debug-icon" src={require('../../../../../assets/images/product/func.png')} alt="" />
                                <div>功能测试</div>
                                <div className="mar8">（请先完成第四步中配网以及通信安全机制的配置）</div>
                                <div className="blue">进入调试验证</div>
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
                {
                    isModalVisible &&
                    <ReplaceModule
                        isModalVisible={isModalVisible}
                        handleOk={this.handleModalOk}
                        handleCancel={this.handleModalCancel}
                        selectedId={selectedId} />
                }
            </div>
        )
    }
}
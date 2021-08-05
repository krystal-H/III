import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Table, Divider } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import { cloudStatus } from '../../../configs/text-map';
import { setFuncDataType } from '../../../util/util';
import { Paths, post } from '../../../api'
import { CloudAddForm } from './CloudManageModals';
import './index.scss'

const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;

export default function DeviceRegist() {
    const [cloudAddVisible, setCloudAddVisible] = useState(true)
    const [cloudEditVisible, setCloudEditVisible] = useState(false)
    const [usedPropertys, setUsedPropertys] = useState([])

    const [dataSource, setDataSource] = useState([
        {
            key: 1,
            name: 'a',
            age: 1,
            address: 'aaaaa',
            status: '0'
        },
        {
            key: 2,
            name: 'b',
            age: 11,
            address: '111aaaaa',
            status: '1'
        },
        {
            key: 21,
            name: '1b',
            age: 111,
            address: '111aaaaa',
            status: '2'
        }
    ])
    const columns = [
        {
            title: '功能名称',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: '关联协议',
            dataIndex: 'propertyName',
            key: 'propertyName',
            render: (text, record) => (
                <div>
                    {
                        record.timerServiceDetails && record.timerServiceDetails.map((item, index) => {
                            return <div key={index}>{item.propertyName}</div>
                        })
                    }
                </div>
            )
        },
        {
            title: '协议数据标识',
            dataIndex: 'property',
            key: 'property',
            render: (text, record) => (
                <div>
                    {
                        record.timerServiceDetails && record.timerServiceDetails.map((item, index) => {
                            return <div key={index}>{item.property}</div>
                        })
                    }
                </div>
            )
        }, {
            title: '归属产品名称',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '协议数据类型',
            dataIndex: 'functionDataType',
            key: 'functionDataType',
            width: 160,
            render: (text, record) => (
                <div>
                    {
                        record.timerServiceDetails && record.timerServiceDetails.map((item, index) => {
                            return <div key={index}>{setFuncDataType(item)}</div>
                        })
                    }
                </div>
            )
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (text, record) => (
                <span>
                    {cloudStatus[record.status]}
                </span>
            )
        }, {
            title: '操作',
            key: 'action',
            width: 200,
            render: (text, record) => (
                <span>
                    {
                        record.status !== '1' ?
                            <React.Fragment>
                                <a >编辑</a>
                                <Divider type="vertical" />
                                <a >发布</a>
                                <Divider type="vertical" />
                                <a>删除</a>
                            </React.Fragment>
                            :
                            <a >下线</a>
                    }
                </span>
            ),
        }
    ];
    useEffect(() => {
        getTimeList()
    }, [])

    //  获取云端定时列表
    const getTimeList = () => {
        // post(Paths.getTimeServiceList, { developerId: 1 }).then((res) => {
        //     setDataSource(res.data)
        // });
    }

    //搜索
    const onSearch = value => console.log(value);

    return (
        <div id='cloud-time'>
            <PageTitle title='云端定时'>
                <div className='top-select'>
                    <Select defaultValue="all" style={{ width: 200 }} allowClear>
                        <Option value="all">全部产品</Option>
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} alt="" />
                    <span>云端定时步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="创建定时功能" description="可以使用产品的控制数据功能的点，创建定时功能。" />
                    <Step title="发布定时功能" description="定时功能确认无误后，可以发布到Clife或您创建的App上。" />
                    <Step title="App端配置" description="在App端基于已经发布的定时功能，配置定时任务。" />
                    <Step title="App端应用" description="满足定时任务的触发条件后，自动发送指令控制设备。" />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Search placeholder="请输入功能名称" onSearch={onSearch} enterButton style={{ width: 465 }} />
                    </div>
                    <Button type="primary" onClick={() => setCloudAddVisible(true)}>创 建</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
            {/* 创建 */}
            {
                cloudAddVisible &&
                <CloudAddForm
                    cloudAddVisible={cloudAddVisible}
                    type="add"
                    usedPropertys={usedPropertys}
                    onCancel={() => setCloudAddVisible(false)}></CloudAddForm>
            }
        </div>
    )
}

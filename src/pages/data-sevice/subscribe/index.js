import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Space, Table, Form } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import AddSubScribe from './addModal'
import { post, Paths, get } from '../../../api';
import { Notification } from '../../../components/Notification'
import ActionModal from './actionOp'
import SubInfo from './detail'
import './index.scss'
import moment from 'moment';
const { Option } = Select;
const { Step } = Steps;
const { Search } = Input;
export default function DeviceRegist() {
    const [form] = Form.useForm();
    const [deviceNameS, setDeviceNameS] = useState([])
    const [productCount, SetproductCount] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    // const [searchParams,setSearchParams]=useState({})
    // table操作-发布、删除、下线
    const [tableAcVisible, setTableAcVisible] = useState(false)
    const [operate, setOperate] = useState(null)
    const [selectRow, setSelectRow] = useState({})
    const operateHandle = (type, data) => {
        setTableAcVisible(true)
        setSelectRow(data)
        setOperate(type)

    }
    const closeAction = () => {
        setTableAcVisible(false)
    }
    const updateOkHandle = (loading = true) => {
        if (operate === 1) {
            let url = Paths.subscribeStart + '?urlConfId=' + selectRow.urlConfId
            post(url, {}, { loading }).then((res) => {
                setTableAcVisible(false)
                Notification({
                    type: 'success',
                    description: '操作成功！'
                })
                getList()
            });
        } else {
            let url = Paths.subscribeClose + '?urlConfId=' + selectRow.urlConfId
            post(url, {}, { loading }).then((res) => {
                setTableAcVisible(false)
                Notification({
                    type: 'success',
                    description: '操作成功！'
                })
                getList()
            });
        }
    }
    //==========
    //====详情
    const [rightVisible, setRightVisible] = useState(false)
    const openInfo = (data) => {
        console.log(data, 99)
        setSelectRow(data)
        setRightVisible(true)
    }
    const onCloseRight = () => {
        setRightVisible(false)
    }
    //===============
    const columns = [
        {
            title: '订阅ID',
            dataIndex: 'urlConfId',
            key: 'urlConfId',
        },
        {
            title: '订阅名称',
            dataIndex: 'subscription',
            key: 'subscription',
        },
        {
            title: '订阅方式',
            dataIndex: 'pushWay',
            key: 'pushWay',
            render: (text) => (
                <span>{text ? 'MQTT主题订阅' : 'API数据PUSH形'}</span>
            )
        }, {
            title: '归属产品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '订阅更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: text => <span>{text && moment(text).add(8, 'h').format('YYYY-MM-DD HH:mm:ss') || '--'}</span>
        }, {
            title: '状态',
            dataIndex: 'pushState',
            key: 'pushState',
            render: (text) => (
                <span>{text ? '正常' : '停用'}</span>
            )
        },
        {
            title: '操作',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => { openInfo(record) }}>查看</a>
                    <a onClick={() => { openInfo(record) }}>编辑</a>
                    {
                        record.pushState ? (<a onClick={() => { operateHandle(2, record) }}>停用</a>) :
                            (<a onClick={() => { operateHandle(1, record) }}>启动</a>)
                    }
                </Space>
            )
        },
    ];
    useEffect(() => {
        getList()
    }, [pager.pageRows, pager.pageIndex])

    //搜索
    const onSearch = () => {
        if (pager.pageIndex == 1) {
            getList()
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1 })
            })
        }
    };
    //获取列表
    const getList = (loading = true) => {
        let params = {
            devicePushUrlConf: { ...form.getFieldsValue(), developerId: 1 },
            pager: pager,
        }
        // setSearchParams(params.devicePushUrlConf)
        post(Paths.subscribeList, params, { loading }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows == pager.pageRows) {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1, pageRows })
            })
        }

    }

    //新增订阅
    const [modelVis, setModelVis] = useState(false)
    const openRegist = () => {
        setModelVis(true)
    }
    const cancelModel = () => {
        setModelVis(false)
    }
    const colseMoadl = () => {
        Notification({
            type: 'success',
            description: '新增成功！'
        })
        getList()
        setModelVis(false)
    }
    return (
        <div id='subscribe-data'>
            <PageTitle title='数据订阅'>
                <div className='top-select'>
                    <Select style={{ width: 200 }} allowClear>
                        <Option value="0">API数据PUSH形式 </Option>
                        <Option value="1">MQTT主题订阅</Option>
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} alt='' />
                    <span>数据订阅步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="选择产品" description="可根据产品订阅以及设备性能标签，选择需要的数据对象。" />
                    <Step title="配置订阅内容" description="可知产品或设备的物模型，订阅详细的功能点数据信息。" />
                    <Step title="确定订阅方式" description='支持数据发送服务或MQTT订阅，两种不同的方式。' />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Form className='device-filter-form' form={form} layout='inline'>
                            <Form.Item name="push_way" label="订阅方式" >
                                <Select
                                    allowClear
                                    style={{ width: '200px' }}
                                >
                                    <Option value='1'>API数据PUSH形式</Option>
                                    <Option value='0'>MQTT主题订阅</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="订阅名称"
                            >
                                <Form.Item
                                    name='subscription'
                                    noStyle
                                >
                                    <Input style={{ width: '228px' }} />
                                </Form.Item>
                                <Button type="primary" onClick={onSearch}>
                                    查询
                                </Button>
                            </Form.Item>
                            {/* <Form.Item label=" " colon={false} style={{ marginRight: '2px' }}>
                                <Button type="primary" onClick={onSearch}>
                                    查询
                                </Button>
                            </Form.Item> */}
                        </Form>

                    </div>
                    <Button type="primary" onClick={openRegist}>添加订阅</Button>
                </div>
                <Table rowKey='urlConfId' dataSource={dataSource} columns={columns} pagination={{
                    defaultCurrent: 1,
                    current: pager.pageIndex,
                    onChange: pagerChange,
                    pageSize: pager.pageRows,
                    total: pager.totalRows,
                    showQuickJumper: true,
                    pageSizeOptions: [10],
                    showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
                }} />
            </div>
            {
                modelVis && <AddSubScribe isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl}></AddSubScribe>
            }
            {
                tableAcVisible &&
                <ActionModal
                    visible={tableAcVisible}
                    operate={operate}
                    actionObj={selectRow}
                    updateOkHandle={() => updateOkHandle()}
                    updateCancelHandle={() => closeAction()} />
            }
            {
                rightVisible && <SubInfo rightVisible={rightVisible} onCloseRight={onCloseRight} id={selectRow.urlConfId} />
            }

        </div>
    )
}
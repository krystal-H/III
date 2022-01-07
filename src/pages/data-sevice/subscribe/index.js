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
    const [productCount, SetproductCount] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [actionType, setActionType] = useState('add')
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const [modelVis, setModelVis] = useState(false)
    const [editData, setEditData] = useState({})
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    // const [searchParams,setSearchParams]=useState({})
    // table操作-发布、删除、下线
    const [tableAcVisible, setTableAcVisible] = useState(false)
    const [operate, setOperate] = useState(null)
    const [selectRow, setSelectRow] = useState({})
    const [rightVisible, setRightVisible] = useState(false)
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

    const openInfo = (data) => {
        setSelectRow(data)
        setRightVisible(true)
    }
    const onCloseRight = () => {
        setRightVisible(false)
    }
    const getType = () => {
        post(Paths.allProductPubList, {}).then(res => {
            res.data.unshift({ productId: 0, productName: "全部产品" })
            setOptionArr(res.data)
        })
    }
    useEffect(() => { getType() }, [])
    useEffect(() => {
        getList()
    }, [pager.pageRows, pager.pageIndex, productCount])
    const productChange = (val) => {
        setPager(pre => {
            let obj = JSON.parse(JSON.stringify(pre))
            return Object.assign(obj, { pageIndex: 1 })
        })
        SetproductCount(val)
    }
    //搜索
    const onSearch = () => {
        if (pager.pageIndex === 1) {
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
        let obj = {}
        if (form.getFieldValue('push_way') != -1) {
            obj.push_way = form.getFieldValue('push_way')
        }
        if (form.getFieldValue('subscriptName')) {
            obj.subscriptName = form.getFieldValue('subscriptName')
        }
        let params = {
            devicePushUrlConf: obj,
            pager: pager,
        }
        if (productCount) {
            params.devicePushUrlConf.productId = productCount
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
    const openRegist = () => {
        setActionType('add')
        setModelVis(true)
    }
    const cancelModel = () => {
        setModelVis(false)
    }
    //新增编辑成功
    const colseMoadl = () => {
        Notification({
            type: 'success',
            description: actionType === 'edit' ? '编辑成功' : '新增成功！'
        })
        getList()
        setModelVis(false)
    }
    //编辑订阅
    const openEdit = (data, loading = true) => {
        let url = Paths.subscribeDetail + '?urlConfId=' + data.urlConfId
        post(url, {}, { loading }).then((res) => {
            setEditData(res.data)
            setSelectRow(data)
            setActionType('edit')
            setModelVis(true)
        });

    }

    const columns = [
        {
            title: '订阅ID',
            dataIndex: 'urlConfId',
            key: 'urlConfId',
        },
        {
            title: '订阅名称',
            dataIndex: 'subscriptName',
            key: 'subscriptName',
        },
        {
            title: '订阅方式',
            dataIndex: 'pushWay',
            key: 'pushWay',
            render: (text) => (
                <span>{text == 2 ? 'MQTT主题订阅' : 'API数据PUSH形'}</span>
            )
        }, {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text) => (
                <span>{ text || '--'}</span>
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
                    <a onClick={() => { openEdit(record) }}>编辑</a>
                    {
                        record.pushState ? (<a onClick={() => { operateHandle(2, record) }}>停用</a>) :
                            (<a onClick={() => { operateHandle(1, record) }}>启动</a>)
                    }
                </Space>
            )
        },
    ];

    return (
        <div id='subscribe-data'>
            {/* <PageTitle title='数据订阅' selectOnchange={val => productChange(val)} isRelProductData={true}>

            </PageTitle> */}
            <PageTitle title='数据订阅' >
                <div className='top-select'>
                    <Select style={{ width: 150 }} value={productCount} onChange={productChange} showSearch optionFilterProp="children">
                        {
                            optionArr.map(item => {
                                return (<Option value={item.productId} key={item.productId}>{item.productName}</Option>)
                            })
                        }
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} alt='' />
                    <span>数据订阅步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="选择产品" description="可根据产品订阅以及设备标签，选择需要的数据对象。" />
                    <Step title="配置订阅内容" description="可根据产品或设备的物模型，订阅详细的功能点数据信息。" />
                    <Step title="确定订阅方式" description='支持数据API推送服务或MQTT订阅，两种不同的方式。' />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Form className='device-filter-form' form={form} initialValues={{ push_way: '-1' }} layout='inline'>
                            <Form.Item name="push_way" label="订阅方式" >
                                <Select
                                    style={{ width: '200px' }}
                                >
                                    <Option value='-1'>全部方式</Option>
                                    <Option value={1}>API数据PUSH形式</Option>
                                    <Option value={2}>MQTT主题订阅</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="订阅名称"
                                name='subscriptName'
                            >
                                <Search onSearch={onSearch} style={{ width: '465px' }} />
                            </Form.Item>
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
            {/* 新增 */}
            {
                modelVis && <AddSubScribe isModalVisible={modelVis} cancelModel={cancelModel} colseMoadl={colseMoadl}
                    editData={editData} actionType={actionType}></AddSubScribe>
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
            {/* {
                editModelVis && <EditSubScribe editModelVis={editModelVis} colseMoadl={colseEditMoadl} editData={editData}
                    cancelModel={cancelEditModel} id={selectRow.urlConfId} />
            } */}
        </div>
    )
}
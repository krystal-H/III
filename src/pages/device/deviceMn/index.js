import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Form, Input, Select, Table, Button, Space, Typography } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import CountNum from '../../../components/CountNum/index';
import { post, Paths, get } from '../../../api';
import downpng from '../../../assets/images/product/download.png';
import './index.scss'
// import GroupDetailt from '../../product/device/device-group/groupDeviceList';
const { Search } = Input;
const { Option } = Select;
const originCount = [{ label: '当前异常数', count: 0 }, { label: '累积设备总数', count: 0 }, { label: '累积入网总数', count: 0 }, { label: '今日入网总数', count: 0 }]
export default function DeviceList() {
    const history = useHistory();
    const [countData, setCountData] = useState(originCount) //统计
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]) //表格数据
    const [selectType, setSelectType] = useState('') //产品种类
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    useEffect(() => {
        getProductType()
    }, [])
    useEffect(() => {
        getList()
    }, [selectType,pager.pageRows, pager.pageIndex])
    //产品改变
    const selectChange = (value) => {
        setPager(pre => {
            let obj = JSON.parse(JSON.stringify(pre))
            return Object.assign(obj, { pageIndex: 1 })
        })
        setSelectType(value)
    }
    //获取列表
    const getList = (load = true) => {
        let params = {
            ...form.getFieldsValue(),
            ...pager,
        }
        if(selectType){
            params.productId=selectType
        }
        // setSearchParams(params.devicePushUrlConf)
        post(Paths.getDeviceList, params, { load }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    //产品种类列表
    const getProductType = () => {
        get(Paths.getProductType).then((res) => {
            let arr = []
            for (let key in res.data) {
                arr.push({ key, value: res.data[key] })
            }
            setOptionArr(arr)
        });
    }
    //搜索
    const searchList = () => {
        const value = form.getFieldsValue();
        getList(value)
    }
    //清除搜索条件
    const clearForm = () => {
        form.resetFields();
    }
    //去详情
    const GroupDetailt = (id) => {
        history.push(`/open/device/devManage/detail/${id}?step=1`);
    }
    //过滤函数
    const fliterFn = (type, value) => {
        let result = null
        switch (type) {
            case 'productClass':
                if (!isNaN(value)) {
                    result = value == 1 ? '网关设备' : '普通设备'
                }
                break;
            case 'internetStatus':
                if (!isNaN(value)) {
                    result = value == 1 ? '已入网' : '未入网'
                }
                break;
            case 'onlineStatus':
                if (!isNaN(value)) {
                    result = value == 1 ? '在线' : '离线'
                }
                break;
            case 'faultStatus':
                if (!isNaN(value)) {
                    result = value == 1 ? '正常运行' : '故障'
                }
                break;
            default:
                return ''
        }
        return result
    }
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceId',
            key: 'deviceId',
        },
        {
            title: '物理地址',
            dataIndex: 'deviceMac',
            key: 'deviceMac',
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '分类',
            dataIndex: 'productType',
            key: 'productType',
        },
        {
            title: '标签',
            dataIndex: 'labelInfo',
            key: 'labelInfo',
        },
        {
            title: '所属分组',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: '类型',
            dataIndex: 'productClass',
            key: 'productClass',
            render: (text, record, index) => (
                <span >{fliterFn('productClass', record.productClass)}</span>
            )
        },
        {
            title: '入网状态',
            dataIndex: 'internetStatus',
            key: 'internetStatus',
            render: (text, record, index) => (
                <span >{fliterFn('internetStatus', text)}</span>
            )
        },
        {
            title: '在线状态',
            dataIndex: 'onlineStatus',
            key: 'onlineStatus',
            render: (text, record, index) => (
                <span >{fliterFn('onlineStatus', text)}</span>
            )
        },
        {
            title: '故障状态',
            dataIndex: 'faultStatus',
            key: 'faultStatus',
            render: (text, record, index) => (
                <span >{fliterFn('faultStatus', text)}</span>
            )
        },
        {
            title: '操作',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => { GroupDetailt(record.deviceId) }}>查看</a>
                </Space>
            )
        },
    ];
    //导出
    const exportFile = () => {
        // window.open (Paths.exportDeviceList) ;
        // return
        post(Paths.exportDeviceList, {}).then((res) => {

        });
    }
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows === pager.pageRows) {
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
    return (<div id='device-manage'>
        <PageTitle title='设备管理'>
            <div className='top-select'>
                <Select style={{ width: 200 }} allowClear onChange={selectChange}>
                    {
                        optionArr.map(item => {
                            return (<Option value={item.key} key={item.key}>{item.value}</Option>)
                        })
                    }
                </Select>
            </div>
        </PageTitle>
        <CountNum data={countData} />
        <div className='comm-shadowbox device-main'>
            <div className='device-filter'>
                <Form className='device-filter-form' form={form} layout='inline'>
                    <Form.Item label="设备ID/物理地址">
                        <Input.Group compact>
                            <Form.Item
                                name='infoType'
                                noStyle
                            >
                                <Select style={{ width: '102px' }}>
                                    <Option value="1">设备ID</Option>
                                    <Option value="2">物理地址</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name='field'
                                noStyle
                            >
                                <Input style={{ width: '228px' }} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="设备标签">
                        <Form.Item
                            name="labelKey"
                            style={{ display: 'inline-block', width: '174px', marginRight: '2px' }}
                        >
                            <Input placeholder='请输入标签Key' />
                        </Form.Item>
                        <Form.Item
                            name="labelValue"
                            style={{ display: 'inline-block', width: '221px' }}
                        >
                            <Input placeholder='请输入标签Value' />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="innet" label="入网状态" >
                        <Select
                            allowClear
                            style={{ width: '102px' }}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="online" label="在线状态" >
                        <Select
                            allowClear
                            style={{ width: '102px' }}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="fault" label="故障状态" >
                        <Select
                            allowClear
                            style={{ width: '102px' }}
                        >
                            <Option value={true}>是</Option>
                            <Option value={false}>否</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label=" " colon={false} style={{ marginRight: '2px' }}>
                        <Button type="primary" onClick={searchList}>
                            查询
                        </Button>
                    </Form.Item>
                    <Form.Item label=" " colon={false} style={{ marginRight: '0px' }}>
                        <Button onClick={clearForm}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='export-wrap'>
                <a onClick={exportFile}>导出协议</a>
                <img onClick={exportFile} src={downpng} style={{ marginRight: '15px' }} alt='' />
            </div>
            <div>
                <Table rowKey='deviceId' dataSource={dataSource} columns={columns} pagination={{
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
        </div>
    </div>)
}

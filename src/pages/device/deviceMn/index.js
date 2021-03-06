import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Form, Input, Select, Table, Button, Space, Typography } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import CountNum from '../../../components/CountNum/index';
import { post, Paths, get } from '../../../api';
import downpng from '../../../assets/images/product/download.png';
import { cloneDeep } from 'lodash'
import './index.scss'
// import GroupDetailt from '../../product/device/device-group/groupDeviceList';
const { Option } = Select;
const originCount = [
    { label: '当前异常数', count: '--' },
    { label: '累积设备总数', count: '--' },
    { label: '累积入网总数', count: '--' },
    { label: '今日入网总数', count: '--' }]
export default function DeviceList() {
    const history = useHistory();
    const [countData, setCountData] = useState(originCount) //统计
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]) //表格数据
    const [selectType, setSelectType] = useState('') //产品种类
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    useEffect(() => {
        getDevOneList()
    }, [])
    useEffect(() => {
        getList()
    }, [selectType, pager.pageRows, pager.pageIndex])
    //产品改变
    const selectChange = (value) => {
        setPager(pre => {
            let obj = JSON.parse(JSON.stringify(pre))
            return Object.assign(obj, { pageIndex: 1 })
        })
        setSelectType(value)
        getDevOneList(value)
    }
    //获取列表
    const getList = (loading = true) => {
        let arr = ['innet', 'fault', 'gatewayType']
        let obj = {}
        let source = cloneDeep(form.getFieldsValue())
        arr.forEach(item=>{
            if (source[item] !== -1) {
                obj[item] = source[item]
            }
        })
        if(source.infoType && source.field && source.field.trim()){
            obj.infoType=source.infoType
            obj.field=source.field.trim()
        }
        let params = {
            ...obj,
            ...pager,
        }
        if (selectType) {
            params.productId = selectType
        }
        post(Paths.getDeviceList, params, { loading }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    //获取统计
    const getDevOneList = (value) => {
        let parmas = {}
        if (value) {
            parmas.productId = value
        }
        post(Paths.devMnCount, parmas).then((res) => {
            setCountData([
                { label: '当前异常数', count: res.data.exception },
                { label: '累积设备总数', count: res.data.total },
                { label: '累积入网总数', count: res.data.totalActive },
                { label: '今日入网总数', count: res.data.todayActive }])
        });
    }
    //搜索
    const searchList = () => {
        if (pager.pageIndex === 1) {
            getList()
        } else {
            setPager({ pageIndex: 1, pageRows: 10 })
        }
    }
    //清除搜索条件
    const clearForm = () => {
        form.resetFields();
    }
    //去详情
    const GroupDetailt = (data) => {
        window.sessionStorage.setItem('DEVICE_DETAIL_BASE', JSON.stringify(data))
        history.push(`/open/device/devManage/detail/${data.deviceUniqueId}?step=1`);
    }
    //过滤函数
    const fliterFn = (type, value) => {
        let result = null
        switch (type) {
            case 'productClass':
                if (!isNaN(value)) {
                    let arr = ['网关设备', '子设备', '普通设备']
                    result = arr[value - 1]
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
            dataIndex: 'deviceUniqueId',
            key: 'deviceUniqueId',
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
            title: '绑定网关',
            dataIndex: 'gateWay',
            key: 'gateWay',
            render: (text) => (
                <span >{text || '-'}</span>
            )
        },
        {
            title: '类型',
            dataIndex: 'productClass',
            key: 'productClass',
            render: (text) => (
                <span >{fliterFn('productClass', text)}</span>
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
                    <a onClick={() => { GroupDetailt(record) }}>查看</a>
                </Space>
            )
        },
    ];
    //导出
    const exportFile = () => {
        let arr = ['innet', 'fault', 'gatewayType']
        let obj = {}
        let source = cloneDeep(form.getFieldsValue())
        arr.forEach(item=>{
            if (source[item] !== -1) {
                obj[item] = source[item]
            }
        })
        if(source.infoType && source.field && source.field.trim()){
            obj.infoType=source.infoType
            obj.field=source.field.trim()
        }
        if (selectType) {
            obj.productId = selectType
        }
        post(Paths.downDeviceFile,obj).then((res) => {
            window.open(res.data)
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
        <PageTitle title='设备管理' selectOnchange={val => selectChange(val)}>
        </PageTitle>
        <CountNum data={countData} />
        <div className='comm-shadowbox device-main'>
            <div className='device-filter'>
                <Form className='device-filter-form' form={form} layout='inline' initialValues={{ innet: -1, fault: -1, gatewayType: -1 }}>
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
                                <Input style={{ width: '228px' }} placeholder='请输入设备物理地址或者ID' />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name="innet" label="入网状态" >
                        <Select
                            style={{ width: '102px' }}
                        >
                            <Option value={-1}>全部状态</Option>
                            <Option value={1}>已入网</Option>
                            <Option value={0}>未入网</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="gatewayType" label="类型" >
                        <Select
                            style={{ width: '102px' }}
                        >
                            <Option value={-1}>全部</Option>
                            <Option value={1}>网关设备</Option>
                            <Option value={2}>子设备</Option>
                            <Option value={3}>普通设备</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="fault" label="故障状态" >
                        <Select
                            style={{ width: '102px' }}
                        >
                            <Option value={-1}>全部状态</Option>
                            <Option value={false}>正常运行</Option>
                            <Option value={true}>今日故障</Option>
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
                <a onClick={exportFile}>导出数据</a>
                <img onClick={exportFile} src={downpng} style={{ marginRight: '15px' }} alt='' />
            </div>
            <div>
                <Table rowKey='deviceId' dataSource={dataSource} columns={columns}
                    pagination={{
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

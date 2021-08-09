import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Form, Input, Select, Table, Button, Space, Typography } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import CountNum from '../../../components/CountNum/index';
import { post, Paths, get } from '../../../api';
import './index.scss'
// import GroupDetailt from '../../product/device/device-group/groupDeviceList';
const { Search } = Input;
const { Option } = Select;
const originCount = [{ label: '当前异常数', count: 0 }, { label: '累积设备总数', count: 0 }, { label: '累积入网总数', count: 0 }, { label: '今日入网总数', count: 0 }]
export default function DeviceList() {
    const history = useHistory();
    const [countData, setCountData] = useState(originCount)
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        getList()
    }, [])
    // 设备列表
    const getList = (params = {}, loading = true) => {
        post(Paths.getDeviceList, params, { loading }).then((res) => {
            
            setDataSource(res.data.list)
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
    return (<div id='device-manage'>
        <PageTitle title='设备管理'>
            <div className='top-select'>
                <Select defaultValue="lucy" style={{ width: 200 }} allowClear>
                    <Option value="lucy">Lucy</Option>
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
            <div>
                <Table rowKey='deviceId' dataSource={dataSource} columns={columns} />
            </div>
        </div>
    </div>)
}

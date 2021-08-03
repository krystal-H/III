import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { Form, Input, Select, Table , Button, Space, Typography } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import CountNum from '../../../components/CountNum/index';
import './index.scss'
const { Search } = Input;
const { Option } = Select;
const originCount=[{ label: '当前异常数', count: 0 }, { label: '累积设备总数', count: 0 }, { label: '累积入网总数', count: 0 }, { label: '今日入网总数', count: 0 }]
export default function DeviceList() {
    const [countData, setCountData] = useState(originCount)
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '物理地址',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '分类',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '标签',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属分组',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '入网状态',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '在线状态',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '故障状态',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
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
                                name={['address', 'province']}
                                noStyle
                                rules={[{ required: true, message: 'Province is required' }]}
                            >
                                <Select style={{ width: '102px' }}>
                                    <Option value="Zhejiang">Zhejiang</Option>
                                    <Option value="Jiangsu">Jiangsu</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'street']}
                                noStyle
                                rules={[{ required: true, message: 'Street is required' }]}
                            >
                                <Input style={{ width: '228px' }} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="设备标签">
                        <Form.Item
                            name="year"
                            style={{ display: 'inline-block', width: '174px', marginRight: '2px' }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="month"
                            style={{ display: 'inline-block', width: '221px' }}
                        >
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="gender" label="入网状态" >
                        <Select
                            allowClear
                            style={{ width: '102px' }}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="gender" label="在线状态" >
                        <Select
                            allowClear
                            style={{ width: '102px' }}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="gender" label="故障状态" >
                        <Select
                            allowClear
                            style={{ width: '102px' }}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label=" " colon={false} style={{ marginRight: '2px' }}>
                        <Button type="primary" >
                            查询
                        </Button>
                    </Form.Item>
                    <Form.Item label=" " colon={false} style={{ marginRight: '0px' }}>
                        <Button  >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    </div>)
}

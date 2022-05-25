import React, { useState, useEffect } from 'react'
import PageTitle from '../../../components/page-title/PageTitle'
import { Form, Input, Select, Table, Button, Space, DatePicker } from 'antd';
import { Paths, post,get } from '../../../api'
import dayjs from 'dayjs'
import './style.scss'
const { RangePicker } = DatePicker;
const { Option } = Select;
export default function Info() {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]) //表格数据
    const [summaryData, setSummaryData] = useState({ sumApiCount: '--', topProjectName: '--', topProjectCount: '--', topInterfaceName: '--' })
    const [projectList, setProjectList] = useState([])
    const columns = [
        {
            title: 'API名称',
            dataIndex: 'apiName',
            key: 'apiName',
        }, {
            title: 'API详情',
            dataIndex: 'apiInfo',
            key: 'apiInfo',
        }, {
            title: '调用次数',
            dataIndex: 'counter',
            key: 'counter',
        },
    ]
    useEffect(() => {
        get(Paths.projectSummary).then(res => {
            setSummaryData(res.data)
        })
        post(Paths.projectList,{ pageIndex: 1, pageRows: 9999 }).then(res => {
            setProjectList(res.data.list)
        })
        getList()
    }, [])
    const getList = () => {
        let params = {}
        let projectId = form.getFieldValue('projectId')
        let times = form.getFieldValue('times')
        if (projectId) {
            params.projectId = projectId
        }
        if (times && times.length) {
            params.startDate = times[0].format('YYYY-MM-DD')
            params.endDate = times[1].format('YYYY-MM-DD')
        }
        post(Paths.projectSummaryList, params,{ loading: true }).then(res => {
            res.data.forEach((item,index)=>{
                item.key=index
            })
            setDataSource(res.data)
        })
    }
    //搜索
    const searchList = () => {
        getList()
    }
    //清除搜索条件
    const clearForm = () => {
        form.resetFields();
    }
    const disabledDate = current => {
        return current && current > dayjs().subtract(1, 'day') 
    };
    return (
        <div className='project-count-page'>
            <PageTitle title='项目统计'></PageTitle>
            <div className='comm-shadowbox content'>
                <div className='count-wrap'>
                    <div className='item'>
                        <div className='label'>API调用总次数（昨日）</div>
                        <div className='text'>{summaryData.sumApiCount}</div>
                    </div>
                    <div className='item'>
                        <div className='label'>TOP1 调用次数项目（昨日）</div>
                        <div className='text'>{summaryData.topProjectName || '--'}</div>
                    </div>
                    <div className='item'>
                        <div className='label'>TOP1 项目调用次数（昨日）</div>
                        <div className='text'>{summaryData.topProjectCount}</div>
                    </div>
                    <div className='item'>
                        <div className='label'>TOP1 调用次数API（昨日）</div>
                        <div className='text'>{summaryData.topInterfaceName || '--'}</div>
                    </div>
                </div>
                <div className='content-filter'>
                    <Form className='device-filter-form' form={form} layout='inline' >
                        <Form.Item name="projectId" label="选择项目" >
                            <Select style={{ width: 202 }} showSearch optionFilterProp="children">
                                {
                                    projectList.map(item => {
                                        return (<Option value={item.projectId} key={item.projectId}>{item.projectName}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name="times" label="时间" >
                            <RangePicker
                            disabledDate={disabledDate}
                                format={'YYYY-MM-DD'}
                                allowClear={false}
                            />
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
                <div className='content-main'>
                    <Table rowKey='key' dataSource={dataSource} columns={columns}
                        pagination={false} />
                </div>
            </div>
        </div>
    )
}
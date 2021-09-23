import React, { useState, useEffect ,useLayoutEffect } from 'react'
import { Table, Drawer, Image, Divider } from 'antd';
import { post, Paths, get } from '../../../api';
import { DateTool } from '../../../util/util';
export default function DeviceShadow({isRefresh}) {
    const [visible, setVisible] = useState(false);
    const [tableData, setTableData] = useState([])
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const [detailInfo, setDetailInfo] = useState({})
    const onClose = () => {
        setVisible(false);
    };
    const lookDetail = (id) => {
        getDetail(id)
        setVisible(true)
    }
    const columns = [
        {
            title: '订阅号',
            dataIndex: 'workOrderId',
            key: 'workOrderId',
        },
        {
            title: '问题分类',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => (
                <span>
                    {record.problemTypeOneName} - {record.problemTypeTwoName}
                </span>
            ),
        },
        {
            title: '提交时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return <span>{createTime && DateTool.utcToDev(createTime)}</span>
            }
        },
        {
            title: '工单状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <span>
                    {text ? '已回复' : '未回复'}
                </span>
            ),
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <span>
                    <a onClick={() => { lookDetail(record.workOrderId) }}>查看</a>
                </span>
            ),
        },
    ]
    const getList = (loading = true) => {
        post(Paths.WorkOrderList, pager, { loading }).then((res) => {
            setTableData(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    const getDetail = (id) => {
        post(Paths.WorkOrderDetail, { workOrderId: id }).then((res) => {
            setDetailInfo(res.data)
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
    // useLayoutEffect (() => {
    //     console.log(currentTab,'============aqs4')
    //     if(currentTab == '2'){
    //     }
    // }, [currentTab])
    useEffect(() => {
        getList()
    }, [pager.pageRows, pager.pageIndex,isRefresh])
    
    return (<div id='order-home-self'>
        <Table dataSource={tableData} columns={columns} rowKey='workOrderId' pagination={{
            defaultCurrent: 1,
            current: pager.pageIndex,
            onChange: pagerChange,
            pageSize: pager.pageRows,
            total: pager.totalRows,
            showQuickJumper: true,
            pageSizeOptions: [10],
            showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
        }} />
        <Drawer
            title="工单详情"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={470}
        >
            <div className='my-order-detail'>
                <div className='order-item'>
                    <div className='order-item-label'>问题分类：</div>
                    <div className='order-item-text'>{detailInfo.problemTypeOneName}-{detailInfo.problemTypeTwoName}
                        <span className='order-item-span' style={{ color: detailInfo.status ? '#15C054' : '#2F78FF' }}>{detailInfo.status ? '已回复' : '待回复'}</span>
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>提交时间：</div>
                    <div className='order-item-text'>{detailInfo.createTime && DateTool.utcToDev(detailInfo.createTime)}</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>问题描述：</div>
                    <div className='order-item-text'>{detailInfo.problemDesc}</div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>上传问题图片/视频：</div>
                    <div className='order-item-text'>
                        {
                            detailInfo.image && detailInfo.image.split(',').map((item, index) => {
                                return <Image key={index} src={item} width={100} />
                            })
                        }
                    </div>
                </div>
                <div className='order-item'>
                    <div className='order-item-label'>联系方式：</div>
                    <div className='order-item-text'>{detailInfo.phone}</div>
                </div>
                {
                    detailInfo.status == 1 ? (<div className='order-feedback'>
                        <div style={{ margin: '0 -24px' }}>
                            <Divider />
                        </div>
                        <div className='feedback-title'>回复详情：</div>
                        <div className='feedback-dec'>
                            {detailInfo.replyContent}
                        </div>
                    </div>) : null
                }

            </div>
        </Drawer>
    </div>)
}
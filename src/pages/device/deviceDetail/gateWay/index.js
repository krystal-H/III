import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { post, Paths, get } from '../../../../api';
export default function Gateway({deviceId}) {
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    const [dataSource, setDataSource] = useState([]) //表格数据
    useEffect(() => {
        getList()
    }, [pager.pageRows, pager.pageIndex])
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
            title: '在线状态',
            dataIndex: 'onlineStatus',
            key: 'onlineStatus',
            render: (text) => (
                <span >{text ==1 ? '在线' : '离线'}</span>
            )
        }
    ];
    const getList = () => {
        let params={
            ...pager,
            deviceId
        }
        post(Paths.gatewayList,params , { loading: true }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
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
    return <div>
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
}
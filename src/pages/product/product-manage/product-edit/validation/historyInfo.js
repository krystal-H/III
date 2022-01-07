import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table } from 'antd';
import { DateTool } from '../../../../../util/util';
import { get, post, Paths } from '../../../../../api';
export default ({ historyVisiable, openHistory, debugInfo,productId, sentInfo }) => {

    const [dataSource, setDataSource] = useState([])

    const columns = [
        { title: 'Clife账号', dataIndex: 'account', key: 'account' },
        {
            title: '调试设备物理地址', dataIndex: 'physicalAddrs', key: 'physicalAddrs',
            render: text => <span>{text && text.length && text[0]}</span>
        },

        {
            title: '配合调试时间', dataIndex: 'createTime', key: 'createTime',
            render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
        },
        {
            title: '操作', dataIndex: 'a', key: 'a',
            render: (_,record) => <a onClick={() => { startDebug(record) }}>调试</a>
        },
    ];

    const startDebug = (record) => {
        sentInfo(record)
    }
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        // const [account, devMac] = debugInfo
        let params = {
            pageIndex: 1,
            pageRows: 10,
            productId
        }
        get(Paths.getDebugHis, params).then(res => {
            let data=res.data.records || []
            data.forEach((item,index)=>{
                item.key=index
            })
            setDataSource(data)
        });
    }

    return (

        <Modal
            title="历史调试信息"
            visible={historyVisiable}
            width={600}
            onOk={() => { openHistory(false) }}
            onCancel={() => { openHistory(false) }}
            maskClosable={false}
            className="groupadd-device-modal"
        >

            <Table
                rowKey="key"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            // loading={!!listLoading}
            // pagination={{
            //     defaultCurrent:pager.pageIndex, 
            //     total:pager.totalRows, 
            //     onChange:val=>{this.setQuestParams('pageIndex',val)},
            //     current: pager.pageIndex
            // }} 
            />



        </Modal>
    )

}


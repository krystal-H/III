import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table, message } from 'antd';
import {Notification} from '../../../../../components/Notification';
import { DateTool } from '../../../../../util/util';
import { get, post, Paths } from '../../../../../api';
export default ({ historyVisiable, openHistory, debugInfo, productId, sentInfo }) => {

    const [dataSource, setDataSource] = useState([])

    const columns = [
        { title: 'Clife账号', dataIndex: 'account', key: 'account' },
        {
            title: '调试设备物理地址', dataIndex: 'physicalAddrs', key: 'physicalAddrs',
            render: text => <span>{text && text.length && text[0]}</span>
        },

        {
            title: '配合调试时间', dataIndex: 'createTime', key: 'createTime',
            render: text => <span>{text && DateTool.utcToDev(text)}</span>
        },
        {
            title: '操作', dataIndex: 'a', key: 'a',
            render: (_, record) => <span>
                <a onClick={() => { startDebug(record) }} style={{ marginRight: '10px' }}>调试</a>
                <a onClick={() => { delDebug(record) }}>删除</a>
            </span>
        },
    ];

    const startDebug = (record) => {
        sentInfo(record)
    }
    //删除
    const delDebug = (row) => {
        post(Paths.hisDebugMacdel, { ids: [row.id] }).then(res => {
            Notification({type:'success',description:'删除成功！'});
            getList()
        });
    }
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        let params = {
            pageIndex: 1,
            pageRows: 999,
            productId
        }
        get(Paths.getDebugHis, params).then(res => {
            let data = res.data.records || []
            data.forEach((item, index) => {
                item.key = index
            })
            setDataSource(data)
        });
    }

    return (

        <Modal
            title="历史调试信息"
            visible={historyVisiable}
            width={700}
            onOk={() => { openHistory(false) }}
            onCancel={() => { openHistory(false) }}
            maskClosable={false}
            className="groupadd-device-modal"
            footer={null}
        >
            <Table
                rowKey="key"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </Modal>
    )

}


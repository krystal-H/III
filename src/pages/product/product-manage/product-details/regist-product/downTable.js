import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal,  Table, InputNumber } from 'antd';
import { post, Paths, get } from '../../../../../api';
import './index.scss'
export default function AddFuncModal({ handleCancel, numVal, isShowDn }) {
    const [tableList, setTableList] = useState([])
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    useEffect(() => {
        alert(numVal)
    }, [])
    const columns = [
        {
            title: '产品名称',
            dataIndex: '',
            key: '',
        }, {
            title: '下载时间时间',
            dataIndex: '',
            key: '',
        }, {
            title: '配置数量',
            dataIndex: '',
            key: '',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
        }
    ]
    //获取列表
    const getList = (loading = true) => {
        let params = { ...pager }
        post(Paths.proReledRegist, params).then((res) => {
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
    return (
        <div>
            <Modal title="密钥下载" visible={isShowDn} onCancel={handleCancel} footer={null} width='750px'>
                <Table rowKey='did' dataSource={tableList} columns={columns} pagination={{
                    defaultCurrent: 1,
                    current: pager.pageIndex,
                    onChange: pagerChange,
                    pageSize: pager.pageRows,
                    total: pager.totalRows,
                    showQuickJumper: true,
                    pageSizeOptions: [10],
                    showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
                }} />
            </Modal>
        </div>
    )
}
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Table, InputNumber } from 'antd';
import { post, Paths, get } from '../../../../../api';
import { DateTool } from '../../../../../util/util';
import './index.scss'
export default function AddFuncModal({ handleCancel, productId, isShowDn }) {
    const [tableList, setTableList] = useState([])
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    useEffect(() => {
        getList()
    }, [])
    const columns = [
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
        }, {
            title: '下载时间时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime) {
                return createTime && DateTool.utcToDev(createTime);
            }
        }, {
            title: '配置数量',
            dataIndex: 'applyNum',
            key: 'applyNum',
        }, {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (_, record) => (
                <a onClick={() => { downFile(record.applyId) }}>下载</a>
            )
        }
    ]
    //下载
    const downFile = (applyId) => {
        post(Paths.downRegistFlie, { applyId }, { loading: true }).then((res) => {
            window.open(res.data)
        });
    }
    //获取列表
    const getList = (loading = true) => {
        post(Paths.registerTable, { productId }).then((res) => {
            setTableList(res.data)
        });
    }
    return (
        <div>
            <Modal title="密钥下载" visible={isShowDn} onCancel={handleCancel} footer={null} width='750px'>
                <Table rowKey='did' dataSource={tableList} columns={columns} />
            </Modal>
        </div>
    )
}
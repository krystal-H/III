import React, { useState, useEffect } from 'react'
import { Descriptions, Divider, Table, Input, Button } from 'antd';
import { post, Paths, get } from '../../../../../api';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal'
import InfoDia from './infoDia'
import AddDia from './addDia'
import './index.scss'
const { Search } = Input;
export default function Grouping() {
    const [actionData, setActionData] = useState({})
    const [deletevisible, setDeletevisible] = useState(false)
    const [infoVis, setInfoVis] = useState(false)
    const [addVis, setAddVis] = useState(false)
    const onSearch = value => {

    };
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '分组名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '分组ID',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '描述',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '添加时间',
            dataIndex: '',
            key: '',
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, record) => (
                <div className="operation">
                    <a onClick={() => openDetail(record)}>查看</a>
                    <Divider type="vertical" />
                    <a onClick={() => openDel(record)}>删除</a>
                </div>
            )
        },
    ];
    //打开新增
    const openAdd = () => {
        setAddVis(true)
    }
    const closeAdd = () => {
        setAddVis(false)
    }
    const refreshAdd = () => {
        setAddVis(false)
    }
    //打开详情
    const openDetail = (data) => {
        setActionData(data)
        setInfoVis(true)
    }
    //取消详情
    const closeAction = () => {
        setInfoVis(false)
    }
    //确定详情
    const closeSub = () => {
        setInfoVis(false)
    }
    //打开删除
    const openDel = (data) => {
        setActionData(data)
        setDeletevisible(true)
    }
    //确定删除
    const deletelOKHandle = () => {

    }
    return (<div id='project-grouping'>
        <div className='title'>
            <Search
                allowClear
                placeholder='请输入设备ID号'
                enterButton="搜索"
                size="middle"
                onSearch={onSearch}
                style={{ width: 400 }}
            />
            <Button type='primary' onClick={openAdd}>新增分组</Button>
        </div>
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
        {
            deletevisible &&
            <ActionConfirmModal
                visible={deletevisible}
                modalOKHandle={deletelOKHandle}
                modalCancelHandle={() => setDeletevisible(false)}
                targetName={actionData.taskName}
                title={'删除分组'}
                needWarnIcon={true}
                descText={'即将删除的分组'}
                tipText={'删除的信息，无法找回，请谨慎操作'}
            >
            </ActionConfirmModal>
        }
        {
            infoVis && <InfoDia ModalVisible={infoVis} onCancel={closeAction} closeOk={closeSub} />
        }
        {
            addVis && <AddDia ModalVisible={addVis} onCancel={closeAdd} closeOk={refreshAdd} />
        }
    </div>)
}
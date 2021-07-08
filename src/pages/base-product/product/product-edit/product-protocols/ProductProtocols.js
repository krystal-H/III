import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Table, Button, Drawer } from 'antd';
import './ProductProtocols.scss';
import EditInfo from './editInfo'
import Addfunction from './addModal'
import NewCusmFn from './addcusFn'
export default function ProtocolDelete() {
    const columns = [
        { title: 'DP ID', dataIndex: 'name' },
        { title: '功能名称', dataIndex: 'id' },
        { title: '标识符', dataIndex: 'remark' },
        {
            title: '数据传输类型', dataIndex: 'createTime',
            render: text => <span>{text && moment(text).add(8, 'h').format('YYYY-MM-DD HH:mm:ss') || '--'}</span>
        },
        { title: '数据长度', dataIndex: 'remark' },
        { title: '状态', dataIndex: 'remark' },
        { title: '数据属性', dataIndex: 'remark' },
        { title: '操作', dataIndex: 'remark' },
    ];
    const [dataSource, setdataSource] = useState([]);

    const [selectId, setSelectId] = useState(0);
    //编辑标准功能/新增自定义功能=======
    const [isStarDia, setIsStarDia] = useState(true); //
    const [editVisible, setEditVisible] = useState(false);
    //编辑右边抽屉
    const openEdit = () => {
        setIsStarDia(true)
        setEditVisible(true);
    };
    //新增自定义功能抽屉
    const openCusmon = () => {
        setIsStarDia(false)
        setEditVisible(true);
    };
    //关闭抽屉
    const onCloseEdit = () => {
        setEditVisible(false);
    };
    useEffect(() => {
    }, [])
    //新增标准功能====
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeAdd = () => {
        setIsModalVisible(false)
    }
    const CancelAdd = () => {
        setIsModalVisible(false)
    }
    const openAdd = () => {
        setIsModalVisible(true)
    }
    //===========
    return <div className='Protocol-wrap'>
        <div className='Protocol-label'>
            <div>独立MCU方案，需选择下载MCU开发资料包等，进行相应开发</div>
            <a onClick={openEdit}>导出物模型</a>
        </div>
        <div className='Protocol-download'>
            <div>标准功能</div>
            <Button type="primary" onClick={openAdd}>新建标准功能</Button >
        </div>
        <div className='Protocol-table'>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
            />
        </div>
        <div className='Protocol-download'>
            <div>标准功能</div>
            <Button type="primary"onClick={openCusmon}>新建自定义功能</Button >
        </div>
        <div >
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
            />
        </div>
        <Drawer
            title={isStarDia ? '编辑标准功能' : '新增自定义功能'}
            placement="right"
            closable={false}
            onClose={onCloseEdit}
            visible={editVisible}
            width={393}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCloseEdit} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={onCloseEdit} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <div>
                {isStarDia ? <EditInfo selectId={selectId}></EditInfo> : <NewCusmFn></NewCusmFn>}
            </div>
        </Drawer>
        {isModalVisible && <Addfunction closeAdd={closeAdd} CancelAdd={CancelAdd} isModalVisible={isModalVisible}></Addfunction>}
    </div>
}
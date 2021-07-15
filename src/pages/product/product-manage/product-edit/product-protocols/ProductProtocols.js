import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Table, Button, Drawer } from 'antd';
import './ProductProtocols.scss';
import EditcusFn from './editcusFn'
import Addfunction from './addModal'
import NewCusmFn from './addcusFn'
import downpng from './../../../../../assets/images/product/download.png';
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
    // const [isStarDia, setIsStarDia] = useState(true); //
    const [rightVisible, setRightVisible] = useState(false);
    const [rightEditVisible, setRightEditVisible] = useState(false);
    //编辑右边抽屉
    const openEditCus = () => {
        setRightEditVisible(true)
    };
    //关闭编辑右边抽屉
    const onCloseEditRight = () => {
        setRightEditVisible(false)
    };
    //新增自定义功能抽屉
    const openCusmon = () => {
        setRightVisible(true);
    };
    //关闭抽屉
    const onCloseRight = () => {
        setRightVisible(false);
    };


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
            <div className='Protocol-download'>
                <a>导出物模型</a>
                <img src={downpng} />
            </div>

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
            <div>自定义功能</div>
            <div>
                <a>导出协议</a>
                <img src={downpng} style={{marginRight:'15px'}}/>
                <Button type="primary" onClick={openCusmon}>新建自定义功能</Button >
            </div>

        </div>
        <div >
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSource}
            />
        </div>
        <NewCusmFn rightVisible={rightVisible} onCloseRight={onCloseRight}></NewCusmFn>

        <EditcusFn rightVisible={rightEditVisible} onCloseRight={onCloseEditRight}></EditcusFn>
        {isModalVisible && <Addfunction closeAdd={closeAdd} CancelAdd={CancelAdd} isModalVisible={isModalVisible}></Addfunction>}
    </div>
}
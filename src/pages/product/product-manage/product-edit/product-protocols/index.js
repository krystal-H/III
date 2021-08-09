import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import moment from 'moment';
import { Table, Button, Drawer } from 'antd';
import './index.scss';
import EditcusFn from './editcusFn'
import Addfunction from './addModal'
import NewCusmFn from './addcusFn'
// import TitleEdit from './titleEdit'
import downpng from './../../../../../assets/images/product/download.png';
import { post, Paths, get } from '../../../../../api';
//处理数据
function delaData(data) {
    let newData=[]
    data.forEach(item => {
        funcParamList.forEach(item2 => {
            let newItem=JSON.parse(JSON.stringify(item))
            item2.nameSub=item2.name
            delete item2.name
            newData.push({...newItem,...item2})
        })
    })
    return newData
}
function ProtocolFn({ nextStep,productId }, ref) {
    const columns = [
        { title: 'DP ID', dataIndex: 'name' },
        { title: '功能类型', dataIndex: 'id' },
        { title: '功能点名称', dataIndex: 'id' },
        { title: '标识符', dataIndex: 'remark' },
        { title: '参数名称', dataIndex: 'remark' },
        { title: '参数标识', dataIndex: 'remark' },
        {
            title: '数据传输类型', dataIndex: 'createTime',
            render: text => <span>{text && moment(text).add(8, 'h').format('YYYY-MM-DD HH:mm:ss') || '--'}</span>
        },
        { title: '数据类型', dataIndex: 'remark' },
        { title: '数据属性', dataIndex: 'remark' },
        {
            title: '操作', dataIndex: 'remark', render: (text, record) => (
                <><Button type="link">编辑</Button><Button type="link">删除</Button></>
            ),
        },
    ];
    const [dataSource, setdataSource] = useState([]);
    const [selectId, setSelectId] = useState(0);
    //获取列表
    const getList = () => {
        let url=Paths.standardFnList+'/11759'
        get(url, {}).then((res) => {
            delaData(res.data)
        });
    }
    useEffect(() => {
        getList()
    }, [])
    //编辑标准功能/新增自定义功能=======
    // const [isStarDia, setIsStarDia] = useState(true); //
    const [rightVisible, setRightVisible] = useState(false);
    const [rightEditVisible, setRightEditVisible] = useState(false);
    const [destoryDom, setDestoryDom] = useState(true);
    //编辑右边抽屉
    const openEditCus = () => {
        setDestoryDom(true)
        setTimeout(() => {
            setRightEditVisible(true)
        }, 0)

    };
    //编辑抽屉关闭回调
    const onDestData = () => {
        setDestoryDom(false)
    }
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
    //验证函数
    const subNextConFirm = () => {
        nextStep()
    }
    //导出物模型
    const exportFile=()=>{
        let url=Paths.exportPhysicalModel+'/11759'
        get(url, {}).then((res) => {
            // delaData(res.data)
        });
    }
    useImperativeHandle(ref, () => ({
        onFinish: subNextConFirm
    }));
    
    const ref11 = useRef()
    return <div className='Protocol-wrap' ref={ref11}>
        <div className='Protocol-label'>
            <div>独立MCU方案，需选择下载MCU开发资料包等，进行相应开发</div>
            <div className='Protocol-download' onClick={exportFile}>
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
                <a onClick={openEditCus}>导出协议</a>
                <img src={downpng} style={{ marginRight: '15px' }} />
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
        {/* <TitleEdit titleVisible={titleVisible} onCloseTitle={onCloseTitle}></TitleEdit> */}
        {destoryDom && <EditcusFn rightVisible={rightEditVisible} onCloseRight={onCloseEditRight} destData={onDestData}></EditcusFn>}

        {isModalVisible && <Addfunction closeAdd={closeAdd} CancelAdd={CancelAdd} isModalVisible={isModalVisible}></Addfunction>}
    </div>
}
export default ProtocolFn = forwardRef(ProtocolFn)

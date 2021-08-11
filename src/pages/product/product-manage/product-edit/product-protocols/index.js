import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import moment from 'moment';
import { Table, Button, Drawer, Space } from 'antd';
import './index.scss';
import EditcusFn from './editcusFn'
import Addfunction from './addModal'
import NewCusmFn from './addcusFn'
// import TitleEdit from './titleEdit'
import downpng from './../../../../../assets/images/product/download.png';
import { post, Paths, get } from '../../../../../api';
//处理数据
function delaData(data) {
    let newData = []
    data.forEach(item => {
        if (!item.funcParamList || !item.funcParamList.length) return
        item.funcParamList.forEach(item2 => {
            let newItem = JSON.parse(JSON.stringify(item))
            newData.push({ ...newItem, ...item2 })
        })
    })
    return newData
}
function ProtocolFn({ nextStep, productId }, ref) {
    //删除弹窗
    const [isDelVisible, setIsDelVisible] = useState(false)
    const [delData, setDelData] = useState({})
    //编辑右边抽屉
    const openEditCus = (data) => {
        setDestoryDom(true)
        setTimeout(() => {
            setRightEditVisible(true)
        }, 0)
    };
    //打开删除弹窗
    const openDel = (data) => {
        setDelData(data)
        setIsDelVisible(true)
    }
    const filterFn = (type, data) => {
        let result = null
        switch (type) {
            case '数值':
                result = `数值范围：${data.min}-${data.max},间距：${data.type},倍数：${data.type},单位：${data.type}`
                break;
            case '布尔':
                result = `0：${data.type},1：${data.type}`
                break;
            case '枚举':
                let value = ''
                for (let key in data.propertyMap) {
                    value += data.propertyMap[key] + ','
                }
                result = `枚举值：${value}`
                break;
            default:
                return ''
        }
        return result
    }
    const columns = [
        { title: 'DP ID', dataIndex: 'key' },
        { title: '功能类型', dataIndex: 'funcType' },
        { title: '功能点名称', dataIndex: 'funcName' },
        { title: '标识符', dataIndex: 'funcIdentifier' },
        { title: '参数名称', dataIndex: 'name' },
        { title: '参数标识', dataIndex: 'identifier' },
        {
            title: '数据传输类型', dataIndex: 'createTime',
            render: text => <span>1</span>
        },
        { title: '数据类型', dataIndex: 'dataType' },
        { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record.dataType, record)}</span> },
        {
            title: '操作', render: (text, record) => (
                <Space size="middle"><Button type="link" onClick={() => { openEditCus(record) }}>编辑</Button>
                    <Button type="link" onClick={() => { openDel(record) }}>删除</Button></Space>
            ),
        },
    ];
    const [cusData, setCusData] = useState([]);
    const [standardData, setStandardData] = useState([]);
    const [selectId, setSelectId] = useState(0);
    //获取列表
    const getList = (loading = true) => {
        post(Paths.standardFnList, { productId: '11759' }, { loading }).then((res) => {
            setStandardData(delaData(res.data.standard))
            setCusData(delaData(res.data.custom))
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
    const exportFile = () => {
        post(Paths.exportPhysicalModel, { productId: '11759' }).then((res) => {
            // delaData(res.data)
        });
    }
    useImperativeHandle(ref, () => ({
        onFinish: subNextConFirm
    }));

    //确定删除数据
    const updateOkHandle = () => {
        setIsDelVisible(false)
    }
    //取消删除数据
    const updateCancelHandle = () => {
        setIsDelVisible(false)
    }
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
                dataSource={standardData}
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
                dataSource={cusData}
            />
        </div>
        {/* 新增自定义 */}
        <NewCusmFn rightVisible={rightVisible} onCloseRight={onCloseRight}></NewCusmFn>
        {/* 编辑操作 */}
        {destoryDom && <EditcusFn rightVisible={rightEditVisible} onCloseRight={onCloseEditRight} destData={onDestData}></EditcusFn>}
        {/* 新增标准 */}
        {isModalVisible && <Addfunction closeAdd={closeAdd} CancelAdd={CancelAdd} isModalVisible={isModalVisible}></Addfunction>}
        {/* 删除操作 */}
        {
            isDelVisible && <ActionConfirmModal
                visible={isDelVisible}
                modalOKHandle={updateOkHandle}
                modalCancelHandle={updateCancelHandle}
                targetName={delData.funcName}
                title='删除'
                descGray={true}
                needWarnIcon={true}
                descText='确定删除此功能'
            ></ActionConfirmModal>
        }

    </div>
}

export default ProtocolFn = forwardRef(ProtocolFn)

import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from 'react'
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import moment from 'moment';
import { Table, Button, Space } from 'antd';
import './index.scss';
import EditcusFn from './editcusFn'
import Addfunction from './addModal'
import NewCusmFn from './addcusFn'
// import TitleEdit from './titleEdit'
import downpng from './../../../../../assets/images/product/download.png';
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import { MyContext } from '../context'
import { getRowSpanCount } from './tableCombine'
import TableCom from './TableCom';

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
    newData.map((item, index) => {
        item.key = index
    })
    return newData
}

function ProtocolFn({ nextStep, productId }, ref) {
    //展示
    const [cusData, setCusData] = useState([]);
    const [standardData, setStandardData] = useState([]);
    //获取列表
    const getList = (loading = true) => {
        post(Paths.standardFnList, { productId: '11759' }, { loading }).then((res) => {
            setStandardData(delaData(res.data.standard))
            let data2 = delaData(res.data.custom)
            setCusData(data2)
        });
    }
    useEffect(() => {
        getList()
    }, [])
    //编辑标准功能/新增自定义功能=======
    // const [isStarDia, setIsStarDia] = useState(true); //
    const [rightVisible, setRightVisible] = useState(false); //新增自定义功能


    //新增自定义功能抽屉
    const openCusmon = () => {
        setRightVisible(true);
    };
    //关闭抽屉
    const onCloseRight = () => {
        setRightVisible(false);
    };
    //关闭自定义且更新
    const onRefreshList = () => {
        setRightVisible(false);
        Notification({
            type: 'success',
            description: '新增成功！',
        });

        getList()
    }
    //新增标准功能====
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeAdd = () => {

        setIsModalVisible(false)
        Notification({
            type: 'success',
            description: '新增成功！',
        });

        getList()
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
            <TableCom dataSource={standardData} reFreshData={getList} type={'1'} />
        </div>
        <div className='Protocol-download'>
            <div>自定义功能</div>
            <div>
                <a >导出协议</a>
                <img src={downpng} style={{ marginRight: '15px' }} alt='' />
                <Button type="primary" onClick={openCusmon}>新建自定义功能</Button >
            </div>

        </div>
        <div >
            <TableCom dataSource={cusData} reFreshData={getList} type={'2'} />
        </div>
        {/* 新增自定义 */}
        {rightVisible && <NewCusmFn rightVisible={rightVisible} onCloseRight={onCloseRight} onRefreshList={onRefreshList}></NewCusmFn>}
        {/* 新增标准 */}
        {isModalVisible && <Addfunction closeAdd={closeAdd} CancelAdd={CancelAdd} isModalVisible={isModalVisible}></Addfunction>}


    </div>
}

export default ProtocolFn = forwardRef(ProtocolFn)

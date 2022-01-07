import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from 'react'
import { Button } from 'antd';
import './index.scss';
import Addfunction from './addModal'
import NewCusmFn from './addcusFn'
// import TitleEdit from './titleEdit'
import downpng from './../../../../../assets/images/product/download.png';
import { post, Paths } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import LabelTip from '../../../../../components/form-com/LabelTip';
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
    newData.forEach((item, index) => {
        item.key = index
    })
    return newData
}

function ProtocolFn2({ nextStep, productId }, ref) {
    //展示
    const [cusData, setCusData] = useState([]);
    const [standardData, setStandardData] = useState([]);
    const [allSource, setAllSource] = useState({ standard: [], custom: [] });
    const [productItem, setProductItem] = useState(sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
    //新增标准功能====
    const [isModalVisible, setIsModalVisible] = useState(false);
    //获取列表
    const getList = () => {
        let params = {
            deviceTypeId: productItem.deviceTypeId,
            productId: productItem.productId,
            eq: true,
        }
        let arr = [post(Paths.standardFnList, { productId }), post(Paths.PhysicalModelList, params, { loading: true })]
        Promise.all(arr).then(res => {
            let data1 = delaData(res[0].data.standard) //标准
            let data2 = delaData(res[0].data.custom) //自定义
            let data3 = delaData(res[1].data) //未添加的标准
            setStandardData(data1)
            setCusData(data2)
            setAllSource({
                standard: data1.concat(data3),
                custom: data2
            })
            if (!data1.length) {
                setIsModalVisible(true)
            }

        })

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
        let url = Paths.downPhysicalModel + '?productId=' + productId
        window.open(url)
    }

    const ref11 = useRef()
    useImperativeHandle(ref, () => ({
        onFinish: subNextConFirm
    }));
    //====
    const wayText = () => {
        if (productItem.schemeName === '独立MCU方案') {
            return '独立MCU方案，需选择下载MCU开发资料包等，进行相应开发'
        } else if (productItem.schemeName === 'SoC方案') {
            return 'SoC方案，不提供通用固件程序，需自行开发模组固件'
        } else if (productItem.schemeName === '免开发方案') {
            return '免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化'
        }
        return productItem.schemeName
    }
    //导入
    const customRequest = (option) => {
        post(Paths.exportFnFile, { productId, file: option.file }, { needFormData: true }, { timeout: 1000 * 30 }).then(res => {
            Notification({
                type: 'success',
                description: '导入成功！',
            });
            getList()
        })
    }
    return <div className='Protocol-wrap' ref={ref11}>
        <div className='Protocol-label'>
            <div>{wayText()}</div>
            <div className='Protocol-download' onClick={exportFile}>
                <a>导出物模型</a>
                <img src={downpng} alt='' />
            </div>
        </div>
        <div className='Protocol-download'>
            <div>标准功能<LabelTip tip="支持用户编辑修改功能点名称以及数值范围，但是不能修改功能点的数据标识、数据类型，数据传输类型。"></LabelTip></div>
            <Button type="primary" onClick={openAdd}>新建标准功能</Button >
        </div>
        <div className='Protocol-table'>
            <TableCom dataSource={standardData} standardData={allSource} reFreshData={getList} type={'1'} />
        </div>
        <div className='Protocol-download'>
            <div>自定义功能<LabelTip tip="支持在标准功能的基础上，自定义适合客户自己硬件特色的定制功能点。"></LabelTip></div>
            <div style={{ display: 'flex' }}>
                {/* <Upload customRequest={customRequest} showUploadList={false}>
                    <Button type='text' style={{ color: '#166AFF' }} icon={<UploadOutlined />}>导入自定义功能</Button>
                </Upload> */}
                <Button type="primary" onClick={openCusmon}>新建自定义功能</Button >
            </div>

        </div>
        <div >
            <TableCom dataSource={cusData} reFreshData={getList} type={'2'} standardData={allSource} />
        </div>
        {/* 新增自定义 */}
        {rightVisible && <NewCusmFn standardData={allSource} rightVisible={rightVisible} onCloseRight={onCloseRight} onRefreshList={onRefreshList}></NewCusmFn>}
        {/* 新增标准 */}
        {isModalVisible && <Addfunction closeAdd={closeAdd} CancelAdd={CancelAdd} isModalVisible={isModalVisible}></Addfunction>}
    </div>
}

export default forwardRef(ProtocolFn2)

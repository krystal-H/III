import React, { useRef, useState,useEffect } from 'react';
import { Input, Button, Select, Table } from 'antd';
import { post, Paths, get } from '../../../../../api';
import LabelTip from '../../../../../components/form-com/LabelTip';
import {
    ToTopOutlined
} from '@ant-design/icons'
import './index.scss'
import TableCom from './TableCom'
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
export default function ChangeModal() {
    const  productId= JSON.parse(sessionStorage.getItem('productItem')).productId
    //展示
    const [cusData, setCusData] = useState([]);
    const [standardData, setStandardData] = useState([]);
    const [productItem, setProductItem] = useState(sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
    //导出物模型
    const exportFile = () => {
        let url = Paths.downPhysicalModel + '?productId=' + productId
        window.open(url)
    }
    //获取列表
    const getList = (loading = true) => {
        post(Paths.standardFnList, { productId }, { loading }).then((res) => {
            setStandardData(delaData(res.data.standard))
            let data2 = delaData(res.data.custom)
            setCusData(data2)
        });
    }
    useEffect(() => {
        getList()
    }, [])
    return (<div id='product-detail-fun-defin'>
        <div>
            <Button style={{ padding: 0 }} type="link" icon={<ToTopOutlined />} onClick={exportFile}>导出物模型（json）</Button>
        </div>
        <div className='table-item'>
            <h3>标准功能<LabelTip tip="支持用户编辑修改功能点名称以及数值范围，但是不能修改功能点的数据标识、数据类型，数据传输类型。"></LabelTip></h3>
            <div>
                <TableCom dataSource={standardData} type={'1'} bindTypeStr={productItem.bindTypeStr} />
            </div>
        </div>
        <div className='table-item'>
            <h3>自定义功能<LabelTip tip="支持在标准功能的基础上，自定义适合客户自己硬件特色的定制功能点。"></LabelTip></h3>
            <div>
                <TableCom dataSource={cusData} type={'2'} bindTypeStr={productItem.bindTypeStr} />
            </div>
        </div>
    </div>)

}
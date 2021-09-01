import React, { useRef, useState,useEffect } from 'react';
import { Input, Button, Select, Table } from 'antd';
import { post, Paths, get } from '../../../../../api';
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
    //导出物模型
    const exportFile = () => {
        get(Paths.downPhysicalModel, { productId: productId }).then((res) => {
            // delaData(res.data)
        });
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
            <Button style={{ padding: 0 }} type="link" icon={<ToTopOutlined />} onClick={exportFile}>导出完整协议</Button>
        </div>
        <div className='table-item'>
            <h3>标准功能</h3>
            <div>
                <TableCom dataSource={standardData} type={'1'} />
            </div>
        </div>
        <div className='table-item'>
            <h3>自定义功能</h3>
            <div>
                <TableCom dataSource={cusData} type={'2'} />
            </div>
        </div>
    </div>)

}
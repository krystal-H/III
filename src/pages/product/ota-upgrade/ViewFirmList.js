import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table } from 'antd';
import { post, Paths } from '../../../api';
import './FirmwareManagement.scss';
const columns = [
    { title: '产品名称', dataIndex: 'productName'},
    { title: '模块/插件', dataIndex: 'deviceVersionName'},
    { title: '模块/插件编号', dataIndex: 'firmwareVersionType'},
    { title: '当前软件版本号', dataIndex: 'extVersion'},
];

export default ({
    productFirmwareId, 
     schemeType,
     openClose
}) => {
    const [list, setList] = useState([])
    const [loding, setLoading] = useState(true)

    useEffect(() => {
        if(productFirmwareId){
            setLoading(true)
            post(Paths.otaDevVersionList,{productFirmwareId,schemeType}).then(({data=[]}) => {
                setList(data)
            }).finally(
                ()=>setLoading(false)
            );
        }
    }, [productFirmwareId])


    return (
    
        <Modal
            title="查看固件"
            visible={!!productFirmwareId}
            width={700}
            onOk={()=>{openClose()}}
            onCancel={()=>{openClose()}}
            // maskClosable={false}
            footer={null}
            afterClose={()=>setList([])}
        >

            <Table 
                className="viewFirmList-modal"
                rowKey="deviceVersionId"
                columns={columns}
                dataSource={list}
                loading={loding}
                pagination={false}
                scroll={{ y: 500 }}
            />

        </Modal>
        )

}


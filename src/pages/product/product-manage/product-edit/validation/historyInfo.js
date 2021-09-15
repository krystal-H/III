import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table } from 'antd';
import { DateTool } from '../../../../../util/util';

export default ({ historyVisiable, openHistory }) => {


    const columns = [
        { title: 'Clife账号', dataIndex: 'deviceUniqueId', key: 'deviceUniqueId'},
        { title: '调试设备物理地址', dataIndex: 'productName',  key: 'productName'},
        
        { title: '配合调试时间', dataIndex: 'lastOnlineTime', key: 'lastOnlineTime', 
            render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
        },
        { title: '操作', dataIndex: 'a',  key: 'a', 
            render: record =>  <a onClick={() => { startDebug(record) }}>调试</a>
        },
    ];

    const startDebug = ()=>{

    }

    useEffect(() => {
        if(historyVisiable){
            
            
        } 
    }, [historyVisiable])


    return (
    
        <Modal
            title="历史调试信息"
            visible={historyVisiable}
            width={600}
            onOk={()=>{openHistory(false)}}
            onCancel={()=>{openHistory(false)}}
            maskClosable={false}
            className="groupadd-device-modal"
        >

            <Table 
                rowKey="deviceId"
                columns={columns} 
                dataSource={[]}
                // loading={!!listLoading}
                // pagination={{
                //     defaultCurrent:pager.pageIndex, 
                //     total:pager.totalRows, 
                //     onChange:val=>{this.setQuestParams('pageIndex',val)},
                //     current: pager.pageIndex
                // }} 
            />



        </Modal>
        )

}


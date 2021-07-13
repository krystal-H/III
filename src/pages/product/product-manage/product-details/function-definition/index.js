import React, { useRef ,useState} from 'react';
import { Input, Button, Select, Table } from 'antd';
import './index.scss'
export default function ChangeModal() {
    const columns = [
        {
            title: 'DP ID',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '功能名称',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '标识符',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '数据传输类型',
            dataIndex: 'address',
            key: 'action'
        },
        {
            title: '数据长度',
            dataIndex: 'address',
            key: 'action'
        },
        {
            title: '数据类型',
            dataIndex: 'address',
            key: 'action'
        },
        {
            title: '数据属性',
            dataIndex: 'address',
            key: 'action'
        },
    ];
    const [tableData,setTableData]=useState([])
    return (<div>
        <div className='fun-defin-table-item'>
            <h3>标准功能</h3>
            <div>
                <Table columns={columns} dataSource={tableData} />
            </div>
        </div>
    </div>)

}
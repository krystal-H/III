import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from 'react'
import moment from 'moment';
import { Table, Button, Space } from 'antd';
import './index.scss';
// import TitleEdit from './titleEdit'
import { getRowSpanCount } from '../../../../../configs/tableCombine'


export default function TableCom({ dataSource, reFreshData, type, bindTypeStr }) {
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows === pager.pageRows) {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1, pageRows })
            })
        }

    }
    //展示
    const filterFn = (data) => {
        let result = null
        let type = data.dataTypeEN
        switch (type) {
            case 'float':
            case 'int':
                result = `数值范围：${data.propertyMap.min}-${data.propertyMap.max},间距：${data.propertyMap.interval},倍数：${data.propertyMap.multiple},单位：${data.propertyMap.unit}`
                break;
            case 'bool':

                result = `0：${data.propertyMap[0]},1：${data.propertyMap[1]}`
                break;
            case 'enum':
                let value = ''
                for (let key in data.propertyMap) {
                    value += key+'：' + data.propertyMap[key] + ', '
                }
                result = `枚举值：${value}`
                break;
            default:
                return ''
        }

        return result
    }
    //获取数据
    const getComData = () => {
        let index = (pager.pageIndex - 1) * pager.pageRows
        let data = dataSource.slice(index, index + 10)
        return data
    }
    const columns = [

        {
            title: '功能类型', dataIndex: 'funcTypeCN',
            render: (value, row, index) => {
                return getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    value,
                    "funcTypeCN"
                );
            },
        },
        {
            title: '功能点名称', dataIndex: 'funcName',
            render: (value, row, index) => {
                return getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    value,
                    "funcName"
                );
            },
        },
        {
            title: '标识符', dataIndex: 'funcIdentifier',
            render: (value, row, index) => {
                return getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    value,
                    "funcIdentifier"
                );
            },
        },
        {
            title: 'DP ID', dataIndex: 'dataPointId',
        },
        { title: '参数名称', dataIndex: 'name' },
        { title: '参数标识', dataIndex: 'identifier' },
        {
            title: '数据传输类型', dataIndex: 'accessMode',
            render: (text, record) => {
                if (text == 'rw') {
                    return '可下发可上报'
                }
                if (text == 'w') {
                    return '可下发'
                }
                if (text == 'r') {
                    return '可上报'
                }
                return ''
            }
        },
        {
            title: '数据类型', dataIndex: 'dataType', render: (text, record) => (
                <span>{record.dataTypCN}</span>
            )
        },
        { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> },
        { title: 'zigbee描述', dataIndex: 'desc', key:'desc', width: '120px',},
    ];

    return <div>
        <Table
            rowKey="key"
            // columns={columns}
            columns={bindTypeStr.indexOf('Zigbee') !== -1 ? columns : columns.filter(item => item.dataIndex != 'desc')}
            dataSource={dataSource}
            pagination={{
                defaultCurrent: 1,
                current: pager.pageIndex,
                onChange: pagerChange,
                pageSize: pager.pageRows,
                total: pager.totalRows,
                showQuickJumper: true,
                pageSizeOptions: [10],
                showTotal: () => <span>共 <a>{dataSource.length}</a> 条</span>
            }}
        />

    </div>
}

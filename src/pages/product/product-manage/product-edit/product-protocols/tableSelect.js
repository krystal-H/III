import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from 'react'
import { Table, Button, Space, Checkbox } from 'antd';
import { getRowSpanCount } from './tableCombine'


export default function TableCom({ dataSource }) {
    const [selectData, setSelectData] = useState([])
    //展示
    const filterFn = (data) => {
        let result = null
        let type = data.dataTypeEN
        switch (type) {
            case 'double':
                result = `数值范围：${data.propertyMap.min}-${data.propertyMap.max},间距：${data.propertyMap.interval},倍数：${data.propertyMap.multiple},单位：${data.propertyMap.unit}`
                break;
            case 'bool':

                result = `0：${data.propertyMap[0]},1：${data.propertyMap[1]}`
                break;
            case 'enum':
                let value = ''
                for (let key in data.propertyMap) {
                    value += data.propertyMap[key] + '，'
                }
                result = `枚举值：${value}`
                break;
            default:
                return ''
        }

        return result
    }
    const onChange = (e, data) => {
        let isTrue = e.target.checked
        setSelectData(pre => {
            let obj = {
                id: data.id,
                funcType: data.funcType,
                identifier: data.funcIdentifier,
                productId: 11759
            }
            let arr = JSON.parse(JSON.stringify(pre))
            if (isTrue) {
                arr.push(obj)
            } else {
                arr = arr.filter(item => {
                    if (item.id !== data.id) {
                        return item
                    }
                })
            }

            return arr
        })
        console.log(data, e)
    }
    const columns = [
        {
            title: '勾选',
            render: (value, row, index) => {
                let obj = getRowSpanCount(
                    dataSource,
                    "funcIdentifier",
                    index,
                    row.funcIdentifier,
                    "funcIdentifier"
                );
                obj.children = <Checkbox onChange={(e) => { onChange(e, row) }}></Checkbox>
                return obj
            },
        },
        {
            title: '功能类型', dataIndex: 'funcTypeCN',
            render: (value, row, index) => {
                return getRowSpanCount(
                    dataSource,
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
                    dataSource,
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
                    dataSource,
                    "funcIdentifier",
                    index,
                    value,
                    "funcIdentifier"
                );
            },
        },
        { title: '参数名称', dataIndex: 'name' },
        { title: '参数标识', dataIndex: 'identifier' },
        {
            title: '数据传输类型', dataIndex: 'dataTransferType',
        },
        {
            title: '数据类型', dataIndex: 'dataType', render: (text, record) => (
                <span>{record.dataTypCN}</span>
            )
        },
        { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> },
    ];
    return <div>
        <Table
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 440 }}
        />

    </div>
}

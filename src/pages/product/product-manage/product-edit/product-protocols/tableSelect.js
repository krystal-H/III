import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext, useMemo } from 'react'
import { useHistory } from "react-router-dom"
import { Table, Button, Space, Checkbox } from 'antd';
import { getRowSpanCount } from '../../../../../configs/tableCombine'
import { cloneDeep } from 'lodash'

export default function TableCom({ dataSource, refreshCount }) {
    const [selectData, setSelectData] = useState([])
    const [tableData, setTableData] = useState(cloneDeep(dataSource))
    const [indeterminate, setIndeterminate] = useState(false);
    const [isAll, setIsAll] = useState(false)
    const [dataLen, setDataLen] = useState(0)
    useEffect(() => {
        setTableData(cloneDeep(dataSource))
        let arr = []
        dataSource.forEach(item => {
            if (!arr.includes(item.funcIdentifier)) {
                arr.push(item.funcIdentifier)
                setDataLen(arr.length)
            }
        })
        setSelectData([])
        setIndeterminate(false)
        setIsAll(false)
    }, [JSON.stringify(dataSource)])
    //展示
    const filterFn = (data) => {
        let result = null
        let type = data.dataTypeEN
        switch (type) {
            case 'int':
            case 'float':
                result = `数值范围：${data.propertyMap.min}-${data.propertyMap.max},间距：${data.propertyMap.interval},倍数：${data.propertyMap.multiple},单位：${data.propertyMap.unit}`
                break;
            case 'bool':

                result = `0：${data.propertyMap[0]},1：${data.propertyMap[1]}`
                break;
            case 'enum':
                let value = ''
                for (let key in data.propertyMap) {
                    value += key + '：' + data.propertyMap[key] + ', '
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
        const productId = JSON.parse(sessionStorage.getItem('productItem')).productId
        setSelectData(pre => {
            let obj = {
                id: data.id,
                funcType: data.funcType,
                identifier: data.funcIdentifier,
                productId
            }
            let arr = JSON.parse(JSON.stringify(pre))
            if (isTrue) {
                arr.push(obj)
            } else {
                arr = arr.filter(item => {
                    if (item.identifier !== data.funcIdentifier) {
                        return item
                    }
                })
            }
            setIndeterminate(!!arr.length && arr.length < dataLen);
            setIsAll(arr.length === dataLen);
            return arr
        })
        setTableData(pre => {
            let arr = cloneDeep(pre)
            let index = arr.findIndex(item => {
                if (item.funcIdentifier === data.funcIdentifier) {
                    return item
                }
            })
            arr[index].checked = isTrue
            return arr
        })
    }
    useEffect(() => {
        refreshCount(selectData)
    }, [selectData.length])
    const onAllChange = (e) => {
        let isTrue = e.target.checked
        const productId = JSON.parse(sessionStorage.getItem('productItem')).productId
        setTableData(pre => {
            let arr = cloneDeep(pre)
            arr.forEach(item => {
                item.checked = isTrue
            })
            return arr
        })
        setIsAll(isTrue)
        setIndeterminate(false);
        
        if(isTrue){
            let ids=[]
            let selArr=[]
            dataSource.forEach(item=>{
                if(!ids.includes(item.funcIdentifier)){
                    let obj = {
                        id: item.id,
                        funcType: item.funcType,
                        identifier: item.funcIdentifier,
                        productId
                    }
                    selArr.push(obj)
                    ids.push(item.funcIdentifier)
                }
            })
            setSelectData(selArr)
        }else{
            setSelectData([])
        }
    }
    const columns = [
        {
            width: '80px',
            title: () => {
                return <Checkbox onChange={(e) => { onAllChange(e) }} checked={isAll} indeterminate={indeterminate}></Checkbox>
            },
            render: (value, row, index) => {
                let obj = getRowSpanCount(
                    dataSource,
                    "funcIdentifier",
                    index,
                    row.funcIdentifier,
                    "funcIdentifier"
                );
                obj.children = <Checkbox onChange={(e) => { onChange(e, row) }} checked={row.checked}></Checkbox>
                return obj
            },
        },
        {
            title: '功能类型', dataIndex: 'funcTypeCN', width: '140px',
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
            title: '功能点名称', dataIndex: 'funcName', width: '140px',
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
            title: '标识符', dataIndex: 'funcIdentifier', width: '140px',
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
        { title: '参数名称', dataIndex: 'name', width: '140px' },
        { title: '参数标识', dataIndex: 'identifier', width: '140px' },
        {
            title: '数据传输类型', dataIndex: 'accessMode', width: '140px',
            render: (text, record) => {
                if (text === 'rw') {
                    return '可下发可上报'
                }
                if (text === 'w') {
                    return '可下发'
                }
                if (text === 'r') {
                    return '可上报'
                }
                return ''
            }
        },
        {
            title: '数据类型', width: '100px', dataIndex: 'dataType', render: (text, record) => (
                <span>{record.dataTypCN}</span>
            )
        },
        { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> },
    ];
    return <div>
        <Table
            rowKey="key"
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ y: 440 }}
        />
    </div>
}

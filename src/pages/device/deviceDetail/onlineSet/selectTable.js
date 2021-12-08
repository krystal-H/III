import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Table, Input, Checkbox, Select, InputNumber } from 'antd';
import { getRowSpanCount } from '../../../../configs/tableCombine'
import { Notification } from '../../../../components/Notification'
import { cloneDeep } from 'lodash'
import './selectTable.scss'
const { Option } = Select

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
                value += key + '：' + data.propertyMap[key] + ', '
            }
            result = `枚举值：${value}`
            break;
        default:
            return ''
    }

    return result
}
function TableCom({ dataSource, finishSub, actionType }, ref) {
    const [selectData, setSelectData] = useState([])
    const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据
    useEffect(() => {
        setInitialProtoclList(cloneDeep(dataSource))
        let arrId = []
        dataSource.forEach(item => {
            if (item.isCheck) {
                if (arrId.indexOf(item.funcIdentifier) === -1) {
                    arrId.push(item.funcIdentifier)
                }
                return item
            }
        })
        setSelectData(arrId)
    }, [dataSource.length])
    //勾选
    const onselectChange = (e, data, index) => {
        let isTrue = e.target.checked
        const copyList = cloneDeep(initialProtoclList)
        copyList[index].isCheck = isTrue
        setInitialProtoclList(copyList)
        setSelectData(pre => {
            let arr = cloneDeep(pre)
            if (isTrue) {
                arr.push(data.funcIdentifier)
            } else {
                arr = arr.filter(item => {
                    if (item !== data.funcIdentifier) {
                        return item
                    }
                })
            }
            console.log(arr, '勾选')
            return arr
        })
    }
    // 输入参数
    const changeSendData = (value, index) => {
        const copyList = cloneDeep(initialProtoclList)
        copyList[index].sendData = value
        setInitialProtoclList(copyList)
    }
    const columns = [
        {
            title: '勾选',
            width: '50px',
            dataIndex: 'isCheck',
            fixed: 'left',
            render: (value, row, index) => {
                let obj = getRowSpanCount(
                    dataSource,
                    "funcIdentifier",
                    index,
                    row.funcIdentifier,
                    "funcIdentifier"
                );
                obj.children = <Checkbox checked={value} onChange={(e) => { onselectChange(e, row, index) }}
                    disabled={actionType === 'detail' ? true : false}></Checkbox>
                return obj
            },
        },
        {
            title: '功能类型', dataIndex: 'funcTypeCN',
            width: '90px',
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
            title: '标识符', dataIndex: 'funcIdentifier',
            width: '140px',
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
        // {
        //     title: '数据传输类型', dataIndex: 'accessMode',
        //     render: (text, record) => {
        //         if (text === 'rw') {
        //             return '可下发可上报'
        //         }
        //         if (text === 'w') {
        //             return '可下发'
        //         }
        //         if (text === 'r') {
        //             return '可上报'
        //         }
        //         return ''
        //     }
        // },
        {
            title: '数据类型', width: '100px', dataIndex: 'dataType', render: (text, record) => (
                <span>{record.dataTypCN}</span>
            )
        },
        { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> },
        {
            title: '下发数据',
            dataIndex: 'sendData',
            key: 'sendData',
            // fixed: 'right',
            render: (text, record, index) => {
                let type = record.dataTypeEN, specs = record.propertyMap, _dom = null
                if (actionType === 'detail') {
                    if (type === 'bool' || type === 'enum') {
                        return specs[text]
                    } else {
                        return text
                    }
                }
                switch (type) {
                    case 'int':
                    case 'double':
                    case 'float':
                        _dom = (<InputNumber value={record.sendData}
                            min={specs.min}
                            max={specs.max}
                            onChange={value => changeSendData(value, index)}
                            placeholder="请输入参数"></InputNumber>)
                        break
                    case 'text':
                        _dom = (
                            <Input value={record.sendData} allowClear
                                maxLength={30}
                                onChange={value => changeSendData(value, index)}
                                placeholder="请输入参数"></Input>
                        )
                        break
                    case 'enum':
                    case 'bool':
                        _dom = (
                            <Select
                                onChange={value => changeSendData(value, index)}
                                allowClear
                                value={record.sendData}>
                                {
                                    Object.keys(specs) && Object.keys(specs).map((item, index) => (
                                        <Option key={index + item} value={Number(item)}>{specs[item]}</Option>
                                    ))
                                }
                            </Select>
                        )
                        break
                    default:
                        break;
                }
                return <span>
                    {_dom}
                </span>
            },
        }
    ];
    const subOrder = () => {
        let arrId = []
        let data = initialProtoclList.filter(item => {
            let isNull = true
            if (!item.sendData && item.sendData !== 0) {
                isNull = false
            }
            if (item !== 0)
                if (selectData.indexOf(item.funcIdentifier) > -1 && isNull) {
                    if (arrId.indexOf(item.funcIdentifier) === -1) {
                        arrId.push(item.funcIdentifier)
                    }
                    return item
                }
        })
        if (!arrId.length) {
            Notification({ description: '请为配置协议添加参数' })
            return
        }
        if (arrId.length !== selectData.length) {
            Notification({ description: '部分勾选数据未配置' })
            return
        }
        data = data.map(item => {
            return {
                identifier: item.funcType === "properties" ? item.funcIdentifier : item.identifier,
                sendData: item.sendData,
                funcIdentifier: item.funcIdentifier
            }
        })
        finishSub(data)
    }
    useImperativeHandle(ref, () => ({
        subOrder: () => { subOrder() }
    }), [selectData, initialProtoclList]);
    return <div>
        <Table
            rowKey="key"
            columns={columns}
            className="config-data-table"
            dataSource={initialProtoclList}
            locale={{ emptyText: '暂无协议，请先去配置' }}
            pagination={false}
            scroll={{ y: 440, x: 1000 }}
        />

    </div>
}
export default forwardRef(TableCom)

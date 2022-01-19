import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Table, Input } from 'antd';
import { getRowSpanCount } from '../../../../../configs/tableCombine'
import { Notification } from '../../../../../components/Notification'
import { cloneDeep } from 'lodash'
import './selectTable.scss'

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

function TableCom({ dataSource, finishSub, actionType = '' }, ref) {
    const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据

    useEffect(() => {
        setInitialProtoclList(cloneDeep(dataSource))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource.length])

    // 输入参数
    const changeSendData = (e, index) => {
        const copyList = cloneDeep(initialProtoclList)
        copyList[index].desc = e.target.value
        setInitialProtoclList(copyList)
    }

    const columns = [
        {
            title: '功能类型', dataIndex: 'funcTypeCN',
            width: '4%',
            render: (value, row, index) => {
                return getRowSpanCount(
                    dataSource,
                    "funcIdentifier",
                    index,
                    value,
                    "funcTypeCN"
                )
            }
        },
        {
            title: '功能点名称',
            width: '10%',
            dataIndex: 'funcName',
            render: (value, row, index) => {
                return getRowSpanCount(
                    dataSource,
                    "funcIdentifier",
                    index,
                    value,
                    "funcName"
                )
            }
        },
        {
            title: '标识符',
            dataIndex: 'funcIdentifier',
            width: '10%',
            render: (value, row, index) => {
                return getRowSpanCount(
                    dataSource,
                    "funcIdentifier",
                    index,
                    value,
                    "funcIdentifier"
                )
            }
        },
        { title: 'DP ID', dataIndex: 'dataPointId', width: 60 },
        { title: '参数名称', dataIndex: 'name' },
        { title: '参数标识', dataIndex: 'identifier' },
        {
            title: '数据传输类型',
            dataIndex: 'accessMode',
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
            title: '数据类型',
            dataIndex: 'dataType',
            key: 'dataType',
            render: (text, record) => (<span>{record.dataTypCN}</span>)
        },
        {
            title: '数据属性',
            dataIndex: 'propertyMap',
            width: '15%',
            render: (text, record) => <span>{filterFn(record)}</span>
        },
        {
            title: 'ZigBee描述',
            dataIndex: 'desc',
            key: 'desc',
            fixed: 'right',
            width: 182,
            render: (text, record, index) => {
                return actionType === 'detail' ?
                    <span>{record.desc}</span> :
                    <Input allowClear maxLength={50}
                        defaultValue={record.desc}
                        placeholder="请输入描述"
                        onChange={value => changeSendData(value, index)} ></Input>
            }
        }
    ]
    // 提交验证
    const subOrder = () => {
        if (!initialProtoclList.every(item => item.desc)) {
            return Notification({ description: '请为配置协议添加参数' })
        }

        const data = initialProtoclList.map(item => {
            return {
                funcType: item.funcType,
                identifier: item.funcIdentifier,
                desc: item.desc
            }
        })

        finishSub(data)
    }

    useImperativeHandle(ref, () => ({
        subOrder: () => { subOrder() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [initialProtoclList])

    return <div>
        <Table
            rowKey="key"
            columns={columns}
            className="config-data-table2"
            dataSource={initialProtoclList}
            locale={{ emptyText: '暂无协议，请先去配置' }}
            pagination={false}
            scroll={{ y: 440, x: 1000 }}
        />
    </div>
}
export default forwardRef(TableCom)

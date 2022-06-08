import React, { useState, useEffect } from 'react'
import { Modal, Table, Divider, message } from 'antd'
import { post, Paths, get } from '../../../../../api';
import { cloneDeep } from "lodash";
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
//处理数据
function delaData(data) {
    let newData = []
    let selectArr = []
    data.forEach(item => {
        if (!item.funcParamList || !item.funcParamList.length) return
        if (item.cardFunc) {
            selectArr.push(item.dataPointId)
        }
        item.funcParamList.forEach(item2 => {
            let newItem = cloneDeep(item)

            newData.push({ ...newItem, ...item2 })
        })
    })
    newData.forEach((item, index) => {
        item.key = index
    })
    return { newData, selectArr }
}
const columns = [
    {
        title: 'DP ID', dataIndex: 'dataPointId',
    },
    {
        title: '功能类型', dataIndex: 'funcTypeCN',
    },
    {
        title: '功能点名称', dataIndex: 'funcName',
    },
    {
        title: '标识符', dataIndex: 'funcIdentifier',
    },

    // { title: '参数名称', dataIndex: 'name' },
    // { title: '参数标识', dataIndex: 'identifier' },
    {
        title: '数据传输类型', dataIndex: 'accessMode',
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
        title: '数据类型', dataIndex: 'dataType', render: (text, record) => (
            <span>{record.dataTypCN}</span>
        )
    },
    { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> },
    {
        title: '是否标准数据', dataIndex: 'standard', render: (text, record) => (
            <span>{text ? '是' : '否'}</span>
        )
    },
];
function ConfigFirmwareDetail({ confirmHandle, cancelHandle, visible, productId }) {
    const [standardData, setStandardData] = useState([]);
    const [selectNormal, setSelectNormal] = useState([]);
    const rowSelection1 = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectNormal(selectedRowKeys)
        },
        selectedRowKeys: selectNormal
    };
    const subData = () => {
        let arr = [...selectNormal]
        let params = []
        let numCount = 0, boolCount = 0
        // if (!arr.length) {
        //     cancelHandle()
        //     return
        // }
        standardData.forEach(item => {
            let obj = {
                productId,
                identifier: item.funcIdentifier,
                funcType: 'properties',
                cardFunc: false
            }
            if (selectNormal.includes(item.dataPointId)) {
                if (item.dataTypCN === "数值") {
                    numCount++
                }
                if (item.dataTypCN === "布尔") {
                    boolCount++
                }
                obj.cardFunc = true
            }
            params.push(obj)
        })
        if (arr.length > 4 || boolCount > 2 || numCount > 2) {
            message.info('最多只能勾选4个属性，且布尔类型和数值类型个数不能大于2')
            return
        }
        post(Paths.setCardFun, params).then((res) => {
            message.success('设置成功')
            cancelHandle()
        });

    }
    useEffect(() => {
        post(Paths.cardFunList, { productId }).then((res) => {
            setStandardData(delaData(res.data).newData)
            setSelectNormal(delaData(res.data).selectArr)
        });
    }, [])
    return (
        <Modal
            title="配置快捷功能卡片"
            visible={visible}
            width={1400}
            onOk={subData}
            onCancel={cancelHandle}
            maskClosable={false}
            wrapClassName="replace-module-modal">
            <div className="configfirmware-detail-modal">
                <Table rowKey="dataPointId"
                    columns={columns}
                    dataSource={standardData}
                    rowSelection={rowSelection1}
                    pagination={false}
                    size="small" />
            </div>
        </Modal>
    )
}
export default ConfigFirmwareDetail

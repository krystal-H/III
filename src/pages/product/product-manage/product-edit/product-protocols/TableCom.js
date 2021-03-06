import React, { useEffect, useState, useMemo } from 'react'
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import { Table, Button, Space } from 'antd';
import './index.scss';
import EditcusFn from './editcusFn'
import { post, Paths } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import { getRowSpanCount } from '../../../../../configs/tableCombine'

export default function TableCom({ dataSource, reFreshData, type, standardData, bindTypeStr }) {
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
    //id集合
    const IdArr = useMemo(() => {
        let arr = []
        dataSource.forEach(item => {
            if (arr.indexOf(item.funcIdentifier) < 0) {
                arr.push(item.funcIdentifier)
            }
        })
        return arr
    }, [dataSource])

    //删除弹窗
    const [isDelVisible, setIsDelVisible] = useState(false)
    const [actionData, setActionData] = useState({})
    //编辑右边抽屉
    const [rightEditVisible, setRightEditVisible] = useState(false);
    const openEditCus = (data) => {
        setActionData(data)
        setRightEditVisible(true)
    };
    //打开删除弹窗
    const openDel = (data) => {
        setActionData(data)
        setIsDelVisible(true)
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
                    value += key + '：' + data.propertyMap[key] + ', '
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
            width: '100px',
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
            title: '功能点名称', dataIndex: 'funcName', width: '130px',
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
            title: '标识符', dataIndex: 'funcIdentifier', width: '160px',
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
            title: 'DP ID', dataIndex: 'dataPointId', width: '100px',
        },
        {
            title: '参数名称', dataIndex: 'name', width: '140px',
            render: (text, record) => {
                return text
            }
        },
        { title: '参数标识', dataIndex: 'identifier', width: '160px' },
        {
            title: '数据传输类型', dataIndex: 'accessMode', width: '240px',
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
            title: '数据类型', dataIndex: 'dataType', width: '140px', render: (text, record) => (
                <span>{record.dataTypCN}</span>
            )
        },
        { title: '数据属性', dataIndex: 'propertyMap', width: '340px', render: (text, record) => <span>{filterFn(record)}</span> },
        { title: 'zigbee描述', dataIndex: 'desc', key:'desc', width: '120px',},
        {
            title: '操作',
            render: (value, row, index) => {
                let obj = getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    row.funcIdentifier,
                    "funcIdentifier"
                );
                obj.children = <Space size="middle"><Button type="link" onClick={() => { openEditCus(row) }}>编辑</Button>
                    <Button type="link" onClick={() => { openDel(row) }}>删除</Button></Space>
                return obj
            },
        },
    ];

    //编辑标准功能
    // const [isStarDia, setIsStarDia] = useState(true); //
    //关闭抽屉
    const onCloseRight = () => {
        setRightEditVisible(false)
    };
    //关闭自定义且更新
    const onRefreshList = () => {
        setRightEditVisible(false)
        Notification({
            type: 'success',
            description: '编辑成功！',
        });
        reFreshData()
    }

    //确定删除数据
    const updateOkHandle = () => {
        let content = JSON.stringify({
            identifier: actionData.funcIdentifier
        })
        let productId = JSON.parse(sessionStorage.getItem('productItem')).productId
        let params = {
            productId,
            type: 'delete',
            content,
            funcType: actionData.funcType
        }
        post(Paths.PhysicalModelAction, params,{loading:true}).then((res) => {
            Notification({
                type: 'success',
                description: '删除成功！',
            });
            setIsDelVisible(false)
            reFreshData()
        });

    }
    //取消删除数据
    const updateCancelHandle = () => {
        setIsDelVisible(false)
    }
    return <div>
        <Table
            rowKey="key"
            columns={bindTypeStr.indexOf('Zigbee') !== -1 ? columns : columns.filter(item => item.dataIndex != 'desc')}
            dataSource={dataSource}
            locale={{
                emptyText: type === '1' ? '暂无标准功能' : '暂无自定义功能'
            }}
            pagination={{
                defaultCurrent: 1,
                current: pager.pageIndex,
                onChange: pagerChange,
                pageSize: pager.pageRows,
                total: pager.totalRows,
                showQuickJumper: false,
                pageSizeOptions: [10],
                showTotal: () => <span>共 <a>{IdArr.length}</a> 条</span>
            }}
        />
        {/* 编辑操作 */}

        {rightEditVisible && <EditcusFn
            rightVisible={rightEditVisible}
            onCloseRight={onCloseRight}
            onRefreshList={onRefreshList}
            standardData={standardData}
            actionData={actionData}
            modelType={type}></EditcusFn>}
        {/* 删除操作 */}
        {
            isDelVisible && <ActionConfirmModal
                visible={isDelVisible}
                modalOKHandle={updateOkHandle}
                modalCancelHandle={updateCancelHandle}
                targetName={actionData.funcName}
                title='删除'
                descGray={true}
                needWarnIcon={true}
                descText='确定删除此功能'
            ></ActionConfirmModal>
        }

    </div>
}

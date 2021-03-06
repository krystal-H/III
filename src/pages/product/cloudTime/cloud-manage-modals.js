import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, Select, Tooltip, Button } from 'antd'
import { DeleteOutlined, QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Notification } from '../../../components/Notification'
import { cloneDeep, difference } from 'lodash'
import { Paths, post } from '../../../api'
import './cloud-manage-modals.scss'

const { Option } = Select

export function CloudAddForm({ visible, onCancel, type, editData, handleOk, allProductList }) {
    const [form] = Form.useForm()

    const [isShowAddItem, setIsShowAddItem] = useState(false)
    const [protocolItemIndex, setProtocolItemIndex] = useState('') // 当前选中的协议
    const [selectedProtocolList, setSelectedProtocolList] = useState([]) // 弹框中所有被选中的协议

    const onFinish = (values) => {
        let timeServerDetails = []
        if (type === 'add') {
            timeServerDetails = selectedProtocolList.map(item => {
                return {
                    property: item.funcIdentifier,
                    propertyName: item.funcName,
                    functionDataType: item.funcParamList[0].dataTypeEN
                }
            })
        } else {
            timeServerDetails = selectedProtocolList.map(item => {
                return {
                    property: item.property || item.funcIdentifier,
                    propertyName: item.propertyName || item.funcName,
                    functionDataType: item.functionDataType || item.funcParamList[0].dataTypeEN
                }
            })
            values.serviceId = editData.serviceId
        }
        if (selectedProtocolList.length === 0) {
            return Notification({ description: '请选择需要关联的协议!', type: 'warn' })
        }
        values.timeServerDetails = timeServerDetails
        // console.log('提交的参数', { ...values})
        post(Paths.saveTimeService, { ...values }, { loading: true }).then(res => {
            Notification({ description: '操作成功！', type: 'success' })
            handleOk()
        })
    }

    const onOk = () => {
        form.submit()
    }

    const [initialList, setInitialList] = useState([])

    // 获取详情信息
    const showDetail = () => {
        getRelationProtocol(editData.productId)
        form.setFieldsValue(editData)
        setSelectedProtocolList(editData.timeServerDetails)
    }

    useEffect(() => {
        type === 'edit' && showDetail()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // 获取关联协议
    const getRelationProtocol = (productId) => {
        post(Paths.standardFnList, { productId }).then(res => {
            console.log(res)
            // setInitialList(res.data.properties)
            setInitialList(res.data.custom.concat(res.data.standard).filter(item => item.funcType === "properties"))
            setProtocolItemIndex('')
        })
    }

    // 展示新增功能点
    const showAddItem = () => {
        setIsShowAddItem(true)
    }

    // 下拉选择协议
    const changeProtocolItem = (index) => {
        setProtocolItemIndex(index)
    }

    // 确定选择协议
    const addProtocol = () => {
        if (protocolItemIndex === '') {
            return Notification({ type: 'error', description: '请先选择一个控制协议字段' })
        }
        setSelectedProtocolList((prev) => {
            const preArr = cloneDeep(prev)
            // 选出原始list下已经被选的，加入被选list,为了展示
            const newAdd = initialList.filter(item => item.funcIdentifier === protocolItemIndex)
            // console.log([...preArr, ...newAdd], '*************')
            return [...preArr, ...newAdd]
        })
        setIsShowAddItem(false)
        setProtocolItemIndex('')
    }

    // 删除添加协议
    const hideAddItem = () => {
        setIsShowAddItem(false)
        setProtocolItemIndex('')
    }

    // 删除已经确认的协议
    const deleteProtocol = (index) => {
        const _selected = cloneDeep(selectedProtocolList)
        _selected.splice(index, 1)
        setSelectedProtocolList(_selected)
    }

    // 协议下拉-选项   过滤掉选择过的协议
    const getOptions = () => {
        const protocolNames = dealProtocols() // 剩余未选择的list返回
        return protocolNames.map((item, index) => {
            return <Option key={item.funcIdentifier} value={item.funcIdentifier}>{item.funcName}</Option>
        })
    }

    // 处理协议差集数据
    const dealProtocols = () => {// 原始的  差集   已选中的  return  剩余的
        const _initId = cloneDeep(initialList).map(item => item.funcIdentifier)
        let _selectId = []
        if (type === 'add') {
            _selectId = cloneDeep(selectedProtocolList).map(item => item.funcIdentifier)
        }
        if (type === 'edit') {
            _selectId = cloneDeep(selectedProtocolList).map(item => (item.property || item.funcIdentifier))
        }
        const renainListId = difference(_initId, _selectId)
        let newTempArr = []
        cloneDeep(initialList).forEach(ele => {
            renainListId.forEach(item => {
                ele.funcIdentifier == item && newTempArr.push(ele)
            })
        })
        return newTempArr
    }

    return (
        <Modal
            title={type === 'add' ? "添加云端定时功能" : "编辑云端定时功能"}
            width={655}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            maskClosable={false}
            destroyOnClose={true}
            wrapClassName="replace-module-modal">
            <div className="cloud-manage-modal">
                <Form
                    form={form}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 19 }}>
                    <Form.Item
                        label="功能名称"
                        name="serviceName"
                        rules={[
                            { required: true, message: '请输入功能名称' }, { max: 50, message: '最大输入长度为50' }
                        ]}>
                        <Input placeholder="不超过50个字符" />
                    </Form.Item>
                    <Form.Item
                        label="归属产品"
                        name="productId"
                        rules={[{ required: true, message: '请选择归属产品' }]}>
                        <Select
                            disabled={type === 'edit'}
                            onChange={val => getRelationProtocol(val)}
                            showSearch optionFilterProp="children">
                            {
                                allProductList && allProductList.map(item => (
                                    <Option key={item.productId} value={item.productId}>{item.productName}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={<>
                            <span className="required-relation">关联协议</span>
                            <Tooltip title={'仅支持可下发类型数据'} placement="top"><QuestionCircleOutlined /></Tooltip>
                        </>}>

                        {/* 展示选择的协议 */}
                        {selectedProtocolList.length > 0 &&
                            <div className="show-protocol-box">
                                {
                                    selectedProtocolList.map((item, index) => {
                                        return (
                                            <div className="protocol-bar" key={index}>
                                                <p className="protocol-bar-title">{item.funcName || item.propertyName}</p>
                                                <div><span>{item.funcIdentifier || item.property}</span></div>
                                                <span
                                                    className="protocol-bar-del"
                                                    onClick={() => deleteProtocol(index)}>
                                                    <DeleteOutlined />&nbsp;删除
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {/* 添加功能点固定 */}
                        {
                            isShowAddItem &&
                            <div className="select-protocol-box">
                                <div>
                                    <Select
                                        value={protocolItemIndex}
                                        onChange={value => changeProtocolItem(value)}
                                        style={{ width: 365 }}>
                                        <Option key="" value="">请选择需要相关的协议</Option>
                                        {getOptions()}
                                    </Select>
                                </div>
                                <div className="control-btns">
                                    <div className="confirm-btn" onClick={() => addProtocol()}>
                                        <CheckCircleOutlined />&nbsp;确定
                                    </div>
                                    <div className="del-btn" onClick={() => hideAddItem()}>
                                        <DeleteOutlined />&nbsp;删除
                                    </div>
                                </div>
                            </div>
                        }
                        <Button className="add-btn" onClick={() => showAddItem()}>添加功能点</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}
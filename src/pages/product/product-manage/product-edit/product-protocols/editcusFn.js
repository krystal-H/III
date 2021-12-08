import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef, useMemo, createContext, useContext } from 'react'
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import { unitCollection, multipleCollection } from '../../../../../configs/text-map';
import { cloneDeep } from 'lodash'
import './editInfo.scss'
//数据类型
const dataOptions = [{
    value: 'bool',
    label: '布尔型',
}, {
    value: 'enum',
    label: '枚举型',
}, {
    value: 'text',
    label: '字符型',
}, {
    value: 'float',
    label: '浮点型',
}, {
    value: 'int',
    label: '整数型',
}]
let unikey = 0 //
// 创建一个 context
const Context = createContext(0)
//事件类型
const eventTabOptions = [
    { label: '故障', value: 'fault' },
    { label: '告警', value: 'alarm' },
    { label: '信息', value: 'info' }]

export default function ProtocoLeft({ rightVisible, onCloseRight, onRefreshList, modelType, actionData, standardData }) {
    //服务事件功能名称下拉
    const standardDatas = useMemo(() => {
        let source = []
        if (modelType === '1') {
            source = standardData.standard
        } else {
            source = standardData.standard.concat(standardData.custom)
        }
        let arr = source.filter(item => {
            if (item.funcType === 'properties') {
                return item
            }
        })
        return arr
    }, [])
    const originData = cloneDeep(actionData)
    const { TabPane } = Tabs;
    useEffect(() => {
    }, [])
    const currentTab = actionData.funcType
    const oneRef = useRef();
    const twoRef = useRef();
    const threeRef = useRef();
    //tab自定义头部
    const renderTabBar = (props, DefaultTabBar) => {
        return (<div></div>)
    }
    //获取提交数据
    const subData = () => {
        if (currentTab === 'properties') {
            oneRef.current.onFinish()
        } else if (currentTab === 'events') {
            twoRef.current.onFinish()
        } else if (currentTab === 'services') {
            threeRef.current.onFinish()
        }
    }
    //提交数据
    const sentReq = (data) => {
        data.funcType = currentTab
        data.type = 'update'
        let productItem = JSON.parse(sessionStorage.getItem('productItem'))
        data.productId = productItem.productId
        data.content.standard = modelType == 1 ? true : false
        data.content = JSON.stringify(data.content)

        post(Paths.PhysicalModelAction, data, { loading: true }).then((res) => {
            onRefreshList()
        });
    }
    return (
        <Drawer
            title={modelType === '1' ? '编辑标准功能' : '编辑自定义功能'}
            placement="right"
            closable={false}
            onClose={onCloseRight}
            visible={rightVisible}
            destroyOnClose={true}
            width={393}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCloseRight} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={subData} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <Context.Provider value={standardDatas}>
                <div className='edit-left-protocol-wrap'> <Tabs activeKey={currentTab} defaultActiveKey={actionData.funcType} renderTabBar={renderTabBar}>
                    <TabPane tab="Tab 1" key="properties">
                        <NumberTemp ref={oneRef} currentTab={currentTab} sentReq={sentReq} actionData={originData} modelType={modelType}></NumberTemp>
                    </TabPane>
                    <TabPane tab="Tab 2" key="events">
                        <EventTemp ref={twoRef} sentReq={sentReq} key="events" actionData={originData} modelType={modelType}></EventTemp>
                    </TabPane>
                    <TabPane tab="Tab 3" key="services">
                        <ServeTemp ref={threeRef} sentReq={sentReq} actionData={originData} modelType={modelType} />
                    </TabPane>
                </Tabs>
                </div>
            </Context.Provider>
        </Drawer>)
}

//属性组件
function NumberTemp({ currentTab, sentReq, actionData, modelType }, ref) {
    const [form] = Form.useForm();
    const onFinish = async () => {
        try {
            let value = await form.validateFields()
            // 验证通过后进入
            value = cloneDeep(value)
            let origin = {}
            origin.content = {}
            if (value.type === 'bool') {
                origin.content = value
            } else if (value.type === 'enum') {
                let emusList = value.emusList.filter(item => {
                    if (item.key && item.value) {
                        return item
                    }
                })
                let specs = emusList.reduce((pre, cur) => {
                    pre[cur.key.toString()] = cur.value
                    return pre
                }, {})
                value.specs = specs
                origin.content = value
            } else if (value.type === 'text') {
                origin.content = value
            } else if (value.type === 'int' || value.type === 'float') {
                origin.content = value
            }
            origin.content.dataType = {
                type: origin.content.type,
                specs: origin.content.specs
            }
            delete origin.content.type
            delete origin.content.specs
            sentReq(origin)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }
    const originOutput = useMemo(() => {
        let obj = {}
        obj.name = actionData.funcName
        obj.identifier = actionData.funcIdentifier
        obj.type = actionData.dataTypeEN

        actionData.funcParamList.forEach(item => {
            obj.accessMode = item.accessMode
            if (item.dataTypeEN === "enum") {
                let emusList = []
                for (let key in item.propertyMap) {
                    emusList.push({
                        key,
                        value: item.propertyMap[key]
                    })
                }
                obj.emusList = emusList
            } else if (item.dataTypeEN === "int" || item.dataTypeEN === "float") {
                let keys = ['interval', 'min', 'max', 'multiple', 'unit']
                let specs = {}
                keys.forEach(key => {
                    specs[key] = item.propertyMap[key]
                })
                obj.specs = specs
            } else if (item.dataTypeEN === "bool") {
                let specs = {
                    '1': item.propertyMap['1'],
                    '0': item.propertyMap['0']
                }
                obj.specs = specs
            }
        })
        return obj
    }, [])
    //数据类型改变
    const onTypeChange = (value) => {
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    //添加枚举参数
    const AddEnums = (add, count) => {
        if (count > 11) {
            Notification({
                description: `不能超过12条数据`,
                type: 'warn'
            });
            return
        }
        add()
    }
    return (
        <Form
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            form={form}
            initialValues={originOutput}
        >
            <Form.Item
                label="功能点名称"
                name='name'
                rules={[
                    {
                        required: true,
                    },
                ]}

            >
                <Input />
            </Form.Item>

            <Form.Item
                label="标识符"
                name='identifier'
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                {
                    modelType == 1 ? <span>{actionData.funcIdentifier}</span> : <Input />
                }

            </Form.Item>
            <Form.Item
                label="数据类型"
                name='type'
            >
                <Select onChange={onTypeChange} disabled={modelType === '1' ? true : false}>
                    {
                        dataOptions.map(item => (
                            <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
            >
                {({ getFieldValue }) => {
                    if (getFieldValue('type') === 'bool') {
                        return (<>
                            <Form.Item
                                label="布尔值"
                                rules={[{ required: true }]}
                            >
                                <Form.Item
                                    name={['specs', '0']}
                                    label="0"
                                >
                                    <Input placeholder="参数描述" />
                                </Form.Item>
                                <Form.Item
                                    name={['specs', '1']}
                                    label="1"
                                >
                                    <Input placeholder="参数描述" />
                                </Form.Item>
                            </Form.Item>
                        </>)
                    }
                    if (getFieldValue('type') === 'enum') {
                        return (
                            <>
                                <Form.Item
                                    label="枚举型:"
                                    name="enumus_text"
                                    className='enums-lise-nobottom'
                                ><span style={{ marginRight: '50px' }}>参数值</span>-<span style={{ marginLeft: '30px' }}>参数描述</span>
                                </Form.Item>

                                <div className='right-list-wrap' >
                                    <Form.List name="emusList">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'key']}
                                                            fieldKey={[fieldKey, 'key']}
                                                            className='enums-lise-nobottom'
                                                            noStyle
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <span>-</span>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'value']}
                                                            fieldKey={[fieldKey, 'value']}
                                                            className='enums-lise-nobottom'
                                                            noStyle
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => { AddEnums(add, fields.length) }} block icon={<PlusOutlined />}>
                                                        新加
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </>
                        )
                    }
                    if (getFieldValue('type') === 'int' || getFieldValue('type') === 'float') {
                        return (<>
                            <Form.Item label="数值范围">
                                <div className='number-input-wrap'>
                                    <Form.Item
                                        name={['specs', 'min']}
                                        noStyle
                                        rules={[{ required: true, message: '请输入最小值' }]}
                                    >
                                        <Input style={{ width: '40%' }} />
                                    </Form.Item>
                                    <span style={{ margin: '0 10px' }}>至</span>
                                    <Form.Item
                                        name={['specs', 'max']}
                                        noStyle
                                        rules={[{ required: true, message: '请输入最小值' }]}
                                    >
                                        <Input style={{ width: '40%' }} />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label='数值间隔'
                                name={['specs', 'interval']}
                                rules={[{ required: true }]}
                            ><Input /></Form.Item>
                            <Form.Item name={['specs', 'multiple']} label="倍数" >
                                <Select >
                                    {
                                        multipleCollection.map(item => {
                                            return <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name={['specs', 'unit']} label="单位" >
                                <Select>
                                    {
                                        unitCollection.map(item => {
                                            return <Select.Option value={item.Symbol} key={item.Symbol}>{item.Symbol}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </>)
                    }
                    return null
                }
                }
            </Form.Item>

            <Form.Item
                label="数据传输类型"
                name="accessMode"
            >
                <Radio.Group>
                    <Radio value="rw">可下发可上报</Radio>
                    <Radio value="w">可下发</Radio>
                    <Radio value="r">可上报</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}
NumberTemp = forwardRef(NumberTemp)
//事件组件
function EventTemp({ actionData, sentReq, modelType }, ref) {
    const [form] = Form.useForm();
    const originOutput = useMemo(() => {
        let obj = {
            output: []
        }

        actionData.funcParamList.forEach(item => {
            console.log(item, '累了呀')
            unikey++
            let newItem = {
                name: item.name,
                identifier: item.identifier,
                type: item.dataTypeEN,
                dataPointId: item.dataPointId,
                unikey,
                default: item.defaultValue
            }
            obj.output.push(newItem)
        })
        return obj
    }, [])
    const [newParamsList, setNewParamsList] = useState(originOutput.output)
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }), [newParamsList]);
    //验证回调
    function sentAddData(data2, params) {
        let data = cloneDeep(data2)
        setNewParamsList(pre => {
            let obj = cloneDeep(pre)
            obj.splice(params.index, 1, data)
            return obj
        })
    }
    //==================
    const addParams = () => {
        unikey++
        setNewParamsList(pre => {
            let obj = cloneDeep(pre)
            obj.push({ unikey })
            return obj
        })
    }
    const delItemObj = (index, type) => {
        setNewParamsList(pre => {
            let arr = cloneDeep(pre)
            arr.splice(index, 1)
            return arr
        })
    }
    //触发验证及提交
    const onFinish = () => {
        form.validateFields().then(val => {
            let value = cloneDeep(val)
            let origin = {}
            let arrFn = []
            let arrData = []
            if (newParamsList.length == 0) {
                Notification({
                    description: `至少添加一个参数`,
                    type: 'warn'
                });
                return
            }
            let isContinue = newParamsList.every(item => {
                if (item.fn) {
                    return true
                }
            })
            if (!isContinue) {
                Notification({
                    description: `新增参数未选择参数名`,
                    type: 'warn'
                });
                return
            }
            cloneDeep(newParamsList).forEach(item => {
                arrFn.push(item.fn())
                arrData.push(item.data)
            })
            Promise.all(arrFn).then((formData) => {
                formData.forEach((item, index) => {
                    arrData[index].dataType.default = item.default
                })
                value.outputData = getParams(arrData)
                origin.content = value
                sentReq(origin)
            }).catch(res => {
                Notification({
                    description: `添加参数有误`,
                    type: 'warn'
                });
            })
        })
    }
    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                form={form}
                initialValues={{ name: actionData.funcName, identifier: actionData.funcIdentifier, type: actionData.eventType }}
            >
                <Form.Item
                    label="功能点名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="标识符"
                    name="identifier"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {
                        modelType == 1 ? <span>{actionData.funcIdentifier}</span> : <Input />
                    }
                </Form.Item>
                <Form.Item
                    label="事件类型"
                    name="type"
                >
                    <Radio.Group options={eventTabOptions} />
                </Form.Item>
                <Form.Item
                    label="输出参数"
                >
                    <Button
                        type="dashed"
                        onClick={addParams}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                    >
                        添加参数
                    </Button>
                </Form.Item>
            </Form>

            {
                newParamsList.map((item, key) => {
                    return <AddParams sentAddData={sentAddData} refIndex={key} type={true} data={item}
                        delItemObj={delItemObj} unikey={item.unikey} key={item.unikey} />
                })
            }
        </>
    )
}
EventTemp = forwardRef(EventTemp)
//服务组件
function ServeTemp({ sentReq, actionData, modelType }, ref) {
    const [form] = Form.useForm();
    const originOutput = useMemo(() => {
        let obj = {
            input: [],
            output: []
        }
        actionData.funcParamList.forEach(item => {
            unikey++
            let newItem = {
                name: item.name,
                identifier: item.identifier,
                type: item.dataTypeEN,
                dataPointId: item.dataPointId,
                unikey,
                default: item.defaultValue
            }
            if (item.type === '输出') {
                obj.output.push(newItem)
            } else {
                obj.input.push(newItem)
            }
        })
        return obj
    }, [])
    const [inputList, setInputList] = useState(originOutput.input)
    const [outputList, setOutputList] = useState(originOutput.output)
    //添加输入框
    const addinput = (isIn) => {
        unikey++
        if (isIn) {
            setInputList(pre => {
                let obj = cloneDeep(pre)
                obj.push({ unikey })
                return obj
            })
        } else {
            setOutputList(pre => {
                let obj = cloneDeep(pre)
                obj.push({ unikey })
                return obj
            })
        }
    }
    //接收参数
    const sentAddData = (data2, params) => {
        let data = cloneDeep(data2)
        data.unikey = params.unikey
        if (params.type) {
            setInputList(pre => {
                let obj = cloneDeep(pre)
                obj.splice(params.index, 1, data)
                return obj
            })
        } else {
            setOutputList(pre => {
                let obj = cloneDeep(pre)
                obj.splice(params.index, 1, data)
                return obj
            })
        }
    }
    const onFinish = () => {
        // let inputData = getParams(inputList)
        // let outputData = getParams(outputList)
        // form.validateFields().then(val => {
        //     let value = cloneDeep(val)
        //     let origin = {}
        //     value.outputData = outputData
        //     value.inputData = inputData
        //     origin.content = value
        //     sentReq(origin)
        // })
        form.validateFields().then(val => {
            let value = cloneDeep(val)
            let origin = {}
            let arrFn = []
            let arrData = []
            let allList = inputList.concat(outputList)
            if (allList.length === 0) {
                Notification({
                    description: `至少添加一个参数`,
                    type: 'warn'
                });
                return
            }
            let isContinue = allList.every(item => {
                if (item.fn) {
                    return true
                }
            })
            if (!isContinue) {
                Notification({
                    description: `新增参数未选择参数名`,
                    type: 'warn'
                });
                return
            }
            cloneDeep(allList).forEach(item => {
                arrFn.push(item.fn())
                arrData.push(item.data)
            })
            Promise.all(arrFn).then(res => {
                res.forEach((item, index) => {
                    arrData[index].dataType.default = item.default
                })
                value.inputData = getParams(arrData.splice(0, inputList.length))
                value.outputData = getParams(arrData)
                origin.content = value
                sentReq(origin)
            }).catch(res => {
                Notification({
                    description: `添加参数有误`,
                    type: 'warn'
                });
            })
        })
    }
    const delItemObj = (index, type) => {
        if (type) {
            setInputList(pre => {
                let arr = cloneDeep(pre)
                arr.splice(index, 1)
                return arr
            })
        } else {
            setOutputList(pre => {
                let arr = cloneDeep(pre)
                arr.splice(index, 1)
                return arr
            })
        }

    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }), [inputList, outputList]);
    return (
        <>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                form={form}
                initialValues={{ name: actionData.funcName, identifier: actionData.funcIdentifier }}
            >
                <Form.Item
                    label="功能点名称"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="标识符"
                    name="identifier"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    {
                        modelType == 1 ? <span>{actionData.funcIdentifier}</span> : <Input />
                    }
                </Form.Item>
            </Form>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Form.Item
                    label="输入参数"
                >
                    <Button
                        type="dashed"
                        onClick={() => { addinput(true) }}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                    >
                        添加参数
                    </Button>
                </Form.Item>
            </Form>
            {
                inputList.map((item, key) => {
                    return <AddParams sentAddData={sentAddData} refIndex={key} type={true} data={item}
                        delItemObj={delItemObj} unikey={item.unikey} key={item.unikey} />
                })
            }
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Form.Item
                    label="输出参数"
                >
                    <Button
                        type="dashed"
                        onClick={() => { addinput(false) }}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                    >
                        添加参数
                    </Button>
                </Form.Item>
            </Form>
            {
                outputList.map((item, key) => {
                    return <AddParams sentAddData={sentAddData} refIndex={key} type={false} data={item}
                        delItemObj={delItemObj} unikey={item.unikey} key={item.unikey} />
                })
            }
        </>
    )
}
ServeTemp = forwardRef(ServeTemp)
//添加参数
function AddParams({ sentAddData, type, data, refIndex, delItemObj, unikey }, ref) {
    const standardDatas = useContext(Context);
    const [form] = Form.useForm();
    const [sentData, setSentData] = useState({})
    const [selectId, setSelectId] = useState(data.dataPointId)
    useEffect(() => {
        if (data.dataPointId) {
            form.setFieldsValue({
                name: data.dataPointId,
            });
            let initDefault = {
                isSet: true,
                value: data.default
            }
            setFormVal(data.dataPointId, initDefault)
        }
    }, [])
    //选择功能点名称
    const setFormVal = (dataPointId, defaultData) => {
        if (defaultData && defaultData.isSet) {
            form.setFieldsValue({
                default: defaultData.value
            });
        } else {
            form.setFieldsValue({
                default: ''
            });
        }
        standardDatas.forEach(item => {
            if (item.dataPointId === dataPointId) {
                let dataType = {
                    ...item.funcParamList[0],
                    specs: item.funcParamList[0].propertyMap
                }
                let obj = {
                    dataType: dataType,
                    name: item.funcName,
                    identifier: item.funcIdentifier,
                    dataPointId: item.dataPointId
                }
                let parmas = {
                    index: refIndex,
                    type,
                    unikey
                }
                setSentData(obj)
                // sentAddData(obj, parmas)
                sentAddData({ fn: form.validateFields, unikey, data: obj }, parmas)
            }
        })
        setSelectId(dataPointId)
    }
    //展示下发
    const getDom = () => {
        if (sentData.dataType.accessMode === 'rw') {
            return <span>可下发可上报</span>
        } else if (sentData.dataType.accessMode === 'w') {
            return <span>可下发</span>
        } else if (sentData.dataType.accessMode === 'r') {
            return <span>可上报</span>
        }
        return ''
    }
    //展示数据类型
    const getTypeDom = () => {
        if (sentData.dataType.dataTypCN === '数值') {
            return <Form.Item
                noStyle
            >
                <Form.Item label="数值范围">
                    <div className='number-input-wrap'>
                        <Form.Item
                            noStyle
                        >
                            <span>{sentData.dataType.specs.min}&nbsp;  至&nbsp;  {sentData.dataType.specs.max}</span>
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item
                    label="默认值"
                    name='default'
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value) {
                                    if (value >= sentData.dataType.specs.min && value <= sentData.dataType.specs.max) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(`默认值需在${sentData.dataType.specs.min}和${sentData.dataType.specs.max}之间`)
                                    }
                                } else {
                                    return Promise.resolve()
                                }

                            }
                        }
                    ]}>
                    <Input type='number' placeholder='可为空' />
                </Form.Item>
                <Form.Item
                    label='数值间隔'
                    name={['specs', 'interval']}
                ><span>{sentData.dataType.specs.interval}</span></Form.Item>
                <Form.Item label="倍数" >
                    <span>{sentData.dataType.specs.multiple}</span>
                </Form.Item>
                <Form.Item label="单位" >
                    <span>{sentData.dataType.specs.unit}</span>
                </Form.Item>
            </Form.Item>
        }
        if (sentData.dataType.dataTypCN === '布尔') {
            return (<>
                <Form.Item
                    label="布尔值"
                >
                    <span>{'0：' + sentData.dataType.specs['0'] + ' - ' + '1：' + sentData.dataType.specs['1']}</span>
                </Form.Item>
                <Form.Item
                    label="默认值"
                    name='default'
                >
                    <Select allowClear placeholder='可为空'>
                        {
                            Object.keys(sentData.dataType.specs).map(item => (
                                <Select.Option key={item} value={item}>{sentData.dataType.specs[item]}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </>)
        }
        if (sentData.dataType.dataTypCN === '枚举') {
            return (
                <>
                    <Form.Item
                        label="枚举型:"
                        className='enums-lise-nobottom'
                    ><span style={{ marginRight: '5px' }}>参数值</span>-<span style={{ marginLeft: '5px' }}>参数描述</span>
                    </Form.Item>

                    <div className='right-list-wrap' style={{ marginBottom: '10px' }}>
                        {
                            Object.keys(sentData.dataType.specs).map(item => {
                                return <div key={item} style={{ display: 'flex' }}>
                                    <div style={{ width: '30px' }}>{item}</div>
                                    <span style={{ marginRight: '10px' }}>-</span>
                                    <div>{sentData.dataType.specs[item]}</div>
                                </div>
                            })
                        }
                    </div>
                    <Form.Item
                        label="默认值"
                        name='default'
                    >
                        <Select allowClear placeholder='可为空'>
                            {
                                Object.keys(sentData.dataType.specs).map(item => (
                                    <Select.Option key={item} value={item}>{sentData.dataType.specs[item]}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </>
            )
        }
        if (sentData.dataType.dataTypCN === '字符串') {
            return <>
                <Form.Item
                    label="默认值"
                    name='default'
                >
                    <Input placeholder='可为空' />
                </Form.Item></>
        }
        return ''
    }
    const delItem = () => {
        delItemObj(refIndex, type)
    }
    return (
        <div className='add-tempele-wrap add-params-wrap'>
            <MinusCircleOutlined onClick={delItem} className='del-icon-params' />
            <Form form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}>
                <Form.Item
                    label="参数名称"
                    name='name'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select onChange={setFormVal}>
                        {
                            standardDatas.map(item => (
                                <Select.Option key={item.dataPointId} value={item.dataPointId}>{item.funcName}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                {
                    sentData.identifier && (<div>
                        <Form.Item
                            label="标识符"
                        ><span>{sentData.identifier}</span>
                        </Form.Item>
                        <Form.Item
                            label="数据类型"
                            name='type'
                        >
                            <span>{sentData.dataType.dataTypCN}</span>
                        </Form.Item>
                        {getTypeDom()}
                        <Form.Item
                            label="数据传输类型"
                        >

                            {
                                getDom()
                            }
                        </Form.Item>
                    </div>)
                }

            </Form>
        </div>)
}
function getParams(newParamsList) {
    let arr = []
    let arrid = []
    newParamsList.forEach(item => {
        if (item.identifier && arrid.indexOf(item.identifier) === -1) {
            arrid.push(item.identifier)
            let obj = {}
            obj.name = item.name
            obj.identifier = item.identifier
            obj.dataPointId = item.dataPointId
            obj.accessMode = item.dataType.accessMode
            obj.dataType = {
                type: item.dataType.dataTypeEN,
                specs: item.dataType.specs,
                default: item.dataType.default
            }
            arr.push(obj)
        }

    })
    return arr
}
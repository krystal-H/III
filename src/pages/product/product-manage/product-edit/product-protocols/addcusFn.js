import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef, useContext, createContext, useMemo } from 'react'
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import './editInfo.scss'
import { CloseOutlined } from '@ant-design/icons';
import { unitCollection, multipleCollection } from '../../../../../configs/text-map';
import { cloneDeep } from 'lodash'
//tab
const optionsWithDisabled = [
    { label: '属性', value: 'properties' },
    { label: '事件', value: 'events' },
    { label: '服务', value: 'services' },
]
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
    value: 'int',
    label: '整数型',
}, {
    value: 'float',
    label: '浮点型',
}]
//事件类型
const eventTabOptions = [
    { label: '故障', value: 'fault' },
    { label: '告警', value: 'alarm' },
    { label: '信息', value: 'info' }]
// 创建一个 context
const Context = createContext(0)
export default function ProtocoLeft({ rightVisible, onCloseRight, onRefreshList, standardData }) {
    const { TabPane } = Tabs;
    useEffect(() => {
    }, [])
    //服务事件功能名称下拉
    const standardDatas = useMemo(() => {
        let arr = standardData.filter(item => {
            if (item.funcType == 'properties') {
                return item
            }
        })
        return arr
    }, [])
    const [currentTab, setCurrentTab] = useState('properties')
    const tabChange = (e) => {
        setCurrentTab(e.target.value)
    }
    const oneRef = useRef();
    const twoRef = useRef();
    const threeRef = useRef();
    //tab自定义头部
    const renderTabBar = (props, DefaultTabBar) => {
        const tabInfo = [];
        props.panes.forEach(item => {
            tabInfo.push({
                key: item.key,
                title: item.props.tab
            })
        });
        return (
            <div className='addcus-tab'> <Radio.Group buttonStyle="solid" optionType="button" value={currentTab} onChange={tabChange} options={optionsWithDisabled} /></div>
        )
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
        data.type = 'add'
        let productItem = JSON.parse(sessionStorage.getItem('productItem'))
        data.productId = productItem.productId
        data.content.standard = false
        console.log(data, '要提交的数据')
        data.content = JSON.stringify(data.content)

        post(Paths.PhysicalModelAction, data).then((res) => {
            onRefreshList()
        });
    }
    return (
        <Drawer
            title='新增自定义功能'
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
                <div className='edit-left-protocol-wrap'> <Tabs activeKey={currentTab} defaultActiveKey="properties" renderTabBar={renderTabBar}>
                    <TabPane tab="Tab 1" key="properties">
                        <NumberTemp ref={oneRef} currentTab={currentTab} sentReq={sentReq}></NumberTemp>
                    </TabPane>
                    <TabPane tab="Tab 2" key="events">
                        <EventTemp ref={twoRef} sentReq={sentReq} key="events"></EventTemp>
                    </TabPane>
                    <TabPane tab="Tab 3" key="services">
                        <ServeTemp ref={threeRef} sentReq={sentReq} />
                    </TabPane>
                </Tabs>
                </div>
            </Context.Provider>
        </Drawer>)
}

//属性组件
function NumberTemp({ currentTab, sentReq }, ref) {
    const [form] = Form.useForm();
    const onFinish = async () => {
        try {
            let value = await form.validateFields()
            // 验证通过后进入
            value = JSON.parse(JSON.stringify(value))
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
            } else if (value.type === 'float' || value.type === 'int') {
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

    //数据类型改变
    const onTypeChange = (value) => {
        console.log(value)
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
            name="numberT"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            form={form}
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
            ><Input />
            </Form.Item>
            <Form.Item
                label="数据类型"
                name='type'
            >
                <Select onChange={onTypeChange}>
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
                    if (getFieldValue('type') === 'float' || getFieldValue('type') === 'int') {
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
                                <Select  >
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
                rules={[
                    {
                        required: true,
                        message:'请选择数据传输类型'
                    },
                ]}
            >
                <Radio.Group >
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
function EventTemp({ currentTab, sentReq }, ref) {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
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
    const [newParamsList, setNewParamsList] = useState([])
    const addParams = () => {
        setNewParamsList(pre => {
            let obj = cloneDeep(pre)
            obj.push({})
            return obj
        })
    }
    //触发验证及提交
    const onFinish = async () => {
        let outputData = getParams(newParamsList)
        form.validateFields().then(val => {
            let value = cloneDeep(val)
            let origin = {}
            value.outputData = outputData
            origin.content = value
            sentReq(origin)
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
                ><Input />
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
                    return <AddParams sentAddData={sentAddData} refIndex={key} type={true} key={'params' + key} data={item} />
                })
            }
        </>
    )
}
EventTemp = forwardRef(EventTemp)
//服务组件
function ServeTemp({ sentReq }, ref) {
    const [form] = Form.useForm();
    const [inputList, setInputList] = useState([])
    const [outputList, setOutputList] = useState([])
    const [isCheck, setIsCheck] = useState(0)
    //添加输入框
    const addinput = (isIn) => {
        if (isIn) {
            setInputList(pre => {
                let obj = cloneDeep(pre)
                obj.push({})
                return obj
            })
        } else {
            setOutputList(pre => {
                let obj = cloneDeep(pre)
                obj.push({})
                return obj
            })
        }
    }
    //接收参数
    const sentAddData = (data2, params) => {
        let data = cloneDeep(data2)
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
        let inputData = getParams(inputList)
        let outputData = getParams(outputList)
        form.validateFields().then(val => {
            let value = cloneDeep(val)
            let origin = {}
            value.outputData = outputData
            value.inputData = inputData
            origin.content = value
            sentReq(origin)
        })
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
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
                ><Input />
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
                    return <AddParams sentAddData={sentAddData} refIndex={key} isCheck={isCheck} type={true} key={'input' + key} data={item} />
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
                    return <AddParams sentAddData={sentAddData} refIndex={key} isCheck={isCheck} type={false} key={'outputt' + key} data={item} />
                })
            }
        </>
    )
}
ServeTemp = forwardRef(ServeTemp)
//添加参数
function AddParams({ sentAddData, type, data, refIndex }, ref) {
    const standardDatas = useContext(Context);
    const [form] = Form.useForm();
    const [sentData, setSentData] = useState({})
    const [selectId, setSelectId] = useState(0)
    useEffect(() => {
        onFinish()
    }, [selectId])
    const onFinish = () => {
        let parmas = {
            index: refIndex,
            type,
        }
        sentAddData(sentData, parmas)
    }
    //选择功能点名称
    const setFormVal = (dataPointId) => {
        setSelectId(dataPointId)
        standardDatas.forEach(item => {
            if (item.dataPointId == dataPointId) {
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
                setSentData(obj)
            }
        })
    }
    //展示下发
    const getDom = () => {
        console.log(sentData, '===')
        if (sentData.dataType.accessMode == 'rw') {
            return <span>可下发可上报</span>
        } else if (sentData.dataType.accessMode == 'w') {
            return <span>可下发</span>
        } else if (sentData.dataType.accessMode == 'r') {
            return <span>可上报</span>
        }
        return ''
    }
    //展示数据类型
    const getTypeDom = () => {
        if (sentData.dataType.dataTypCN == '数值') {
            return <Form.Item
                noStyle
            >
                <Form.Item label="数值范围">
                    <div className='number-input-wrap'>
                        <Form.Item
                            name={['specs', 'min']}
                            noStyle
                        >
                            <span>{sentData.dataType.specs.min}&nbsp;  至&nbsp;  {sentData.dataType.specs.max}</span>
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item
                    label='数值间隔'
                    name={['specs', 'interval']}
                ><span>{sentData.dataType.specs.interval}</span></Form.Item>
                <Form.Item name={['specs', 'multiple']} label="倍数" >
                    <span>{sentData.dataType.specs.multiple}</span>
                </Form.Item>
                <Form.Item name={['specs', 'unit']} label="单位" >
                    <span>{sentData.dataType.specs.unit}</span>
                </Form.Item>
            </Form.Item>
        }
        if (sentData.dataType.dataTypCN == '布尔') {
            return (<>
                <Form.Item
                    label="布尔值"
                >
                    <span>{'0：' + sentData.dataType.specs['0'] + ' - ' + '1：' + sentData.dataType.specs['1']}</span>
                </Form.Item>
            </>)
        }
        if (sentData.dataType.dataTypCN == '枚举') {
            return (
                <>
                    <Form.Item
                        label="枚举型:"
                        name="enumus_text"
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
                </>
            )
        }
        return ''
    }
    return (
        <div className='add-tempele-wrap add-params-wrap'>
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
                            name='identifier'
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
                            name="accessMode"
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
        if (item.identifier && arrid.indexOf(item.identifier) == -1) {
            arrid.push(item.identifier)
            let obj = {}
            obj.name = item.name
            obj.identifier = item.identifier
            obj.dataPointId = item.dataPointId
            obj.accessMode = item.dataType.accessMode
            obj.dataType = {
                type: item.dataType.dataTypeEN,
                specs: item.dataType.specs
            }
            arr.push(obj)
        }

    })
    return arr
}
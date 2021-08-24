import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths, get } from '../../../../../api';

import './editInfo.scss'
import { CloseOutlined } from '@ant-design/icons';
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
    value: 'double',
    label: '数值型',
}]
//事件类型
const eventTabOptions = [
    { label: '故障', value: 'fault' },
    { label: '告警', value: 'alarm' },
    { label: '信息', value: 'info' }]
export default function ProtocoLeft({ rightVisible, onCloseRight, onRefreshList }) {
    const { TabPane } = Tabs;
    useEffect(() => {
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
        data.productId = 11759
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
            } else if (value.type === 'double') {
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
                label="功能点名称："
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
                label="数据类型："
                name='type'
            >
                <Select allowClear onChange={onTypeChange}>
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
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
                    if (getFieldValue('type') === 'double') {
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
                                <Select allowClear >
                                    <Select.Option value="10">10</Select.Option>
                                    <Select.Option value="100">100</Select.Option>
                                    <Select.Option value="1000">1000</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['specs', 'unit']} label="单位" >
                                <Select allowClear >
                                    <Select.Option value="male">male</Select.Option>
                                    <Select.Option value="female">female</Select.Option>
                                    <Select.Option value="other">other</Select.Option>
                                </Select>
                            </Form.Item>
                        </>)
                    }
                    return null
                }
                }
            </Form.Item>

            <Form.Item
                label="数据传输类型："
                name="dataTransferType"
            >
                <Radio.Group >
                    <Radio value="可下发可上报">可下发可上报</Radio>
                    <Radio value="可下发">可下发</Radio>
                    <Radio value="可上报">可上报</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}
NumberTemp = forwardRef(NumberTemp)
//事件组件
let testCount = 0
let paramsWrap = []
function EventTemp({ currentTab, sentReq }, ref) {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    const [isCheck, setIsCheck] = useState(0)
    //验证回调
    function sentAddData(data2) {
        let data = JSON.parse(JSON.stringify(data2))
        testCount++
        if (data) {
            paramsWrap.push(data)
        }
        if (testCount === newParamsList.length) {
            if (paramsWrap.length === testCount) {
                let value = form.getFieldsValue()
                value = JSON.parse(JSON.stringify(value))
                let origin = {}
                value.outputData = paramsWrap
                origin.content = value
                sentReq(origin)
            }

        }
    }
    //==================
    const [newParamsList, setNewParamsList] = useState([])
    const addParams = () => {
        setNewParamsList(pre => {
            let obj = JSON.parse(JSON.stringify(pre))
            obj.push({})
            return obj
        })
    }
    //触发验证及提交
    const onFinish = async () => {
        paramsWrap = []
        testCount = 0
        form.validateFields().then(value => {
            setIsCheck(isCheck + 1)
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
                    label="功能点名称："
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
                    label="事件类型："
                    name="type"
                >
                    <Radio.Group options={eventTabOptions} />
                </Form.Item>
                <Form.Item
                    label="输出参数："
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
                    return <AddParams sentAddData={sentAddData} refIndex={key} isCheck={isCheck} type={true} key={'params' + key} data={item} />
                })
            }
        </>
    )
}
EventTemp = forwardRef(EventTemp)
//服务组件
let seviceCount = 0
let inputparamsWrap = []
let outputparamsWrap = []
function ServeTemp({ sentReq }, ref) {
    const [form] = Form.useForm();
    const [inputList, setInputList] = useState([])
    const [outputList, setOutputList] = useState([])
    const [isCheck, setIsCheck] = useState(0)
    //添加输入框
    const addinput = (isIn) => {
        if (isIn) {
            setInputList(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                obj.push({})
                return obj
            })
        } else {
            setOutputList(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                obj.push({})
                return obj
            })
        }
    }
    //接收参数
    const sentAddData = (data2, type) => {
        let data = JSON.parse(JSON.stringify(data2))
        seviceCount++
        if (type && data) {
            inputparamsWrap.push(data)
        } else if (data) {
            outputparamsWrap.push(data)
        }
        if (seviceCount === (inputList.length + outputList.length)) {
            if ((inputparamsWrap.length + outputparamsWrap.length) === seviceCount) {
                let value = form.getFieldsValue()
                value = JSON.parse(JSON.stringify(value))
                let origin = {}
                value.outputData = outputparamsWrap
                value.inputData = inputparamsWrap
                origin.content = value
                sentReq(origin)
            }

        }
    }
    const onFinish = async () => {
        seviceCount = 0
        inputparamsWrap = []
        outputparamsWrap = []
        form.validateFields().then(value => {
            setIsCheck(isCheck + 1)
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
                    label="功能点名称："
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
                    label="输入参数："
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
                    return <AddParams sentAddData={sentAddData} refIndex={key} isCheck={isCheck} type={true} index={'input' + key} data={item} />
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
                    label="输出参数："
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
                    return <AddParams sentAddData={sentAddData} refIndex={key} isCheck={isCheck} type={false} index={'outputt' + key} data={item} />
                })
            }
        </>
    )
}
ServeTemp = forwardRef(ServeTemp)
//添加参数
function AddParams({ sentAddData, type, data, isCheck, refIndex }, ref) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isCheck) {
            onFinish()
        }
    }, [isCheck])
    const onFinish = async () => {
        form.validateFields().then(value => {
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
            } else if (value.type === 'double') {
                origin.content = value
            }
            origin.content.dataType = {
                type: origin.content.type,
                specs: origin.content.specs
            }
            delete origin.content.type
            delete origin.content.specs
            sentAddData(origin.content, type)
        }).catch(err => {
            sentAddData(false)
        })
    }
    return (
        <div className='add-tempele-wrap add-params-wrap'>
            <Form form={form}
                initialValues={data}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}>

                <Form.Item
                    label="参数名称："
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
                    label="参数标识"
                    name="identifier"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                ><Input />
                </Form.Item>

                <Form.Item
                    label="数据类型："
                    name='type'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select allowClear>
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
                                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
                        if (getFieldValue('type') === 'double') {
                            return (<>
                                <Form.Item label="数值范围">
                                    <div className='number-input-wrap'>
                                        <Form.Item
                                            name={['specs', 'min']}
                                            noStyle
                                            rules={[{ required: true ,message:'请输入最小值'}]}
                                        >
                                            <Input style={{ width: '40%' }} />
                                        </Form.Item>
                                        <span style={{ margin: '0 10px' }}>至</span>
                                        <Form.Item
                                            name={['specs', 'max']}
                                            noStyle
                                            rules={[{ required: true,message:'请输入最大值' }]}
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
                                    <Select allowClear >
                                        <Select.Option value="10">10</Select.Option>
                                        <Select.Option value="100">100</Select.Option>
                                        <Select.Option value="1000">1000</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name={['specs', 'unit']} label="单位" >
                                    <Select allowClear >
                                        <Select.Option value="male">male</Select.Option>
                                        <Select.Option value="female">female</Select.Option>
                                        <Select.Option value="other">other</Select.Option>
                                    </Select>
                                </Form.Item>
                            </>)
                        }
                        return null
                    }
                    }
                </Form.Item>

            </Form>
        </div>)

}
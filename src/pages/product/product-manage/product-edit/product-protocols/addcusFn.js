import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import moment from 'moment';
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths, get } from '../../../../../api';
import './editInfo.scss'
const optionsWithDisabled = [
    { label: '属性', value: 'properties' },
    { label: '事件', value: 'events' },
    { label: '服务', value: 'services' },
]
export default function ProtocoLeft({ rightVisible, onCloseRight }) {
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
        if (currentTab == 'properties') {
            oneRef.current.onFinish()
        } else if (currentTab == 'events') {
            twoRef.current.onFinish()
        } else if (currentTab == 'services') {
            threeRef.current.onFinish()
        }
    }
    //提交数据
    const sentReq = (data) => {
        onCloseRight(66666666666)
        console.log('数据', data)
        data.funcType = currentTab
        data.type = 'add'
        data.productId = 11759
        post(Paths.PhysicalModelAction, data).then((res) => {
            onCloseRight(true)
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
                    <EventTemp ref={twoRef}></EventTemp>
                </TabPane>
                <TabPane tab="Tab 3" key="services">
                    <ServeTemp ref={threeRef} />
                </TabPane>
            </Tabs>
            </div>
        </Drawer>)
}
function BoolTemp() {
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="功能点名称："
                name="username"
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
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据类型："
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据传输类型："
                name="password"
            ><span>可下发可上报</span>
            </Form.Item>
        </Form>
    )
}
function EnumerTemp() {
    const [showAdd, setShowAdd] = useState(true)
    const [tagArr, setTagArr] = useState([])
    const { Search } = Input;
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    //添加
    const openAdd = () => {
        setShowAdd(false)
    }
    //删除tag
    const handleClose = (index) => {
        let newTag = tagArr.filter(tag => {
            return tag !== index
        })
        setTagArr(newTag)
    }
    //添加tag
    const confirmAdd = (value) => {
        setTagArr([...tagArr, value])
        setShowAdd(true)
    }
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="功能点名称："
                name="username"
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
                name="password"
            ><span>switch</span>
            </Form.Item>
            <Form.Item
                label="数据类型："
                name="password"
            ><span>枚举型</span>
            </Form.Item>
            <Form.Item
                label="枚举值"
                name="password"
            >
                <div></div>
            </Form.Item>
            <Form.Item
                label="数据传输类型："
                name="password"
            >
                <Radio.Group style={{ marginBottom: 16 }}>
                    <Radio.Button value="one">属性</Radio.Button>
                    <Radio.Button value="two">事件</Radio.Button>
                    <Radio.Button value="three">服务</Radio.Button>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}
//属性组件
function NumberTemp({ currentTab, sentReq }, ref) {
    const [form] = Form.useForm();
    const onFinish = async () => {
        try {
            let value = await form.validateFields()
            // 验证通过后进入
            console.log(value, currentTab)
            value = JSON.parse(JSON.stringify(value))
            let origin = {}

            origin.content = {}
            if (value.type == 'bool') {
                origin.content = value
            } else if (value.type == 'enum') {
                let emusList = value.emusList.filter(item => {
                    if (item.key && item.value) {
                        return item
                    }
                })
                console.log(emusList,'=========')
                let specs = emusList.reduce((pre, cur) => {
                    pre[cur.key.toString()] = cur.value
                    return pre
                }, {})
                value.specs = specs
                origin.content = value
            } else if (value.type == 'text') {

            } else if (value.type == 'double') {
                origin.content = value
            }
            sentReq(origin)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }
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
                                        rules={[{ required: true, message: 'Province is required' }]}
                                    >
                                        <Input style={{ width: '40%' }} />
                                    </Form.Item>
                                    <span style={{ margin: '0 10px' }}>至</span>
                                    <Form.Item
                                        name={['specs', 'max']}
                                        noStyle
                                        rules={[{ required: true, message: 'Street is required' }]}
                                    >
                                        <Input style={{ width: '40%' }} />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label='数值间隔'
                                name="jg"
                            ><Input /></Form.Item>
                            <Form.Item name={['specs', 'multiple']} label="倍数" >
                                <Select allowClear >
                                    <Option value="male">1</Option>
                                    <Option value="female">2</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['specs', 'unit']} label="单位" >
                                <Select allowClear >
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                    <Option value="other">other</Option>
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
                name="selectRel"
            >
                <Radio.Group >
                    <Radio value="one">可下发可上报</Radio>
                    <Radio value="two">可下发</Radio>
                    <Radio value="three">可上报</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}
NumberTemp = forwardRef(NumberTemp)
//事件组件
function EventTemp(props, ref) {
    const [form] = Form.useForm();
    const onFinish = () => {
        form.validateFields().then(value => {
            console.log(value, '======')
            // 验证通过后进入
        }).catch(err => {
            // 验证不通过时进入
            console.log(err);
        });
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    const eventTabOptions = [{ label: '故障', value: 'one' },
    { label: '告警', value: 'two' },
    { label: '信息', value: 'three' }]
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            span: 16, offset: 8
        },
    };
    return (
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
                name="username"
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
                name="password1"
            ><Input />
            </Form.Item>
            <Form.Item
                label="事件类型："
                name="password"
            >
                <Radio.Group options={eventTabOptions} />
            </Form.Item>
            <Form.List
                name="arrs"
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '输出参数' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                >
                                    <Input placeholder="passenger name" style={{ width: '80%', marginRight: '10px' }} />
                                </Form.Item>
                                {fields.length ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item {...(fields.length === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={fields.length === 0 ? '输出参数' : ''}>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                添加参数
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    )
}
EventTemp = forwardRef(EventTemp)
//服务组件
function ServeTemp(props, ref) {
    const [form] = Form.useForm();
    const onFinish = () => {
        form.validateFields().then(value => {
            // 验证通过后进入
        }).catch(err => {
            // 验证不通过时进入
            console.log(err);
        });
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    const eventTabOptions = [{ label: '故障', value: 'one' },
    { label: '告警', value: 'two' },
    { label: '信息', value: 'three' }]
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            span: 16, offset: 8
        },
    };
    return (
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
                name="username"
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
                name="password"
            ><Input />
            </Form.Item>
            <Form.Item
                label="事件类型："
                name="password"
            >
                <Radio.Group options={eventTabOptions} />
            </Form.Item>
            <Form.List
                name="names"
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '输出参数' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                >
                                    <Input placeholder="passenger name" style={{ width: '190px', marginRight: '10px' }} />
                                </Form.Item>
                                {fields.length ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item {...(fields.length === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={fields.length === 0 ? '输出参数' : ''}>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                添加参数
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.List
                name="names2"
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '输入参数' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                >
                                    <Input placeholder="passenger name" style={{ width: '190px', marginRight: '10px' }} />
                                </Form.Item>
                                {fields.length ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item {...(fields.length === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={fields.length === 0 ? '输出参数' : ''}>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                添加参数
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>

        </Form>
    )
}
ServeTemp = forwardRef(ServeTemp)

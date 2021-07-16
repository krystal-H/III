import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import moment from 'moment';
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './editInfo.scss'
const optionsWithDisabled = [
    { label: '属性', value: 'one' },
    { label: '事件', value: 'two' },
    { label: '服务', value: 'three' },
]
export default function ProtocoLeft({ rightVisible, onCloseRight }) {
    const { TabPane } = Tabs;
    useEffect(() => {
    }, [])
    const [currentTab, setCurrentTab] = useState('one')
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
    //提交数据
    const subData = () => {
        if (currentTab == 'one') {
            oneRef.current.onFinish()
        } else if (currentTab == 'two') {
            twoRef.current.onFinish()
        } else if (currentTab == 'three') {
            threeRef.current.onFinish()
        }
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
            <div className='edit-left-protocol-wrap'> <Tabs activeKey={currentTab} defaultActiveKey="one" renderTabBar={renderTabBar}>
                <TabPane tab="Tab 1" key="one">
                    <NumberTemp ref={oneRef} ></NumberTemp>
                </TabPane>
                <TabPane tab="Tab 2" key="two">
                    <EventTemp ref={twoRef}></EventTemp>
                </TabPane>
                <TabPane tab="Tab 3" key="three">
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
function NumberTemp(props, ref) {
    const [form] = Form.useForm();
    const onFinish = () => {
        form.validateFields().then(value => {
            // 验证通过后进入
            const { name, age } = value;
            console.log(name, age); // dee 18
        }).catch(err => {
            // 验证不通过时进入
            console.log(err);
        });
    }
    //数据类型
    const dataOptions = [{
        value: 'a',
        label: '布尔型',
    }, {
        value: 'b',
        label: '枚举型',
    }, {
        value: 'c',
        label: '字符型',
    }, {
        value: 'd',
        label: '数值型',
    }]
    //数据类型改变
    const onTypeChange = (value) => {
        console.log(value, '改变')
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
                name="gn"
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
                name="bs"
            ><Input />
            </Form.Item>
            {/* <Form.Item label="数据长度">
                <Space>
                    <Form.Item
                        noStyle
                        name="cd"
                    ><Input /></Form.Item>
                    <span>字节</span>
                </Space>
            </Form.Item> */}
            <Form.Item
                label="数据类型："
                name="sjty"
            >
                <Select allowClear onChange={onTypeChange}>
                    {
                        dataOptions.map(item => (
                            <Option key={item.value} value={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.sjty !== currentValues.sjty}
            >
                {({ getFieldValue }) => {
                    if (getFieldValue('sjty') === 'a') {
                        return (<>
                            <Form.Item
                                label="布尔值"
                                rules={[{ required: true }]}
                            >
                                <Form.Item
                                    name="year"
                                    label="0"
                                >
                                    <Input placeholder="参数描述" />
                                </Form.Item>
                                <Form.Item
                                    name="month"
                                    label="1"
                                >
                                    <Input placeholder="参数描述" />
                                </Form.Item>
                            </Form.Item>
                        </>)
                    }
                    if (getFieldValue('sjty') === 'b') {
                        return (
                            <>
                                <Form.Item
                                    label="枚举型:"
                                    name="enumus_text"
                                    className='enums-lise-nobottom'
                                ><span style={{ marginRight: '50px' }}>参数值</span>-<span style={{ marginLeft: '30px' }}>参数描述</span>
                                </Form.Item>

                                <div className='right-list-wrap' >
                                    <Form.List name="userss">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'first']}
                                                            fieldKey={[fieldKey, 'first']}
                                                            className='enums-lise-nobottom'
                                                            noStyle
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <span>-</span>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'last']}
                                                            fieldKey={[fieldKey, 'last']}
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
                    if (getFieldValue('sjty') === 'd') {
                        return (<>
                            <Form.Item label="数值范围">
                                <div className='number-input-wrap'>
                                    <Form.Item
                                        name={['address', 'province1']}
                                        noStyle
                                        rules={[{ required: true, message: 'Province is required' }]}
                                    >
                                        <Input style={{ width: '40%' }} />
                                    </Form.Item>
                                    <span style={{ margin: '0 10px' }}>至</span>
                                    <Form.Item
                                        name={['address', 'street1']}
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
                            <Form.Item name="bs" label="倍数" >
                                <Select allowClear >
                                    <Option value="male">1</Option>
                                    <Option value="female">2</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="dw" label="单位" >
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

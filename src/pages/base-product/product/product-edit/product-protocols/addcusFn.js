import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Form, Input, Button, Space, Select, Radio, Tabs } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './editInfo.scss'
const optionsWithDisabled = [
    { label: '属性', value: 'one' },
    { label: '事件', value: 'two' },
    { label: '服务', value: 'three' },
]
export default function ProtocolDelete() {
    const { TabPane } = Tabs;
    useEffect(() => {
    }, [])
    const [currentTab, setCurrentTab] = useState('one')
    const tabChange = (e) => {
        setCurrentTab(e.target.value)
    }
    //tab切换
    // const getTemp = () => {
    //     if (currentTab == 'one') {
    //         return <Test></Test>
    //     } else if (currentTab == 'two') {
    //         return <EventTemp></EventTemp>
    //     } else if (currentTab == 'three') {
    //         return <ServeTemp />
    //     }
    // }
    const renderTabBar = (props, DefaultTabBar) => {
        const tabInfo = [];
        console.log(props, '=====')
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
    return <div className='edit-protocol-wrap'>
        {/* <div className='addcus-tab'> <Radio.Group buttonStyle="solid" optionType="button" value={currentTab} onChange={tabChange} options={optionsWithDisabled} /></div> */}
        <Tabs activeKey={currentTab} defaultActiveKey="one" renderTabBar={renderTabBar}>
            <TabPane tab="Tab 1" key="one">
                <NumberTemp></NumberTemp>
            </TabPane>
            <TabPane tab="Tab 2" key="two">
                <EventTemp></EventTemp>
            </TabPane>
            <TabPane tab="Tab 3" key="three">
                <ServeTemp />
            </TabPane>
        </Tabs>
    </div>
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
function NumberTemp() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    //数据类型
    const dataOptions = [{
        value: 'a',
        label: '布尔型',
    }, {
        value: 'n',
        label: '枚举型',
    }, {
        value: 'b',
        label: '字符型',
    }, {
        value: 'd',
        label: '数值型',
    }]
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
            onFinish={onFinish}
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
                label="数据类型："
                name="password"
            >
                <Select allowClear >
                    {
                        dataOptions.map(item => (
                            <Option key={item.value} value={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
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
                label="数据间隔"
                name="username"
            >
                <Input />
            </Form.Item>

            <Form.Item name="gender" label="倍数" rules={[{ required: true }]}>
                <Select allowClear >
                    <Option value="male">100</Option>
                    <Option value="female">female</Option>
                </Select>
            </Form.Item>
            <Form.Item name="gender" label="单位" >
                <Select allowClear >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item label="枚举值">
                <div className='number-input-wrap'>
                </div>
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
//事件组件
function EventTemp() {
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
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
//服务组件
function ServeTemp() {
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
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

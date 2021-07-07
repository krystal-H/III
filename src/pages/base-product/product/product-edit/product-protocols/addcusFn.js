import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Form, Input, Button, Tag, Select, Radio } from 'antd';
import './editInfo.scss'
const optionsWithDisabled = [
    { label: '属性', value: 'Apple' },
    { label: '事件', value: 'Pear' },
    { label: '服务', value: 'Orange' },
]
export default function ProtocolDelete() {
    useEffect(() => {
    }, [])
    const [currentTab, setCurrentTab] = useState('Apple')
    const tabChange = (e) => {
        setCurrentTab(e.target.value)
    }
    return <div className='edit-protocol-wrap'>
        <div className='addcus-tab'> <Radio.Group buttonStyle="solid" optionType="button" value={currentTab} onChange={tabChange} options={optionsWithDisabled} /></div>
        <NumberTemp></NumberTemp>
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
                <div>{
                    tagArr.map((item, index) => {
                        return (<Tag onClose={() => handleClose(item)} key={index} closable>
                            {item}
                        </Tag>)
                    })
                }
                    {
                        showAdd ? (<Button type="primary" ghost onClick={openAdd}>
                            添加
                        </Button>) : (<Search
                            allowClear
                            enterButton="确定"
                            size="middle"
                            onSearch={confirmAdd}
                        />)
                    }</div>
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
function NumberTemp() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    <Option value="male">数值型</Option>
                    <Option value="female1">枚举型</Option>
                    <Option value="female2">布尔型</Option>
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
                <div>{
                    tagArr.map((item, index) => {
                        return (<Tag onClose={() => handleClose(item)} key={index} closable>
                            {item}
                        </Tag>)
                    })
                }
                    {
                        showAdd ? (<Button type="primary" ghost onClick={openAdd}>
                            添加
                        </Button>) : (<Search
                            allowClear
                            enterButton="确定"
                            size="middle"
                            onSearch={confirmAdd}
                        />)
                    }</div>
                    {/* <Form.Item
                        name={['address', 'province']}
                        noStyle
                        rules={[{ required: true, message: 'Province is required' }]}
                    >
                        <Input  placeholder='参考值' />
                    </Form.Item>
                    <span>-</span>
                    <Form.Item
                        name={['address', 'street']}
                        noStyle
                        rules={[{ required: true, message: 'Street is required' }]}
                    >
                        <Input  placeholder='参数描述'/>
                    </Form.Item>
                    <Button type="primary">确定</Button> */}
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
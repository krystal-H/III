import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Input, Select, Form, Steps, Radio, Tabs } from 'antd';
import './addModal.scss'
import LabelTip from '../../../components/form-com/LabelTip';
const { Step } = Steps;
const { TabPane } = Tabs;
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {
    const [currentTab, setCurrentTab] = useState(0)
    const refOne = useRef(null), refTwo = useRef(null), refThree = useRef(null)
    const next = () => {
        setCurrentTab(currentTab + 1);
    };

    const prev = () => {
        setCurrentTab(currentTab - 1);
    };
    //提交数据
    const subData = () => {
    }
    //底部
    const footer = [<div key='1'>
        {currentTab > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一步
            </Button>
        )}
        {currentTab < 2 && (
            <Button type="primary" onClick={() => next()}>
                下一步
            </Button>
        )}
        {currentTab === 2 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                完成
            </Button>
        )}
    </div>]
    return (
        <Modal title="新增订阅" visible={isModalVisible} onOk={subData} onCancel={cancelModel}
            width='900px' wrapClassName='add-subscribe-modal'
            footer={footer}>
            <div className='add-subscribe'>
                <Steps current={currentTab}>
                    <Step title="选择订阅对象" />
                    <Step title="配置订阅内容" />
                    <Step title="确定订阅方式" />
                </Steps>
                <div className='add-subscribe-main'>
                    {currentTab === 0 && (
                        <StepContentOne ref={refOne} />
                    )}
                    {currentTab === 1 && (
                        <StepContentTwo ref={refTwo} />
                    )}
                    {currentTab === 2 && (
                        <StepContentThree ref={refThree} />
                    )}
                </div>
            </div>
        </Modal>
    )
}
function StepContentOne(props, ref) {
    const [form] = Form.useForm();
    useImperativeHandle(ref, () => ({

    }));
    return (<div className='step-one'>
        <Form form={form} labelAlign='right'>
            <Form.Item
                name="select"
                label="订阅名称"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="select"
                label="归属产品"
                rules={[{ required: true }]}
            >
                <Select >
                    <Select.Option value="china">China</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="radio-group" label="选择设备">
                <Radio.Group>
                    <Radio value="a">全部设备</Radio>
                    <Radio value="b">根据标签筛选设备</Radio>
                </Radio.Group>
            </Form.Item>
            {
                form.getFieldValue('radio-group') === 'a' && (<Form.Item name="address" label="">
                    <div>
                        <div>标签</div>
                    </div>
                </Form.Item>)
            }

        </Form>
    </div>)
}
StepContentOne = forwardRef(StepContentOne)
function StepContentTwo(props, ref) {
    useImperativeHandle(ref, () => ({
    }));
    return (<div className='step-two'>
        <div className='product-title'>已选择产品：睡眠监测器Light2.0</div>
        <div className='select-tip'>选择协议类型</div>
        <Tabs defaultActiveKey="1" >
            <TabPane tab="属性" key="1">
                Content of Tab Pane 1
            </TabPane>
            <TabPane tab="事件" key="2">
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab="服务" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    </div>)
}
StepContentTwo = forwardRef(StepContentTwo)
function StepContentThree(props, ref) {
    const [form] = Form.useForm();
    useImperativeHandle(ref, () => ({
    }));
    return (<div className='step-one'>
        <Form form={form} labelAlign='right'>
            <Form.Item name="radio-group" label="订阅方式" rules={[{ required: true }]}>
                <Radio.Group>
                    <Radio value="a">API数据PUSH形式</Radio>
                    <Radio value="b">MQTT主题订阅</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="select"
                label={<LabelTip label="数据订阅URL" tip="第三方云服务接口的唯一标识，供C-life云推送服务给第三方云推送数据使用，现仅支持http方式"/>}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="select"
                label={<LabelTip label="Token" tip="第三方云服务接口对接C-life云推送服务的凭证，用来验证厂商服务接口的合法性"/>}
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <a>订阅帮助文档</a>
            </Form.Item>
        </Form>
    </div>)
}
StepContentThree = forwardRef(StepContentThree)
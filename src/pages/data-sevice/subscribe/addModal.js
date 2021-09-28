import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Input, Select, Form, Steps, Radio, Tabs, Table, Checkbox } from 'antd';
import './addModal.scss'
import LabelTip from '../../../components/form-com/LabelTip';
import { post, Paths, get } from '../../../api';
import { cloneDeep } from "lodash";
const { Step } = Steps;
const { TabPane } = Tabs;
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {
    const [currentTab, setCurrentTab] = useState('0')
    const [subObj, setSubObj] = useState({
        one: {},
        two: {},
        three: {}
    })
    const refOne = useRef(null), refTwo = useRef(null), refThree = useRef(null)
    const next = () => {
        if (currentTab == 0) {
            refOne.current.onFinish()
        } else if (currentTab == 1) {
            refTwo.current.onFinish()
        }
    };

    const prev = () => {
        setCurrentTab((currentTab - 0 - 1).toString());
    };
    //提交数据
    const subData = () => {
        refThree.current.onFinish()
    }
    //底部
    const footer = [<div key='a'>
        {currentTab - 0 > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一步
            </Button>
        )}
        {currentTab - 0 < 2 && (
            <Button type="primary" onClick={() => next()}>
                下一步
            </Button>
        )}
        {currentTab - 0 === 2 && (
            <Button type="primary" onClick={() => { subData() }}>
                完成
            </Button>
        )}
    </div>]
    //tab自定义头部
    const renderTabBar = (props, DefaultTabBar) => {
        return (<Steps current={currentTab - 0}>
            <Step title="选择订阅对象" />
            <Step title="配置订阅内容" />
            <Step title="确定订阅方式" />
        </Steps>)
    }
    const continueStep = (val, data) => {
        if (currentTab == 0) {
            setSubObj(pre => {
                let obj = cloneDeep(pre)
                obj.one = cloneDeep(data)
                return obj
            })
        } else if (currentTab == 1) {
            setSubObj(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                obj.two = cloneDeep(data)
                return obj
            })
        }
        setCurrentTab(val);
    }
    const finishSub = (val) => {
        let params = {
            ...subObj.one,
            devicePushDataConfList: subObj.two,
            ...val
        }
        post(Paths.addsubscribe, params).then((res) => {
            colseMoadl()
        });
    }
    return (
        <Modal title="新增订阅" visible={isModalVisible} onCancel={cancelModel}
            width='900px' wrapClassName='add-subscribe-modal'
            footer={footer}>
            <div className='add-subscribe'>
                <div className='add-subscribe-main'>
                    <div className='edit-left-protocol-wrap'> <Tabs activeKey={currentTab} renderTabBar={renderTabBar}>
                        <TabPane tab="Tab 1" key="0">
                            <StepContentOne ref={refOne} continueStep={continueStep} />
                        </TabPane>
                        <TabPane tab="Tab 2" key="1">
                            <StepContentTwo ref={refTwo} continueStep={continueStep} oneData={subObj.one} />
                        </TabPane>
                        <TabPane tab="Tab 3" key="2" >
                            <StepContentThree ref={refThree} finishSub={finishSub} />
                        </TabPane>
                    </Tabs>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
function StepContentOne({ continueStep }, ref) {
    const [form] = Form.useForm();
    const [option, setOption] = useState([])
    const [laberArr, setLaberArr] = useState([])//标签
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        post(Paths.getProductPlus).then((res) => {
            setOption(res.data)
        });
    }
    const onFinish = () => {
        form.validateFields().then(formData => {
            let res = cloneDeep(formData)
            let name = ''
            option.forEach(item => {
                if (item.productId == res.productId) {
                    name = item.productName
                }
            })
            if (res.labelVoList && res.labelVoList.length) {
                let laberA = []
                laberArr.forEach(item => {
                    if (res.labelVoList.indexOf(item.value) > -1) {
                        laberA.push(item)
                    }
                })
                res.labelVoList = laberA
            }
            res.productName = name;
            continueStep('1', res)
        })
    }
    //获取标签
    const productIdChange = (val) => {
        post(Paths.getLabelByAddress, { productId: val }).then((res) => {
            let arr = []
            res.data.forEach(item => {
                arr.push({ ...item, label:  item.labelValue, value: item.id })
            })
            setLaberArr(arr)
        });
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    return (<div className='step-one'>
        <Form form={form} labelAlign='right'>
            <Form.Item
                name="subscription"
                label="订阅名称"
                rules={[{ required: true, whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="productId"
                label="归属产品"
                rules={[{ required: true }]}
            >
                <Select onChange={productIdChange} showSearch optionFilterProp="children" filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    {
                        option.map(item => {
                            return <Select.Option value={item.productId} key={item.productId}>{item.productName}</Select.Option>
                        })
                    }

                </Select>
            </Form.Item>
            <Form.Item name="all" label="选择设备">
                <Radio.Group >
                    <Radio value={true}>全部设备</Radio>
                    <Radio value={false}>根据标签筛选设备</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.all !== currentValues.all}
            >
                {({ getFieldValue }) =>
                    getFieldValue('all') == false ? (
                        <Form.Item name="labelVoList" label="选择标签">
                            <Checkbox.Group options={laberArr} />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
        </Form>
    </div>)
}
StepContentOne = forwardRef(StepContentOne)
function StepContentTwo({ continueStep, oneData }, ref) {
    const columns = [
        {
            title: '数据名称',
            dataIndex: 'funcName',
            key: 'funcName',
        },
        {
            title: '数据标识',
            dataIndex: 'funcIdentifier',
            key: 'funcIdentifier',
        }
    ];
    const [option, setOption] = useState({
        one: [],
        two: [],
        three: []
    })
    const [currentTab, setCurrentTab] = useState('a')
    const [oneArr, setOneArr] = useState([])
    const [twoArr, setTwoArr] = useState([])
    const [threeArr, setThreeArr] = useState([])
    const tabChange = val => {
        setCurrentTab(val)
    }
    useEffect(() => {
        getList()
    }, [oneData.productId])
    //初始化
    const getList = () => {
        setOneArr([])
        setTwoArr([])
        setThreeArr([])
        post(Paths.standardFnList, { productId: oneData.productId }).then((res) => {
            let data = res.data.standard.concat(res.data.custom)
            let obj = {}
            obj.one = data.filter(item => {
                if (item.funcType === 'properties') {
                    return item
                }
            })
            obj.two = data.filter(item => {
                if (item.funcType === 'event') {
                    return item
                }
            })
            obj.three = data.filter(item => {
                if (item.funcType === 'services') {
                    return item
                }
            })
            setOption(obj)
        });
    }
    //勾选
    const rowSelection1 = {

        onChange: (selectedRowKeys, selectedRows) => {
            let arr = []
            selectedRows.forEach(item => {

                let obj = {
                    "dataType": 5,
                    "dataTypeScope": selectedRows.length == option.one.length ? 2 : 1,
                    protocolProperty: item.funcIdentifier
                }
                arr.push(obj)
            })
            setOneArr(arr)
        },
        getCheckboxProps: (record) => ({
            // Column configuration not to be checked
            funcIdentifier: record.funcIdentifier,
        }),
    };
    const rowSelection2 = {
        onChange: (selectedRowKeys, selectedRows) => {
            let arr = []
            selectedRows.forEach(item => {
                let obj = {
                    "dataType": 6,
                    "dataTypeScope": selectedRows.length == option.two.length ? 2 : 1,
                    protocolProperty: item.funcIdentifier
                }
                arr.push(obj)
            })
            setTwoArr(arr)
        },
        getCheckboxProps: (record) => ({
            // Column configuration not to be checked
            name: record.funcIdentifier,
        }),
    };
    const rowSelection3 = {
        onChange: (selectedRowKeys, selectedRows) => {
            let arr = []
            selectedRows.forEach(item => {
                let obj = {
                    "dataType": 7,
                    "dataTypeScope": selectedRows.length == option.three.length ? 2 : 1,
                    protocolProperty: item.funcIdentifier
                }
                arr.push(obj)
            })
            setThreeArr(arr)
        },
        getCheckboxProps: (record) => ({
            name: record.funcIdentifier,
        }),
    };
    const onFinish = () => {
        let arr = []
        if (currentTab == 'a') {
            arr = oneArr
        } else if (currentTab == 'b') {
            arr = twoArr
        } else {
            arr = threeArr
        }
        continueStep('2', arr)
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    return (<div className='step-two'>
        <div className='product-title'>已选择产品：{oneData.productName}</div>
        <div className='select-tip'>选择协议类型</div>
        <Tabs defaultActiveKey="a" activeKey={currentTab} onChange={tabChange}>
            <TabPane tab="属性" key="a">
                <Table rowSelection={{
                    ...rowSelection1,
                }} dataSource={option.one} columns={columns} rowKey='funcIdentifier' pagination={false} scroll={{ y: 300 }} />
            </TabPane>
            <TabPane tab="事件" key="b">
                <Table dataSource={option.two} rowSelection={{
                    ...rowSelection2,
                }} columns={columns} rowKey='funcIdentifier' pagination={false} scroll={{ y: 300 }} />
            </TabPane>
            <TabPane tab="服务" key="c">
                <Table dataSource={option.three} rowSelection={{
                    ...rowSelection3,
                }} columns={columns} rowKey='funcIdentifier' pagination={false} scroll={{ y: 300 }} />
            </TabPane>
        </Tabs>
    </div>)
}
StepContentTwo = forwardRef(StepContentTwo)
function StepContentThree({ finishSub }, ref) {
    const [form] = Form.useForm();
    const onFinish = () => {
        form.validateFields().then(val => {
            finishSub(val)
        })
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    const [showWay, setShowWay] = useState('0')
    const radioChange = (e) => {
        setShowWay(e.target.value);
    }
    return (<div className='step-one'>
        <Form form={form} labelAlign='right'>
            <Form.Item name="pushWay" label="订阅方式" rules={[{ required: true, message: '请选择订阅方式' }]}>
                <Radio.Group onChange={radioChange}>
                    <Radio value="0">API数据PUSH形式</Radio>
                    <Radio value="1">MQTT主题订阅</Radio>
                </Radio.Group>
            </Form.Item>
            {
                showWay === '0' && <Form.Item
                    name="url"
                    label={<LabelTip label="数据订阅URL" tip="第三方云服务接口的唯一标识，供C-life云推送服务给第三方云推送数据使用，现仅支持http方式" />}
                    rules={[{ required: true, whitespace: true, message: '请输入数据订阅URL' }]}
                >
                    <Input />
                </Form.Item>
            }
            {
                showWay === '0' && <Form.Item
                    name="pushToken"
                    label={<LabelTip label="Token" tip="第三方云服务接口对接C-life云推送服务的凭证，用来验证厂商服务接口的合法性" />}
                    rules={[{ required: true, whitespace: true, message: '请输入Token' }]}
                >
                    <Input />
                </Form.Item>
            }
            <Form.Item label=" " colon={false}>
                <a>订阅帮助文档</a>
            </Form.Item>
        </Form>
    </div>)
}
StepContentThree = forwardRef(StepContentThree)
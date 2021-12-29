import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button, Input, Select, Form, Steps, Radio, Tabs, TimePicker, Checkbox } from 'antd';
import './addModal.scss'
import LabelTip from '../../../components/form-com/LabelTip';
import { post, Paths } from '../../../api';
import { cloneDeep } from "lodash";
import { Notification } from '../../../components/Notification'
import moment from 'moment';
const { Step } = Steps;
const { TabPane } = Tabs;
const { TextArea } = Input;
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel, editData, actionType }) {
    const [currentTab, setCurrentTab] = useState('0')
    const [subObj, setSubObj] = useState({
        one: {},
        two: {},
        three: {}
    })
    const refOne = useRef(null), refTwo = useRef(null), refThree = useRef(null)
    const next = () => {
        if (currentTab === '0') {
            refOne.current.onFinish()
        } else if (currentTab === '1') {
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
    //下一步
    const continueStep = (val, data) => {
        if (currentTab === '0') {
            setSubObj(pre => {
                let obj = cloneDeep(pre)
                obj.one = cloneDeep(data)
                return obj
            })
        } else if (currentTab === '1') {
            setSubObj(pre => {
                let obj = cloneDeep(pre)
                obj.two = cloneDeep(data)
                return obj
            })
        }
        setCurrentTab(val);
    }
    //提交
    const finishSub = (val) => {
        let params = {
            ...subObj.one,
            ...subObj.two,
            ...val
        }
        console.log('====55======', params)
        if (actionType === 'edit') {
            params.urlConfId = editData.urlConfId
        }
        // return
        post(Paths.addsubscribe, params, { loading: true }).then((res) => {
            colseMoadl()
        });
    }
    return (
        <Modal title={actionType === 'edit' ? '编辑订阅' : "新增订阅"} visible={isModalVisible} onCancel={cancelModel}
            width='900px' wrapClassName='add-subscribe-modal'
            footer={footer} maskClosable={false}>
            <div className='add-subscribe'>
                <div className='add-subscribe-main'>
                    <div className='edit-left-protocol-wrap'> <Tabs activeKey={currentTab} renderTabBar={renderTabBar}>
                        <TabPane tab="Tab 1" key="0">
                            <StepContentOne ref={refOne} continueStep={continueStep} editData={editData} actionType={actionType} />
                        </TabPane>
                        <TabPane tab="Tab 2" key="1">
                            <StepContentTwo ref={refTwo} continueStep={continueStep} editData={editData} actionType={actionType} />
                        </TabPane>
                        <TabPane tab="Tab 3" key="2" >
                            <StepContentThree ref={refThree} finishSub={finishSub} editData={editData} actionType={actionType} />
                        </TabPane>
                    </Tabs>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
//第一步
function StepContentOne({ continueStep, actionType, editData }, ref) {
    const [form] = Form.useForm();
    const [laberArr, setLaberArr] = useState([])//标签列表
    const [projectArr, setProjectArr] = useState([])//项目列表
    const [subType, setSubType] = useState(1) //产品or项目
    const [productType1, setproductType1] = useState([])//选择项目时的产品列表
    const [productType2, setproductType2] = useState([])//选择产品时的产品列表
    useEffect(() => {
        getList()
        if (actionType === 'edit') {
            setSubType(editData.subscriptType)
            if (editData.subscriptType === 1) {
                let obj = {
                    subscriptName: editData.subscriptName,
                    productId: editData.productId,
                    isAllDevice: editData.isAllDevice,
                    projectId: editData.projectId,
                    subscriptType: editData.subscriptType,
                }
                projectIdChange2(editData.projectId)
                form.setFieldsValue(obj)
            } else {
                let arr = []
                if (editData.deviceLabelIds) {
                    // editData.labelVoList.forEach(item => {
                    //     arr.push(item.labelId)
                    // })
                    arr=editData.deviceLabelIds.split(',')
                }
                form.setFieldsValue(
                    {
                        subscriptName: editData.subscriptName,
                        subscriptType: editData.subscriptType,
                        productId: editData.productId,
                        isAllLabel: editData.isAllLabel,
                        labelVoList: arr
                    }
                )
            }

        }
    }, [])
    const getList = () => {
        //获取订阅产品时的产品列表
        post(Paths.allProductPubList).then((res) => {
            setproductType2(res.data)
        });
        //获取项目列表
        post(Paths.projectList, { pageIndex: 1, pageRows: 100 }).then((res) => {
            setProjectArr(res.data.list)
        });
    }
    //下一步
    const onFinish = () => {
        form.validateFields().then(formData => {
            let res = cloneDeep(formData)
            let arr = formData.subscriptType === 1 ? productType1 : productType2
            let productIndex = arr.find(item => {
                return item.productId === res.productId
            })
            let name = productIndex.productName
            if(res.subscriptType === 1){
                let projectIndex = projectArr.find(item => {
                    return item.projectId  === res.projectId 
                })
                res.projectName =projectIndex.projectName
            }
            if (res.subscriptType === 2) {
                // let laberA = []
                // laberArr.forEach(item => {
                //     if (res.isAllLabel) {
                //         laberA.push(item)
                //     } else {
                //         if (res.labelVoList && res.labelVoList.indexOf(item.value) > -1) {
                //             laberA.push(item)
                //         }
                //     }

                // })
                res.deviceLabelIds = res.labelVoList.join(',')
            }
            res.productName = name;
            continueStep('1', res)
        })
    }
    //获取标签
    const productIdChange = (val) => {
        form.setFieldsValue({
            labelVoList: []
        });
        post(Paths.getLabelByAddress, { productId: val }).then((res) => {
            let arr = []
            res.data.forEach(item => {
                arr.push({ ...item, label: item.labelValue, value: item.labelId, id: item.labelId })
            })
            setLaberArr(arr)
        });
    }
    //获取产品
    const projectIdChange = (val) => {
        let params = {
            clientId: 'open',
            projectId: val
        }
        setproductType1([])
        form.setFieldsValue(
            {
                productId: '',
            }
        )
        post(Paths.getProductByProject, params).then((res) => {
            setproductType1(res.data)
        });
    }
    //编辑初始化
    const projectIdChange2 = (val) => {
        let params = {
            clientId: 'open',
            projectId: val
        }
        post(Paths.getProductByProject, params).then((res) => {
            setproductType1(res.data)
        });
    }
    //勾选产品的dom
    const getSelectDom = () => {
        let selectData = form.getFieldValue('subscriptType') === 1 ? productType1 : productType2
        return <Select onChange={productIdChange} showSearch optionFilterProp="children" filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
            {
                selectData.map(item => {
                    return <Select.Option value={item.productId} key={item.productId}>{item.productName}</Select.Option>
                })
            }
        </Select>
    }
    //订阅的类型改变
    const subTYpeChange = val => {
        setSubType(val)
        form.setFieldsValue({ productId: '' })
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }), [laberArr, projectArr, productType2, productType1]);
    return (<div className='step-one'>
        <Form form={form} labelAlign='right' initialValues={{ subscriptType: 1 }}>
            <Form.Item
                name="subscriptName"
                label="订阅名称"
                rules={[{ required: true, whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="subscriptType" label="分类" rules={[{ required: true }]}>
                <Radio.Group onChange={e => subTYpeChange(e.target.value)}>
                    <Radio value={1}>项目</Radio>
                    <Radio value={2}>产品</Radio>
                </Radio.Group>
            </Form.Item>
            {
                subType === 1 ? <Form.Item
                    name="projectId"
                    label="选择项目"
                    rules={[{ required: true, message: '请选择项目' }]}
                >
                    <Select onChange={projectIdChange} showSearch optionFilterProp="children" filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                        {
                            projectArr.map(item => {
                                return <Select.Option value={item.projectId} key={item.projectId}>{item.projectName}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item> : null
            }
            <Form.Item
                name="productId"
                label="选择产品"
                rules={[{ required: true, message: '请选择产品' }]}
            >
                {
                    getSelectDom()
                }
                {/* <Select onChange={productIdChange} showSearch optionFilterProp="children" filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    {
                        option.map(item => {
                            return <Select.Option value={item.productId} key={item.productId}>{item.productName}</Select.Option>
                        })
                    }
                </Select> */}
            </Form.Item>
            {
                subType === 1 ? <>
                    <Form.Item name="isAllDevice" label="选择设备" initialValue={1} rules={[{ required: true }]}>
                        <Radio.Group >
                            <Radio value={1}>全部设备</Radio>
                            <Radio value={2}>指定设备</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.isAllDevice !== currentValues.isAllDevice}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('isAllDevice') === 2 ? (
                                <Form.Item name="deviceIds" label=" " colon={false}>
                                    <TextArea placeholder='请输入此项目下产品的设备mac/imei/SN号或者设备ID' />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                </> : <>
                    <Form.Item name="isAllLabel" label="选择设备" initialValue={1} rules={[{ required: true }]}>
                        <Radio.Group >
                            <Radio value={1}>全部设备</Radio>
                            <Radio value={0}>根据标签筛选设备</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.isAllLabel !== currentValues.isAllLabel}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('isAllLabel') === 0 ? (
                                <Form.Item name="labelVoList" label="选择标签">
                                    <Checkbox.Group options={laberArr} />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item></>
            }

        </Form>
    </div>)
}
StepContentOne = forwardRef(StepContentOne)
function StepContentTwo({ continueStep, actionType, editData }, ref) {
    const [form] = Form.useForm();
    const [laberArr, setLaberArr] = useState([])//设备事件列表
    const formlayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    useEffect(() => {
        //获取事件列表
        post(Paths.getDeviceEvent).then((res) => {
            let source = res.data || []
            let data = source.map(item => {
                return {
                    label: item.deviceEventName,
                    value: item.deviceEventId
                }
            })
            setLaberArr(data)
            setLaberArr(data)
        });
        if (actionType === 'edit') {
            // console.log(editData, 'editDataeditDataeditData')
            let eventIds = editData.eventIds.split(',').map(item => {
                return Number(item)
            })
            let timeRange = editData.businessTime.split('-').map(item => {
                return moment(item, 'HH:mm')
            })
            let obj = {
                timeRange,
                eventIds: eventIds
            }
            form.setFieldsValue(obj)
        }
    }, [])
    //下一步
    const onFinish = () => {
        form.validateFields().then(val => {
            let params = {
                businessTime: val.timeRange[0].format('HH:mm') + '-' + val.timeRange[1].format('HH:mm'),
                eventIds: val.eventIds.join(',')
            }
            continueStep('2', params)
        })
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }), []);
    return (<div className='step-two'>
        <Form form={form} labelAlign='right' {...formlayout}>
            <Form.Item name="eventIds" label="选择设备事件" rules={[{ required: true, message: '请选择设备事件' }]}>
                <Checkbox.Group options={laberArr} />
            </Form.Item>
            <Form.Item name="timeRange" label="选择业务发生时间" rules={[{ required: true, message: '请选择业务发生时间' }]}>
                <TimePicker.RangePicker format='HH:mm' />
            </Form.Item>
        </Form>
    </div>)
}
StepContentTwo = forwardRef(StepContentTwo)
function StepContentThree({ finishSub, actionType, editData }, ref) {
    const [form] = Form.useForm();
    const onFinish = () => {
        form.validateFields().then(val => {
            finishSub(val)
        })
    }
    useImperativeHandle(ref, () => ({
        onFinish: onFinish
    }));
    //推送方式
    const [showWay, setShowWay] = useState(1)
    const radioChange = (e) => {
        setShowWay(e.target.value);
    }
    //是否加密
    const encryChange = (e) => {
    }
    const downFile = () => {
        window.open("http://skintest.hetyj.com/10086/a9b97e2ef3c7465bb79b63374cbd4dd8.docx")
    }
    const downSDk = () => {
        Notification({
            type: 'info',
            description: '敬请期待',
        });
    }
    useEffect(() => {
        if (actionType === 'edit') {
            setShowWay(editData.pushWay)
            let obj = {
                pushWay: editData.pushWay,
                pushFrequency: editData.pushFrequency
            }
            if (editData.pushWay === 1) {
                obj.pushUrl = editData.pushUrl
                obj.sign = editData.sign
            }
            form.setFieldsValue(obj)
        }
    }, [])
    return (<div className='step-one'>
        <Form form={form} labelAlign='right' initialValues={{ pushWay: 1 }}>
            <Form.Item name="pushWay" label="订阅方式" rules={[{ required: true, message: '请选择订阅方式' }]}>
                <Radio.Group onChange={radioChange}>
                    <Radio value={2}>MQTT主题订阅（推荐）</Radio>
                    <Radio value={1}>API数据PUSH形式</Radio>
                </Radio.Group>
            </Form.Item>
            {
                showWay === 1 ?
                    <>
                        <Form.Item name="isEncrypt" label="是否加密" rules={[{ required: true, message: '请选择是否加密' }]} initialValue={1}>
                            <Radio.Group onChange={encryChange}>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.isEncrypt !== currentValues.isEncrypt}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('isEncrypt') === 0 ? (
                                    <Form.Item label=" " colon={false} className='sub-text-link'>
                                        <a onClick={downSDk}>下载帮助文档</a>
                                    </Form.Item>
                                ) : <Form.Item label=" " colon={false} className='sub-text-link'>
                                    <a onClick={downSDk}>下载SDK&帮助文档</a>
                                </Form.Item>
                            }
                        </Form.Item>
                        <Form.Item
                            name="pushUrl"
                            label={<LabelTip label="数据订阅URL" tip="第三方云服务接口的唯一标识，供C-life云推送服务给第三方云推送数据使用，现仅支持http方式" />}
                            rules={[{ required: true, whitespace: true, message: '请输入数据订阅URL' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sign"
                            label={<LabelTip label="Token" tip="第三方云服务接口对接C-life云推送服务的凭证，用来验证厂商服务接口的合法性" />}
                            rules={[{ required: true, whitespace: true, message: '请输入Token' }]}
                        >
                            <Input />
                        </Form.Item>
                    </> : <Form.Item label=" " colon={false} className='sub-text-link'>
                        <a onClick={downSDk}>下载SDK&帮助文档</a>
                    </Form.Item>
            }
            <Form.Item label="故障推送频率" name="pushFrequency"
                rules={[{ required: true, message: '请选择故障推送频率' }]} >
                <Radio.Group >
                    <Radio value={1}>每次触发推送</Radio>
                    <Radio value={2}>相同故障每小时推送1次</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    </div>)
}
StepContentThree = forwardRef(StepContentThree)
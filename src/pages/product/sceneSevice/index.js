import React, { useState, useEffect } from 'react'
import { Select, Steps, Button, Input, Table, Form } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import stepImg from '../../../assets/images/product-regist.png';
import { cloneDeep } from 'lodash';
import { post, Paths, get } from '../../../api';
// import { netStatus } from '../../../configs/text-map'
import { DateTool, getUrlParam } from '../../../util/util';
import { Notification } from '../../../components/Notification';
import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal';
import './index.scss'
import AddModal from './cusmoFn';
const { Option } = Select;
const { Step } = Steps;
const netStatus = [{
    value: '条件', key: true
}, {
    value: '任务', key: false
}]
//处理数据
function delaData(data, typeS) {
    let newData = []
    data.forEach(item => {
        if (!item.funcParamList || !item.funcParamList.length) return
        item.funcParamList.forEach(item2 => {
            let newItem = JSON.parse(JSON.stringify(item))
            newData.push({ ...newItem, ...item2 })
        })
    })
    newData.forEach((item, index) => {
        item.typeS = typeS
        item.key = index
    })
    return newData
}
export default function DeviceRegist() {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const [selectType, setSelectType] = useState('') //产品种类
    const [originData, setOriginData] = useState([])
    useEffect(() => {
        getProductType()
    }, [])
    //删除弹窗
    const [isDelVisible, setIsDelVisible] = useState(false)
    const [actionData, setActionData] = useState({})
    //打开删除弹窗
    const openDel = (data) => {
        setActionData(data)
        setIsDelVisible(true)
    }
    //确定删除数据
    const updateOkHandle = () => {
        function callBack() {
            Notification({
                type: 'success',
                description: '删除成功！',
            });
            setIsDelVisible(false)
            getList()
        }
        let url = ''
        if (actionData.typeS) {
            url = Paths.delScenceRun + '?statusQueryId=' + actionData.statusQueryId
        } else {
            url = Paths.delScenceControl + '?deviceFunctionId=' + actionData.deviceFunctionId
        }
        post(url).then((res) => {
            callBack()
        });

    }
    //取消删除数据
    const updateCancelHandle = () => {
        setIsDelVisible(false)
    }
    //产品种类列表
    const getProductType = () => {
        get(Paths.getProductType, {}, { loading: true }).then(({ data }) => {
            const productList = Object.keys(data).map(id => {
                return { productId: id, productName: data[id] }
            });
            // setDataList(productList)
            let id = getUrlParam('productId')
                if (id) {
                    setSelectType(id)
                    productList.forEach(item => {
                        if (id == item.productId) {
                            setProductName(item.productName)
                        }
                    })
                } else {
                    setSelectType(productList[0].productId)
                    setProductName(productList[0].productName)
                }
                setOptionArr(productList)
        });
        // post(Paths.getProductPlus, {}).then((res) => {
        //     if (res.data.length) {

        //         let id = getUrlParam('productId')
        //         if (id) {
        //             setSelectType(id)
        //             res.data.forEach(item => {
        //                 if (id == item.productId) {
        //                     setProductName(item.productName)
        //                 }
        //             })
        //         } else {
        //             setSelectType(res.data[0].productId)
        //             setProductName(res.data[0].productName)
        //         }
        //         setOptionArr(res.data)
        //     }
        // });
    }
    //产品改变
    const [productName, setProductName] = useState('')
    const selectChange = (value) => {

        setSelectType(value)
    }
    //搜索
    useEffect(() => {
        if (selectType) {
            getList()
            optionArr.forEach(item => {
                if (item.productId == selectType) {
                    setProductName(item.productName)
                }
            })
        }
    }, [selectType])
    //获取列表
    const getList = (loading = true) => {
        let params = {
            filter: true
        }
        params.productId = selectType
        if (!params.id || !params.id.trim()) {
            delete params.id
        }
        post(Paths.scenceList, params, { loading }).then((res) => {
            let arr1 = delaData(res.data.conditionFunc, true)
            let arr2 = delaData(res.data.controlFunc, false)
            // setDataSource(arr1.concat(arr2))
            setOriginData(arr1.concat(arr2))
            onSearch(arr1.concat(arr2))
        });
    }
    const onSearch = (data) => {
        let val = form.getFieldsValue()
        let arr = data ? cloneDeep(data) : cloneDeep(originData)
        if (typeof val.typeS == 'boolean') {
            arr = arr.filter(item => {
                if (val.typeS == item.typeS) {
                    return item
                }
            })
        }
        if (val.funcName && val.funcName.trim()) {
            arr = arr.filter(item => {
                if (item.funcName.indexOf(val.funcName.trim()) > -1) {
                    return item
                }
            })
        }
        setDataSource(arr)
    };
    //自定义
    const [modelVis, setModelVis] = useState(false)
    const openRegist = () => {
        setModelVis(true)
    }
    const cancelModel = () => {
        setModelVis(false)
    }
    const colseMoadl = (id) => {
        Notification({
            type: 'success',
            description: '提交成功！',
        });
        if(id == selectType){
            getList()
        }else{
            selectChange(id)
        }
        
        setModelVis(false)

    }
    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            render: (text, record) => (
                <span >{record.typeS ? '条件' : '任务'}</span>
            )
        },
        {
            title: '数据类型',
            dataIndex: 'dataTypCN',
            key: 'dataTypCN',
        },
        {
            title: '归属产品名称',
            dataIndex: 'authorityType',
            key: 'authorityType',
            render() {
                return <span>{productName}</span>
            }
        }, {
            title: '状态',
            dataIndex: 'statusDesc',
            key: 'statusDesc',
        }, {
            title: '功能名称',
            dataIndex: 'funcName',
            key: 'funcName',
        }, {
            title: '操作',
            dataIndex: 'activeTime',
            key: 'activeTime',
            render(text, row) {
                return <a onClick={() => { openDel(row) }}>删除</a>
            }
        }
    ];
    return (
        <div id='device-regist2'>
            <PageTitle title='场景服务'>
                <div className='top-select'>
                    <Select style={{ width: 200 }} value={selectType} onChange={selectChange} showSearch optionFilterProp="children">
                        {
                            optionArr.map(item => {
                                return (<Option value={item.productId} key={item.productId}>{item.productName}</Option>)
                            })
                        }
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox comm-setp-ttip'>
                <div className='step-title'>
                    <img src={stepImg} alt='' />
                    <span>配置场景步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="配置自动化" description="进入产品设备联动服务，配置自动化条件和动作" />
                    <Step title="验证自动化" description="可通过调试验证工具，对条件和动作进行功能验证。" />
                    <Step title="发布自动化" description="查看升级包各升级批次的具体设备列表，以及各设备的升级状态。" />
                    <Step title="配置场景" description="使用已发布的自动化条件和动作配置场景。" />
                </Steps>
            </div>
            <div className='comm-shadowbox device-content'>
                <div className='content-top'>
                    <div className='content-top-left'>
                        <Form className='device-filter-form' form={form} layout='inline'>
                            <Form.Item name="typeS" label="类型" >
                                <Select
                                    allowClear
                                    style={{ width: '200px' }}
                                >
                                    {
                                        netStatus.map(item => {
                                            return (<Option value={item.key} key={item.key}>{item.value}</Option>)
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="功能名称"
                            >
                                <Form.Item
                                    name='funcName'
                                    noStyle
                                >
                                    <Input style={{ width: '465px' }} placeholder="功能名称" />
                                </Form.Item>
                                <Button type="primary" onClick={() => { onSearch() }}>
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Button type="primary" onClick={openRegist}>自定义</Button>
                </div>
                <Table rowKey='funcIdentifier' dataSource={dataSource} columns={columns} />
            </div>
            {
                modelVis && <AddModal addVisible={modelVis} addOk={colseMoadl} optionArr={optionArr} CancelAdd={cancelModel} />
            }
            {
                isDelVisible && <ActionConfirmModal
                    visible={isDelVisible}
                    modalOKHandle={updateOkHandle}
                    modalCancelHandle={updateCancelHandle}
                    targetName={actionData.funcName}
                    title='删除'
                    descGray={true}
                    needWarnIcon={true}
                    descText='确定删除此数据'
                ></ActionConfirmModal>
            }
        </div>
    )
}
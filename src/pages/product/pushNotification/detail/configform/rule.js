import React, { memo, forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { Input, Form, Select, Row, Col, Radio } from 'antd';
import { cloneDeep } from "lodash";
import { Paths, post, get } from '../../../../../api';
import DoubleBtns from '../../../../../components/double-btns/DoubleBtns';
const { Option } = Select;
const { Item } = Form;
const formlayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};
const triggerType = [
    { id: 0, nam: '属性触发' },
    { id: 1, nam: '事件触发' },
    { id: 3, nam: '上线触发' },
    { id: 4, nam: '下线触发' },
    { id: 2, nam: '上下线触发' }
]
const NUMCAL = [
    { id: '=', nam: '等于' },
    { id: '>', nam: '大于' },
    { id: '<', nam: '小于' },
    { id: '!=', nam: '不等于' },
    { id: '>=', nam: '大于等于' },
    { id: '<=', nam: '小于等于' },
];
const BOOLENUMCAL = [
    { id: '=', nam: '是' },
    { id: '!=', nam: '不是' },
]
const intDtaaType = [ "int", "float", "double" ];
const showDtaaType = [ ...intDtaaType, "bool", "enum" ]

/* 获取属性列表和事件列表，过滤掉string/date 类型 */
const getPropEventList = data=>{
    let propList=[], eventList=[];
    for(let i=0; i<data.length;  i++){
        const { funcType, funcParamList, funcIdentifier, funcName,eventType } = data[i];
        if(funcType=="properties"){
            const { propertyMap, dataTypeEN } = funcParamList[0];
            if(showDtaaType.includes(dataTypeEN)){
                propList.push({ funcIdentifier, funcName, dataTypeEN, propertyMap })
            }
        }else if(funcType=="events"){
            let props = funcParamList.filter(({dataTypeEN})=>showDtaaType.includes(dataTypeEN)).map(({dataTypeEN,identifier,name,propertyMap})=> {
                if(showDtaaType.includes(dataTypeEN)){
                    return {
                        funcIdentifier:identifier,
                        dataTypeEN,
                        funcName:name,
                        propertyMap
                    }

                }
            })
            if( props.length > 0){
                eventList.push({ eventType, funcIdentifier, funcName, props})
            }
        } 
    }
    
    return {
        propList,eventList
    }
}

function ruleForm({
    setStepCur,
    formdata,
    productList
}, _ref) {
    const [form] = Form.useForm();
    const [propList, setPropList] = useState([]);//属性列表
    const [eventList, setEventList] = useState([]);//事件列表
    const [triggerMode, setTriggerMode] = useState(formdata.triggerMode); //记录触发方式
    const selectTxt = ["属性","事件"][triggerMode];
    const [selectLiData, setSelectLiData] = useState([]);
    // const selectLiData = [propList,eventList][triggerMode]
    const [propEvenSelectData, setPropEvenSelectData] = useState(null);

    useEffect(() => {
        if (formdata.productId) {
            
            console.log("333-11-aa", formdata)
            const { productId, triggerMode, funcIdentifier, props } = formdata;
            let values = { productId, triggerMode };

            if (triggerMode > 1) {
                // form.setFieldsValue({...values});
            } else {
                if (triggerMode == 1) {//事件
                    values.identifier = funcIdentifier;
                } else if (triggerMode == 0) {//属性
                    values.identifier = props[0].propIdentifier; 
                }
                productChanged(formdata.productId,values.identifier)
            }
            

            console.log(999, values)
            form.setFieldsValue({ ...values });
        } else {
            // form.resetFields()
        }
    }, [
        formdata.productId
    ])


    useImperativeHandle(_ref, () => {
        return {
            formDataToData: formDataToState,
        }
    }, [formDataToState,propEvenSelectData]);

    //表单数据转换为接口所需数据
    const formDataToState = () => {
        const values = form.getFieldsValue();
        console.log(33333, values,propEvenSelectData)
        let {  productId, triggerMode } = values;
        let resdata = { productId, triggerMode };
        if(triggerMode<2){
            let originalprops, newprops=[];
            console.log(999,propEvenSelectData,triggerMode==1)
            if(triggerMode==1){
                let {props,eventType,funcIdentifier} = propEvenSelectData
                originalprops = props;
                
                resdata = {...resdata,eventType,eventIdentifier:funcIdentifier}
            }else{
                originalprops = [propEvenSelectData];
            }
            console.log(777,originalprops)
            newprops = originalprops.map(({dataTypeEN,funcIdentifier,funcName})=>{
                return {
                    propName:funcName,
                    propIdentifier:funcIdentifier,
                    propFieldType:dataTypeEN,
                    judge:values["cal_"+funcIdentifier],
                    propVal:values["val_"+funcIdentifier]
                }
            })
            resdata = {...resdata,props:newprops}
        }
        return resdata;
    }

    //产品改变
    const productChanged = (productId,isformdata) => {
        console.log("--isformdata--",isformdata)
        post(Paths.standardFnList, { productId },{ loading: true }).then(({data={}}) => {
            const { standard=[], custom=[] } = data
            const list = [...standard,...custom]
            const { propList, eventList } = getPropEventList(list)
            setPropList(propList);
            setEventList(eventList);
            if (isformdata){
                let sltLiData = [propList,eventList][triggerMode];
                setSelectLiData(sltLiData)
                let data = sltLiData.find(item=> item.funcIdentifier==isformdata);
                setPropEvenSelectData(cloneDeep(data)) ;
                let resetval = {}
                formdata.props.forEach(({propIdentifier,judge,propVal}) =>{
                    resetval["cal_"+propIdentifier] = judge;
                    resetval["val_"+propIdentifier] = propVal;

                });
                form.setFieldsValue({ ...resetval });

            }
        });
    }

    //选择触发方式框值改变
    const triggerModeChanged = (triggerMode) => {
        setTriggerMode(triggerMode);
        setSelectLiData([propList,eventList][triggerMode])
        form.resetFields(["identifier"])
        setPropEvenSelectData(null)
    }

    //选择属性/事件框值改变
    const eventPropChanged = funcIdentifier => {
        let data = selectLiData.find(item=> item.funcIdentifier==funcIdentifier);
        console.log("---",data)
        setPropEvenSelectData(cloneDeep(data)) 
    }

    const onFinish = () => {
        setStepCur(2)
    }

    // 条件规则dom
    const getRuleList = () => {
        const list = propEvenSelectData &&  (triggerMode==1?propEvenSelectData.props:[propEvenSelectData]) || [];
        
        return list.map(({ funcIdentifier, dataTypeEN, funcName, propertyMap },i)=>{
            const isnum = intDtaaType.includes(dataTypeEN);
            const calway = isnum?NUMCAL:BOOLENUMCAL;
            return <Row gutter={14} key={i}>
                <Col span={7}><Item label="触发规则"
                //  labelCol={{ span: 5 }}
                 >{funcName}</Item></Col>
                <Col span={7}>
                    <Item {...formlayout} name={"cal_"+funcIdentifier} rules={[{ required: true, message: '请选择比较类型' }]}>
                        <Select placeholder='请选择比较类型' onChange={()=>{}}>
                            {calway.map(({ id, nam }) => {
                                return <Option key={id} value={id}>{nam}</Option>
                            })}
                        </Select>
                    </Item>
                </Col>
                <Col span={7}>
                    <Item {...formlayout} name={"val_"+funcIdentifier} rules={[{ required: true, message: '请输入比较值' }]}>
                    {
                        isnum && <Input placeholder={"请输入比较值"} /> || 
                        <Select placeholder='请选择比较类型' onChange={()=>{}}>
                            { Object.keys(propertyMap).map( key => {
                                return <Option key={key} value={key}>{propertyMap[key]}</Option>
                            })}
                        </Select>
                    }
                    </Item>
                </Col>
            </Row>
            
        })
    }

    return <div>
        <Form form={form} onFinish={onFinish}>
            <Row gutter={14}>
                <Col span={10}>
                    <Item label="选择产品" name='productId' rules={[{ required: true, message: '请选择产品' }]} {...formlayout}>
                        <Select showSearch optionFilterProp="children" onChange={(v)=>{productChanged(v,false)}} placeholder='请选择产品' >
                            {
                                productList.map(({ productId, productName }) => {
                                    return <Option key={productId} value={productId}>{productName}</Option>
                                })
                            }
                        </Select>
                    </Item>
                </Col>
            </Row>
            <Row gutter={14}>
                <Col span={10}>
                    <Item label="触发方式" name='triggerMode' rules={[{ required: true, message: '请选择触发方式' }]} {...formlayout}>
                        <Select placeholder='请选择触发方式' onChange={triggerModeChanged}>
                            {triggerType.map(item => {
                                const { id, nam } = item;
                                return <Option key={id} value={id}>{nam}</Option>
                            })}
                        </Select>
                    </Item>
                </Col>
                {
                    triggerMode<2 &&
                    <Col span={7}>
                        <Item name='identifier' rules={[{ required: true, message: `请选择${selectTxt}` }]}>
                            <Select placeholder={`请选择${selectTxt}`} onChange={eventPropChanged}>
                                {
                                    selectLiData.map(({ funcIdentifier, funcName }) => {
                                        return <Option key={funcIdentifier} value={funcIdentifier}>{funcName}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                    </Col>
                }
            </Row>
            {
                triggerMode<2 && propEvenSelectData && selectLiData.length>0 && getRuleList() 
            }
        </Form>
        <DoubleBtns preHandle={() => setStepCur(0)} nextHandle={form.submit} />
    </div>

}

export default memo(forwardRef(ruleForm));




{/*



告警规则-属性：
{ "triggerMode":0 , "props":[{"propName":"充电状态","propIdentifier":"ChargeState","propFieldType":"bool","judge":"=","propVal":"100"},{"propName":"故障类型","propIdentifier":"FaultType","propFieldType":"enum","judge":"=","propVal":"1"}],"warningWay":"1","warningTitle":"title","warningDetail":"detail"}
告警规则-事件：
{"triggerMode":1, "eventType":"info","eventIdentifier":"info","props":[{"propName":"充电状态","propIdentifier":"ChargeState","propFieldType":"bool","judge":"=","propVal":"100"},{"propName":"故障类型","propIdentifier":"FaultType","propFieldType":"enum","judge":"=","propVal":"1"}],"warningWay":"1","warningTitle":"title","warningDetail":"detail"}
告警规则-其它：
{"triggerMode":2, "warningWay":"1","warningTitle":"title","warningDetail":"detail"}

triggerMode：
    int MODE_PROPERTY = 0;
    int MODE_EVENT = 1;
    int MODE_ONLINE = 2;
    int MODE_OFFLINE = 3;
    int MODE_ONOFFLINE = 4;

*/}
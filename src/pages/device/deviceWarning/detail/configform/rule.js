import React, {  memo, forwardRef,useState,useEffect,useImperativeHandle } from 'react';
import {Input,Form,Select,Row,Col,Radio} from 'antd';
import {Paths, post,get } from '../../../../../api';
import DoubleBtns from '../../../../../components/double-btns/DoubleBtns';
const { Option } = Select;
const { Item } = Form;
const formlayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const triggerType =[
    {id:0,nam:'属性触发'},
    {id:1,nam:'事件触发'},
    {id:3,nam:'上线触发'},
    {id:4,nam:'下线触发'},
    {id:2,nam:'上下线触发'}
]
const NUMCAL = [
    {id:'1',nam:'=='},
    {id:'2',nam:'>'},
    {id:'3',nam:'<'},
    {id:'4',nam:'>='},
    {id:'5',nam:'<='},
    {id:'6',nam:'!='},
    {id:'7',nam:'in'},
    {id:'8',nam:'between'},
];
const STRCAL = [
    {id:'1',nam:'='},
    {id:'6',nam:'!='},
    {id:'7',nam:'in'},
]

function ruleForm({
    setStepCur,
    formdata
},_ref){
    const [form] = Form.useForm();
    const [productList, setProductList] = useState([]);//产品列表
    const [deviceList, setDeviceList] = useState([]);//设备列表
    const [propList, setPropList] = useState([]);//属性列表
    const [eventList, setEventList] = useState([]);//事件列表

    const [triggerMode, setTriggerMode] = useState(formdata.triggerMode); //记录触发方式
    const [productId, setProductId] = useState(formdata.productId); //记录productId，因为 设备、属性等列表依赖productId，没选择产品时，禁用相关下拉框
    const [ruletype, setRuletype] = useState(formdata.connType||"0"); //比较方式，组合条件才有的字段，"and" / "or", 非组合条件仅前端用值"0"

    useEffect( () => {
        if(productList.length==0){
            getDownProduct()
        }
    },[])
    useEffect( () => {
        if(productId){
            getDownDevice(productId)
        }
    },[productId])

    useEffect( () => {
        if(formdata.productId){
            console.log("333-11-aa",formdata)
            const { productId, deviceIds, triggerMode, props, connType="0", eventName, eventIdentifier } = formdata;
            let values = { productId, deviceIds, triggerMode };

            if(triggerMode>1){
                // form.setFieldsValue({...values});
            }else{
                values.ruletype = connType;
                for ( let i=0;i < props.length; i++){
                    let {propName,propIdentifier,propFieldType, judge,propVal} = props[i];
                    let str = i>0&&"_add"||"";
                    values[`propName${str}`] = `${propIdentifier},${propFieldType},${propName}`;
                    values[`judge${str}`]=judge;
                    values[`propVal${str}`]=propVal;
                }

                if(triggerMode==1){//事件
                    getEventList(productId);
                    // let {eventName,eventIdentifier} = formdata;
                    const eventval = eventIdentifier+","+eventName;
                    values.identifier = eventval;
                    getProp(eventval);
                    // form.setFieldsValue({...values});
                }else if(triggerMode==0){//属性
                    getProp();
                    // form.setFieldsValue({...values});
                }
            }

            console.log(999,values)
            form.setFieldsValue({...values});
        }else{
            // form.resetFields()
        }
    },[
        formdata.productId,
        // productList.length,
        // deviceList.length,
        // propList.length,
        // eventList.length
    ])


    useImperativeHandle(_ref, () => {
        
        return {
          
            formDataToData: formDataToState,
           
        }
    }, [formDataToState]);

    //表单数据转换为接口所需数据
    const formDataToState = ()=>{
        const values = form.getFieldsValue();

        console.log(111,values)
        let { triggerName,productId,deviceIds,triggerMode} = values;
        let resdata ={triggerName,productId,deviceIds,triggerMode}; 
        if(triggerMode<2){//如果是属性或者事件
            let {identifier,ruletype,propName,judge,propVal } = values;
            if(identifier){
                let _event = identifier.split(",");
                resdata.eventName = _event[1];
                resdata.eventIdentifier = _event[0];
            }
            let proparr = propName.split(",");
            let props = [
                { propName:proparr[2], propIdentifier:proparr[0], propFieldType:proparr[1], judge, propVal }
            ];
            if(ruletype !== "0"){//如果是组合条件
                resdata.connType = ruletype;
                let { propName_add, judge_add, propVal_add } = values;
                let proparr_add = propName_add.split(",");
                props.push({ 
                    propName:proparr_add[2], 
                    propIdentifier:proparr_add[0], 
                    propFieldType:proparr_add[1], 
                    judge:judge_add, 
                    propVal:propVal_add
                })

            }
            resdata.props = props;
        }
        return resdata;

    } 


    //获取产品列表
    const getDownProduct=()=>{
        get(Paths.getProductType,{},{ loading:true }).then(({data}) => {
            const li = Object.keys(data).map(id=>{
                return {id,name:data[id]}
            })
            setProductList(li)
        });
    }
    //产品改变
    const productChanged = productId=>{
        setProductId(productId);
        form.resetFields(["deviceIds"])
       

    }
    //获取设备列表 by productId  1755 /// 11759
    const getDownDevice= productId=>{
        post(Paths.getDeviceListByProId, { productId,pageIndex:1,pageRows:9999}, { loading:true }).then((res) => {
            setDeviceList(res.data.list)
        });
    }

    //选择触发方式框值改变
    const triggerModeChanged=(triggerMode)=>{
        let resetvalue = [];
        if(triggerMode===1){
            getEventList();
            setPropList([]);
            resetvalue.push("identifier")
        }
        if(triggerMode===0){
            getProp();
        }
        form.resetFields([...resetvalue, "propName","judge","propVal","propName_add","judge_add","propVal_add"])
        
        setTriggerMode(triggerMode);
    }

    //获取事件列表  by productId
    const getEventList=(id=productId)=>{
        post(Paths.getWarnEventLi,{productId:id},{loading:true}).then((res) => {
            let eventList = res && res.data || [];
            setEventList(eventList)
        });
    }
    //获取属性列表  by productId、triggerMod（0|1）、eventIdentifier（事件标识）
    const getProp=(eventIdentifier)=>{// eventIdentifier 传值则为事件否则为属性
        let params = {productId} , _path = Paths.getWarnProperty;
        if(eventIdentifier){
            _path = Paths.getWarnEventProperty;
            params.eventIdentifier = eventIdentifier.split(",")[0];
        }

        post(_path,params,{ loading:true }).then((res) => {
            let propList = res && res.data || [];
            setPropList(propList);
        });
    }
    //关于 eventIdentifier： 保存接口事件需要 事件标识 identifier 和 事件名词 name 两个字段，前端融合在 identifier 一个字段里

    //选择事件框值改变
    const eventChanged = (eventIdentifier)=>{
        getProp(eventIdentifier);
    }

    const onFinish=(values)=>{
        setStepCur(2)
    }

    // 条件规则dom
    const getRuleDom = ()=>{
        return  <>
            <Row gutter={14}>
                <Col span={16}  >
                    <Item label="触发条件类型" name='ruletype' labelCol={ {span: 5 }} required initialValue="0">
                        <Radio.Group onChange={e=>{setRuletype(e.target.value)}}>
                            <Radio value={"0"}>单条</Radio>
                            <Radio value={"and"}>and 组合</Radio>
                            <Radio value={"or"}>or 组合</Radio>
                        </Radio.Group>
                    </Item>
                </Col>
            </Row>
            <SingleRule propEventList={propList} add=""/>
            {
                ruletype !== "0" && <>
                <Row gutter={[14]}><Col span={4} ></Col><Col style={{fontSize:"16px",fontWeight:'bold',marginBottom:'14px'}} span={6} >{ruletype}</Col></Row>
                <SingleRule propEventList={propList} add="_add"/>
            </>}
            </>
    }

    return <div>
             <Form form={form} onFinish={onFinish}>
                <Row gutter={14}>
                    <Col span={10}  >
                        <Item {...formlayout} label="触发对象" name='triggerName' initialValue="deviceTrigger" required>
                           <Select ><Option value="deviceTrigger">设备触发</Option></Select>
                        </Item>
                    </Col>
                    <Col span={7}  >
                        <Item name='productId' rules={[{ required: true, message: '请选择产品' }]} >
                            <Select showSearch optionFilterProp="children" onChange={productChanged} placeholder='请选择产品' >
                                {
                                    productList.map(item => {
                                        const {id,name} = item;
                                        return <Option key={id} value={id}>{name}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={7}  >
                        <Item  name='deviceIds' rules={[{ required: true, message: '请选择设备' }]}>
                            <Select allowClear mode="multiple" placeholder='请选择设备'>
                                {
                                    deviceList.map(({deviceId,deviceMac}) => {
                                        return <Option key={deviceId} value={deviceId}>{deviceId}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                    </Col> 
                </Row>
                <Row gutter={14}>
                    <Col span={10}  >
                        <Item label="触发方式" {...formlayout} name='triggerMode' rules={[{ required: true, message: '请选择触发方式' }]}>
                            <Select disabled={!productId} placeholder='请选择触发方式' onChange={triggerModeChanged}>
                                {triggerType.map(item => {
                                    const {id,nam} = item;
                                    return <Option key={id} value={id}>{nam}</Option>
                                })}
                            </Select>
                        </Item>
                    </Col>
                    {   
                        triggerMode===1 && 
                        <Col span={7}  >
                            <Item name='identifier' rules={[{ required: true, message: '请选择事件' }]}>
                                <Select placeholder='请选择事件' onChange={eventChanged}>
                                    {
                                        eventList.map(item => {
                                            const {identifier,name} = item;
                                            return <Option key={identifier} value={identifier + "," + name}>{name}</Option>
                                        })
                                    }
                                </Select>
                            </Item>
                        </Col> 
                    }
                </Row>
                { ( triggerMode == 0 || triggerMode ==1 ) && getRuleDom() }
            </Form>
            <DoubleBtns preHandle={()=>setStepCur(0)} nextHandle={form.submit} />
        </div>

}

export default memo(forwardRef(ruleForm));

const SingleRule = ({propEventList=[],add}) => {
    
    const [propType, setPropType] = useState('');
    const [judgeDesc, setJudgeDesc] = useState('请输入比较值');
   
    const propNameChanged = (val)=>{
        let type = val.split(",")[1];
        setPropType(type);
    }
    const judgeChanged = (val)=>{
        let desc = "请输入比较直";
        if(val=="in"){
            desc = "多个值请以逗号隔开";
        }else if(val=="between"){
            desc = "逗号隔开起始值，例如“1,5” ";
        }
        setJudgeDesc(desc);
    }
    
    return (
        <Row gutter={14}>
            <Col span={10}  >
                <Item label="触发规则" name={`propName${add}`} {...formlayout} rules={[{ required: true, message: '请选择属性'}]} >
                    <Select showSearch optionFilterProp="children" onChange={propNameChanged} placeholder='请选择属性'>
                        {
                            propEventList.map(item => {
                                const {srcCode,srcName,srcType} = item;
                                return <Option key={srcCode} value={srcCode+','+srcType+','+srcName}>{`${srcName}( ${srcCode} )`}</Option>
                            })
                        }
                    </Select>
                </Item>
            </Col>
            <Col span={4}  >
                <Item name={`judge${add}`} rules={[{ required: true, message: '请选择比较方式'}]}>
                    <Select  onChange={judgeChanged} placeholder='比较方式'>
                        {
                            ((propType == "char" || propType=="string") && STRCAL || NUMCAL).map(item => {
                                const {id,nam} = item;
                                return <Option key={id} value={nam}>{nam}</Option>
                            })
                        }
                    </Select>
                </Item>
            </Col>
            <Col span={10}>
                <Item name={`propVal${add}`} rules={[{ required: true, message: '请输入比较值'}]}>
                    <Input placeholder={judgeDesc} />
                </Item>
            </Col> 
        </Row>
        
    );
};
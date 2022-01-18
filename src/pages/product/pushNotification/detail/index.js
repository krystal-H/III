import React, { useState,useEffect,useRef  } from 'react';
import { Modal, Steps,Tabs  } from "antd";
import BaseInfoForm from './configform/baseinfo';
import RuleForm from './configform/rule';
import PublictypeForm from './configform/publictype';
import {Paths, post } from '../../../../api';
import "../devwarn.scss"
const {Step} = Steps;
const {TabPane} = Tabs;
export default ({
    closeEditMod,
    editData,
    productList
})=>{
    const { id,name } = editData;

    const [baseFormData, setBaseFormData] = useState({});
    const [ruleFormData, setRuleFormData] = useState({});
    const [pubFormData, setPubFormData] = useState({});

    const [stepcurrent, setStepcurrent] = useState(1);

    useEffect( () => {
        const { remark,content,productId } = editData;
        if(id!==undefined){
            const contobj = JSON.parse(content);
            const {warningWay,warningTitle,warningDetails,...others} = contobj;
            console.log("--ruleFormData--",others)
            setBaseFormData({name,remark});
            setRuleFormData(others,productId);
            setPubFormData({warningWay,warningTitle,warningDetails});
        }
    },[editData.id])

    const setStepCur = (num=0)=>{
        setStepcurrent(num)
    }
    const ref0 = useRef();
    const ref1 = useRef();
    const ref2= useRef();

    const commitAll=()=>{
        let baseFormData = ref0.current.getFieldsValue(),
            ruleFormData = ref1.current.formDataToData(),
            piublicFormData = ref2.current.getFieldsValue();
        let otherobj = {...ruleFormData, ...piublicFormData };
        let content = JSON.stringify(otherobj);
        let params = { ...baseFormData, id, content,productId:ruleFormData.productId };

        post(Paths.saveWarningConfig, params, { loading: true }).then(res => {
            closeEditMod(true)
        });
    }
    

    return <Modal
                title={id!==undefined?"编辑规则":"新增规则"}
                visible={true}
                width={1000}
                footer={null}
                maskClosable={false}
                onCancel={()=>{closeEditMod(false)}}
                className="page-devwarn-config-modal"
            >
                <Steps current={stepcurrent} >
                    <Step title='基本信息' /><Step title='规则配置' /><Step title='通知方式' />
                </Steps>

                <div className='formbox'>
                  
                    <Tabs activeKey={stepcurrent+""}>
                        <TabPane tab="基本信息" key={'0'}>
                            <BaseInfoForm ref={ref0} setStepCur={setStepCur} formdata={baseFormData}/>
                        </TabPane>
                        <TabPane tab="规则配置"  key={'1'}>
                            <RuleForm ref={ref1} setStepCur={setStepCur} formdata={ruleFormData} productList={productList}/>
                        </TabPane>
                        <TabPane tab="通知方式"  key={'2'}>
                            <PublictypeForm ref={ref2} setStepCur={setStepCur} commitAll={commitAll} formdata={pubFormData}/>
                        </TabPane>
                    </Tabs>

                </div>


            </Modal>
}


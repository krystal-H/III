import React, { useState,useEffect,useRef  } from 'react';
import { Modal, Steps,Tabs  } from "antd";
import BaseInfoForm from './configform/baseinfo';
import RuleForm from './configform/rule';
import PublictypeForm from './configform/publictype';
import {Paths, post } from '../../../../api';
const {Step} = Steps;
const {TabPane} = Tabs;
export default ({
    visible,
    closeEditMod,
    editData
})=>{
    const { id,name } = editData;

    const [baseFormData, setBaseFormData] = useState({});
    const [ruleFormData, setRuleFormData] = useState({});
    const [pubFormData, setPubFormData] = useState({});

    const [stepcurrent, setStepcurrent] = useState(0);

    useEffect( () => {
        // console.log(777,editData)
        const { remark,content } = editData;
        if(id!==undefined){
            const contobj = JSON.parse(content);
            const {warningWay,warningTitle,warningDetails,waringFreq,emailAddress,...others} = contobj;
            setBaseFormData({name,remark});
            setRuleFormData(others);
            setPubFormData({warningWay,warningTitle,warningDetails,waringFreq,emailAddress});
        }
    },[editData])

    const setStepCur = (num=0)=>{
        setStepcurrent(num)
    }
    const ref0 = useRef();
    const ref1 = useRef();
    const ref2= useRef();
    const afterCloseHandle = ()=>{
        setStepcurrent(0);
        setBaseFormData({});
        setRuleFormData({});
        setPubFormData({});
    }

    const commitAll=()=>{
        let baseFormData = ref0.current.getFieldsValue(),
            ruleFormData = ref1.current.formDataToData,
            piublicFormData = ref2.current.getFieldsValue();
        let otherobj = {...ruleFormData, ...piublicFormData };
        let content = JSON.stringify(otherobj);
        let params = { ...baseFormData, id, content };

        post(Paths.saveWarningConfig, params, { loading: true }).then(res => {
            closeEditMod()
        });
    }
    

    return <Modal
                title={id!==undefined?"编辑规则":"新增规则"}
                visible={visible}
                width={1000}
                footer={null}
                maskClosable={false}
                onCancel={closeEditMod}
                className="page-devwarn-config-modal"
                afterClose={afterCloseHandle}
            >
                <Steps current={stepcurrent} >
                    <Step title='告警信息' /><Step title='规则配置' /><Step title='通知方式' />
                </Steps>

                <div className='formbox'>
                    <Tabs activeKey={stepcurrent+""}>
                        <TabPane tab="告警信息" key={'0'}>
                            <BaseInfoForm ref={ref0} setStepCur={setStepCur} formdata={baseFormData}/>
                        </TabPane>
                        <TabPane tab="规则配置"  key={'1'}>
                            <RuleForm ref={ref1} setStepCur={setStepCur} formdata={ruleFormData}/>
                        </TabPane>
                        <TabPane tab="通知方式"  key={'2'}>
                            <PublictypeForm ref={ref2} setStepCur={setStepCur} commitAll={commitAll} formdata={pubFormData}/>
                        </TabPane>
                    </Tabs> 


                </div>


            </Modal>
}


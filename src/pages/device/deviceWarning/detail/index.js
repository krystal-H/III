import React, { useState  } from 'react';
import { Modal } from "antd";
// import { BaseInfoForm } from './configform/baseinfo';
// import { RuleForm } from './configform/rule';
// import { PublictypeForm } from './configform/publictype';
import {Paths, post } from '../../../../api';
import DoubleBtns from '../../../../components/double-btns/DoubleBtns';

const initialData = {
    id: undefined,
    status:undefined,
    name:"",
    remark:"",
    content:"",
}

export default ({
    visible,
    closeEditMod,
    editData
})=>{
    const [dataobj, setDataobj] = useState(editData&&{...editData}||{...initialData});

    const { id,name,remark,status,content } = dataobj

    return <Modal
                title={id!==undefined?"编辑规则":"新增规则"}
                visible={visible}
                width={1000}
                footer={null}
                maskClosable={false}
                onCancel={closeEditMod}
                wrapClassName="page-devwarn-config-modal"
            >
                123
            </Modal>
}


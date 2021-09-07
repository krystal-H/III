import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input, Select, Modal, Button } from 'antd'
import LabelTip from '../../../components/form-com/LabelTip';
const { Option } = Select;
export default function AddModel({ addVisible, addOk, CancelAdd }) {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div >
      <Modal title="自定义" visible={addVisible} onOk={addOk} onCancel={CancelAdd} width='725px' wrapClassName='add-protocols-wrap'>
        <div>
          <div>
            <span>产品名称：</span>
            <Select style={{ width: 120 }} onChange={handleChange}>
            </Select>
          </div>
          <div>
            <div><span> 场景触发条件设置<LabelTip tip="物模型的可上行、可下行、可上行可下行3种数据类型都支持条件" /></span>
              <Button type="primary" ghost>
                Primary
              </Button>
            </div>
            <div>场景出发条件设置以后该功能点即可出现在App-场景-我的场景-添加条件处，作为场景的触发条件来设置</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
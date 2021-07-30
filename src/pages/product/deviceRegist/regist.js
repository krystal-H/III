import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select } from 'antd';
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {


  return (
    <div >
      <Modal title="注册设备" visible={isModalVisible} onOk={colseMoadl} onCancel={cancelModel} width='900px' wrapClassName='add-protocols-wrap'>

      </Modal>
    </div>
  )
}
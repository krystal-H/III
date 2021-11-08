import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { post, Paths } from '../../../../../api';
export default function InfoModal({ ModalVisible, closeOk, onCancel }) {
    return (
        <div >
            <Modal title="新增分组" visible={ModalVisible} onOk={closeOk} onCancel={onCancel} width='564px' wrapClassName='add-protocols-wrap'>
                
            </Modal>
        </div>
    )
}
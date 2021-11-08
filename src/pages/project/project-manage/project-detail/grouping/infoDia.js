import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { post, Paths } from '../../../../../api';
export default function InfoModal({ ModalVisible, closeOk, onCancel }) {
    return (
        <div >
            <Modal title="查看" visible={ModalVisible} onOk={closeOk} onCancel={onCancel} width='764px' wrapClassName='add-protocols-wrap'>
            </Modal>
        </div>
    )
}
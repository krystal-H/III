import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import moment from 'moment';
import { Form, Input, Button, Space, Select, Radio, Tabs, Drawer } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './editInfo.scss'
export default function TitleEdit({ titleVisible, onCloseTitle }) {
    useEffect(() => {
    }, [])
    const oneRef = useRef();
    //提交数据
    const subData = () => {
    }
    return (
        <Drawer
            title='新增自定义功能'
            placement="right"
            closable={false}
            onClose={onCloseTitle}
            visible={titleVisible}
            destroyOnClose={true}
            width={393}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCloseTitle} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={subData} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <div className='edit-left-protocol-wrap'> 
            </div>
        </Drawer>)
}


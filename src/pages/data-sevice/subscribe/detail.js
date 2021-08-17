import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Drawer, Tag, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './detail.scss'
export default function ProtocolDelete({ rightVisible, onCloseRight}) {
    useEffect(() => {
    }, [])

    return (
        <Drawer
            title='远程配置任务'
            placement="right"
            closable={false}
            onClose={onCloseRight}
            visible={rightVisible}
            destroyOnClose={true}
            width={393}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCloseRight} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={onCloseRight} type="primary">
                        确定
                    </Button>
                </div>
            }
        >
            <div className='subscrbe-info'>
                <div className='subscrbe-c'>
                    <div className='subscrbe-t'>订阅对象</div>
                    <div className='subscrbe-item'>
                        <div>订阅名称：</div>
                        <div></div>
                    </div>
                    <div className='subscrbe-item'>
                        <div>归属产品：</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </Drawer>)
}
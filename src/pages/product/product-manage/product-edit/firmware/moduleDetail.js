import React, { useState, useEffect } from 'react'
import { Drawer, Button } from 'antd';

export default function ModuleDetail({ visible, onCloseDrawer }) {
  return (
    <Drawer
      title='模组详情'
      placement="right"
      closable={false}
      onClose={onCloseDrawer}
      visible={visible}
      destroyOnClose={true}
      width={393}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>取消</Button>
          <Button onClick={onCloseDrawer} type="primary">确定</Button>
        </div>
      }>
    </Drawer>)
}
import React, { useState, useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import TableCom from './selectTable'

function ZigbeeProConfig({ visible, productId, cancelHandle, handleOk, initialProtoclList }) {
  const tableRef = useRef(null)

  const onOk = () => {
    tableRef.current.subOrder()
  }

  // 保存数据，弹窗消失
  const finishSub = (data) => {
    let params = {
      productId,
      zigbeeConfigList: data
    }
    post(Paths.saveConfigZigbee, params, {loading: true}).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      handleOk()
    })
  }

  return (
    <Modal
      title="zigbee协议描述信息"
      visible={visible}
      width={1100}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="zigbee-pro-modal">
      <TableCom dataSource={initialProtoclList} ref={tableRef} finishSub={finishSub} />
    </Modal>
  )
}

export default ZigbeeProConfig

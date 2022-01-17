import React, { useState, useRef } from 'react'
import { Modal, Form, Input } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import TableCom from './selectTable'

function ZigbeeProConfig({ visible, productId, cancelHandle, handleOk, initialProtoclList }) {
  const [form] = Form.useForm()
  const tableRef = useRef(null)

  const onOk = () => {
    tableRef.current.subOrder()
  }

  // 保存数据，弹窗消失
  const finishSub = (data) => {
    console.log('保存的数据----', data)
    let params = {
      productId,
      zigbeeConfigList: data
    }
    post(Paths.saveConfigZigbee, params, {loading: true}).then(res => {
      console.log(res, '保存的户数啊大大')
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

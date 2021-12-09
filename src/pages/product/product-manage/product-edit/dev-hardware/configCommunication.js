import React, { useEffect, useState } from 'react'
import { Modal, Form, Radio, Select } from 'antd'
import { Paths, post, get } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import { cloneDeep } from "lodash"
import './configCommunication.scss'

const { Option } = Select
const gatewayTypeList = ['Wifi', '蓝牙', 'zigbee3.0']
// deviceTypeName需要后端给判断是否为网关设备
function ConfigCommunication({
  visible,
  handleOk,
  handleCancel,
  networkWayList,
  protocolList,
  deviceTypeName = ''
}) {
  const [form] = Form.useForm()
  const [networkList, setNetworkList] = useState([]) // 动态配网列表

  // 选择通信协议
  const changeProtocol = (e) => {
    form.setFieldsValue({ netTypeId: '' })
    // 通过通信协议获取配网方式list
    const id = e.target.value.split('#')[0]
    cloneDeep(networkWayList).forEach(item => {
      if (id == item.txfs) {
        setNetworkList(item.pwfs)
      }
    })
  }

  // 提交保存
  const onFinish = (values) => {
    console.log('接受的数据：', values)
    let params = {}
    // post(Paths.saveFirmwareSetting, { ...params })
    //   .then(res => {
    //     Notification({ description: '操作成功！', type: 'success' })
    //     handleOk()
    //   })
  }

  // 点击 “确定”
  const onOk = () => {
    form.submit()
  }

  return (
    <Modal
      title="通信协议配置"
      visible={visible}
      onOk={onOk}
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose={true}
      width={857}
      wrapClassName="replace-module-modal config-communication-modal">
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ minHeight: 250 }}>
        <Form.Item name="bindType" label="通信协议"
          rules={[{ required: true, message: '请选择通信协议' }]}>
          <Radio.Group onChange={(e) => changeProtocol(e)} className="radio-group">
            {
              protocolList.length > 0 && protocolList.map(item => (
                <Radio
                  value={`${item.bindTypeId}#${item.bindTypeVersion}`}
                  key={`${item.bindTypeId}#${item.bindTypeVersion}`}
                  style={{ marginBottom: 8 }} >
                  {item.bindTypeName}
                </Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="配网方式"
          name="netTypeId"
          rules={[{ required: true, message: '请选择配网方式' }]}>
          <Select>
            {
              networkList && networkList.map(item => (
                <Option key={item.netTypeId} value={item.netTypeId}>{item.baseTypeName}</Option>
              ))
            }
          </Select>
        </Form.Item>
        {
          deviceTypeName.indexOf('网关') !== -1 &&
          <Form.Item name="gatewayType" label="网关子设备协议"
            rules={[{ required: true, message: '网关子设备协议' }]}>
            <Radio.Group>
              {
                gatewayTypeList.map((item, index) => (
                  <Radio value={index + 1} key={item}>{item}</Radio>
                ))
              }
            </Radio.Group>
          </Form.Item>
        }
      </Form>
    </Modal>
  )
}

export default ConfigCommunication

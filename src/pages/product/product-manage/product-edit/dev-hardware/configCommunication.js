import React, { useEffect, useState } from 'react'
import { Modal, Form, Radio, Select } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import { cloneDeep } from "lodash"
import './configCommunication.scss'

const { Option } = Select
const gatewayTypeList = ['Wifi', '蓝牙', 'zigbee3.0']
function ConfigCommunication({
  visible,
  handleOk,
  handleCancel,
  networkWayList,
  protocolList,
  productId,
  deviceTypeName = ''
}) {
  const [form] = Form.useForm()
  const [networkList, setNetworkList] = useState([]) // 动态配网列表'
  const [productItem] = useState(JSON.parse(sessionStorage.getItem('productItem')) || {})
  const [bindTypeStr, setBindTypeStr] = useState('') // 更新的通信协议文字

  useEffect(() => {
    cloneDeep(networkWayList).forEach(item => {
      if (productItem.bindType == item.txfs) {
        setNetworkList(item.pwfs)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 选择通信协议
  const changeProtocol = (e) => {
    form.setFieldsValue({ netTypeId: '' })
    // 通过通信协议获取配网方式list
    const id = e.target.value.split('#')[0]
    cloneDeep(networkWayList).forEach(item => {
      if (id == item.txfs) {
        setNetworkList(item.pwfs)
        setBindTypeStr(protocolList.filter(ele => ele.bindTypeId == id)[0].bindTypeName)
      }
    })
  }

  // 提交保存
  const onFinish = (values) => {
    const params = { productId, ...values }
    params.bindType = Number(values.bindType.split('#')[0])
    params.bindTypeVersion = Number(values.bindType.split('#')[1])
    post(Paths.saveCommunication, params, { loading: true }).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      // 前端自己保存数据，自己回显，只能更新存储里的内容了
      handleOk(res.data, { bindTypeStr, ...params })
    })
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
          initialValue={`${productItem.bindType}#${productItem.bindTypeVersion}` || ''}
          rules={[{ required: true, message: '请选择通信协议' }]}>
          <Radio.Group onChange={(e) => changeProtocol(e)} className="radio-group">
            {
              protocolList && protocolList.map(item => (
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
          initialValue={productItem.netTypeId || ''}
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
            initialValue={productItem.gatewayType || ''}
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

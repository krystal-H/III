import React, { useEffect, useState } from 'react'
import { Modal, Form, Radio, Select, Space, Checkbox } from 'antd'
import { get, Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import { cloneDeep } from "lodash"
import './configCommunication.scss'

const { Option } = Select

// 数组扁平化
const flatArr = function (arr) {
  return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flatArr(cur) : cur), [])
}

// 数组去重
const unique3 = function (arr) {
  var obj = {}
  var newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i].netTypeId]) {
      obj[arr[i].netTypeId] = 1
      newArr.push(arr[i])
    }
  }
  return newArr
}


function ConfigCommunication({
  visible,
  handleOk,
  handleCancel,
  networkWayList,
  protocolList,
  productId,
  schemeInfo = {}
}) {
  console.log(schemeInfo, 'schemeInfo')
  const [form] = Form.useForm()
  const [networkList, setNetworkList] = useState([]) // 动态配网列表
  const [gatewayTypeList, setGatewayTypeList] = useState([]) // 子设备通信方式

  // 根据通信方式匹配配网方式
  const dealNetworkData = (arr) => {
    let saveList = []
    cloneDeep(networkWayList).forEach(item => {
      arr.forEach(id => {
        if (id == item.txfs) {
          saveList.push(item.pwfs)
        }
      })
    })
    // console.log('===扁平化/去重===', flatArr(saveList), unique3(flatArr(saveList)))
    setNetworkList(unique3(flatArr(saveList)))
  }

  useEffect(() => {
    const communicationModeList = schemeInfo.communicationModeList && schemeInfo.communicationModeList.map((item) => {
      return `${item.bindType}#${item.bindTypeVersion}`
    })
    form.setFieldsValue({ communicationModeList })
    // 根据通信方式 ——> 去筛选配网方式
    schemeInfo.communicationModeList && dealNetworkData(schemeInfo.communicationModeList.map(item => item.bindType))
    if (schemeInfo.schemeType != 1) {
      if (schemeInfo.productClassId == 1) { // 网关设备——>子设备通信方式
        get(Paths.subGateWayList).then(res => {
          console.log('adadsa', res)
          setGatewayTypeList(res.data)
        })
      }
      form.setFieldsValue({ schemeType:schemeInfo.schemeType })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemeInfo])

  // 选择通信方式
  const changeProtocol = (arr) => {
    form.setFieldsValue({ netTypeId: '' })

    // 通过通信方式id集合获取配网方式list
    let tempIdArr = []
    arr.forEach(item => {
      tempIdArr.push(item.split('#')[0])
    })

    dealNetworkData(tempIdArr)
  }

  // 提交保存
  const onFinish = (values) => {
    const params = { productId, ...values }
    params.communicationModeList = values.communicationModeList.map((item) => {
      return {
        bindType: Number(item.split('#')[0]),
        bindTypeVersion: Number(item.split('#')[1])
      }
    })
    params.schemeType = values.schemeType || 1
    console.log(params, '保存提交的数据')
    post(Paths.saveCommunication, params, { loading: true }).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      // 前端自己保存数据，自己回显，只能更新存储里的内容了
      handleOk(res.data, { ...params })
    })
  }

  // 确定
  const onOk = () => {
    form.submit()
  }

  return (
    <Modal
      title="更改开发方案"
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
        <Form.Item name="communicationModeList" label="云端通信方式"
          rules={[{ required: true, message: '请选择云端通信方式' }]}>
          <Checkbox.Group onChange={(val) => changeProtocol(val)} className="radio-group">
            {
              protocolList && protocolList.map(item => (
                <Checkbox
                  value={`${item.bindTypeId}#${item.bindTypeVersion}`}
                  key={`${item.bindTypeId}#${item.bindTypeVersion}`}
                  style={{ marginBottom: 8 }}>
                  {item.bindTypeName}
                </Checkbox>
              ))
            }
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          label="配网方式"
          name="netTypeId"
          initialValue={schemeInfo.netTypeId || ''}
          wrapperCol={{ span: 15 }}
          rules={[{ required: true, message: '请选择配网方式' }]}>
          <Select>
            {
              networkList && networkList.map(item => (
                <Option key={item.netTypeId} value={item.netTypeId}>{item.baseTypeName}</Option>
              ))
            }
          </Select>
        </Form.Item>
        {/* mcu&soc方案才有的字段 */}
        {
          schemeInfo.schemeType != 1 &&
          <>
            {
              // 普通设备—非网关设备
              schemeInfo.productClassId == 0 &&
              <Form.Item
                label="是否是子设备"
                name="isRelatedGateway"
                initialValue={schemeInfo.isRelatedGateway}
                rules={[{ required: true, message: '请选择是否是子设备' }]}>
                <Radio.Group onChange={(e) => { console.log('radio checked', e.target.value) }}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
            }
            {
              // 网关设备
              schemeInfo.productClassId == 1 &&
              <Form.Item name="gatewayCommTypeList" label="子设备通信方式"
                initialValue={schemeInfo.gatewayCommTypeList || []}
                rules={[{ required: true, message: '请选择子设备通信方式' }]}>
                <Checkbox.Group className="radio-group">
                  {
                    gatewayTypeList.map((item, index) => (
                      <Checkbox
                        value={item.baseTypeId}
                        key={item.baseTypeId}
                        style={{ marginBottom: 8 }}>{item.baseTypeName}</Checkbox>
                    ))
                  }
                </Checkbox.Group>
              </Form.Item>
            }
            <Form.Item label="开发方案"
              name="schemeType"
              initialValue={schemeInfo.schemeType || ''}
              rules={[{ required: true, message: '请选择开发方案' }]}>
              <Radio.Group className="scheme-choose">
                <Space direction="vertical">
                  <Radio value={3}>SoC方案（使用C-Life模组SDK）</Radio>
                  <Radio value={2}>独立MCU方案（已有MCU，使用C-Llife模组+MCU SDK）</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  )
}

export default ConfigCommunication

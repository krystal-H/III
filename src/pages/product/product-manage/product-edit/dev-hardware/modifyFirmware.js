import React, { useEffect, useState } from 'react'
import { Modal, Input, Form, Row, Col, Select } from 'antd';
import './modifyFirmware.scss'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import { cloneDeep } from 'lodash'

const { Option } = Select;

export default function ModifyFirmwareModal({ modifyFirmwareVisible, handleCancelFirmware, firmwareId, productId, handleOk }) {
  const [form] = Form.useForm()

  const [firmwareData, setFirmwareData] = useState({})
  const [selectVal, setSelectVal] = useState([])

  const onFinish = (values) => {
    // console.log('接受的数据：', values)
    const keyArr = Object.keys(values)
    const valArr = Object.values(values)
    const firmwareConfigReqList = keyArr.map((item, index) => ({
      funcModule: item.split('#')[0],
      identifier: item.split('#')[1],
      value: valArr[index]
    }))
    const params = { productId, id: firmwareId, firmwareConfigReqList }
    console.log('提交的数据', params)
    post(Paths.saveFirmwareSetting, { ...params })
      .then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        handleOk()
      })
  }

  const onOk = () => {
    form.submit()
  }

  // 获取信息
  const modifyFirmware = () => {
    post(Paths.modifyFirmware, { id: firmwareId })
      .then(res => {
        // 动态设置默认值
        res.data.firmwareModuleList.forEach(ele => {
          ele.firmwareFuncList.forEach(item => {
            // 输入框
            item.dataType.type === 'int' &&
              form.setFieldsValue({
                [`${item.funcName}#${item.identifier}`]: item.dataType.specs.defaultValue
              })
            // 下拉框
            if (item.dataType.type === 'enum') {
              form.setFieldsValue({
                [`${item.funcName}#${item.identifier}`]: item.dataType.specs.defaultValue[0].k
              })
              setSelectVal((pre) => {
                const list = cloneDeep(pre)
                list.push(item.dataType.specs.defaultValue[0].k)
                return list
              })
            }
          })
        })
        setFirmwareData(res.data)
      })
  }

  useEffect(() => {
    modifyFirmware()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 切换下拉框赋值
  const changeOptionVal = (val, index) => {
    const list = cloneDeep(selectVal)
    list[index] = val
    setSelectVal(list)
  }

  return (
    <Modal
      title="修改固件"
      visible={modifyFirmwareVisible}
      onOk={onOk}
      onCancel={handleCancelFirmware}
      maskClosable={false}
      destroyOnClose={true}
      width={857}
      okText="重新生成固件"
      wrapClassName="replace-module-modal">
      <div className="modify-firmware-modal">
        <div className="modify-firmware-modal-left">
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            name="modify-firmware-form"
            initialValues={{}}>
            {
              firmwareData.firmwareModuleList &&
              firmwareData.firmwareModuleList.map(item => (
                <React.Fragment key={item.funcModule}>
                  <div className="modify-firmware-title">{item.funcModule}</div>
                  {
                    item.firmwareFuncList && item.firmwareFuncList.map((item2, index2) => (
                      <React.Fragment key={item2.identifier}>
                        {
                          item2.dataType.type === 'int' &&
                          <Form.Item
                            label={item2.funcName}
                            name={`${item2.funcName}#${item2.identifier}`}
                            key={item2.identifier}
                            rules={[{ required: true, message: `请输入${item2.funcName}` }]}>
                            <Input />
                          </Form.Item>
                        }
                        {
                          item2.dataType.type === 'enum' &&
                          <div className="parent-item">
                            <Form.Item
                              label={item2.funcName}
                              name={`${item2.funcName}#${item2.identifier}`}
                              key={item2.identifier}
                              wrapperCol={{ span: 10 }}
                              rules={[{ required: true, message: `选择${item2.funcName}` }]}>
                              <Select onChange={(val) => { changeOptionVal(val, index2) }} allowClear>
                                {
                                  item2.dataType.specs.def && item2.dataType.specs.def.map(optionItem => (
                                    <Option key={optionItem.k} value={optionItem.k}>{optionItem.v}</Option>
                                  ))
                                }
                              </Select>
                            </Form.Item>
                            <Input className="son-item" key={item2} value={selectVal[index2]} disabled style={{ width: 100 }} />
                          </div>
                        }
                      </React.Fragment>
                    ))
                  }
                </React.Fragment>
              ))
            }
          </Form>
        </div>
        <div className="modify-firmware-modal-right">
          <img src={firmwareData.pinDiagram} alt="" />
        </div>
      </div>
    </Modal>
  )
}
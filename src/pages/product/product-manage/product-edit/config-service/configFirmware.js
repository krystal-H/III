import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './configFirmware.scss'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'

const { Option } = Select
const labelMap = { '1': '插件', '2': "模块", }
const initValmap = { '1': '模组插件', '2': 'MCU模块' }

function ConfigFirmware({
  productId,
  firmwareVisible,
  cancelHandle,
  type,
  editData,
  confirmHandle,
  customCount,
  schemeType,
  typeNoList
}) {
  const [form] = Form.useForm()
  const [selectModule, setSelectModule] = useState('')
  const [editTypeNoList, setEditTypeNoList] = useState([])
  const [canUpdate, setCanUpdate] = useState(false)
  const [hasZero] = useState(type === 'add' && typeNoList.indexOf(0) !== -1) // 新增且配置过0了

  console.log('已经使用的编号', typeNoList, type)
  const onFinish = (values) => {
    console.log('Received values of form: ', values, type, 'type');
    if (type === 'edit') {
      post(Paths.updateFirmwareModule, {
        id: editData.id,
        firmwareTypeName: values.firmwareTypeName,
        firmwareTypeNo: Number(values.firmwareTypeNo)
      }).then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        confirmHandle()
      })
    } else {
      let arr = [{
        deviceVersionType: Number(selectModule),
        productId,
        firmwareTypeName: values.firmwareTypeName,
        firmwareTypeNo: Number(values.firmwareTypeNo)
      }]
      if (values.list && values.list.length) {
        values.list.forEach(ele => {
          arr.push({
            deviceVersionType: Number(selectModule),
            productId,
            firmwareTypeName: ele.firmwareTypeName,
            firmwareTypeNo: Number(ele.firmwareTypeNo)
          })
        })
      }

      post(Paths.addFirmwareModule, arr).then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        confirmHandle()
      }, (err) => Notification({ description: err.data, type: 'error' }))
    }
  }

  const onOk = () => {
    form.submit()
  }

  useEffect(() => {
    if (type === 'edit') {
      setSelectModule(editData.deviceVersionType.toString())
      form.setFieldsValue({
        firmwareTypeName: editData.firmwareTypeName,
        firmwareTypeNo: editData.firmwareTypeNo
      })
      setEditTypeNoList(typeNoList.filter(item => item !== editData.firmwareTypeNo))
      if (editData.deviceVersionType == 1) {
        if (editData.firmwareTypeNo == 0) { // 不可修改
          setCanUpdate(true)
        }
      }
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps


  let arrMap = {
    list1: [],
    list2: [],
  }

  // const validNum = (value, listType) => {
  //   if (!value) return Promise.reject(new Error(`请输入${labelMap[selectModule]}编号`))
  //   if (type === 'add' && value == '0' && typeNoList.indexOf(0) == -1) return Promise.resolve() // 模组插件第一个0
  //   let reg = new RegExp("^([1-9]|[1-9]\\d|100)$")
  //   if (!reg.test(value)) {
  //     return Promise.reject(new Error('请输入1-100的整数字'))
  //   }

  //   let tempArr = arrMap[listType]
  //   tempArr = type === 'add' ?
  //     tempArr.concat(typeNoList) :
  //     type === 'edit' ?
  //       tempArr.concat(editTypeNoList) : []

  //   let { list, firmwareTypeNo } = form.getFieldsValue()
  //   list && list.filter(item => item).forEach(item => {
  //     item.firmwareTypeNo && tempArr.push(Number(item.firmwareTypeNo))
  //   })

  //   firmwareTypeNo && tempArr.push(Number(firmwareTypeNo))
  //   console.log(tempArr, '-----tempArr')
  //   if (tempArr.slice(0, tempArr.length - 1).indexOf(Number(value)) == -1) {
  //     return Promise.resolve()
  //   }
  //   return Promise.reject(new Error('此编号已被使用，请重新输入'));
  // }

  return (
    <Modal
      title={type === 'edit' ? '编辑产品固件模块' : '配置产品固件模块'}
      visible={firmwareVisible}
      width={555}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="config-firmware-modal">
        <Form
          form={form}
          name="config-firmware-form"
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 4 }}>
          {
            type === 'add' &&
            <div style={{ padding: '20px 20px 0px 20px' }}>
              <Form.Item name="deviceVersionType" label="选择模块"
                rules={[{ required: true, message: '请选择模块' }]}>
                <Select placeholder="请选择模块"
                  onChange={val => {
                    setSelectModule(val)
                    form.resetFields()
                    form.setFieldsValue({ 'deviceVersionType': val })
                    form.setFieldsValue({ 'firmwareTypeName': `${initValmap[val]}1` })
                    form.setFieldsValue({ 'firmwareTypeNo': val === '1' && typeNoList.indexOf(0) == -1 ? '0' : '' })
                  }}>
                  {schemeType == 2 && <Option value="2">MCU模块</Option>}
                  {
                    schemeType == 3 && <>
                      <Option value="1">模组插件</Option>
                      <Option value="2">MCU模块</Option></>
                  }
                </Select>
              </Form.Item>
            </div>
          }
          {
            selectModule &&
            <div className="form-item-block">
              <Form.Item
                label={`${labelMap[selectModule]}名称`}
                name="firmwareTypeName"
                initialValue={`${initValmap[selectModule]}1`}
                rules={[
                  { required: true, message: `请输入${labelMap[selectModule]}名称` },
                  { pattern: new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]+$/, "g"), message: '请输入中英文、数字且不超过30个字符' }
                ]}>
                <Input maxLength={30} placeholder={`请输入${labelMap[selectModule]}名称`} />
              </Form.Item>
              { // soc方案 模组插件  第一个默认编号是0
                selectModule === '1' &&
                <Form.Item
                  className="required-icon"
                  label={`${labelMap[selectModule]}编号`}
                  name="firmwareTypeNo"
                  rules={
                    [
                      // { validateTrigger: ['onBlur'] },
                      // { required: true},
                      // { pattern: hasZero ? new RegExp(/^([1-9]\d?|100)$/, "g") : null, message: hasZero ? '请输入1-100的整数字' : '' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          // return validNum(value, 'list1')
                          if (!value) return Promise.reject(new Error(`请输入${labelMap[selectModule]}编号`))
                          if (type === 'add' && value == '0' && typeNoList.indexOf(0) == -1) return Promise.resolve() // 模组插件第一个0
                          let reg = new RegExp("^([1-9]|[1-9]\\d|100)$")
                          if (!reg.test(value)) {
                            return Promise.reject(new Error('请输入1-100的整数字'))
                          }

                          let tempArr = []
                          tempArr = type === 'add' ?
                            tempArr.concat(typeNoList) :
                            type === 'edit' ?
                              tempArr.concat(editTypeNoList) : []

                          let { list, firmwareTypeNo } = form.getFieldsValue()
                          list && list.filter(item => item).forEach(item => {
                            item.firmwareTypeNo && tempArr.push(Number(item.firmwareTypeNo))
                          })

                          firmwareTypeNo && tempArr.push(Number(firmwareTypeNo))
                          console.log(tempArr, '-----tempArr')
                          if (tempArr.slice(0, tempArr.length - 1).indexOf(Number(value)) == -1) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('此编号已被使用，请重新输入'));
                        }
                      })
                    ]}>
                  <Input placeholder="请输入1-100的整数字，编号需唯一" disabled={(type === 'add' && typeNoList.indexOf(0) == -1) || canUpdate} />
                </Form.Item>
              }
              {// mcu模块
                selectModule !== '1' &&
                <Form.Item label={`${labelMap[selectModule]}编号`} name="firmwareTypeNo" className="required-icon"
                  rules={[
                    // { required: true, message: `请输入${labelMap[selectModule]}编号` },
                    // { pattern: new RegExp(/^([1-9]\d?|100)$/, "g"), message: '请输入1-100的整数字' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) return Promise.reject(new Error(`请输入${labelMap[selectModule]}编号`))
                        let reg = new RegExp("^([1-9]|[1-9]\\d|100)$")
                        if (!reg.test(value)) {
                          return Promise.reject(new Error('请输入1-100的整数字'))
                        }

                        let tempArr = []
                        tempArr = type === 'add' ?
                          tempArr.concat(typeNoList) :
                          type === 'edit' ?
                            tempArr.concat(editTypeNoList) : []

                        let { list, firmwareTypeNo } = form.getFieldsValue()
                        list && list.filter(item => item).forEach(item => {
                          item.firmwareTypeNo && tempArr.push(Number(item.firmwareTypeNo))
                        })

                        firmwareTypeNo && tempArr.push(Number(firmwareTypeNo))
                        console.log(tempArr, '-----tempArr')
                        if (tempArr.slice(0, tempArr.length - 1).indexOf(Number(value)) == -1) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('此编号已被使用，请重新输入'));
                      }
                    })
                  ]}>
                  <Input placeholder="请输入1-100的整数字，编号需唯一" />
                </Form.Item>
              }
            </div>
          }
          {
            type === 'add' &&
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, index, ...restField }) => (
                    <div className="form-item-block" key={key}>
                      <Form.Item
                        label={`${labelMap[selectModule]}名称`}
                        {...restField}
                        name={[name, 'firmwareTypeName']}
                        // initialValue={`${initValmap[selectModule]}${fields.length + 1}`}
                        fieldKey={[fieldKey, 'firmwareTypeName']}
                        rules={[
                          { required: true, message: `请输入${labelMap[selectModule]}名称` },
                          { pattern: new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]+$/, "g"), message: '请输入中英文、数字且不超过30个字符' }
                        ]}>
                        <Input maxLength={30} placeholder={`请输入${labelMap[selectModule]}名称`} />
                      </Form.Item>
                      <Form.Item
                        className="required-icon"
                        label={`${labelMap[selectModule]}编号`}
                        {...restField}
                        name={[name, 'firmwareTypeNo']}
                        fieldKey={[fieldKey, 'firmwareTypeNo']}
                        rules={[
                          // { required: true, message: `请输入${labelMap[selectModule]}编号` },
                          // { pattern: new RegExp(/^([1-9]\d?|100)$/, "g"), message: '请输入1-100的整数字' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value) return Promise.reject(new Error(`请输入${labelMap[selectModule]}编号`))
                              let reg = new RegExp("^([1-9]|[1-9]\\d|100)$")
                              if (!reg.test(value)) return Promise.reject(new Error('请输入1-100的整数字'))
                              let tempArr = []
                              tempArr = tempArr.concat(typeNoList)
                              console.log(form.getFieldsValue())
                              let { list, firmwareTypeNo } = form.getFieldsValue()
                              firmwareTypeNo && tempArr.push(Number(firmwareTypeNo))
                              list && list.filter(item => item).forEach(item => {
                                item.firmwareTypeNo && tempArr.push(Number(item.firmwareTypeNo))
                              })
                              console.log(tempArr, '-----tempArrlist')
                              const index = tempArr.findIndex(item => item == value)
                              tempArr.splice(index, 1)
                              if (tempArr.indexOf(Number(value)) == -1) {
                                return Promise.resolve()
                              }
                              return Promise.reject(new Error('此编号已被使用，请重新输入'));
                            },
                          })
                        ]}>
                        <Input placeholder="请输入1-100的整数字，编号需唯一" />
                      </Form.Item>
                      <div className="delete-btn" onClick={() => remove(name)}><DeleteOutlined />&nbsp;&nbsp;删除</div>
                    </div>
                  ))}
                  {
                    4 - fields.length - Number(customCount) > 0 && selectModule &&
                    <div className="add-btn" onClick={() => add()}>新增</div>
                  }
                </>
              )}
            </Form.List>
          }
        </Form>
      </div>
    </Modal>
  )
}

export default ConfigFirmware

import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Modal } from 'antd'
import { Notification } from '../../../../components/Notification'
import { Paths, post } from '../../../../api'
import TableCom from './selectTable'
import './index.scss'
const { TextArea } = Input;
//处理数据
function delaData(data, editData) {
  let newData = []
  data.forEach(item => {
    if (!item.funcParamList || !item.funcParamList.length) return
    item.funcParamList.forEach(item2 => {
      let newItem = JSON.parse(JSON.stringify(item))
      newData.push({ ...newItem, ...item2 })
    })
  })
  newData.forEach((item, index) => {
    item.key = index
    item.sendData = ''
    item.isCheck = false
    if (editData) {
      editData.forEach(editItem => {
        if (editItem.funcIdentifier === item.funcIdentifier) {
          item.isCheck = true
          if (item.funcType === "properties") {
            item.sendData = editItem.sendData
          } else {
            if (item.identifier === editItem.identifier) {
              item.sendData = editItem.sendData
            }
          }
        }

      })
    }
  })
  return newData
}

export default function AddModel({ addVisible, addOk, CancelAdd, deviceId, baseInfo, actionType, actionData }) {
  const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据
  const [detailObj, setDetailObj] = useState({})
  const [form] = Form.useForm();
  const ref = useRef(null)
  useEffect(() => {
    if (actionType !== 'add') {
      getDetail()
    } else {
      getTableData()
    }
  }, [])
  //编辑详情

  const getDetail = () => {
    let productId = baseInfo.productId
    let arr = [post(Paths.standardFnList, { productId}), post(Paths.singelDeviceRemoset, { taskId: actionData.taskId })]
    Promise.all(arr).then(res => {
      form.setFieldsValue({
        taskName: res[1].data.taskName,
        taskExplain: res[1].data.taskExplain
      })
      setDetailObj(res[1].data)
      let data = res[0].data.standard.concat(res[0].data.custom)
      data = data.filter(item => {
        if (item.funcTypeCN === '服务') {
          return item
        }
        if (item.funcTypeCN === '属性' && item.funcParamList[0].accessMode !== 'r') {
          return item
        }
      })
      data = delaData(data, JSON.parse(res[1].data.remoteProtocol.protocolJson))
      if (actionType === 'detail') {
        data = data.filter(item => {
          if (item.isCheck) {
            return item
          }
        })
      }
      setInitialProtoclList(data)
    })
  }
  //新增
  const getTableData = () => {
    let productId = baseInfo.productId
    post(Paths.standardFnList, { productId }).then((res) => {
      let data = res.data.standard.concat(res.data.custom)
      data = data.filter(item => {
        if (item.funcTypeCN === '服务') {
          return item
        }
        if (item.funcTypeCN === '属性' && item.funcParamList[0].accessMode !== 'r') {
          return item
        }
      })
      data = delaData(data)
      setInitialProtoclList(data)
    });
  }
  //提交
  const subData = () => {
    if (actionType === 'detail') {
      CancelAdd()
      return
    }
    ref.current.subOrder()
  }
  const finishSub = (data) => {
    form.validateFields().then(formvalue => {
      let params = {
        taskName: formvalue.taskName,
        deviceId,
        taskExplain: formvalue.taskExplain,
        protocolJson: JSON.stringify(data)
      }
      if (actionType === 'edit') {
        params.taskId = actionData.taskId
      }
      post(Paths.saveDeviceRemoset, params, { loading: true }).then((res) => {
        Notification({ type: 'success', description: '操作成功' })
        addOk()
      });
    })
  }
  return (
    <div >
      <Modal  maskClosable={false} title="远程配置任务" visible={addVisible} onOk={subData} onCancel={CancelAdd} width='1300px' wrapClassName='device-remote-config-modal'>
        <div>
          <Form
            form={form}
          >
            <Form.Item
              label="任务名称"
              name="taskName"
              rules={[{ required: true }]}

            >
              {actionType === 'detail' ? <span>{detailObj.taskName}</span> : <Input style={{ width: '300px' }} maxLength={20} />}
            </Form.Item>
            <Form.Item
              label="任务说明"
              name="taskExplain"
              rules={[{ required: true }]}
            >
              {actionType === 'detail' ? <span>{detailObj.taskExplain}</span> : <TextArea rows={4} maxLength={100} showCount />}
            </Form.Item>
          </Form>
          <div style={{ marginBottom: '10px' }}>{actionType === 'detail' ? '配置数据' : '请添加配置信息'} </div>
          <TableCom dataSource={initialProtoclList} ref={ref} finishSub={finishSub} actionType={actionType} />
        </div>
      </Modal>
    </div>
  )
}
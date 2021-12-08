import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { Paths, post } from '../../../api'
import TableCom from '../../device/deviceDetail/onlineSet/selectTable'

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
    if (Object.keys(editData).length > 0) {
      const resList = JSON.parse(editData.remoteProtocol.protocolJson)
      resList.forEach(editItem => {
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

function AddConfigData({ nextStep, productId, editData = {} }, ref) {
  const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据
  const [actionType] = useState(Object.keys(editData).length > 0 ? 'edit' : 'add')
  const tableRef = useRef(null)

  useEffect(() => {
    getTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //新增
  const getTableData = () => {
    post(Paths.standardFnList, { productId }, { loading: true }).then((res) => {
      let data = res.data.standard.concat(res.data.custom)
      data = data.filter(item => {
        if (item.funcTypeCN === '服务') {
          return item
        }
        if (item.funcTypeCN === '属性' && item.funcParamList[0].accessMode !== 'r') {
          return item
        }
      })
      if (actionType === 'edit') {
        data = delaData(data, editData)
      } else {
        data = delaData(data)
      }
      setInitialProtoclList(data)
    })
  }

  // 验证
  const validData = () => {
    tableRef.current.subOrder()
  }

  // 存数据  下一步
  const finishSub = (data) => {
    sessionStorage.setItem('addConfigData', JSON.stringify(data))
    nextStep()
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProtoclList])

  return (<TableCom dataSource={initialProtoclList} ref={tableRef} finishSub={finishSub} actionType={actionType} />)
}

export default forwardRef(AddConfigData)

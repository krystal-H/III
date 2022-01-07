import React, { useState, useEffect } from 'react'
import { Modal, Table } from 'antd'
import { Paths, post } from '../../../api'
import TableCom from '../../device/deviceDetail/onlineSet/selectTable'

import './checkDetailModal.scss'

//处理数据
function delaData(data, detailData) {
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
    if (Object.keys(detailData).length > 0) {
      const resList = JSON.parse(detailData.remoteProtocol.protocolJson)
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

function CheckDetailModal({ visible, detailData, onCancel, allProductList, actionType }) {
  const [initialProtoclList, setInitialProtoclList] = useState([])
  const [dataSource, setDataSource] = useState([])

  // get产品名称
  const getProductName = () => {
    let productName = ''
    allProductList.forEach(item => {
      if (item.productId === detailData.productId) {
        productName = item.productName
      }
    })
    return productName
  }

  const deviceRightColumns = [
    {
      title: '设备ID',
      dataIndex: 'deviceUniqueId',
      key: 'deviceUniqueId',
    },
    {
      title: '物理地址',
      dataIndex: 'macAddress',
      key: 'macAddress'
    }
  ]

  const getTableData = () => {
    post(Paths.standardFnList, { productId: detailData.productId }, { loading: true }).then((res) => {
      let data = res.data.standard.concat(res.data.custom)
      data = data.filter(item => {
        if (item.funcTypeCN === '服务') {
          return item
        }
        if (item.funcTypeCN === '属性' && item.funcParamList[0].accessMode !== 'r') {
          return item
        }
      })
      data = delaData(data, detailData)
      if (actionType === 'detail') {
        data = data.filter(item => item.isCheck)
      }
      setInitialProtoclList(data)
    })
  }

  useEffect(() => {
    getTableData()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Object.keys(detailData).length > 0) {
      const list = detailData.remoteProductDevicePage.list.map(item => {
        return {
          deviceId: item.deviceId,
          deviceUniqueId: item.deviceUniqueId,
          macAddress: item.macAddress,
          key: item.deviceUniqueId
        }
      })
      setDataSource(list)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title="远程配置任务"
      width={1100}
      visible={visible}
      onOk={onCancel}
      onCancel={onCancel}
      maskClosable={false}
      destroyOnClose={true}
      wrapClassName="replace-module-modal">
      <div className="remote-config-detail-modal">
        <div className="title">任务说明</div>
        <div className="task-desc">
          <div><span className="title">归属产品：</span>{getProductName()}</div>
          <div><span className="title">任务名称：</span>{detailData.taskName}</div>
          <div><span className="title">任务说明：</span>{detailData.taskExplain}</div>
        </div>
        <div className="title marT22">配置数据</div>
        <div>
          <TableCom dataSource={initialProtoclList} actionType={'detail'} />
        </div>
        <div className="title marT22">配置更新的设备</div>
        <div>
          <Table
            className="config-data-table"
            columns={deviceRightColumns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 155 }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CheckDetailModal

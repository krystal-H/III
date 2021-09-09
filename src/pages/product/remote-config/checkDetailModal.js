import React, { useState, useEffect } from 'react'
import { Modal, Table } from 'antd'
import { Paths, post } from '../../../api'

import './checkDetailModal.scss'

function CheckDetailModal({ visible, detailData, onCancel, allProductList }) {
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

  const configColumns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      width: 190
    },
    {
      title: '数据标识',
      dataIndex: 'identifier',
      key: 'identifier',
      width: 200
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (text, record) => {
        return (<span>{record.dataType.type}</span>)
      }
    },
    {
      title: '数据属性',
      render: (text, record) => {
        switch (record.dataType.type) {
          case 'int':
          case 'double':
          case 'float':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'text':
            return '-'
          case 'enum':
          case 'bool':
            return (
              <span>{Object.values(record.dataType.specs).join(' | ')}</span>
            )
          case 'date':
            return '-'
          default:
            break;
        }
      }
    },
    {
      title: '下发数据',
      dataIndex: 'sendData',
      key: 'sendData',
      render: (text, record, index) => {
        return (
          <span className="config-send-data">{record.sendData || ''}</span>
        )
      },
    }
  ]

  const deviceRightColumns = [
    {
      title: '设备ID',
      dataIndex: 'deviceUniqueId',
      key: 'deviceUniqueId',
      // width: 140,
    },
    {
      title: '物理地址',
      dataIndex: 'macAddress',
      // width: 140,
      key: 'macAddress'
    }
  ]

  // 获取关联协议列表
  const getRelationProtocol = () => {
    post(Paths.getPhysicalModel, {
      productId: detailData.productId
    }, { loading: true }).then(res => {
      res.data.properties && res.data.properties.forEach(item => { item.sendData = '' })
      if (Object.keys(detailData).length > 0) {
        const resList = JSON.parse(detailData.remoteProtocol.protocolJson)
        res.data.properties.forEach(item => {
          resList.forEach(s => {
            if (s.identifier === item.identifier) {
              item.sendData = s.sendData
            }
          })
        })
      }
      setInitialProtoclList(res.data.properties)
    })
  }

  useEffect(() => {
    getRelationProtocol()
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
          <Table columns={configColumns}
            className="config-data-table"
            dataSource={initialProtoclList}
            rowKey="identifier"
            scroll={{ y: 140 }}
            pagination={false} />
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

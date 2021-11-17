import React, { useState, useEffect } from 'react'
import { Modal, Table } from 'antd'

const deviceImportErrorText = ['设备ID的长度超过限制', '物理地址的长度超限制', '设备ID发生重复', '物理地址发生重复', '设备ID不存在或未联网', '物理地址不存在或未联网']

function DeviceImportErrorLogModal({ visible, errorList, onCancel }) {
  const errorColumns = [
    {
        title: '物理地址',
        dataIndex: 'physicalAddress',
        key: 'physicalAddress',
      },
    {
      title: '设备ID',
      dataIndex: 'deviceUniqueId',
      key: 'deviceUniqueId',
    },
    
    {
      title: '错误原因',
      dataIndex: 'errorType',
      width: 200,
      key: 'errorType',
      render: (text, record) => {
        let { errorType } = record;
        return <span>{deviceImportErrorText[errorType - 1]}</span>
      }
    }
  ]

  return (
    <Modal
      visible={visible}
      width={600}
      className="romote-modal"
      title={'设备导入错误日志'}
      centered={true}
      closable={true}
      onOk={null}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}>
      <div style={{paddingBottom:'20px'}}>
        <Table columns={errorColumns}
          dataSource={errorList || []}
          rowKey='deviceUniqueId'
          pagination={{
            total: errorList.length,
            defaultCurrent: 1,
            defaultPageSize: 5,
            showQuickJumper: false,
            hideOnSinglePage: true,
            size: 'small',
            showTotal: total => <span>共 <a>{total}</a> 条</span>
          }}
        />
      </div>
    </Modal>
  )
}

export default DeviceImportErrorLogModal

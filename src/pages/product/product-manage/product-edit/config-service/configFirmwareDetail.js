import React, { useState } from 'react'
import { Modal, Button, Table, Divider } from 'antd'
import { Notification } from '../../../../../components/Notification'
import { Paths, post } from '../../../../../api'
import { DateTool } from '../../../../../util/util'

import './configFirmwareDetail.scss'

function ConfigFirmwareDetail({ productId, firmwareDetailData = [], firmwareDetailVisible, cancelHandle, showAddFirmware, showEditFirmware, getFirmwareList }) {

  const columns = [
    {
      title: '编号',
      dataIndex: 'firmwareTypeNo',
      key: 'firmwareTypeNo'
    },
    {
      title: '名称',
      dataIndex: 'firmwareTypeName',
      key: 'firmwareTypeName'
    },
    {
      title: '配置时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => {
        let { createTime } = record;
        return <span>{createTime ? DateTool.utcToDev(createTime) : '--'}</span>
      }
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <div className="edit-ope">
          {
            record.isCustom === 0 &&
            <>
              { // soc方案模组插件且编号是0 证明是第一个 不能删除
                record.deviceVersionType == 1 && record.firmwareTypeNo == 0 &&
                <span onClick={() => showEditFirmware(record)}>编辑</span>
              }
              { // soc方案模组插件非0即非第一个  或者  是mcu模块  可以编辑和删除
                ((record.deviceVersionType === 1 && record.firmwareTypeNo !== 0) || (record.deviceVersionType !== 1)) &&
                <>
                  <span onClick={() => showEditFirmware(record)}>编辑</span>
                  <Divider type="vertical" />
                  <span onClick={() => deleteFirmwareItem(record)}>删除</span>
                </>
              }
            </>
          }
        </div>
      )
    }
  ]

  // 删除固件
  const deleteFirmwareItem = (record) => {
    post(Paths.delFirmwareModule, { productId, id: record.id }).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      getFirmwareList()
    })
  }

  return (
    <Modal
      title="配置产品固件模块"
      visible={firmwareDetailVisible}
      width={857}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="configfirmware-detail-modal">
        {/* <Button type="primary" className="mar22" onClick={() => showAddFirmware('add')}>新增产品固件模块</Button> */}
        <Table rowKey="firmwareTypeNo" columns={columns} dataSource={firmwareDetailData} pagination={false} size="small" />
      </div>
    </Modal>
  )
}

export default ConfigFirmwareDetail

import React, { useState, useEffect } from 'react'
import { Modal, Table } from 'antd'
import { Paths, post } from '../../../../api'
import { Notification } from '../../../../components/Notification'

function AddVoice({ productId, voiceType, visible, handleCancel, handleOk }) {
  const [dataSource, setDataSource] = useState([])
  const [selectedCount, setSelectedCount] = useState(0)
  const [abilityIds, setAbilityIds] = useState('')

  const columns = [
    {
      title: '语音能力ID',
      dataIndex: 'abilityId',
      key: 'abilityId',
      width: 120
    },
    {
      title: '语音能力名称',
      dataIndex: 'abilityName',
      key: 'abilityName',
      width: 120
    },
    {
      title: '语言调用词',
      dataIndex: 'abilityDesc',
      key: 'abilityDesc',
      render: (text) => {
        let abilityDesc = text && JSON.parse(text)
        let html = <div>{abilityDesc.desc}</div>
        const arr = abilityDesc.examples.map((item, index) => {
          return <span key={index}>{item}<br /></span>
        })
        return [html, arr]
      }
    },
    {
      title: '关联物模型功能',
      dataIndex: 'schemeRelationList',
      key: 'schemeRelationList',
      render: (text) => {
        return text.map((item, index) => (
          <span key={index}>
            {item}<br />
          </span>
        ))
      }
    }
  ]

  const getVoiceList = () => {
    const params = {
      voiceType,
      productId,
      // ...pager
    }
    post(Paths.getAllVoiceList, params, { loading: true }).then(res => {
      setDataSource(res.data.list)
    })
  }

  useEffect(() => {
    getVoiceList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCount(selectedRows.length)
      setAbilityIds(selectedRowKeys)
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
  }

  const submitData = () => {
    if (!selectedCount) return Notification({ type: 'warn', description: '请配置语音能力' })
    const params = {
      abilityIdList: abilityIds,
      productId,
      operation: '1' // 新增
    }
    post(Paths.addOrRemoveVoice, params, { loading: true }).then(res => {
      Notification({ type: 'success', description: '提交成功，需管理后台审核！' })
      handleOk()
    })
  }

  return (
    <Modal
      title="增加能力"
      destroyOnClose
      maskClosable={false}
      visible={visible}
      width={1200}
      onOk={submitData}
      okText="提交"
      onCancel={handleCancel}>
      <div style={{ marginBottom: 10 }}>
        已选择<a>&nbsp;{selectedCount}&nbsp;</a>项
      </div>
      <div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          rowKey="abilityId"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          // scroll={{ y: 450 }}
        />
      </div>
    </Modal>
  )
}

export default AddVoice

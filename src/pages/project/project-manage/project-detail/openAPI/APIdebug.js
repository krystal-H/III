import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form } from 'antd'
import './APIdebug.scss'

const { Search } = Input
let testData = [{
  key: '1',
  name: '获取设备信息',
  id: 123
}, {
  key: '2',
  name: '批量移入设备',
  id: 456
},
{
  key: '3',
  name: '修改设备信息',
  id: 789
}]
function APIdebug({ }) {
  const [rowId, setRowId] = useState('')

  const PageColumns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
  ]
  // 获取列表
  const getTableList = (val = '') => {

  }

  // 查询
  const searchApi = (val) => {
    if (val && !!val.trim()) {
      getTableList(val.trim())
    }
  }

  // 点击table行
  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowId(record.id)
      }
    }
  }
  // 设置选中的行样式
  const setRowClassName = (record) => {
    return record.id === rowId ? 'clickRowStyl' : '';
  }

  return (
    <div className="API-debug">
      <div className="API-debug-left comm-shadowbox">
        {/* 搜索 */}
        <Search placeholder="搜索" allowClear
          onSearch={value => searchApi(value)}
          style={{ width: '100%' }} />
        {/* 列表 */}
        <Table columns={PageColumns} showHeader={false}
          onRow={(record) => onClickRow(record)}
          rowClassName={(record) => setRowClassName(record)}
          className="ant-table-fixed"
          rowKey="taskId"
          dataSource={testData}
          pagination={false}
        />
      </div>
      <div className="API-debug-center comm-shadowbox">
        <div>---</div>
        <div>参数（请求方式：---）</div>
        <div>params</div>

      </div>
      <div className="API-debug-right comm-shadowbox">
        <div className="tip">
          API调试时，平台将使用当前项目的授权密钥(Access ID & Access Secret)获取临时token，对线上资源发起调用，请小心操作。
        </div>
        <div className="right-bar">
          <div className="right-bar-title">
            <span>真是请求URL</span>
            <span>复制</span>
          </div>
          <div className="right-bar-cont">
            ashdjahdja
          </div>
        </div>
        <div className="right-bar">
          <div className="right-bar-title">
            <span>响应结果</span>
            <span>复制</span>
          </div>
          <div className="right-bar-cont">
            {
              "{'code': 1114,msg: 'hello word!'}"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIdebug

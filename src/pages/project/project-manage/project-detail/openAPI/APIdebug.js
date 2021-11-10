import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
import { copyTextToClipBoard,DateTool } from '../../../../../util/util';
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
const resTxt = "{'code': 1114, msg: 'hello word!'}"
function APIdebug({ }) {
  const [rowId, setRowId] = useState('')
  const [form] = Form.useForm()

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

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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

  // 复制响应结果
  const copyResponse = () => {
    return copyTextToClipBoard(resTxt)
  }

  return (
    <div className="API-debug">
      {/* 左 */}
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
      {/* 中 */}
      <div className="API-debug-center comm-shadowbox">
        <div className="title line40">获取设备信息</div>
        <div className="cont">
          <div className="line40">参数（请求方式：GET）</div>
          <div className="bold">params</div>
          <div className="params-box">
            <Form form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                label="device_id"
                name="device_id"
                rules={[{ required: true, message: '请输入参数' }]}>
                <Input placeholder="请输入参数" />
              </Form.Item>
              <Form.Item
                label="device_id2"
                name="device_id2"
                rules={[{ required: true, message: '请输入参数' }]}>
                <Input placeholder="请输入参数" />
              </Form.Item>
              <div className="submit-btn">
                <Button type="primary" htmlType="submit">发起调用</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {/* 右 */}
      <div className="API-debug-right ">
        <div className="tip-desc">
          <InfoCircleFilled className="icon" /><span className="tip-text">API调试时，平台将使用当前项目的授权密钥（Access ID & Access Secret）获取临时token，对线上资源发起调用，请小心操作。</span>
        </div>
        <div className="right-bar comm-shadowbox">
          <div className="right-bar-title line40">
            <span>响应结果</span>
            <span className="copy" onClick={() => copyResponse()}>复制</span>
          </div>
          <div className="right-bar-cont">
            {
              resTxt
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIdebug

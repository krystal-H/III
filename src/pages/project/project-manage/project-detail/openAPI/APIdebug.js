import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form, message } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
import { copyTextToClipBoard, DateTool } from '../../../../../util/util';
import { Paths, post, get } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import './APIdebug.scss'

const { Search, TextArea } = Input

function APIdebug({ listItem = {}, projectId }) {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [pager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 100000000 })
  const [rowId, setRowId] = useState('')
  const [resultShow, setResultShow] = useState()
  const [curObj, setCurObj] = useState({})
  const PageColumns = [{ title: '项目名称', dataIndex: 'name', key: 'name', }]
  const [apiName, setApiName] = useState('')

  useEffect(() => {
    if (!rowId) {
      setResultShow('')
      form.resetFields()
    }
  }, [rowId])

  useEffect(() => {
    setCurObj(listItem)
    setRowId(listItem.apiId)
  }, [listItem])

  // 获取列表数据
  const getTableList = () => {
    let params = { projectId, name: apiName, ...pager }
    post(Paths.getProjectApiList, params, { loading: true }).then(res => {
      setDataSource(res.data.list)
    })
  }

  // 发起调试
  const onFinish = (values) => {
    if (!rowId) return Notification({ description: '请选择需要调用的接口！', type: 'warn' })
    const params = {
      apiId: rowId,
      reqParams: JSON.stringify({ ...values })
    }
    post(Paths.debugAPI, params, { loading: true })
      .then(res => {
        if (res) setResultShow(JSON.stringify(JSON.parse(res), undefined, 4))
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // 点击table行
  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowId(record.apiId)
        setCurObj(record)
        setResultShow('')
        form.resetFields()
      }
    }
  }

  // 设置选中的行样式
  const setRowClassName = (record) => {
    return record.apiId === rowId ? 'clickRowStyl' : '';
  }

  useEffect(() => {
    getTableList()
  }, [apiName]) // eslint-disable-line react-hooks/exhaustive-deps


  // 复制响应结果
  const copyResponse = () => {
    return copyTextToClipBoard(resultShow)
  }

  return (
    <div className="API-debug">
      {/* left-block */}
      <div className="API-debug-left comm-shadowbox">
        {/* 搜索 */}
        <Search placeholder="搜索" allowClear
          onSearch={value => setApiName(value)}
          style={{ width: '100%' }} />
        {/* 列表 */}
        <Table columns={PageColumns} showHeader={false}
          onRow={(record) => onClickRow(record)}
          rowClassName={(record) => setRowClassName(record)}
          className="ant-table-fixed"
          rowKey="apiId"
          dataSource={dataSource}
          pagination={false}
        />
      </div>
      {/* center-block */}
      <div className="API-debug-center comm-shadowbox">
        <div className="title line40">获取设备信息</div>
        <div className="cont">
          <div className="line40">参数（请求方式：{curObj.method || '--'}）</div>
          <div className="bold">params</div>
          <div className="params-box">
            <Form form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              {
                Object.keys(curObj).length > 0 && JSON.parse(curObj.params) &&
                JSON.parse(curObj.params).map(item => (
                  <div key={item.name + item.desc}>
                    <Form.Item
                      label={item.desc}
                      name={item.name}
                      rules={[{ required: item.require, message: '请输入参数' }]}>
                      <Input placeholder="请输入参数" />
                    </Form.Item>
                  </div>
                ))
              }
              <div className="submit-btn">
                <Button type="primary" htmlType="submit">发起调用</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {/* right-block */}
      <div className="API-debug-right ">
        <div className="tip-desc">
          <InfoCircleFilled className="icon" /><span className="tip-text">API调试时，平台将使用当前项目的授权密钥（Access ID & Access Secret）获取临时token，对线上资源发起调用，请小心操作。</span>
        </div>
        <div className="right-bar comm-shadowbox">
          <div className="right-bar-title line40">
            <span>响应结果</span>
            <span className="copy" onClick={() => copyResponse()}>复制</span>
          </div>
          <TextArea autoSize={{ minRows: 25, maxRows: 25 }} value={resultShow}></TextArea>
        </div>
      </div>
    </div>
  )
}

export default APIdebug

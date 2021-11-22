import React, { useState, useEffect } from 'react'
import { Table, Divider } from 'antd'
import { addKeyToTableData } from '../../../../../util/util'
import { cloneDeep } from 'lodash'
import { Paths, post } from '../../../../../api'

function APIList({ changeKey, projectId }) {
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
  const [dataSource, setDataSource] = useState([])

  const PageColumns = [
    {
      title: 'API名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'API详情',
      dataIndex: 'apiDetail',
      key: 'apiDetail'
    },
    {
      title: '项目调用次数',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <div className="operation">
          <a onClick={() => downloadDoc(record.doc)}>查看文档</a>
          <Divider type="vertical" />
          <a onClick={() => apidebug(record)}>调试</a>
        </div>
      )
    }
  ]

  // 查看下载文档
  const downloadDoc = (url) => {
    url ? window.open(url) : alert('暂无数据！')
  }

  // 操作-调试
  const apidebug = (record) => {
    changeKey('2', record)
  }

  // 获取列表数据
  const getTableList = () => {
    let params = { projectId, ...pager }
    post(Paths.getProjectApiList, params, { loading: true }).then(res => {
      setDataSource(addKeyToTableData(res.data.list))
      setPager(pre => {
        let obj = cloneDeep(pre)
        obj.totalRows = res.data.pager.totalRows
        return obj
      })
    })
  }

  useEffect(() => {
    getTableList()
  }, [pager.pageIndex, pager.pageRows]) // eslint-disable-line react-hooks/exhaustive-deps

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }

  return (
    <div id='project-mgt'>
      <div className="comm-shadowbox pd22">
        <Table columns={PageColumns}
          className="ant-table-fixed"
          rowKey="apiId"
          dataSource={dataSource}
          pagination={{
            defaultCurrent: 1,
            current: pager.pageIndex,
            pageSize: pager.pageRows,
            total: pager.totalRows,
            showSizeChanger: false,
            showQuickJumper: pager.totalPages > 5,
            onChange: pagerChange,
            showTotal: total => <span>共 <a>{total}</a> 条</span>
          }}
        />
      </div>
    </div>
  )
}

export default APIList

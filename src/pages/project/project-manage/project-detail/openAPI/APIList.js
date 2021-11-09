import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form } from 'antd'
import { useHistory } from 'react-router-dom';
import { DateTool, addKeyToTableData } from '../../../../../util/util'
import PageTitle from '../../../../../components/page-title/PageTitle'
import { cloneDeep } from 'lodash'
import { Paths, post, get } from '../../../../../api'

const { Search } = Input
let testData = [{}]
function APIList({ changeKey }) {
  const history = useHistory()
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
  const [createModal, setCreateModal] = useState(false) // 创建项目
  const [dataSource, setDataSource] = useState([])

  const PageColumns = [
    {
      title: 'API名称',
      dataIndex: '',
      key: '',
    },
    {
      title: 'API详情',
      dataIndex: '',
      key: ''
    },
    {
      title: '项目调用次数',
      dataIndex: '',
      key: '',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <div className="operation">
          <a>查看文档</a>
          <Divider type="vertical" />
          <a onClick={() => apidebug(record)}>调试</a>
        </div>
      )
    }
  ]

  // 调试
  const apidebug = () => {
    changeKey('2')
  }

  // 获取列表数据
  const getTableList = () => {
    let params = {
      ...pager
    }
    // post(Paths.ccc, params, { loading: true }).then(res => {
    //   setDataSource(addKeyToTableData(res.data.list))
    // })
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
          rowKey="taskId"
          dataSource={testData}
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
    </div >
  )
}

export default APIList

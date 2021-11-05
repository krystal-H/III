import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form } from 'antd'
import { DateTool, addKeyToTableData } from '../../../../util/util'
import PageTitle from '../../../../components/page-title/PageTitle'
import { cloneDeep } from 'lodash'
import { Paths, post, get } from '../../../../api'
import { Notification } from '../../../../components/Notification'
import './list.scss'

const { Search } = Input

function ProjectList() {
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })

  const PageColumns = [
    {
      title: '项目名称',
      dataIndex: '',
      key: '',
    },
    {
      title: '项目ID',
      dataIndex: '',
      key: ''
    },
    {
      title: '创建时间',
      dataIndex: '',
      key: '',
    },
    {
      title: '更新时间',
      dataIndex: '',
      key: ''
    },
    {
      title: '操作',
      key: 'action',
    }
  ]

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }
  // 查询项目
  const searchProject = (val) => {
    
  }

  return (
    <div id='project-mgt'>
      <PageTitle title='项目管理'></PageTitle>
      <div className="page-header comm-shadowbox">
        <div className="page-header-left">
          <Search placeholder="项目名称"
            allowClear
            enterButton="查询"
            onSearch={value => searchProject(value)}
            style={{ width: 465, margin: '0 22px' }} />
        </div>
        <div className="page-header-right">
          <Button type="primary">创建项目</Button>
        </div>
      </div>
      {/* table */}
      <div className='comm-shadowbox'>
        <Table columns={PageColumns}
          className="ant-table-fixed"
          rowKey="taskId"
          dataSource={[]}
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

export default ProjectList

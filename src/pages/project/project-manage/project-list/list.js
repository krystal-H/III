import React, { useState, useEffect } from 'react'
import { Button, Table, Divider, Select, Steps, Input, Form } from 'antd'
import { useHistory } from 'react-router-dom';
import { DateTool, addKeyToTableData } from '../../../../util/util'
import PageTitle from '../../../../components/page-title/PageTitle'
import { cloneDeep } from 'lodash'
import { Paths, post } from '../../../../api'
import CreateProject from '../project-add'
import './list.scss'

const { Search } = Input
function ProjectList() {
  const history = useHistory()
  const [projectName, setProjectName] = useState('')
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
  const [createModal, setCreateModal] = useState(false) // 创建项目
  const [opeType, setOpeType] = useState('add')
  const [editData, setEditData] = useState({})
  const [dataSource, setDataSource] = useState([])

  const PageColumns = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '项目ID',
      dataIndex: 'projectId',
      key: 'projectId'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return createTime && DateTool.utcToDev(createTime);
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return updateTime && DateTool.utcToDev(updateTime);
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <div className="operation">
          <a onClick={() => addOrEditProject(record, 'edit')}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => goDetail(record)}>查看详情</a>
        </div>
      )
    }
  ]

  // 获取列表数据
  const getTableList = () => {
    let params = {
      projectName,
      ...pager
    }
    post(Paths.projectList, params, { loading: true }).then(res => {
      setDataSource(res.data.list)
      setPager(pre => {
        let obj = cloneDeep(pre)
        obj.totalRows = res.data.pager.totalRows
        return obj
      })
    })
  }

  useEffect(() => {
    sessionStorage.removeItem('d_data')
  }, [])

  useEffect(() => {
    getTableList()
  }, [pager.pageIndex, pager.pageRows, projectName]) // eslint-disable-line react-hooks/exhaustive-deps

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }

  // 查询项目
  const searchProject = (val) => {
    setProjectName(val)
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: 1 })
    })
  }

  // 创建/编辑项目
  const addOrEditProject = (record, type) => {
    setCreateModal(true)
    setOpeType(type)
    setEditData(type === 'add' ? {} : record)
  }

  //查看详情
  const goDetail = (data) => {
    sessionStorage.setItem('d_data', JSON.stringify(data))
    history.push(`/open/project/projectManage/detail/${data.projectId}?step=1`);
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
          <Button type="primary" onClick={() => addOrEditProject('', 'add')}>创建项目</Button>
        </div>
      </div>
      {/* table */}
      <div className="comm-shadowbox pd22">
        <Table columns={PageColumns}
          className="ant-table-fixed"
          rowKey="projectId"
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
      {/* 创建、编辑 */}
      {
        createModal &&
        <CreateProject
          opeType={opeType}
          editData={editData}
          visible={createModal}
          handleCancel={() => setCreateModal(false)}
          handleOk={() => {
            setCreateModal(false)
            getTableList()
          }}>
        </CreateProject>
      }
    </div >
  )
}

export default ProjectList

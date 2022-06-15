import React, { useState, useEffect } from 'react'
import { Button, Table, DatePicker, Input, Form } from 'antd'
import { useHistory } from 'react-router-dom';
import { DateTool, addKeyToTableData } from '../../../../util/util'
import { cloneDeep } from 'lodash'
import { Paths, post } from '../../../../api'
import dayjs from 'dayjs'
import moment from 'moment'
import { Notification } from '../../../../components/Notification';

const { RangePicker } = DatePicker

const statusMap = {
  1: '初始化',
  2: '运行中',
  3: '运行成功',
  4: '运行失败'
}

function DataDownload({ baseInfo, devceId }) {
  const history = useHistory()
  const [form] = Form.useForm()
  const [projectName, setProjectName] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })

  const disabledDate = current => {
    let middle = dayjs().format('YYYY-MM-DD')
    return current && (current < dayjs(middle).subtract(7, 'day') || current >= dayjs(middle).subtract(-1, 'day').second(1))
  }

  const PageColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 300
    },
    {
      title: '参数',
      dataIndex: 'params',
      key: 'params',
      width: '28%'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render(text) {
        return <span>{statusMap[text]}</span>
      }
    },
    {
      title: '日志',
      dataIndex: 'msg',
      key: 'msg',
      width: '25%'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 220,
      render(createTime) {
        return createTime && DateTool.utcToDev(createTime);
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (text, record) => (
        <div className="operation">
          <a onClick={() => downData(record.result)}>下载</a>
        </div>
      )
    }
  ]


  const downData = (url) => {
    if (!url) return Notification({type: 'warn', message: '暂无数据'})
    window.open(url)
  }

  // 获取列表数据
  const getTableList = () => {
    post(Paths.downDeviceDataList, {origin: 'open', ...pager}, { loading: true }).then(res => {
      setDataSource(res.data.list)
      setPager(pre => {
        let obj = cloneDeep(pre)
        obj.totalRows = res.data.pager.totalRows
        return obj
      })
    })
  }

  useEffect(() => {
    getTableList()
  }, [pager.pageIndex, pager.pageRows, projectName]) // eslint-disable-line react-hooks/exhaustive-deps

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }

  // 搜索
  const searchList = () => {
    const { times } = form.getFieldsValue()
    let obj = {}
    if (times && times.length) {
      obj.startTime = moment(times[0]).valueOf()
      obj.endTime = moment(times[1]).valueOf()
    }
    let params = {
      macStrs: baseInfo.deviceMac,
      productId: baseInfo.productId,
      originEnum: 'open',
      startTime: obj.startTime,
      endTime: obj.endTime
    }
    post(Paths.createExport, params).then(res => {
      if (res.code === 0) {
        getTableList()
      }
    })
  }

  //清除搜索条件
  const clearForm = () => {
    form.resetFields();
  }

  return (
    <div id='project-mgt'>
      <div className="page-header" style={{ marginBottom: 20, paddingLeft: 5 }}>
        <Form className='device-filter-form' form={form} layout='inline'>
          <Form.Item name="times" label="时间">
            <RangePicker
              showTime
              allowClear={true}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item label=" " colon={false} style={{ marginRight: '2px' }}>
            <Button type="primary" onClick={searchList}>查询</Button>
          </Form.Item>
          <Form.Item label=" " colon={false} style={{ marginRight: '0px' }}>
            <Button onClick={clearForm}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      {/* table */}
      <div className="pd22">
        <Table columns={PageColumns}
          className="ant-table-fixed"
          rowKey="id"
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
    </div >
  )
}

export default DataDownload

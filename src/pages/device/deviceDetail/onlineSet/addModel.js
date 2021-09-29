import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Table, Modal, Select, InputNumber, DatePicker } from 'antd'
import { Notification } from '../../../../components/Notification'
import { cloneDeep } from 'lodash'
import { Paths, get, post } from '../../../../api'
import { useHistory } from 'react-router-dom';
import './index.scss'
import moment from 'moment'
const { TextArea } = Input;
const { Option } = Select


export default function AddModel({ addVisible, addOk, CancelAdd }) {
  let history = useHistory();
  const deviceId=history.location.pathname.split('/').slice(-1)[0]
  const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据
  const [selectedProtocols, setSelectedProtocols] = useState([]) // rowSelection
  const [sendDataCheck, setSendDataCheck] = useState([])
  const [form] = Form.useForm();
  //获取产品id
  useEffect(() => {
    getProductDetail()
  }, [])
  const [productId, setProductId] = useState('')
  const getProductDetail = (loading = true) => {
    post(Paths.getDeviceInfo, { deviceId }).then((res) => {
      if (res.data.productId) {
        getTableData(res.data.productId)
        setProductId(res.data.productId)
      }

    });
  }
  const getTableData = (id) => {
    post(Paths.getPhysicalModel, { productId: id }).then((res) => {
      setInitialProtoclList(res.data.properties)
    });
  }
  const protocolSelectChange = selectedRowKeys => {
    setSelectedProtocols(selectedRowKeys)
  }
  const protocolSelection = {
    selectedRowKeys: selectedProtocols,
    onChange: protocolSelectChange,
  }
  // 输入参数
  const changeSendData = (value, index) => {
    const copyList = cloneDeep(initialProtoclList)
    copyList[index].sendData = value
    setInitialProtoclList(copyList)
  }
  // 日期插件选择
  const onChangeDate = (date, dateString, index) => {
    changeSendData(dateString, index)
  }
  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      width: 190
    },
    {
      title: '数据标识',
      dataIndex: 'identifier',
      key: 'identifier',
      width: 200
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (text, record) => {
        return (<span>{record.dataType.type}</span>)
      }
    },
    {
      title: '数据属性',
      render: (text, record) => {
        switch (record.dataType.type) {
          case 'int':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'double':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'float':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'text':
            return '-'
          case 'enum':
            return (
              <span>{Object.values(record.dataType.specs).join(' | ')}</span>
            )
          case 'date':
            return '-'
          case 'bool':
            return (
              <span>{Object.values(record.dataType.specs).join(' | ')}</span>
            )
          default:
            break;
        }
      }
    },
    {
      title: '下发数据',
      dataIndex: 'sendData',
      key: 'sendData',
      render: (text, record, index) => {
        let { specs, type } = record.dataType,
          _dom = null
        switch (type) {
          case 'int':
          case 'double':
          case 'float':
            _dom = (<InputNumber value={record.sendData}
              min={specs.min}
              max={specs.max}
              onChange={value => changeSendData(value, index)}
              placeholder="请输入参数"></InputNumber>)
            break
          case 'text':
            _dom = (
              <Input value={record.sendData}
                maxLength={30}
                onChange={e => changeSendData(e.target.value.trim(), index)}
                placeholder="请输入参数"></Input>
            )
            break
          case 'enum':
          case 'bool':
            _dom = (
              <Select
                value={record.sendData}
                onChange={value => changeSendData(value, index)}>
                {
                  Object.values(specs) && Object.values(specs).map((item, index) => (
                    <Option key={index + item} value={item}>{item}</Option>
                  ))
                }
              </Select>
            )
            break
          case 'date':
            _dom = (
              <DatePicker style={{ width: 182 }}
                defaultValue={moment(record.sendData, "YYYY-MM-DD HH:mm:ss") || ''}
                onChange={(date, dateString) => {
                  onChangeDate(date, dateString, index)
                }}
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                showNow />
            )
            break
          default:
            break;
        }
        return (
          <span className={`config-send-data ${sendDataCheck.includes(index) ? 'warn' : ''}`}>
            {_dom}
          </span>
        )
      },
    }
  ]
  //提交
  const subData = () => {
    form.validateFields().then(formvalue => {
      if (selectedProtocols.length === 0) {
        return Notification({ description: '请至少选择一条配置协议' })
      } else {
        console.log(selectedProtocols, '========')
        for (let index = 0; index < selectedProtocols.length; index++) {
          const item = selectedProtocols[index]
          for (let index = 0; index < initialProtoclList.length; index++) {
            const ele = initialProtoclList[index]
            if (item === ele.identifier) {
              let isCOntinue = ele.sendData ?? undefined
              if (typeof isCOntinue == 'undefined') return Notification({ description: '请为配置协议添加参数' })
            }
          }
        }
        let params = {
          taskName: formvalue.taskName,
          deviceId,
          taskExplain: formvalue.taskExplain,
          protocolJson: JSON.stringify(initialProtoclList.filter(item => {
            let isCOntinue = item.sendData ?? undefined
            if (typeof isCOntinue !== 'undefined') {
              return item
            }
          }))
        }
        post(Paths.saveDeviceRemoset, params).then((res) => {
          Notification({ type: 'success', description: '添加成功' })
          addOk()
        });
        // console.log('提交的数据', initialProtoclList,initialProtoclList.filter(item => item.sendData), params,'*************')
        // sessionStorage.setItem('addConfigData', JSON.stringify(initialProtoclList.filter(item => item.sendData)))
        // nextStep()
      }
    })
  }
  return (
    <div >
      <Modal title="远程配置任务" visible={addVisible} onOk={subData} onCancel={CancelAdd} width='1100px' wrapClassName='device-remote-config-modal'>
        <div>

          <Form
            form={form}
          >
            <Form.Item
              label="任务名称"
              name="taskName"
              rules={[{ required: true }]}

            >
              <Input style={{ width: '300px' }} maxLength={20} />
            </Form.Item>
            <Form.Item
              label="任务说明"
              name="taskExplain"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} maxLength={100} />
            </Form.Item>
          </Form>
          <div style={{ marginBottom: '10px' }}>请添加配置信息</div>
          <Table className="config-data-table" dataSource={initialProtoclList} scroll={{ y: 300 }}
            locale={{ emptyText: '暂无协议，请先去配置' }}
            columns={columns} rowKey='identifier' rowSelection={protocolSelection} pagination={false} />
        </div>
      </Modal>
    </div>
  )
}
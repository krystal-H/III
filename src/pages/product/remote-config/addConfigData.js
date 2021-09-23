import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input, Table, Select, InputNumber, DatePicker } from 'antd'
import { setFuncDataType } from '../../../util/util'
import { Notification } from '../../../components/Notification'
import { cloneDeep } from 'lodash'
import { Paths, get, post } from '../../../api'
import moment from 'moment'

const { Option } = Select


function AddConfigData({ nextStep, productId, editData }, ref) {
  const [selectedProtocols, setSelectedProtocols] = useState([]) // rowSelection
  const [sendDataCheck, setSendDataCheck] = useState([])
  const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据
  const [protocolSendData, setProtocolSendData] = useState([])

  // 下一步验证  需要后续修改
  const validData = () => {
    if (selectedProtocols.length === 0) {
      return Notification({ description: '请至少选择一条配置协议' })
    } else {
      for (let index = 0; index < selectedProtocols.length; index++) {
        const item = selectedProtocols[index]
        for (let index = 0; index < initialProtoclList.length; index++) {
          const ele = initialProtoclList[index]
          if (item === ele.identifier) {
            if (!ele.sendData && ele.sendData !== 0) return Notification({ description: '请为配置协议添加参数' })
          }
        }
      }
      console.log('提交的数据', initialProtoclList.filter(item => item.sendData), '*************')
      sessionStorage.setItem('addConfigData', JSON.stringify(initialProtoclList.filter(item => item.sendData)))
      nextStep()
    }
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProtocols, initialProtoclList])

  // 获取关联协议列表
  const getRelationProtocol = () => {
    post(Paths.getPhysicalModel, { productId }, { loading: true }).then(res => {
      res.data.properties && res.data.properties.forEach(item => { item.sendData = '' })

      if (Object.keys(editData).length > 0) {
        const resList = JSON.parse(editData.remoteProtocol.protocolJson)
        res.data.properties.forEach(item => {
          resList.forEach(s => {
            if (s.identifier === item.identifier) {
              item.sendData = s.sendData
              setSelectedProtocols((pre) => {
                const list = cloneDeep(pre)
                list.push(s.identifier)
                return list
              })
            }
          })
        })
      }

      setInitialProtoclList(res.data.properties)
    })
  }

  useEffect(() => {
    getRelationProtocol()
  }, [productId])  // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    console.log(selectedProtocols, 'selectedProtocolsselectedProtocolsselectedProtocols')
  }, [selectedProtocols])

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

  const protocolSelectChange = selectedRowKeys => {
    setSelectedProtocols(selectedRowKeys)
  }

  const protocolSelection = {
    selectedRowKeys: selectedProtocols,
    onChange: protocolSelectChange,
  }

  const configColumns = [
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
          case 'double':
          case 'float':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'text':
            return '-'
          case 'enum':
          case 'bool':
            return (
              <span>{Object.values(record.dataType.specs).join(' | ')}</span>
            )
          case 'date':
            return '-'
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
                <Option key={-1} value="">请选择参数</Option>
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
                defaultValue={record.sendData ? moment(record.sendData, "YYYY-MM-DD HH:mm:ss") : ''}
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
  return (
    <Table columns={configColumns}
      className="config-data-table"
      rowSelection={protocolSelection}
      dataSource={initialProtoclList}
      rowKey="identifier"
      scroll={{ y: 300 }}
      pagination={false}
    />
  )
}

export default forwardRef(AddConfigData)

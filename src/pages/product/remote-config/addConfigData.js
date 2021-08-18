import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Modal, Button, Input, Table, Select, InputNumber, Divider } from 'antd'
import { DateTool, setFuncDataType, addKeyToTableData, createArrayByLength } from '../../../util/util'
import { Notification } from '../../../components/Notification'
import { cloneDeep } from 'lodash'

const { Option } = Select

// 模拟数据
let protocolLists = [
  {
    arrayDefVOList: null,
    command: null,
    content: null,
    dataType: 5,
    dataTypeId: 5,
    dataTypeName: "配置数据",
    dataTypeNameEn: "Config Data",
    developerId: null,
    deviceSubtypeId: null,
    deviceTypeId: null,
    mode: 0,
    moduleType: null,
    productId: 139,
    productVersion: null,
    protocolFormat: 1,
    protocolId: 68726,
    protocolStatus: 1,
    protocolType: 1,
    structDefVOList: null,
    list: [
      {
        actionType: null,
        bitDefList: null,
        commonName: "基础功能_一(序号)_数值配置",
        defaultPropertyValue: null,
        functionDataType: 2,
        gap: 1,
        ignore: false,
        isSigned: 0,
        isTemplateField: 1,
        javaType: "LONG",
        length: 1,
        loop: null,
        mulriple: 1,
        property: "Base_1_ValueCfg_Null",
        propertyFrom: null,
        propertyName: "心率",
        propertyValueDesc: "0~255",
        propertyValueType: "RANGE",
        remark: null,
        standard: null,
        thingLabel: null,
        thingLabelId: null,
        thingLabelName: null,
        unit: null
      },
      {
        actionType: null,
        bitDefList: null,
        commonName: "基础功能_二(序号)_数值配置",
        defaultPropertyValue: null,
        functionDataType: 2,
        gap: 1,
        ignore: false,
        isSigned: 0,
        isTemplateField: 1,
        javaType: "LONG",
        length: 1,
        loop: null,
        mulriple: 1,
        property: "Base_2_ValueCfg_Null",
        propertyFrom: null,
        propertyName: "呼吸率",
        propertyValueDesc: "0~255",
        propertyValueType: "RANGE",
        remark: null,
        standard: null,
        thingLabel: null,
        thingLabelId: null,
        thingLabelName: null,
        unit: null
      },
      {
        actionType: null,
        bitDefList: null,
        commonName: "基础功能_数值配置_定时时间",
        defaultPropertyValue: null,
        functionDataType: 2,
        gap: 1,
        ignore: false,
        isSigned: 0,
        isTemplateField: 1,
        javaType: "LONG",
        length: 1,
        loop: null,
        mulriple: 1,
        property: "Base_Null_ValueCfg_TimingTime",
        propertyFrom: null,
        propertyName: "上传实时波形",
        propertyValueDesc: "0~255",
        propertyValueType: "RANGE",
        remark: "上传实时波形的剩余持续时间，以10s为单位",
        standard: null,
        thingLabel: null,
        thingLabelId: null,
        thingLabelName: null,
        unit: null
      },
      {
        actionType: null,
        bitDefList: null,
        commonName: "基础功能_开关配置",
        defaultPropertyValue: null,
        functionDataType: 3,
        gap: null,
        ignore: false,
        isSigned: 0,
        isTemplateField: 1,
        javaType: "LONG",
        length: 1,
        loop: null,
        mulriple: null,
        property: "Base_Null_OnOffCfg_Null",
        propertyFrom: null,
        propertyName: "在离床标志",
        propertyValueDesc: "0-离床|1-在床",
        propertyValueType: "ENUM",
        remark: null,
        standard: null,
        thingLabel: null,
        thingLabelId: null,
        thingLabelName: null,
        unit: null
      },
      {
        actionType: null,
        bitDefList: null,
        commonName: "基础功能_字符串配置_处理过的传感器信号",
        defaultPropertyValue: null,
        functionDataType: 1,
        gap: null,
        ignore: false,
        isSigned: 0,
        isTemplateField: 1,
        javaType: "STRING",
        length: 108,
        loop: null,
        mulriple: null,
        property: "Base_Null_StringCfg_TreatedBeltSignal",
        propertyFrom: null,
        propertyName: "原始波形",
        propertyValueDesc: null,
        propertyValueType: null,
        remark: null,
        standard: null,
        thingLabel: null,
        thingLabelId: null,
        thingLabelName: null,
        unit: null
      }
    ]
  }
]

function AddConfigData({ nextStep }, ref) {
  const [selectedProtocols, setSelectedProtocols] = useState([])
  const [sendDataCheck, setSendDataCheck] = useState([])
  const [configProtoclList, setconfigProtoclList] = useState([])
  const [protocolSendData, setProtocolSendData] = useState(configProtoclList.map(item => item.defaultPropertyValue || ''))
  const [protocolFormat, setProtocolFormat] = useState(0)


  // 下一步验证
  const validData = () => {
    console.log(nextStep, ref)
    debugger
    let temp = []
    if (protocolFormat !== 1) {
      if (selectedProtocols.length < 1) {
        return Notification({ description: '请至少选择一条配置协议' })
      } else {
        selectedProtocols.forEach((item) => {
          if (['', ' ', null, undefined].includes(protocolSendData[item])) {
            temp.push(item)
          }
        })
      }
    } else {
      protocolSendData.forEach((item, index) => {
        if (['', ' ', null, undefined].includes(item)) {
          temp.push(index)
        }
      })
    }
    if (temp.length > 0) {
      Notification({
        description: '请为配置协议添加参数'
      })
      setSendDataCheck(temp)
      return
    }
    // 可能要前端保存数据到store，
    // TODO
    nextStep()
  }

  // 用于定义暴露给父组件的ref方法
  useImperativeHandle(ref, () => ({
    onFinish: validData
  }))

  useEffect(() => {
    let config = protocolLists.filter(item => item.dataType === 5), // 配置协议
      _config = (config[0] && config[0].list) || [],
      _protocolFormat = (config[0] && config[0].protocolFormat) || 0;
    _config = _config.filter(item => item.property !== "Base_Null_Reserved_Null"); // 过滤保留字

    _config = _config.map((item, index) => {
      let { propertyValueDesc } = item,
        _params = null;
      if (propertyValueDesc && propertyValueDesc.indexOf('|') > -1) {
        _params = propertyValueDesc.split('|').map(item => {
          let p = item.split('-');
          if (p.length > 1) {
            return {
              name: p[1],
              value: p[0]
            }
          }
          return {}
        })
      }
      if (propertyValueDesc && propertyValueDesc.indexOf('~') > -1) {
        let [min, max] = propertyValueDesc.split('~');
        _params = {
          min: +min,
          max: +max
        }
      }
      return {
        ...item,
        _type: setFuncDataType(item),
        _params,
        _index: index,
        key: index
      }
    })
    setconfigProtoclList(_config)
    setProtocolFormat(_protocolFormat)
  }, [])

  // 输入参数
  const changeSendData = (value, index) => {
    let temp = [...protocolSendData],
      _sendDataCheck = sendDataCheck.filter(item => item !== index);
    temp[index] = value
    setProtocolSendData(temp)
    setSendDataCheck(_sendDataCheck)
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
      dataIndex: 'propertyName',
      key: 'propertyName',
      width: 160,
    },
    {
      title: '数据标识',
      dataIndex: 'property',
      width: 240,
      key: 'property'
    },
    {
      title: '数据类型',
      dataIndex: '_type',
      key: '_type'
    },
    {
      title: '数据属性',
      dataIndex: 'propertyValueDesc',
      key: 'propertyValueDesc'
    },
    {
      title: '下发数据',
      dataIndex: 'execTime',
      key: 'execTime',
      width: 180,
      render: (text, record) => {
        let { _type, _params, _index, key } = record,
          _dom = null,
          disabled = protocolFormat !== 1 ? !selectedProtocols.includes(key) : false;

        switch (_type) {
          case '数值型':
            _dom = (
              <InputNumber value={protocolSendData[_index]}
                min={_params.min}
                max={_params.max}
                disabled={disabled}
                onChange={value => changeSendData(value, _index)}
                placeholder="请输入参数"></InputNumber>
            )
            break;
          case '字符型':
            _dom = (
              <Input value={protocolSendData[_index]}
                maxLength={30}
                disabled={disabled}
                onChange={e => changeSendData(e.target.value.trim(), _index)}
                placeholder="请输入参数"></Input>
            )
            break;
          default:
            _dom = (
              <Select disabled={disabled}
                value={protocolSendData[_index] || ""}
                onChange={value => changeSendData(value, _index)}>
                <Option key={-1} value="">请选择参数</Option>
                {
                  _params && _params.map((item, index) => (
                    <Option key={index + _type} value={item.value}>{item.name}</Option>
                  ))
                }
              </Select>
            )
            break;
        }
        return (<span className={`config-send-data ${sendDataCheck.includes(_index) ? 'warn' : ''}`}>
          {_dom}
        </span>)
      },
    }
  ]
  return (
    <Table columns={configColumns}
      className="config-data-table"
      rowSelection={protocolFormat !== 1 ? protocolSelection : null}
      dataSource={configProtoclList}
      scroll={{ y: 300 }}
      pagination={false}
    />
  )
}

export default AddConfigData = forwardRef(AddConfigData)

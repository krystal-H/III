import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select } from 'antd';
import { post, Paths, get } from '../../../../../api';
import './addModal.scss';
import TableShow from './tableSelect'
const filterFn = (data) => {
  let result = null
  let type = data.dataTypeEN
  switch (type) {
    case 'double':
      result = `数值范围：${data.propertyMap.min}-${data.propertyMap.max},间距：${data.propertyMap.interval},倍数：${data.propertyMap.multiple},单位：${data.propertyMap.unit}`
      break;
    case 'bool':

      result = `0：${data.propertyMap[0]},1：${data.propertyMap[1]}`
      break;
    case 'enum':
      let value = ''
      for (let key in data.propertyMap) {
        value += data.propertyMap[key] + '，'
      }
      result = `枚举值：${value}`
      break;
    default:
      return ''
  }

  return result
}
//处理数据
function delaData(data) {
  let newData = []
  data.forEach(item => {
    if (!item.funcParamList || !item.funcParamList.length) return
    item.funcParamList.forEach(item2 => {
      let newItem = JSON.parse(JSON.stringify(item))
      newData.push({ ...newItem, ...item2 })
    })
  })
  newData.forEach((item, index) => {
    item.key = index
  })
  return newData
}
const columns = [
  { title: '功能类型', dataIndex: 'funcType6', type: 'checkbox', },
  { title: '功能类型', dataIndex: 'funcType' },
  { title: '功能点名称', dataIndex: 'funcName' },
  { title: '标识符', dataIndex: 'funcIdentifier' },
  { title: '参数名称', dataIndex: 'name' },
  { title: '参数标识', dataIndex: 'identifier' },
  {
    title: '数据传输类型', dataIndex: 'dataTransferType',
  },
  { title: '数据类型', dataIndex: 'dataTypCN' },
  { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> }
];
export default function AddFuncModal({ isModalVisible, closeAdd, CancelAdd }) {

  const { TabPane } = Tabs, { Search } = Input, { Option } = Select;
  const callback = (key) => {
    console.log(key);
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const rowSelection = {
    onChange: (keys, Rows) => {
      setSelectedRowKeys(keys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    })
  }
  const [tableData, setTableData] = useState([])
  const [otherData, setOtherData] = useState([])

  const getOneList = () => {
    let params = {
      deviceTypeId: 2,
      eq: true,
    }
    post(Paths.PhysicalModelList, params).then((res) => {
      setTableData(delaData(res.data))
    });
  }
  const getTwoList = () => {
    let params = {
      deviceTypeId: 2,
      eq: false,
    }
    post(Paths.PhysicalModelList, params).then((res) => {
      setOtherData(delaData(res.data))
    });
  }

  useEffect(() => {
    getOneList()
    getTwoList()
  }, [])
  const onSearch = (value) => {
    console.log(value)
  }

  return (
    <div >
      <Modal title="新增标准功能" visible={isModalVisible} onOk={closeAdd} onCancel={CancelAdd} width='1200px' wrapClassName='add-protocols-wrap'>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="本品类" key="1">
            <div className='add-protocols-count'>
              {`已选择${selectedRowKeys.length}项`}
            </div>
            <TableShow dataSource={tableData} />
          </TabPane>
          <TabPane tab="其他品类" key="2">
            <div className='other-product-top'>
              <Search placeholder="搜索功能点名称" allowClear onSearch={onSearch} style={{ width: 465 }} />
              <Select
                labelInValue
                style={{ width: 142 }}
              >
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
              </Select>
            </div>
            <div>
              <TableShow dataSource={otherData} />
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}
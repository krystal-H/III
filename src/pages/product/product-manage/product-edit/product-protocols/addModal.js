import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select } from 'antd';
import { post, Paths, get } from '../../../../../api';
import './addModal.scss';
const filterFn = (type, data) => {
  let result = null
  switch (type) {
    case 'double':
      
      result = `数值范围：${data.propertyMap.min}-${data.propertyMap.max},间距：${data.type},倍数：${data.type},单位：${data.propertyMap.unit}`
      break;
    case '布尔':
      console.log(data,'=====')
      result = `0：${data.type},1：${data.type}`
      break;
    case '枚举':
      let value = ''
      for (let key in data.propertyMap) {
        value += data.propertyMap[key] + ','
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
  return newData
}
const columns = [
  { title: '功能类型', dataIndex: 'funcType' },
  { title: '功能点名称', dataIndex: 'funcName' },
  { title: '标识符', dataIndex: 'funcIdentifier' },
  { title: '参数名称', dataIndex: 'name' },
  { title: '参数标识', dataIndex: 'identifier' },
  {
    title: '数据传输类型', dataIndex: 'createTime',
    render: text => <span></span>
  },
  { title: '数据类型', dataIndex: 'dataTypCN' },
  { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record.dataTypeEN, record)}</span> }
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
    post(Paths.PhysicalModelList, { deviceTypeId: 2 }).then((res) => {
      setTableData(delaData(res.data))
    });
  }

  useEffect(() => {
    getOneList()
  }, [])
  const onSearch = (value) => {
  }

  return (
    <div >
      <Modal title="新增标准功能" visible={isModalVisible} onOk={closeAdd} onCancel={CancelAdd} width='1200px' wrapClassName='add-protocols-wrap'>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="本品类" key="1">
            <div className='add-protocols-count'>
              {`已选择${selectedRowKeys.length}项`}
            </div>
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={tableData}
              rowKey='funcIdentifier'
              scroll={{ y: 300 }}
            />
          </TabPane>
          <TabPane tab="其他品类" key="2">
            <div className='other-product-top'>
              <Search placeholder="搜索功能点名称" allowClear onSearch={onSearch} style={{ width: 465 }} />
              <Select
                labelInValue
                style={{ width: 122 }}
              >
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
              </Select>,
            </div>
            <div>
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
                scroll={{ y: 240 }}
                columns={columns}
                dataSource={otherData}
                pagination={false}
              />
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}
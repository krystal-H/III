import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select } from 'antd';
import './addModal.scss';

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
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ]

  useEffect(() => {
  }, [])
  //tab2
  const onSearch = (value) => {
    console.log(value, '======')
  }
  const [searchValue, setSearchValue] = useState(0)
  return (
    <div >
      <Modal title="新增标准功能" visible={isModalVisible} onOk={closeAdd} onCancel={CancelAdd} width='900px' wrapClassName='add-protocols-wrap'>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            <div className='add-protocols-count'>
              {`已选择${selectedRowKeys.length}项`}
            </div>
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <div>
              <Search placeholder="搜索功能点名称" allowClear onSearch={onSearch} style={{ width: 465 }} />
              <Select
                labelInValue
                defaultValue={{ value: 'lucy' }}
                style={{ width: 102 }}
              >
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
              </Select>,
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}
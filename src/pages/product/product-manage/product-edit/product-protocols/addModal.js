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
  const [tableData, setTableData] = useState([])
  const [otherData, setOtherData] = useState([])
  const columns = [
    {
      title: '功能名称',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '标识符',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '数据传输类型',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '数据长度',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '数据属性',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
  ];

  useEffect(() => {
  }, [])
  //tab2
  const onSearch = (value) => {
  }

  return (
    <div >
      <Modal title="新增标准功能" visible={isModalVisible} onOk={closeAdd} onCancel={CancelAdd} width='900px' wrapClassName='add-protocols-wrap'>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="睡眠监测" key="1">
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
              pagination={false}
            />
          </TabPane>
          <TabPane tab="其他品类" key="2">
            <div className='other-product-top'>
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
            <div>
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
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
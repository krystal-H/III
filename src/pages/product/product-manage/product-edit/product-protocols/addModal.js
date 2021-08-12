import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select } from 'antd';
import { post, Paths, get } from '../../../../../api';
import './addModal.scss';
const columns = [
  { title: '功能类型', dataIndex: 'id' },
  { title: '功能点名称', dataIndex: 'id' },
  { title: '标识符', dataIndex: 'remark' },
  { title: '参数名称', dataIndex: 'remark' },
  { title: '参数标识', dataIndex: 'remark' },
  {
    title: '数据传输类型', dataIndex: 'createTime'
  },
  { title: '数据类型', dataIndex: 'remark' },
  { title: '数据属性', dataIndex: 'remark' }
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
    post(Paths.searchModelList).then((res) => {
    });
  }

  useEffect(() => {
    getOneList()
  }, [])
  //tab2
  const onSearch = (value) => {
  }

  return (
    <div >
      <Modal title="新增标准功能" visible={isModalVisible} onOk={closeAdd} onCancel={CancelAdd} width='900px' wrapClassName='add-protocols-wrap'>

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
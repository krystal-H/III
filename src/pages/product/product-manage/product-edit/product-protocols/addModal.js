import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Tabs, Table, Input, Select,Form } from 'antd';
import { useHistory } from "react-router-dom"
import { post, Paths, get } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import './addModal.scss';
import TableShow from './tableSelect'

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
export default function AddFuncModal({ isModalVisible, closeAdd, CancelAdd }) {
  const productItem = JSON.parse(sessionStorage.getItem('productItem'))
  const [form] = Form.useForm();
  const { TabPane } = Tabs, { Search } = Input, { Option } = Select;
  const [currentTab, setCurrentTab] = useState('1')
  const callback = (key) => {
    setCurrentTab(key);
  }
  const [tableData, setTableData] = useState([])
  const [otherData, setOtherData] = useState([])

  const getOneList = () => {
    let params = {
      deviceTypeId: productItem.deviceTypeId,
      productId: productItem.productId,
      eq: true,
    }
    post(Paths.PhysicalModelList, params).then((res) => {
      setTableData(delaData(res.data))
    });
  }
  const getTwoList = () => {
    let params = {
      productId: productItem.productId,
      eq: true,
      deviceTypeId: 14
    }
    post(Paths.PhysicalModelList, params).then((res) => {
      setOtherData(delaData(res.data))
    });
  }
  const [typelist, setTypelist] = useState([])
  //获取品类
  const getTypeList = () => {
    post(Paths.getThirdCategory).then((res) => {
      setTypelist(res.data)
    });
  }

  useEffect(() => {
    getOneList()
    getTwoList()
    getTypeList()
  }, [])
  //搜索
  const onSearch = () => {
    let params = {
      deviceTypeId: form.getFieldValue('proId'),
      eq: true,
      productId: productItem.productId,
      funcName: form.getFieldValue('name')
    }
    post(Paths.PhysicalModelList, params).then((res) => {
      setOtherData(delaData(res.data))
    });
  }
  const [selectedMy, setSelectedMy] = useState([])
  const [selectedOther, setSelectedOther] = useState([])
  const refreshMy = val => {
    setSelectedMy(val)
  }
  const refreshOther = val => {
    setSelectedOther(val)
  }
  //提交
  const sentData = () => {
    if (!selectedMy.length && !selectedOther.length) {
      Notification({
        description: `至少勾选一条数据`,
        type: 'warn'
      });
      return
    }
    if (currentTab === '1') {
      post(Paths.addPhticalStard, selectedMy).then((res) => {
        closeAdd()
      });
    } else {
      post(Paths.addPhticalStard, selectedOther).then((res) => {
        closeAdd()
      });
    }

  }
  return (
    <div >
      <Modal title="新增标准功能" visible={isModalVisible} onOk={sentData} onCancel={CancelAdd} width='1200px' wrapClassName='add-protocols-wrap'>

        <Tabs activeKey={currentTab} onChange={callback}>
          <TabPane tab="本品类" key="1">
            <div className='add-protocols-count'>
              {`已选择${selectedMy.length}项`}
            </div>
            <TableShow dataSource={tableData} refreshCount={refreshMy} />
          </TabPane>
          <TabPane tab="其他品类" key="2">
            <div className='other-product-top'>
              <Form className='device-filter-form' form={form} layout='inline' initialValues={{ proId: 14 }}>
                <Form.Item name="proId">
                  <Select
                    style={{ width: '200px' }}
                    placeholder="选择产品"
                  >
                    {
                      typelist.map(item => {
                        return (<Option value={item.deviceTypeId} key={item.deviceTypeId}>{item.deviceTypeName}</Option>)
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item
                  label=""
                >
                  <Form.Item
                    name='name'
                    noStyle
                  >
                    <Input style={{ width: '465px' }} placeholder="输入功能点名称" />
                  </Form.Item>
                  <Button type="primary" onClick={onSearch}>
                    查询
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div>
              <TableShow dataSource={otherData} refreshCount={refreshOther} />
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}
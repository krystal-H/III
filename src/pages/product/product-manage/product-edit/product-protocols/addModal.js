import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Tabs, Table, Input, Select } from 'antd';
import { useHistory } from "react-router-dom"
import { post, Paths, get } from '../../../../../api';
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
  console.log(productItem)
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
  const [productType, setProductType] = useState(14)
  //搜索
  const onSearch = (value) => {
    let params = {
      deviceTypeId: productType,
      eq: true,
      productId: productItem.productId,
      funcName: value
    }
    post(Paths.PhysicalModelList, params).then((res) => {
      setOtherData(delaData(res.data))
    });
  }

  const onselectChange = (value) => {
    setProductType(value)
    // onSearch('')
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
              <Search placeholder="搜索功能点名称" allowClear onSearch={onSearch} style={{ width: 465 }} />
              <Select
                style={{ width: 142 }}
                onChange={onselectChange}
              >
                {
                  typelist.map(item => {
                    return <Option value={item.deviceTypeId} key={item.deviceTypeId}>{item.deviceTypeName}</Option>
                  })
                }
              </Select>
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
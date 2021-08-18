import React, { useState, useEffect } from 'react'
import { Select, Tabs, Input, Table } from 'antd'
import { Paths, post, get } from '../../../api'

import './chooseUpdateDevice.scss'

const { Option } = Select
const { Search } = Input;
const { TabPane } = Tabs
const leftDeviceDataSource = [

]


function ChooseUpdateDevice({ }) {
  const [deviceSelectType, setDeviceSelectType] = useState(1)
  const [currentActiveKey, setcurrentActiveKey] = useState('1')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchedDeviceInfoList, setSearchedDeviceInfoList] = useState([])
  const [allDeviceInfo, setAllDeviceInfo] = useState({ curDeviceInfoList: [], allDeviceInfoList: [], allDeviceInfoPager: { pageIndex: 1, currPageRows: 7 } })
  const [selectDeviceIndexToAdd, setSelectDeviceIndexToAdd] = useState([])


  const { curDeviceInfoList, allDeviceInfoList, allDeviceInfoPager } = allDeviceInfo
  const deviceColumns = [
    {
      title: '设备ID',
      dataIndex: 'deviceUniqueId',
      key: 'deviceUniqueId',
      width: 140,
    },
    {
      title: '物理地址',
      dataIndex: 'macAddress',
      width: 140,
      key: 'macAddress'
    },
  ]

  const leftSelectChange = selectedRowKeys => {
    setSelectDeviceIndexToAdd(selectedRowKeys)
  }

  const leftRowSelection = {
    selectedRowKeys: selectDeviceIndexToAdd,
    onChange: leftSelectChange,
  }

  const getAllDeviceInfo = (_pageIndex) => {
    get(Paths.getAllDeviceInfo, {
      productId: '',
      pageRows: 8,
      pageIndex: _pageIndex || allDeviceInfoPager.pageIndex
    }).then(data => {
      if (data.data) {
        let { list = [], pager = {} } = data.data;

        let _allDeviceInfoList = [...allDeviceInfoList, ...list]

        list.forEach(item => {
          item.key = item.deviceUniqueId
        })

        setAllDeviceInfo(() =>{
          curDeviceInfoList: list
          allDeviceInfoPager: pager
          allDeviceInfoList: _allDeviceInfoList
        })
      }
    })
  }

  useEffect(() => {
    getAllDeviceInfo()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callback = (key) => {
    console.log(key)
  }
  const leftDeviceSearch = value => {
    if (!value) {
      return Notification({ description: '请输入查询条件' })
    }
    setSearchLoading(true)
    get(Paths.getDeviceInfoByIdOrMacAddress, {}).then(data => {
      let temp = data.data;
      temp.key = temp.deviceUniqueId;
      if (data.data) {
        setSearchedDeviceInfoList([temp])
      }
    }).finally(() => {
      setSearchLoading(false)
    })
  }

  return (
    <div className="choose-update-device">
      <div className="device-block">
        <p className="device-block-tip">选择配置更新的设备</p>
        <div className="device-block-item">
          <Tabs activeKey={currentActiveKey} defaultActiveKey="1" onChange={callback}>
            <TabPane tab="设备列表" key="1">
              <Search enterButton="查 找"
                loading={searchLoading}
                onSearch={leftDeviceSearch}
                maxLength={50}
                placeholder="请输入设备ID/物理地址查找"></Search>
              <Table columns={deviceColumns}
                dataSource={leftDeviceDataSource}
                rowSelection={leftRowSelection}
                pagination={{
                  total: allDeviceInfoPager.totalRows,
                  defaultCurrent: 1,
                  defaultPageSize: allDeviceInfoPager.currPageRows,
                  showQuickJumper: false,
                  hideOnSinglePage: true,
                  size: 'small',
                  onChange: pageIndex => getAllDeviceInfo(pageIndex),
                  showTotal: total => <span>共 <a>{total}</a> 条</span>
                }}
              />
            </TabPane>
            <TabPane tab="本地导入" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="transfer-icon"></div>
      <div className="device-block">
        <p className="device-block-tip">已选中：3条</p>
        <div className="device-block-item"></div>
      </div>
    </div>
  )
}

export default ChooseUpdateDevice

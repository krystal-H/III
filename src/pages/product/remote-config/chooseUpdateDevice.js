import React, { useState, useEffect, useRef } from 'react'
import { Select, Tabs, Input, Table } from 'antd'
import { Paths, post, get } from '../../../api'
import { uniqueItemInArrayByKey } from '../../../util/util'
import { MinusCircleOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import { Notification } from '../../../components/Notification'

import './chooseUpdateDevice.scss'

const { Option } = Select
const { Search } = Input;
const { TabPane } = Tabs


function ChooseUpdateDevice({ }) {
  const [deviceSelectType, setDeviceSelectType] = useState(1)
  const [currentActiveKey, setcurrentActiveKey] = useState('1')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchedDeviceInfoList, setSearchedDeviceInfoList] = useState([])
  const [allDeviceInfo, setAllDeviceInfo] = useState({ curDeviceInfoList: [], allDeviceInfoList: [], allDeviceInfoPager: { pageIndex: 1, currPageRows: 7 } })
  const [selectDeviceIndexToAdd, setSelectDeviceIndexToAdd] = useState([])
  const [rightDeviceList, setRightDeviceList] = useState({ rightAllList: [], rightTempList: [] })
  const rightSearchInput = useRef(null)


  const { curDeviceInfoList, allDeviceInfoList, allDeviceInfoPager } = allDeviceInfo
  const { rightAllList, rightTempList } = rightDeviceList

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

  const deviceRightColumns = [
    {
      title: '设备ID',
      dataIndex: 'deviceUniqueId',
      key: 'deviceUniqueId',
      // width: 140,
    },
    {
      title: '物理地址',
      dataIndex: 'macAddress',
      // width: 140,
      key: 'macAddress'
    },
    {
      title: '操作',
      key: 'action',
      // width: 200,
      render: (text, record) => {
        return <span onClick={() => removeSigle(record)} className="remove-single">移除</span>
      }
    }
  ]

  // 一键移除 右侧数据
  const deleteDeviceFromRightList = () => {
    setRightDeviceList({
      rightAllList: [],
      rightTempList: []
    })
    setSelectDeviceIndexToAdd([])
  }

  // 处理
  const dealData = (typeList, record) => {
    const copyTypeList = cloneDeep(typeList)
    const _index = copyTypeList.findIndex(item => item.deviceUniqueId === record.deviceUniqueId)
    copyTypeList.splice(_index, 1)
    return copyTypeList
  }

  // 移除单个 右侧数据
  const removeSigle = (record) => {
    setRightDeviceList({
      ...rightDeviceList,
      rightAllList: dealData(rightAllList, record),
      rightTempList: dealData(rightTempList, record)
    })

    // 左侧取消选中 selectDeviceIndexToAdd
    const copySelected = cloneDeep(selectDeviceIndexToAdd)
    const index3 = copySelected.findIndex(item => item === record.deviceUniqueId)
    copySelected.splice(index3, 1)
    setSelectDeviceIndexToAdd(copySelected)
  }

  // 左侧list选择数据
  const leftSelectChange = selectedRowKeys => {
    console.log(selectedRowKeys, '左侧list选中的数据')
    setSelectDeviceIndexToAdd(selectedRowKeys)
  }

  const leftRowSelection = {
    selectedRowKeys: selectDeviceIndexToAdd,
    onChange: leftSelectChange,
  }

  // 获取设备列表
  const getAllDeviceInfo = (_pageIndex) => {
    // get(Paths.getAllDeviceInfo, {
    //   productId: '',
    //   pageRows: 8,
    //   pageIndex: _pageIndex || allDeviceInfoPager.pageIndex
    // }).then(data => {
    //   if (data.data) {
    let { list = [], pager = {} } = {}
    // 临时假的pager list
    pager = {
      currPageRows: 8,
      defaultPageRows: 20,
      hasNextPage: true,
      hasPrevPage: false,
      pageEndRow: 7,
      pageIndex: 1,
      pageRows: 8,
      pageStartRow: 0,
      paged: false,
      totalPages: 64,
      totalRows: 512
    }
    list = [
      {
        deviceId: 64912,
        deviceUniqueId: "0CCCCCCC0000",
        macAddress: "0CCCCCCC0000"
      },
      {
        deviceId: 139557,
        deviceUniqueId: "123123123120",
        macAddress: "123123123120"
      },
      {
        deviceId: 139559,
        deviceUniqueId: "123123123121",
        macAddress: "123123123121"
      },
      {
        deviceId: 153557,
        deviceUniqueId: "123123123130",
        macAddress: "123123123130"
      },
      {
        deviceId: 52594,
        deviceUniqueId: "405EE1100001",
        macAddress: "405EE1100001"
      }
    ]
    let _allDeviceInfoList = [...allDeviceInfoList, ...list]
    // 添加一个key值
    list.forEach(item => {
      item.key = item.deviceUniqueId
    })
    setAllDeviceInfo({
      curDeviceInfoList: list,
      allDeviceInfoPager: pager,
      allDeviceInfoList: _allDeviceInfoList
    })
    // }
    // })
  }

  useEffect(() => {
    getAllDeviceInfo()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callback = (key) => {
    console.log(key)
  }

  // 左侧查询
  const leftDeviceSearch = value => {
    setSearchLoading(true)
    get(Paths.getDeviceInfoByIdOrMacAddress, {}).then(data => {
      let temp = data.data;
      temp.key = temp.deviceUniqueId;
      if (data.data) {
        // 此处查询结果全部给allList
        // setSearchedDeviceInfoList([temp])
      }
    }).finally(() => {
      setSearchLoading(false)
    })
  }

  // 穿梭
  const leftToRight = () => {
    let _list = allDeviceInfoList
    let toAdd = _list.filter(item => selectDeviceIndexToAdd.includes(item.deviceUniqueId)),
      temp = uniqueItemInArrayByKey([...rightAllList, ...toAdd], 'deviceUniqueId');

    if (rightSearchInput) {
      rightSearchInput.current.input.value = ''
    }

    setRightDeviceList({
      rightAllList: temp,
      rightTempList: temp
    })
  }

  // 右侧搜索
  const rightDeviceSearch = (value) => {
    let _temp = [...rightAllList]
    if (value && !!value.trim()) {
      let _value = value.trim()
      _temp = rightAllList.filter(item => {
        let { deviceUniqueId, macAddress } = item;
        return (deviceUniqueId.indexOf(_value) > - 1) ||
          (macAddress.indexOf(_value) > - 1)
      })
    }
    setRightDeviceList({
      ...rightDeviceList,
      rightTempList: _temp
    })
  }

  let leftDeviceDataSource = curDeviceInfoList

  return (
    <div className="choose-update-device">
      <div className="device-block">
        {/* 左侧 */}
        <p className="device-block-tip">选择配置更新的设备</p>
        <div className="device-block-item padtop0">
          <Tabs activeKey={currentActiveKey} defaultActiveKey="1" onChange={callback}>
            <TabPane tab="设备列表" key="1">
              <Search enterButton="查 找"
                allowClear
                loading={searchLoading}
                onSearch={leftDeviceSearch}
                maxLength={50}
                className="search-box"
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
      <div className="transfer-icon" onClick={leftToRight}></div>
      {/* 右侧 */}
      <div className="device-block">
        <p className="device-block-tip">已选中：{selectDeviceIndexToAdd.length || 0}条</p>
        <div className="device-block-item">
          <Search enterButton="查 找"
            ref={rightSearchInput}
            onSearch={rightDeviceSearch}
            maxLength={50}
            placeholder="请输入设备ID/物理地址查找"></Search>
          <div className="remove-all">
            <a className={rightTempList.length > 0 ? '' : 'disable'}
              onClick={deleteDeviceFromRightList}><MinusCircleOutlined />&nbsp;一键移除</a>
          </div>
          <Table columns={deviceRightColumns}
            // rowSelection={rightRowSelection}
            dataSource={rightTempList}
            pagination={{
              total: rightTempList.length,
              defaultCurrent: 1,
              defaultPageSize: 7,
              showQuickJumper: false,
              hideOnSinglePage: true,
              size: 'small',
              showTotal: total => <span>共 <a>{total}</a> 条</span>
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseUpdateDevice

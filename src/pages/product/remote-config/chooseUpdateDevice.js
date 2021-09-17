import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Select, Tabs, Input, Table, Button } from 'antd'
import { Paths, post, get } from '../../../api'
import { uniqueItemInArrayByKey, checkFileTypeAndSize } from '../../../util/util'
import { MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { cloneDeep, uniq } from 'lodash'
import { Notification } from '../../../components/Notification'
import DeviceImportErrorLogModal from './errorLogModal'

import './chooseUpdateDevice.scss'

const { Option } = Select
const { Search } = Input
const { TabPane } = Tabs


function ChooseUpdateDevice({ productId, editData, onCancel, getRemoteConfigList }, ref) {
  const [currentActiveKey, setcurrentActiveKey] = useState('1')
  const [searchLoading, setSearchLoading] = useState(false)
  const [allDeviceInfo, setAllDeviceInfo] = useState({ curDeviceInfoList: [], allDeviceInfoList: [], allDeviceInfoPager: { pageIndex: 1, currPageRows: 10 } })
  const [selectDeviceIndexToAdd, setSelectDeviceIndexToAdd] = useState([])
  const [rightDeviceList, setRightDeviceList] = useState({ rightAllList: [], rightTempList: [] })
  const rightSearchInput = useRef(null)
  const [importDeviceData, setImportDeviceData] = useState({ allList: [], successList: [], errorList: [], errorVisible: false })
  const [excelFileName, setExcelFileName] = useState('')
  const [isShowImportResult, setIsShowImportResult] = useState(false)

  const { curDeviceInfoList, allDeviceInfoList, allDeviceInfoPager } = allDeviceInfo
  const { rightAllList, rightTempList } = rightDeviceList
  const { allList, successList, errorList, errorVisible } = importDeviceData

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
    },
    {
      title: '物理地址',
      dataIndex: 'macAddress',
      key: 'macAddress'
    },
    {
      title: '操作',
      key: 'action',
      width: 50,
      render: (text, record) => {
        return <span onClick={() => removeSigle(record)} className="remove-single">移除</span>
      }
    }
  ]

  const validData = () => {
    if (rightTempList.length === 0) {
      return Notification({ description: '请选择要更新的设备数据！' })
    } else {
      const remoteConfigtaskDesc = JSON.parse(sessionStorage.getItem('remoteConfigtaskDesc'))
      const addConfigData = JSON.parse(sessionStorage.getItem('addConfigData'))
      const remoteProductDeviceList = cloneDeep(rightTempList)
      remoteProductDeviceList.forEach(item => {
        delete item.key
      })
      let params = {
        taskId: editData.taskId || '',
        taskName: remoteConfigtaskDesc.taskName || '',
        taskExplain: remoteConfigtaskDesc.taskExplain || '',
        productId: remoteConfigtaskDesc.productId || '',
        protocolJson: addConfigData,
        remoteProductDeviceList
      }
      console.log('最后提交的数据', params)
      post(Paths.saveRemoteConfig5x, params, { loading: true }).then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        onCancel()
        getRemoteConfigList()
      })
    }
  }

  useImperativeHandle(ref, () => {
    return {
      onFinish: validData
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightTempList])

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

  // 右侧---移除单个 
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
    // 都存起来为了左侧的取消选中   copySelected.splice
    setSelectDeviceIndexToAdd((pre) => {
      const list = cloneDeep(pre)
      return uniq(list.concat(selectedRowKeys))
    })
  }

  const leftRowSelection = {
    selectedRowKeys: selectDeviceIndexToAdd,
    onChange: leftSelectChange,
  }

  // 获取左侧列表
  const getAllDeviceInfo = (_pageIndex, deviceUniqueId = '') => {
    post(Paths.getRemoteDeviceList5x, {
      productId,
      deviceUniqueId,
      pageIndex: _pageIndex || allDeviceInfoPager.pageIndex,
      pageRows: 8
    }, { loading: true }).then(res => {
      let { list = [], pager = {} } = res.data
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
    }).finally(() => {
      setSearchLoading(false)
    })

    setSelectDeviceIndexToAdd(rightTempList.map(item => item.deviceUniqueId))
  }

  useEffect(() => {
    getAllDeviceInfo()
    if (Object.keys(editData).length > 0) {
      const list = editData.remoteProductDevicePage.list.map(item => {
        return {
          deviceId: item.deviceId,
          deviceUniqueId: item.deviceUniqueId,
          macAddress: item.macAddress,
          key: item.deviceUniqueId
        }
      })

      setRightDeviceList({
        rightAllList: cloneDeep(list),
        rightTempList: cloneDeep(list)
      })
      console.log(editData.remoteProductDevicePage.list.map(item => item.deviceUniqueId), '/////')
      setSelectDeviceIndexToAdd(editData.remoteProductDevicePage.list.map(item => item.deviceUniqueId))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // tab切换
  const tabChange = (key) => {
    console.log(key)
    setcurrentActiveKey(key)
  }

  // 左侧搜索
  const leftDeviceSearch = value => {
    setSearchLoading(true)
    getAllDeviceInfo(allDeviceInfoPager.pageIndex, value)
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

  // 本地导入
  const importRemoteExcel = e => {
    const input = e.target;
    if (input.files && input.files.length > 0) {
      let { isOk, type, size } = checkFileTypeAndSize(input.files, ['xls', 'xlsx'], 10000)
      if (!isOk) {
        return Notification({ description: '文件类型或者大小不符合要求' })
      }
      let excel = input.files[0];
      post(Paths.importRemoteConfigExcel, {
        uploadExcel: excel,
        productId
      }, {
        needFormData: true,
        loading: true
      }).then(data => {
        if (data.data) {
          let allList = data.data,
            successList = [],
            errorList = [];

          allList.forEach((item, index) => {
            let { errorType, deviceUniqueId, macAddress } = item
            item.key = deviceUniqueId;

            if (errorType) {
              errorList.push({
                deviceUniqueId,
                macAddress,
                errorType,
                key: deviceUniqueId
              })
            } else {
              successList.push({ ...item })
            }
          })

          setImportDeviceData({
            ...importDeviceData,
            allList,
            successList,
            errorList
          })
          if (successList.length > 0) {
            const temp = uniqueItemInArrayByKey([...rightAllList, ...successList], 'deviceUniqueId')
            setRightDeviceList({
              rightAllList: temp,
              rightTempList: temp
            })
          }
          setExcelFileName(excel.name)
          setIsShowImportResult(true)
        }
      })
    }
  }

  const getRemoteExcelTemplate = () => {
    window.open('http://skintest.hetyj.com/b325662c4122f1b8948fe07c9d782ecb.xlsx')
  }

  let leftDeviceDataSource = curDeviceInfoList

  return (
    <div className="choose-update-device">
      <div className="device-block">
        {/* 左侧 */}
        <p className="device-block-tip">选择配置更新的设备</p>
        <div className="device-block-item padtop0">
          <Tabs activeKey={currentActiveKey} defaultActiveKey="1" onChange={tabChange}>
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
                  showSizeChanger: false,
                  size: 'small',
                  onChange: pageIndex => getAllDeviceInfo(pageIndex),
                  showTotal: total => <span>共 <a>{total}</a> 条</span>
                }}
              />
            </TabPane>
            <TabPane tab="本地导入" key="2">
              {
                isShowImportResult ?
                  <div>
                    <div className="result-area">
                      <h3 className="excel-style">{excelFileName || '--'}</h3>
                      <div style={{ marginTop: 14 }}>{`共${allList.length}条数据`}</div>
                      <div className="upload-data">成功：{successList.length}条&nbsp;/&nbsp;
                        <span className="red">失败：{errorList.length}条，请修改完成后重上传</span>
                      </div>
                      {
                        errorList.length > 0 &&
                        <div>
                          <a onClick={() => setImportDeviceData({ ...importDeviceData, errorVisible: true })}>错误日志</a>
                        </div>
                      }
                    </div>
                    <Button type="primary"
                      className="upload-btn martop22"
                      onClick={() => setIsShowImportResult(false)}>
                      <UploadOutlined /> 重新上传</Button>
                  </div>
                  :
                  <div className="local-import">
                    <div className="file-input-wrapper">
                      <Button type="primary" className="upload-btn"><UploadOutlined /> 选择本地设备数据文件</Button>
                      <input type="file" onInput={importRemoteExcel} accept=".xls,.xlsx" />
                      <a className="get-template" onClick={getRemoteExcelTemplate}>设备数据模板</a>
                    </div>
                    <p className="local-import-tip">支持xls、xlsx格式，每次添加最多支持20,000个设备，总体文件大小不超过10MB</p>
                  </div>
              }
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
            allowClear
            onSearch={rightDeviceSearch}
            maxLength={50}
            placeholder="请输入设备ID/物理地址查找"></Search>
          <div className="remove-all">
            <a className={rightTempList.length > 0 ? '' : 'disable'}
              onClick={deleteDeviceFromRightList}><MinusCircleOutlined />&nbsp;一键移除</a>
          </div>
          <Table
            className="config-data-table"
            columns={deviceRightColumns}
            dataSource={rightTempList}
            pagination={false}
            scroll={{ y: 344 }}
          />
          {/* <Table columns={deviceRightColumns}
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
          /> */}
        </div>
      </div>

      {/* 错误日志 */}
      {
        errorVisible &&
        <DeviceImportErrorLogModal
          visible={errorVisible}
          errorList={errorList}
          onCancel={() => setImportDeviceData({ ...importDeviceData, errorVisible: false })}>
        </DeviceImportErrorLogModal>
      }
    </div>
  )
}

export default forwardRef(ChooseUpdateDevice)

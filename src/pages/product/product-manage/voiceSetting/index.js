import React, { useState, useEffect } from "react"
import { Table, Tabs, Button } from 'antd'
import { strToAsterisk, addKeyToTableData } from '../../../../util/util'
import { EyeInvisibleTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons'
import PageTitle from '../../../../components/page-title/PageTitle'
import { Notification } from '../../../../components/Notification'
import { useHistory } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import TitleSet from '../product-edit/titleSet'
import './index.scss'
import { Paths, post, get } from '../../../../api'
import AddVoice from './addVoiceModal'

const { TabPane } = Tabs

function VoiceSetting(params) {
  let history = useHistory()
  const voiceTypeMap = ['小度语音', '天猫精灵', '小爱同学']
  const [showSecret, setShowSecret] = useState(false) // 秘钥boolean
  const [currentTab, setCurrentTab] = useState('0')
  const [status, setStatus] = useState('审核中') // 当前语音列表状态
  const [titleVisible, setTitleVisible] = useState(false) // 头部产品信息编辑
  const [dataSource, setDataSource] = useState([])
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
  const [productItem, setProductItem] = useState(sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
  const [addVoiceVisible, setAddVoiceVisible] = useState(false)

  const tableColumns = [
    {
      title: '语音能力ID',
      dataIndex: '',
      key: '',
    },
    {
      title: '语音能力名称',
      dataIndex: '',
      key: ''
    },
    {
      title: '语言调用词',
      dataIndex: '',
      key: '',
    },
    {
      title: '关联物模型功能',
      dataIndex: '',
      key: ''
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <span><a onClick={() => deleteItem(record)}>移除</a></span>
        )
      }
    }
  ]
  // 展示秘钥
  const showText = (value) => {
    value = showSecret ? value : strToAsterisk(value, 10)
    return value
  }

  // 切换秘钥隐藏
  const changeState = () => {
    setShowSecret(!showSecret)
  }

  const titleCom = (<div className='product_title_baseinfo_list'>
    <div>
      <div>品类：</div><div>{productItem.deviceType}</div>
    </div>
    <div>
      <div>产品ID：</div><div>{productItem.productId}</div>
    </div>
    <div>
      <div>通讯协议：</div><div>{productItem.bindTypeStr}</div>
    </div>
    <div>
      <div>产品编码：</div><div>{productItem.code}</div>
    </div>
    <div>
      <div>产品密钥：</div>
      <div>{showText(productItem.deviceKey)}
        <span onClick={changeState} style={{ cursor: 'pointer' }}>
          &nbsp;{showSecret ? <EyeInvisibleTwoTone /> : <EyeTwoTone />}
        </span>
      </div>
    </div>
  </div>)

  // 获取列表数据
  const getTableList = () => {
    const params = {
      productId: productItem.productId,
      ...pager
    }
    // post(Paths.xxxx, params, { loading: true }).then(res => {
    //   setDataSource(addKeyToTableData(res.data.list))
    //   setPager(pre => {
    //     return Object.assign(cloneDeep(pre), { totalRows: res.data.pager.totalRows })
    //   })
    // })
  }

  useEffect(() => {
    getTableList()
  }, [])

  // 移除listItem
  const deleteItem = (record) => {

  }

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }

  // tab切换
  const tabChange = (val) => {
    setCurrentTab(val)
    // 拉列表数据
  }

  // 编辑信息抽屉关闭
  const onOkClose = (data) => {
    let obj = { ...JSON.parse(sessionStorage.productItem), ...data }
    setProductItem(obj)
    sessionStorage.setItem('productItem', JSON.stringify(obj))
    Notification({
      type: 'success',
      description: '更新成功！',
    });
    setTitleVisible(false)
  }

  // 提交数据
  const submitData = () => {
    if (!dataSource.length) return Notification({type: 'warn', description: '请先增加语音配置能力'})
  }

  return (
    <div className="voice-setting-page">
      <PageTitle title={productItem.productName} titleTag={productItem.schemeName} btnTxt='编辑'
        btnClickHandle={() => setTitleVisible(true)}
        backHandle={() => { history.push('/open/product/proManage/list') }} backTitle='开发流程'>
        {titleCom}
      </PageTitle>
      <div >
        <Tabs activeKey={currentTab} onChange={val => tabChange(val)}>
          {
            voiceTypeMap.map((item, index) => {
              if ((index + "") === currentTab) {
                return <TabPane tab={`${item}（${status}）`} key={index + ""}></TabPane>
              }
              return <TabPane tab={`${item}`} key={index + ""}></TabPane>
            })
          }
        </Tabs>
        <div className="comm-shadowbox">
          <Table columns={tableColumns}
            className="ant-table-fixed"
            rowKey="taskId"
            dataSource={dataSource}
            pagination={{
              defaultCurrent: 1,
              current: pager.pageIndex,
              pageSize: pager.pageRows,
              total: pager.totalRows,
              showSizeChanger: false,
              showQuickJumper: pager.totalPages > 5,
              onChange: pagerChange,
              showTotal: total => <span>共 <a>{total}</a> 条</span>
            }} />
          <Button type="primary" ghost className='add-table-btn' onClick={() => setAddVoiceVisible(true)}>
            <PlusOutlined/>增加能力
          </Button>
        <div style={{padding: '10px'}}>请下载百度语言APP进行调试：http//：www.baidu.yuyin.com</div>
        <div className="submit-btn">
          <Button type="primary" onClick={() => submitData()}>提交</Button>
        </div>
        </div>
      </div>
      {/* 编辑头部产品信息 */}
      {
        titleVisible &&
        <TitleSet
          titleVisible={titleVisible}
          onCloseTitle={() => setTitleVisible(false)}
          onOkClose={onOkClose} />
      }
      {/* 增加能力 */}
      {
        addVoiceVisible &&
        <AddVoice
          visible={addVoiceVisible}
          handleOk={() => setAddVoiceVisible(false)}
          handleCancel={() => setAddVoiceVisible(false)} />
      }
    </div>
  )
}

export default VoiceSetting

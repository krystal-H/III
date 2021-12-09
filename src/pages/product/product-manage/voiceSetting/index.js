import React, { useState } from "react";
import { strToAsterisk } from '../../../../util/util';
import { EyeInvisibleTwoTone, EyeTwoTone } from '@ant-design/icons';
import PageTitle from '../../../../components/page-title/PageTitle';
import { useHistory } from 'react-router-dom';
import { Radio, Table, Tabs } from 'antd'
import { cloneDeep } from 'lodash'
import './index.scss'

const { TabPane } = Tabs;

function VoiceSetting(params) {
  let history = useHistory()
  const [showSecret, setShowSecret] = useState(false)
  const [productItem] = useState(sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
  const [mode, setMode] = useState('top')
  const [state, setState] = useState('auditing')
  const [dataSource, setDataSource] = useState([])
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
  const [currentTab, setCurrentTab] = useState('0')
  const [status, setStatus] = useState('审核中')

  const PageColumns = [
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

  // 移除列表
  const deleteItem = (record) => {

  }

  // 展示秘钥
  const showText = (value) => {
    value = showSecret ? value : strToAsterisk(value, 10)
    return value
  }

  // 切换秘钥隐藏
  const changeState = () => {
    setShowSecret(!showSecret)
  }

  // const handleModeChange = e => {
  //   setMode(e.target.value)
  // }

  // 翻页
  const pagerChange = (pageIndex, pageRows) => {
    setPager(pre => {
      return Object.assign(cloneDeep(pre), { pageIndex: pageRows === pager.pageRows ? pageIndex : 1, pageRows })
    })
  }


  const titleCom = (<div className='product_title_baseinfo_list'>
    <div>
      <div>品类：</div>
      <div>{productItem.deviceType}</div>
    </div>
    <div>
      <div>产品ID：</div>
      <div>{productItem.productId}</div>
    </div>
    <div>
      <div>通讯协议：</div>
      <div>{productItem.bindTypeStr}</div>
    </div>
    <div>
      <div>产品编码：</div>
      <div>{productItem.code}</div>
    </div>
    <div>
      <div>产品密钥：</div>
      <div>{showText(productItem.deviceKey)}
        <span onClick={changeState}>
          {showSecret ? <EyeInvisibleTwoTone /> : <EyeTwoTone />}
        </span>
      </div>
    </div>
  </div>)

  const voiceTypeMap = ['小度语音', '天猫精灵', '小爱同学']

  // tab切换
  function tabChange(val) {
    setCurrentTab(val)
    // 拉起列表数据
  }

  return (
    <div className="voice-setting-page">
      <PageTitle title={productItem.productName} titleTag={productItem.schemeName} btnTxt='编辑'
        backHandle={() => { history.push('/open/product/proManage/list') }} backTitle='开发流程'  >
        {titleCom}
      </PageTitle>
      <div>
        {/* 上边是button */}
        {/* <Radio.Group onChange={handleModeChange} value={mode} buttonStyle="solid" style={{ marginBottom: 15 }} className="comm-shadowbox">
          <Radio.Button value="top" className="radio-btn">
            小度语音<span className={`tip-label ${state}`}>审核中</span>
          </Radio.Button>
          <Radio.Button value="left" className="radio-btn">
            天猫精灵<span className="tip-label"></span>
          </Radio.Button>
          <Radio.Button value="right" className="radio-btn">
            小爱同学<span className="tip-label"></span>
          </Radio.Button>
        </Radio.Group> */}
        {/* 下边是tabs形式展示 */}
        <Tabs activeKey={currentTab} onChange={val => tabChange(val)}>
          {
            voiceTypeMap.map((item, index) => {
              if ((index+"") === currentTab) {
                return <TabPane tab={`${item}（${status}）`} key={index + ""}></TabPane>
              }
              return <TabPane tab={`${item}`} key={index + ""}></TabPane>
            })
          }
        </Tabs>
        <div className="comm-shadowbox">
          {/* table */}
          <Table columns={PageColumns}
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
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default VoiceSetting

import React, { useState, useEffect } from "react"
import { Table, Tabs, Button } from 'antd'
import { strToAsterisk, addKeyToTableData } from '../../../../util/util'
import { EyeInvisibleTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import AddVoice from './addVoiceModal'
import TitleSet from '../product-edit/titleSet'
import { Paths, post } from '../../../../api'
import PageTitle from '../../../../components/page-title/PageTitle'
import { Notification } from '../../../../components/Notification'
import { getUrlParam } from '../../../../util/util';
import './index.scss'

const { TabPane } = Tabs

function VoiceSetting() {
  let history = useHistory()
  // const voiceTypeMap = ['小度语音', '天猫精灵', '小爱同学']
  const voiceTypeMap = ['小度语音']
  const [showSecret, setShowSecret] = useState(false) // 秘钥boolean
  const [currentTab, setCurrentTab] = useState('0')
  const [titleVisible, setTitleVisible] = useState(false) // 头部产品信息编辑
  const [dataSource, setDataSource] = useState([])
  const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
  const [productItem, setProductItem] = useState(sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
  const [addVoiceVisible, setAddVoiceVisible] = useState(false)

  const tableColumns = [
    {
      title: '语音能力ID',
      dataIndex: 'abilityId',
      key: 'abilityId',
    },
    {
      title: '语音能力名称',
      dataIndex: 'abilityName',
      key: 'abilityName'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const colorMap = ['', '#2f78ff', '#f58542']
        return <span style={{ color: colorMap[text] }}>{text === 1 ? '已发布' : text === 2 ? '审核中' : ''}</span>
      }
    },
    {
      title: '语言调用词',
      dataIndex: 'abilityDesc',
      key: 'abilityDesc',
      render: (text) => {
        let abilityDesc = text && JSON.parse(text)
        let html = <div>{abilityDesc.desc}</div>
        const arr = abilityDesc.examples.map((item, index) => {
          return <span key={index}>{item}<br /></span>
        })
        return [html, arr]
      }
    },
    {
      title: '关联物模型功能',
      dataIndex: 'schemeRelationList',
      key: 'schemeRelationList',
      render: (text) => {
        return text.map((item, index) => (
          <span key={index}>
            {item}<br />
          </span>
        ))
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        if (record.status === 1) {
          return <span><a onClick={() => deleteItem(record)}>移除</a></span>
        }
        if (record.status === 2) {
          return '-'
        }
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
      voiceType: Number(currentTab) + 1,
      productId: productItem.productId,
      ...pager
    }
    post(Paths.getProductVoiceList, params, { loading: true }).then(res => {
      setDataSource(addKeyToTableData(res.data.list))
      setPager(pre => {
        return Object.assign(cloneDeep(pre), { totalRows: res.data.pager.totalRows })
      })
    })
  }

  useEffect(() => {
    getTableList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pager.pageIndex, pager.pageRows])

  // 移除listItem
  const deleteItem = (record) => {
    const params = {
      abilityIdList: [Number(record.abilityId)],
      productId: productItem.productId,
      operation: '0' // 移除
    }
    post(Paths.addOrRemoveVoice, params, { loading: true }).then(res => {
      Notification({ type: 'success', description: '操作成功，需管理后台审核！' })
      getTableList()
    })
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
    Notification({ type: 'success', description: '更新成功！' })
    setTitleVisible(false)
  }

  // 提交数据
  // const submitData = () => {
  //   if (!dataSource.length) return Notification({ type: 'warn', description: '请先增加语音配置能力' })
  // }

  return (
    <div className="voice-setting-page">
      <PageTitle
        title={productItem.productName}
        titleTag={productItem.schemeName}
        // btnTxt={productItem.status == 1 ? '' : '编辑'}
        btnClickHandle={() => setTitleVisible(true)}
        backHandle={() => {
          getUrlParam('detail') == 1 ? history.go(-1) : history.push('/open/product/proManage/list')
          // history.push(`/open/product/proManage/edit/${productItem.productId}`)
        }}
        backTitle='开发流程'>
        {titleCom}
      </PageTitle>
      <div >
        <Tabs activeKey={currentTab} onChange={val => tabChange(val)}>
          {
            voiceTypeMap.map((item, index) => {
              // if ((index + "") === currentTab) {
              //   return <TabPane tab={`${item}（${status}）`} key={index + ""}></TabPane>
              // }
              return <TabPane tab={`${item}`} key={index + ""}></TabPane>
            })
          }
        </Tabs>
        <div className="comm-shadowbox">
          <Table columns={tableColumns}
            className="ant-table-fixed"
            rowKey="abilityId"
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
          <Button type="primary" ghost className='add-table-btn' onClick={() => setAddVoiceVisible(true)}>
            <PlusOutlined />增加能力
          </Button>
          <div style={{ padding: '20px 10px' }}>请搜索下载小度APP进行语音测试。</div>
          {/* <div className="submit-btn">
            <Button type="primary" onClick={() => submitData()}>提交</Button>
          </div> */}
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
          voiceType={Number(currentTab) + 1}
          productId={productItem.productId}
          visible={addVoiceVisible}
          handleOk={() => {
            setAddVoiceVisible(false)
            getTableList()
          }}
          handleCancel={() => setAddVoiceVisible(false)} />
      }
    </div>
  )
}

export default VoiceSetting

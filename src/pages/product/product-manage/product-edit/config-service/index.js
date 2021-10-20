import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import NetworkInfo from './networkInfo'
import CommunicateSecurity from './communicationSecurity'
import ConfigFirmware from './configFirmware'
import JoinGateway from './joinGateway'
import ConfigFirmwareDetail from './configFirmwareDetail'
import { Link } from 'react-router-dom'
import { Paths, post, get } from '../../../../../api'
import { cloneDeep } from 'lodash'

import './index.scss';
import { Notification } from '../../../../../components/Notification'


function ServiceSelect({ productId, nextStep }, ref) {
  const [requiredList, setRequiredList] = useState([
    {
      title: '配网信息',
      desc: '选择设备联网方式，设置配网引导图，相关指引等',
      isConfiged: false,
      type: 'network',
      url: require('../../../../../assets/images/commonDefault/service-network.png')
    },
    {
      title: '通信安全机制',
      desc: '配置设备通信的安全机制，兼顾客户的便利以及安全需求',
      isConfiged: false,
      type: 'security',
      url: require('../../../../../assets/images/commonDefault/service-security.png')

    }
  ])
  const [optionalList, setOptionalList] = useState([
    {
      title: '配置产品固件模块',
      desc: '支持配置OTA升级模块，比如区分控制板、驱动板、显示板等不同模块',
      isConfiged: false,
      type: 'addFirmware',
      url: require('../../../../../assets/images/commonDefault/service-hardware.png')
    },
    {
      title: '固件升级',
      desc: 'MCU固件或SDK固件配置远程升级，无需烧录。需控制板支持。',
      isConfiged: false,
      type: 'firmwareUpdate',
      routePath: '/open/product/otaUpdate/list',
      url: require('../../../../../assets/images/commonDefault/service-firmwareUpdate.png')
    },
    {
      title: '场景联动配置',
      desc: '配置自动化联动的条件动作，以便加入场景，跟其他设备联动控制。',
      isConfiged: false,
      type: 'scene',
      routePath: '/open/product/ruleEngine',
      url: require('../../../../../assets/images/commonDefault/service-scene.png')
    },
    {
      title: '云端定时',
      desc: '云端设定开关时间及周循环，无需硬件嵌入式开发',
      isConfiged: false,
      type: 'cloud',
      routePath: '/open/product/cloudTimer',
      url: require('../../../../../assets/images/commonDefault/service-cloud.png')
    },
    {
      title: '设备告警',
      desc: '可定义配置设备预警消息推送，方便随时随地的设备监控',
      isConfiged: false,
      type: 'deviceWarning',
      routePath: '/open/device/devMsg',
      url: require('../../../../../assets/images/commonDefault/service-device.png')
    },
    // { // 产品说暂时不做
    //   title: '加入网关',
    //   desc: '设备申请加入clife网关，应用到更加丰富的行业方案和场景市场。',
    //   isConfiged: false,
    //   type: 'gateway',
    //   url: require('../../../../../assets/images/commonDefault/service-gateway.png')
    // },
  ])
  const [productConfig, setProductConfig] = useState('') // 配网信息信息
  const [productExtend, setProductExtend] = useState('') // 通信安全

  const [networkVisible, setNetworkVisible] = useState(false)
  const [securityVisible, setSecurityVisible] = useState(false)
  const [firmwareVisible, setFirmwareVisible] = useState(false)
  const [gatewayVisible, setGatewayVisible] = useState(false)
  const [firmwareDetailVisible, setFirmwareDetailVisible] = useState(false)
  const [isGateWayDevice, setIsGateWayDevice] = useState('') // （0-普通设备，1-网关设备）
  const [firmwareDetailData, setFirmwareDetailData] = useState([])
  const [showType, setShowType] = useState('add')
  const [editData, setEditData] = useState({})

  const [customCount, setCustomCount] = useState(0)

  const [productItemData, setProductItemData] = useState(JSON.parse(sessionStorage.getItem('productItem')) || {})

  //验证函数
  const subNextConFirm = () => {
    // console.log('requiredList----', requiredList.every(item => item.isConfiged === true), '***', requiredList)
    if (requiredList.every(item => item.isConfiged === true)) {
      nextStep()
    } else {
      Notification({ description: '请完善必选配置信息！', type: 'warn' })
    }
  }

  useImperativeHandle(ref, () => {
    return {
      onFinish: subNextConFirm
    }
  }, [requiredList]) // eslint-disable-line react-hooks/exhaustive-deps

  // 是否配置过  配网信息、通信安全机制
  const isConfigedFunc = () => {
    setSecurityVisible(false)
    post(Paths.getSecurityConfigStatus, { productId }, { loading: true }).then(res => {
      const list = cloneDeep(requiredList)
      if (res.data.gatewayConfigflag) { // 配网信息配置过
        list[0].isConfiged = true
        setRequiredList(list)
        setProductConfig(res.data.productConfig)
      }
      if (res.data.securityConfigflag) { // 通信安全配置过
        list[1].isConfiged = true
        setRequiredList(list)
        setProductExtend(res.data.productExtend.authorityType)
      }
    })
  }

  // 判断是否为网关设备
  const judgeIsGateWay = () => {
    post(Paths.getProductExtendInfo, { productId }, { loading: true })
      .then(res => {
        setIsGateWayDevice(res.data.productClassId)
      })
  }

  // 固件模块
  const getFirmwareList = () => {
    post(Paths.getFirmwareList, { productId }, { loading: true }).then(res => {
      if (res.data && res.data.length > 0) {
        const customList = res.data.filter(item => item.isCustom === 0)
        console.log(customList.length, 'customList.length')
        setCustomCount(customList.length)
        setFirmwareDetailData(res.data)
        const list = cloneDeep(optionalList)
        list[0].isConfiged = true
        setOptionalList(list)
      }
    })
  }

  // 免开发方案不显示 配置产品固件模块
  const noFreeScheme = () => {
    if (productItemData.schemeType) {
      if (productItemData.schemeType == 1) {
        const tempList = cloneDeep(optionalList)
        tempList.splice(0, 1)
        setOptionalList(tempList)
      } else {
        getFirmwareList()
      }
    }
  }

  useEffect(() => {
    isConfigedFunc()
    judgeIsGateWay()
    noFreeScheme()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const showModal = (type) => {
    switch (type) {
      case 'network':
        setNetworkVisible(true)
        break;
      case 'security':
        setSecurityVisible(true)
        break;
      case 'addFirmware':
        if (customCount >= 5) {
          Notification({ description: '产品固件模块最多配置5个！', type: 'warn' })
        } else {
          setFirmwareVisible(true)
        }
        break;
      case 'gateway':
        setGatewayVisible(true)
        break
      default:
        break;
    }
  }

  // 固件模块详情列表
  const showFirmwareDetail = () => {
    setFirmwareDetailVisible(true)
  }

  // 获取方案类型展示
  const getSchemeType = () => {
    if (productItemData.schemeType) {
      switch (productItemData.schemeType) {
        case 1:
          return '免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。'
        case 2:
          return '独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。'
        case 3:
          return 'SoC方案，不提供通用固件程序，需自行开发模组固件。'
        default:
          break;
      }
    } else {
      return ''
    }
  }

  return (
    <div className="service-config-page">
      <div className="desc">{getSchemeType()}</div>
      {/* 必选配置 */}
      <div className="service-config-title">必选配置</div>
      <div className="service-config-cont">
        {
          requiredList && requiredList.map((item, index) =>
            <div className="config-card" key={index}>
              <div className="config-card-left">
                <img src={item.url} alt="图片" />
              </div>
              <div className="config-card-right">
                <div className="config-card-right-title">{item.title}</div>
                <div className="config-card-right-desc">{item.desc}</div>
                <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>
                  {!item.isConfiged ? '配置' : '修改'}
                </div>
              </div>
              {
                item.isConfiged && <div className="configured-logo">已配置</div>
              }
            </div>
          )
        }
      </div>
      {/* 可选配置 */}
      <div className="service-config-title">可选配置</div>
      <div className="service-config-cont">
        {
          optionalList.map((item, index) =>
            <div className="config-card" key={index}>
              <div className="config-card-left">
                <img src={item.url} alt="图片" />
              </div>
              <div className="config-card-right">
                <div className="config-card-right-title">{item.title}</div>
                <div className="config-card-right-desc">{item.desc}</div>
                <div className="flex-start">
                  {/* 未配置的判断 */}
                  {
                    !item.isConfiged ?
                      ['firmwareUpdate', 'cloud', 'deviceWarning', 'scene'].includes(item.type) ?
                        <Link to={{ pathname: item.routePath, search: `?productId=${productId}` }} target="_blank">
                          <div className="config-card-right-btn">配置</div>
                        </Link>
                        :
                        <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>配置</div>
                      : ''
                  }
                  {/* 配置的判断 */}
                  {
                    item.isConfiged ?
                      item.type === 'addFirmware' ?
                        <>
                          <div className="config-card-right-btn" onClick={() => { showModal(item.type); setShowType('add') }}>配置</div>
                          <div className="config-card-right-btn mar6" onClick={() => { showFirmwareDetail() }}>详情</div>
                        </> :
                        <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>修改</div>
                      : ''
                  }
                </div>
              </div>
              {
                item.isConfiged && <div className="configured-logo">已配置</div>
              }
            </div>
          )
        }
      </div>
      {/* 配网信息 */}
      {
        networkVisible &&
        <NetworkInfo
          networkModalVisible={networkVisible}
          productId={productId}
          isGateWayDevice={isGateWayDevice}
          isedited={requiredList[0].isConfiged}
          cancelHandle={() => {
            setNetworkVisible(false)
            isConfigedFunc()
            judgeIsGateWay()
          }} />
      }

      {/* 通信安全机制 */}
      {
        securityVisible &&
        <CommunicateSecurity
          securityVisible={securityVisible}
          productId={productId}
          isGateWayDevice={isGateWayDevice}
          productExtend={productExtend}
          isConfigedFunc={isConfigedFunc}
          cancelHandle={() => { setSecurityVisible(false) }} />
      }

      {/* 配置产品固件模块 */}
      {
        firmwareVisible &&
        <ConfigFirmware
          productId={productId}
          type={showType}
          editData={editData}
          customCount={customCount}
          firmwareVisible={firmwareVisible}
          confirmHandle={() => { setFirmwareVisible(false); getFirmwareList() }}
          cancelHandle={() => { setFirmwareVisible(false) }} />
      }

      {/* 配置产品固件模块详情 */}
      {
        firmwareDetailVisible &&
        <ConfigFirmwareDetail
          productId={productId}
          firmwareDetailVisible={firmwareDetailVisible}
          firmwareDetailData={firmwareDetailData}
          getFirmwareList={getFirmwareList}
          cancelHandle={() => { setFirmwareDetailVisible(false) }}
          showAddFirmware={(type) => {
            setFirmwareVisible(true)
            setShowType(type)
          }}
          showEditFirmware={(val) => {
            setFirmwareVisible(true)
            setShowType('edit')
            setEditData(val)
          }} />
      }

      {/* 加入网关 - 产品说暂时不做，先隐藏*/}
      {/* {
        gatewayVisible &&
        <JoinGateway
          gatewayVisible={gatewayVisible}
          cancelHandle={() => { setGatewayVisible(false) }} />
      } */}
    </div >
  )
}

export default forwardRef(ServiceSelect)

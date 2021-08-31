import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Image } from 'antd';
import NetworkInfo from './networkInfo';
import CommunicateSecurity from './communicationSecurity'
// import ConfigFirmware from './configFirmware';
// import JoinGateway from './joinGateway';
// import ConfigFirmwareDetail from './configFirmwareDetail';
import { Link } from 'react-router-dom';
import { Paths, post, get } from '../../../../../api'

import './index.scss';

const requiredList = [
  {
    title: '配网信息',
    desc: '选择设备联网方式，设置配网引导图，相关指引等',
    isConfiged: true,
    type: 'network',
    url: require('../../../../../assets/images/commonDefault/service-network.png')
  },
  {
    title: '通信安全机制',
    desc: '配置设备通信的安全机制，兼顾客户的便利以及安全需求',
    isConfiged: true,
    type: 'security',
    url: require('../../../../../assets/images/commonDefault/service-security.png')
  }
]

const optionalList = [
  {
    title: '配置产品固件模块',
    desc: '支持配置OTA升级模块，比如区分控制板、驱动板、显示板等不同模块',
    isConfiged: true,
    type: 'addFirmware',
    url: require('../../../../../assets/images/commonDefault/service-hardware.png')
  },
  {
    title: '固件升级',
    desc: 'MCU固件或SDK估计配置远程升级，无需烧录。需控制板支持。',
    isConfiged: false,
    type: 'firmwareUpdate',
    routePath: '/open/product/otaUpdate',
    url: require('../../../../../assets/images/commonDefault/service-firmwareUpdate.png')
  },
  {
    title: '场景联动配置',
    desc: '配置自动化联动的条件动作，以便加入场景，跟其他设备联动控制。',
    isConfiged: false,
    type: 'scene',
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
  }
]

function ServiceConfig({ productId, nextStep }, ref) {
  const [networkVisible, setNetworkVisible] = useState(false)
  const [securityVisible, setSecurityVisible] = useState(false)
  const [firmwareVisible, setFirmwareVisible] = useState(false)
  const [gatewayVisible, setGatewayVisible] = useState(false)
  const [firmwareDetailVisible, setFirmwareDetailVisible] = useState(false)
  const [productExtend, setProductExtend] = useState('') // 通信安全
  //验证函数
  const subNextConFirm = () => {
    nextStep()
  }

  useImperativeHandle(ref, () => ({
    onFinish: subNextConFirm
  }))

  // 查看配网信息、通信安全
  const checkNetwork = (type) => {
    switch (type) {
      case 'network':
        setNetworkVisible(true)
        break;
      case 'security':
        setSecurityVisible(true)
        break;
      default:
        break;
    }
  }

  const showModal = (type) => {
    switch (type) {
      case 'addFirmware':
        setFirmwareVisible(true)
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

  // 是否配置过  配网信息、通信安全机制
  const isConfigedFunc = () => {
    setSecurityVisible(false)
    post(Paths.getSecurityConfigStatus, { productId }, { loading: true }).then(res => {
      if (res.data.securityConfigflag) { // 通信安全配置过
        setProductExtend(res.data.productExtend.authorityType)
      }
    })
  }

  useEffect(() => {
    isConfigedFunc()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="service-config-page2">
      <div className="desc">免开发方案，只需选择推荐模组、以及配置固件信息，快速实现硬件智能化。</div>
      {/* 必选配置 */}
      <div className="service-config-title">必选配置</div>
      <div className="service-config-cont">
        {
          requiredList.map((item, index) =>
            <div className="config-card" key={index}>
              <div className="config-card-left">
                <img src={item.url} alt="图片" />
              </div>
              <div className="config-card-right">
                <div className="config-card-right-title">{item.title}</div>
                <div className="config-card-right-desc">{item.desc}</div>
                <div className="config-card-right-btn" onClick={() => { checkNetwork(item.type) }}>查看</div>
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
                      (item.type === 'firmwareUpdate' || item.type === 'cloud' || item.type === 'deviceWarning') ?
                        <div className="config-card-right-btn">
                          <Link to={item.routePath} target="_blank">配置</Link>
                        </div> :
                        <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>配置</div>
                      : ''
                  }
                  {/* 配置的判断todo----------------------需要增加判断 */}
                  {
                    item.isConfiged && item.type === 'addFirmware' && '配置过固件模块的展示详情，否则不显示' &&
                    <div className="config-card-right-btn mar6" onClick={() => { showFirmwareDetail() }}>详情</div>
                    // 固件升级模块配置——仅支持发布前配置，产品发布后不可配置以及修改。发布前未发布过，直接不显示
                    // 仅使用MCU方案和SoC方案产品出现此选项
                    // item.type === 'addFirmware' ?
                    //   <>
                    //     <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>配置</div>
                    //     <div className="config-card-right-btn mar6" onClick={() => { showFirmwareDetail() }}>详情</div>
                    //   </> :
                    //   <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>修改</div>
                    // : ''
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
          productId={productId}
          networkModalVisible={networkVisible}
          cancelHandle={() => { setNetworkVisible(false) }} />
      }
      {/* 通信安全机制 */}
      {
        securityVisible &&
        <CommunicateSecurity
          securityVisible={securityVisible}
          productExtend={productExtend}
          cancelHandle={() => { setSecurityVisible(false) }} />
      }
      {/* 配置产品固件模块 */}
      {/* {
        firmwareVisible &&
        <ConfigFirmware
          firmwareVisible={firmwareVisible}
          cancelHandle={() => { setFirmwareVisible(false) }} />
      } */}
      {/* 配置产品固件模块详情 */}
      {/* {
        firmwareDetailVisible &&
        <ConfigFirmwareDetail
          firmwareDetailVisible={firmwareDetailVisible}
          cancelHandle={() => { setFirmwareDetailVisible(false) }}
          showAddFirmware={() => {
            setFirmwareVisible(true)
            setFirmwareDetailVisible(false)
          }}
          showEditFirmware={(val) => {
            setFirmwareVisible(true)
            setFirmwareDetailVisible(false)
          }} />
      } */}
    </div>
  )
}

export default forwardRef(ServiceConfig)

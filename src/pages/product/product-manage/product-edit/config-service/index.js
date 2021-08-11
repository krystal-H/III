import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Image } from 'antd';
import NetworkInfo from './networkInfo';
import CommunicateSecurity from './communicationSecurity';
import ConfigFirmware from './configFirmware';
import JoinGateway from './joinGateway';
import ConfigFirmwareDetail from './configFirmwareDetail';
import { Link } from 'react-router-dom';

import './index.scss';

const requiredList = [
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
  // { // 产品说暂时不做
  //   title: '加入网关',
  //   desc: '设备申请加入clife网关，应用到更加丰富的行业方案和场景市场。',
  //   isConfiged: false,
  //   type: 'gateway',
  //   url: require('../../../../../assets/images/commonDefault/service-gateway.png')
  // },
  {
    title: '固件升级',
    desc: 'MCU固件或SDK估计配置远程升级，无需烧录。需控制板支持。',
    isConfiged: false,
    type: 'firmwareUpdate',
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
    url: require('../../../../../assets/images/commonDefault/service-cloud.png')
  },
  {
    title: '设备告警',
    desc: '可定义配置设备预警消息推送，方便随时随地的设备监控',
    isConfiged: false,
    type: 'deviceWarning',
    url: require('../../../../../assets/images/commonDefault/service-device.png')
  }
]

function ServiceSelect({ nextStep }, ref) {
  const [networkVisible, setNetworkVisible] = useState(false)
  const [securityVisible, setSecurityVisible] = useState(false)
  const [firmwareVisible, setFirmwareVisible] = useState(false)
  const [gatewayVisible, setGatewayVisible] = useState(false)
  const [firmwareDetailVisible, setFirmwareDetailVisible] = useState(false)
  //验证函数
  const subNextConFirm = () => {
    nextStep()
  }
  useImperativeHandle(ref, () => ({
    onFinish: subNextConFirm
  }));

  const showModal = (type) => {
    console.log(type)
    switch (type) {
      case 'network':
        setNetworkVisible(true)
        break;
      case 'security':
        setSecurityVisible(true)
        break;
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
  return (
    <div className="service-config-page">
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
                <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>{!item.isConfiged ? '配置' : '修改'}</div>
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
                      item.type === 'firmwareUpdate' ?
                        <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>
                          <Link to="/open/product/otaUpdate" target="_blank">配置</Link>
                        </div> :
                        item.type === 'cloud' ?
                          <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>
                            <Link to="/open/product/cloudTimer" target="_blank">配置</Link>
                          </div> :
                          <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>配置</div>
                      : ''
                  }
                  {/* 配置的判断 */}
                  {
                    item.isConfiged ?
                      item.type === 'addFirmware' ?
                        <>
                          <div className="config-card-right-btn" onClick={() => { showModal(item.type) }}>配置</div>
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
          cancelHandle={() => { setNetworkVisible(false) }} />
      }
      {/* 通信安全机制 */}
      {
        securityVisible &&
        <CommunicateSecurity
          securityVisible={securityVisible}
          cancelHandle={() => { setSecurityVisible(false) }} />
      }
      {/* 配置产品固件模块 */}
      {
        firmwareVisible &&
        <ConfigFirmware
          firmwareVisible={firmwareVisible}
          cancelHandle={() => { setFirmwareVisible(false) }} />
      }
      {/* 配置产品固件模块详情 */}
      {
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
      }
      {/* 加入网关 - 产品说暂时不做，先隐藏*/}
      {/* {
        gatewayVisible &&
        <JoinGateway
          gatewayVisible={gatewayVisible}
          cancelHandle={() => { setGatewayVisible(false) }} />
      } */}
    </div>
  )
}

export default ServiceSelect = forwardRef(ServiceSelect)
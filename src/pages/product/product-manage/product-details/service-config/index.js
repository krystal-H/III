import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Image } from 'antd';
import NetworkInfo from './networkInfo';
import CommunicateSecurity from './communicationSecurity'
import { Link } from 'react-router-dom';
import { Paths, post, get } from '../../../../../api'
import { cloneDeep } from 'lodash'
import { useHistory } from 'react-router-dom';
import ConfigFirmwareDetail from './configFirmwareDetail.js'
import ZigbeeConfig from './zigbeeConfig'
import ZigbeeProConfig from './zigbeeProConfig'

import './index.scss';

//处理数据
function delaData(data, editData = {}) {
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
    item.sendData = ''
    item.isCheck = false
    if (Object.keys(editData).length > 0) {
      const resList = JSON.parse(editData.remoteProtocol.protocolJson)
      resList.forEach(editItem => {
        if (editItem.funcIdentifier === item.funcIdentifier) {
          item.isCheck = true
          if (item.funcType === "properties") {
            item.sendData = editItem.sendData
          } else {
            if (item.identifier === editItem.identifier) {
              item.sendData = editItem.sendData
            }
          }
        }

      })
    }
  })
  return newData
}

function ServiceConfig({ productId, nextStep }, ref) {
  let history = useHistory()
  const [requiredList, setRequiredList] = useState([
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
    },
    {
      title: 'zigbee四元组配置',
      desc: '配置zigbee四元组相关信息',
      isConfiged: false,
      type: 'zigbee',
      url: require('../../../../../assets/images/commonDefault/service-network.png')
    },
    {
      title: 'zigbee协议描述信息',
      desc: '需要根据物模型协议功能点进行ZigBee相关的描述',
      isConfiged: false,
      type: 'zigbeePro',
      url: require('../../../../../assets/images/commonDefault/service-network.png')
    },
  ])

  const [optionalList, setOptionalList] = useState([
    {
      title: '配置MCU模块&模组插件',
      desc: '支持配置OTA升级模块，比如区分控制板、驱动板、显示板等不同模块',
      isConfiged: false,
      type: 'addFirmware',
      url: require('../../../../../assets/images/commonDefault/service-hardware.png')
    },
    {
      title: '固件升级',
      desc: 'MCU固件或SDK固件配置远程升级，无需烧录。需控制板支持',
      isConfiged: false,
      type: 'firmwareUpdate',
      routePath: '/open/product/otaUpdate/list',
      url: require('../../../../../assets/images/commonDefault/service-firmwareUpdate.png')
    },
    {
      title: '场景联动配置',
      desc: '配置自动化联动的条件动作，以便加入场景，跟其他设备联动控制',
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
    {
      title: '语音能力',
      desc: '基于产品功能点，可选择配置主流平台语音控制方案',
      isConfiged: false,
      type: 'voiceSetting',
      routePath: '/open/product/proManage/voiceSetting',
      url: require('../../../../../assets/images/commonDefault/voice-setting.png')
    }
  ])

  const [networkVisible, setNetworkVisible] = useState(false)
  const [securityVisible, setSecurityVisible] = useState(false)
  const [firmwareVisible, setFirmwareVisible] = useState(false)
  const [gatewayVisible, setGatewayVisible] = useState(false)
  const [firmwareDetailVisible, setFirmwareDetailVisible] = useState(false)
  const [productExtend, setProductExtend] = useState('') // 通信安全
  const [firmwareDetailData, setFirmwareDetailData] = useState([])
  const [productItemData, setProductItemData] = useState(JSON.parse(sessionStorage.getItem('productItem')) || {})

  const [zigbeeVisible, setZigbeeVisible] = useState(false) // zigbee设置
  const [zigbeeProVisible, setZigbeeProVisible] = useState(false) // zigbee描述信息弹窗
  const [zigbeeSign, setZigbeeSign] = useState('') // 产品标识zigbee
  const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据

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
      case 'zigbee':
        setZigbeeVisible(true)
        break;
      case 'zigbeePro':
        setZigbeeProVisible(true)
        break;
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
    judgeHasZigbee(cloneDeep(requiredList))
  }

  // 获取zigbee回显标识
  const getZigbeeProduct = () => {
    post(Paths.getZigbeeProduct, { productId }).then(res => {
      setZigbeeSign(res.data.zigbeeSign)
    })
  }

  const getTableData = () => {
    post(Paths.standardFnList, { productId }, { loading: true }).then((res) => {
      let data = res.data.standard.concat(res.data.custom)
      data = data.filter(item => {
        if (item.funcTypeCN === '属性') {
          return item
        }
      })
      data = delaData(data)
      setInitialProtoclList(data)
    })
  }

  // 是否配置过 zigbee四元组配置、zigbee四元组配置
  const judgeHasZigbee = (requireTempList) => {
    if (productItemData.bindTypeStr.indexOf('Zigbee') !== -1) { // 通信协议是zigbee类型的
      post(Paths.isConfigZigbee, { productId }).then(res => {
        if (res.data.isZigbeeSignConfig) {// 配置了产品标示
          requireTempList.filter(item => item.type === 'zigbee')[0].isConfiged = true
          getZigbeeProduct() // 获取zigbee回显标识
        }
        if (res.data.isZigbeeDescConfig) { // 配置了zigbee协议描述信息
          requireTempList.filter(item => item.type === 'zigbeePro')[0].isConfiged = true
        }
        setRequiredList(requireTempList)
      })
      getTableData()
    } else { // 不是zigbee协议的不显示
      setRequiredList(requireTempList.slice(0, -2))
    }
  }

  // 固件模块
  const getFirmwareList = () => {
    post(Paths.getFirmwareList, { productId }, { loading: true }).then(res => {
      if (res.data && res.data.length > 0) {
        setFirmwareDetailData(res.data)
        // const list = cloneDeep(optionalList)
        // list[0].isConfiged = true
        // setOptionalList(list)
      } else {
        setOptionalList((pre) => {
          const tempList = cloneDeep(pre)
          tempList.splice(0, 1)
          console.log(tempList, '---tem')
          return tempList
        })
      }
    })
  }

  // 免开发方案不显示 配置产品固件模块 、固件升级
  const noFreeScheme = () => {
    if (!productItemData.voiceable) { // 未关联语音 undefined/0，可选配置中不显示
      const tempList = cloneDeep(optionalList)
      tempList.pop()
      setOptionalList(tempList)
    }

    if (productItemData.schemeType) {
      if (productItemData.schemeType == 1) {
        setOptionalList((preList) => {// 必须用preList  因为语音设置判断
          console.log('preList----', preList)
          const tempList = cloneDeep(preList)
          tempList.splice(0, 2)
          return tempList
        })
      } else {
        getFirmwareList()
      }
    }

  }

  useEffect(() => {
    isConfigedFunc()
    noFreeScheme()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        case 4:
          return '云接入方案，支持已上市的产品，云对云方式接入clife平台。'
        default:
          break;
      }
    } else {
      return ''
    }
  }

  const goVoiceSetting = () => {
    history.push(`/open/product/proManage/voiceSetting/${productId}/?detail=1`)
  }

  return (
    <div className="service-config-page2">
      <div className="desc">{getSchemeType()}</div>
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
                  {
                    ['firmwareUpdate', 'cloud', 'deviceWarning', 'scene'].includes(item.type) ?
                      <Link to={{ pathname: item.routePath, search: `?productId=${productId}` }} target="_blank">
                        <div className="config-card-right-btn">配置</div>
                      </Link>
                      :
                      item.type === 'voiceSetting' ? <div className="config-card-right-btn" onClick={() => goVoiceSetting()}>配置</div> :
                        (item.type === 'addFirmware' || item.isConfiged) ?
                          <div className="config-card-right-btn mar6" onClick={() => { showFirmwareDetail() }}>详情</div>
                          :
                          ''
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
      {securityVisible &&
        <CommunicateSecurity
          securityVisible={securityVisible}
          productExtend={productExtend}
          cancelHandle={() => { setSecurityVisible(false) }} />
      }

      {/* 配置产品固件模块详情 */}
      {firmwareDetailVisible &&
        <ConfigFirmwareDetail
          firmwareDetailVisible={firmwareDetailVisible}
          firmwareDetailData={firmwareDetailData}
          cancelHandle={() => { setFirmwareDetailVisible(false) }}
        />
      }

      {/* zigbee设置弹窗 */}
      {
        zigbeeVisible &&
        <ZigbeeConfig
          visible={zigbeeVisible}
          productId={productId}
          zigbeeSign={zigbeeSign}
          handleOk={() => {
            isConfigedFunc()
            setZigbeeVisible(false)
          }}
          cancelHandle={() => setZigbeeVisible(false)}
        />
      }

      {/* zigbee描述信息弹窗 */}
      {
        zigbeeProVisible &&
        <ZigbeeProConfig
          visible={zigbeeProVisible}
          productId={productId}
          initialProtoclList={initialProtoclList}
          handleOk={() => {
            isConfigedFunc()
            setZigbeeProVisible(false)
          }}
          cancelHandle={() => setZigbeeProVisible(false)}
        />
      }
    </div>
  )
}

export default forwardRef(ServiceConfig)

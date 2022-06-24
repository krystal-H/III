import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import NetworkInfo from './networkInfo'
import CommunicateSecurity from './communicationSecurity'
import ConfigFirmware from './configFirmware'
import JoinGateway from './joinGateway'
import ConfigFirmwareDetail from './configFirmwareDetail'
import { Link } from 'react-router-dom'
import { Paths, post } from '../../../../../api'
import { cloneDeep } from 'lodash'
import { useHistory } from 'react-router-dom';
import './index.scss';
import { Notification } from '../../../../../components/Notification'
import ZigbeeConfig from './zigbeeConfig'
import ZigbeeProConfig from './zigbeeProConfig'
import QuickConfig from '../../product-details/service-config/shiftSet'
import { productSchemeTypeMap } from '../../../../../configs/text-map';

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


function ServiceSelect({ productId, nextStep }, ref) {
  let history = useHistory()
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
    },
    {
      title: 'zigbee四元组配置',
      desc: '配置zigbee四元组相关信息',
      isConfiged: false,
      type: 'zigbee',
      url: require('../../../../../assets/images/commonDefault/zigbee-config.png')
    },
    {
      title: 'zigbee协议描述信息',
      desc: '需要根据物模型协议功能点进行ZigBee相关的描述',
      isConfiged: false,
      type: 'zigbeePro',
      url: require('../../../../../assets/images/commonDefault/zigbee-desc.png')
    },
  ])
  const [optionalList, setOptionalList] = useState([
    // {
    //   title: '配置MCU模块&模组插件',
    //   desc: '支持配置硬件MCU的子模块，以及配置通信模组的插件',
    //   isConfiged: false,
    //   type: 'addFirmware',
    //   url: require('../../../../../assets/images/commonDefault/service-hardware.png')
    // },
    {
      title: '固件升级',
      desc: 'MCU固件或SDK固件配置远程升级，无需烧录。需控制板支持',
      isConfiged: false,
      type: 'firmwareUpdate',
      routePath: '/open/product/otaUpdate/list',
      url: require('../../../../../assets/images/commonDefault/service-firmwareUpdate.png')
    },
    // {
    //   title: '场景联动配置',
    //   desc: '配置自动化联动的条件动作，以便加入场景，跟其他设备联动控制',
    //   isConfiged: false,
    //   type: 'scene',
    //   routePath: '/open/product/ruleEngine',
    //   url: require('../../../../../assets/images/commonDefault/service-scene.png')
    // },

    {
      title: '云端定时',
      desc: '云端设定开关时间及周循环，无需硬件嵌入式开发',
      isConfiged: false,
      type: 'cloud',
      routePath: '/open/product/cloudTimer',
      url: require('../../../../../assets/images/commonDefault/service-cloud.png')
    },
    {
      title: '消息推送',
      desc: '可定义配置设备预警消息推送，方便随时随地的设备监控',
      isConfiged: false,
      type: 'deviceWarning',
      routePath: '/open/product/pushNotification',
      url: require('../../../../../assets/images/commonDefault/service-device.png')
    },
    // { // 产品说暂时不做
    //   title: '加入网关',
    //   desc: '设备申请加入clife网关，应用到更加丰富的行业方案和场景市场。',
    //   isConfiged: false,
    //   type: 'gateway',
    //   url: require('../../../../../assets/images/commonDefault/service-gateway.png')
    // },
    {
      title: 'APP快捷卡片功能配置',
      desc: '配置在数联智能APP上快捷展示或控制设备的功能卡片',
      isConfiged: false,
      type: 'quickSetting',
      routePath: '/open/product/proManage/voiceSetting',
      url: require('../../../../../assets/images/commonDefault/app.png')
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
  const [productConfig, setProductConfig] = useState('') // 配网信息信息
  const [productExtend, setProductExtend] = useState('') // 通信安全
  const [quickVisible, setQuickVisible] = useState(false)
  const [networkVisible, setNetworkVisible] = useState(false)
  const [securityVisible, setSecurityVisible] = useState(false)
  const [firmwareVisible, setFirmwareVisible] = useState(false)
  // const [gatewayVisible, setGatewayVisible] = useState(false)
  const [firmwareDetailVisible, setFirmwareDetailVisible] = useState(false)
  const [isGateWayDevice, setIsGateWayDevice] = useState('') // （0-普通设备，1-网关设备）
  const [firmwareDetailData, setFirmwareDetailData] = useState([])
  const [showType, setShowType] = useState('add')
  const [editData, setEditData] = useState({})

  const [customCount, setCustomCount] = useState(0)
  const [productItemData, setProductItemData] = useState(JSON.parse(sessionStorage.getItem('productItem')) || {})
  const [typeNoList, setTypeNoList] = useState([])

  const [zigbeeVisible, setZigbeeVisible] = useState(false) // zigbee设置
  const [zigbeeProVisible, setZigbeeProVisible] = useState(false) // zigbee描述信息弹窗
  const [zigbeeSign, setZigbeeSign] = useState('') // 产品标识zigbee
  const [initialProtoclList, setInitialProtoclList] = useState([]) // 接口请求初始数据

  //验证函数
  const subNextConFirm = () => {
    // console.log('requiredList----', requiredList.every(item => item.isConfiged === true), '***', requiredList)
    if (productItemData.schemeType != 4 && productItemData.schemeType != 5) {
      if (requiredList.every(item => item.isConfiged === true)) {
        nextStep()
      } else {
        Notification({ description: '请完善必选配置信息！', type: 'warn' })
      }
    } else {
      nextStep()
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
    const list = cloneDeep(requiredList)
    post(Paths.getSecurityConfigStatus, { productId }, { loading: true }).then(res => {
      if (res.data.gatewayConfigflag) { // 配网信息配置过
        list.filter(item => item.type === 'network')[0].isConfiged = true
        setProductConfig(res.data.productConfig)
      }
      if (res.data.securityConfigflag) { // 通信安全配置过
        list.filter(item => item.type === 'security')[0].isConfiged = true
        setProductExtend(res.data.productExtend.authorityType)
      }
    })
    judgeHasZigbee(list)
  }

  // 获取zigbee回显标识
  const getZigbeeProduct = () => {
    post(Paths.getZigbeeProduct, { productId }).then(res => {
      setZigbeeSign(res.data.zigbeeSign)
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
      setRequiredList(requireTempList.filter(item => item.type !== 'zigbee' && item.type !== 'zigbeePro'))
    }
  }

  // 判断是否为网关设备
  const judgeIsGateWay = () => {
    post(Paths.getProductExtendInfo, { productId }, { loading: true })
      .then(res => {
        setIsGateWayDevice(res.data.productClassId)
      })
  }

  // 固件模块
  // const getFirmwareList = () => {
  //   post(Paths.getFirmwareList, { productId, schemeType: productItemData.schemeType }, { loading: true }).then(res => {
  //     if (res.data && res.data.length > 0) { // 有配置数据
  //       const customList = res.data.filter(item => item.isCustom === 0)
  //       console.log(customList.length, 'customList.length')
  //       setCustomCount(customList.length)
  //       setFirmwareDetailData(res.data)
  //       let tempArr = []
  //       res.data.forEach(item => {
  //         tempArr.push(item.firmwareTypeNo)
  //       })
  //       setTypeNoList(tempArr)
  //       if (customList.length > 0) {
  //         setOptionalList((pre) => {
  //           const list = cloneDeep(pre)
  //           list[0].isConfiged = true
  //           return list
  //         })

  //       }
  //     } else { // 无配置数据
  //       setFirmwareDetailData([])
  //       setCustomCount(0)
  //       setOptionalList((pre) => {
  //         const list = cloneDeep(pre)
  //         list[0].isConfiged = false
  //         return list
  //       })
  //     }
  //   })
  // }

  // 免开发方案不显示 配置产品固件模块 、固件升级
  const noFreeScheme = () => {
    if (!productItemData.voiceable) { // 未关联语音 undefined/0，可选配置中不显示
      const tempList = cloneDeep(optionalList)
      tempList.pop()
      setOptionalList(tempList)
    }

    if (productItemData.schemeType) {
      if (productItemData.schemeType == 1 || productItemData.schemeType == 4) { // 免开发/成品无固件升级
        setOptionalList((preList) => {// 必须用preList  因为语音设置判断
          console.log('preList----', preList)
          const tempList = cloneDeep(preList)
          tempList.splice(0, 1)
          return tempList
        })
      } else {
        // getFirmwareList()
      }
    }
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
        // setGatewayVisible(true)
        break
      case 'zigbee':
        setZigbeeVisible(true)
        break
      case 'zigbeePro':
        setZigbeeProVisible(true)
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
      return productSchemeTypeMap[productItemData.schemeType]
    } else {
      return ''
    }
  }

  const goVoiceSetting = () => {
    history.push(`/open/product/proManage/voiceSetting/${productId}/?detail=1`)
  }
  //快捷配置
  const setQuick = () => {
    setQuickVisible(true)
  }
  const quickCancel = () => {
    setQuickVisible(false)
  }
  return (
    <div className="service-config-page">
      <div className="desc">{getSchemeType()}</div>
      {/* 必选配置 */}
      {/* 系统方案和成品接入  都放入非必填——产品需求 */}
      {
        productItemData.schemeType !== 4 && productItemData.schemeType !== 5 && <>
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
        </>
      }
      {/* 可选配置 */}
      <div className="service-config-title">可选配置</div>
      <div className="service-config-cont">
        {/* 系统方案和成品接入  都放入非必填——产品需求 */}
        {
          (productItemData.schemeType == 4 || productItemData.schemeType == 5) && <>
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
          </>
        }
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
                  {/* 未配置的判断    ！注意：配置产品固件模块——免开发没有，soc和mcu都有，所以出现，详情必有默认，否侧就是数据问题！*/}
                  {
                    !item.isConfiged ?
                      ['firmwareUpdate', 'cloud', 'deviceWarning', 'scene'].includes(item.type) ?
                        <Link to={{ pathname: item.routePath, search: `?productId=${productId}` }} target="_blank">
                          <div className="config-card-right-btn">配置</div>
                        </Link>
                        :
                        item.type === 'voiceSetting' ? <div className="config-card-right-btn" onClick={() => goVoiceSetting()}>配置</div> :
                          item.type === 'quickSetting' ? <div className="config-card-right-btn" onClick={() => setQuick()}>配置</div> :
                            item.type === 'addFirmware' ?
                              <>
                                <div className="config-card-right-btn" onClick={() => { showModal(item.type); setShowType('add') }}>配置</div>
                                <div className="config-card-right-btn mar6" onClick={() => { showFirmwareDetail() }}>详情</div>
                              </> :
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
          okHandle={() => {
            isConfigedFunc()
            judgeIsGateWay()
          }}
          cancelHandle={() => {
            setNetworkVisible(false)
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
      {/* {
        firmwareVisible &&
        <ConfigFirmware
          schemeType={productItemData.schemeType}
          typeNoList={typeNoList}
          productId={productId}
          type={showType}
          editData={editData}
          customCount={customCount}
          firmwareVisible={firmwareVisible}
          confirmHandle={() => { setFirmwareVisible(false); getFirmwareList() }}
          cancelHandle={() => { setFirmwareVisible(false) }} />
      } */}

      {/* 配置产品固件模块详情 */}
      {/* {
        firmwareDetailVisible &&
        <ConfigFirmwareDetail
          productId={productId}
          firmwareDetailVisible={firmwareDetailVisible}
          firmwareDetailData={firmwareDetailData}
          getFirmwareList={getFirmwareList}
          cancelHandle={() => { setFirmwareDetailVisible(false); getFirmwareList() }}
          showAddFirmware={(type) => {
            setFirmwareVisible(true)
            setShowType(type)
          }}
          showEditFirmware={(val) => {
            setFirmwareVisible(true)
            setShowType('edit')
            setEditData(val)
          }} />
      } */}

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

      {/* 加入网关 - 产品说暂时不做，先隐藏*/}
      {/* {
        gatewayVisible &&
        <JoinGateway
          gatewayVisible={gatewayVisible}
          cancelHandle={() => { setGatewayVisible(false) }} />
      } */}
      {/* 快捷卡片 */}
      {
        quickVisible && <QuickConfig cancelHandle={quickCancel} visible={quickVisible} productId={productId} />
      }
    </div >
  )
}

export default forwardRef(ServiceSelect)

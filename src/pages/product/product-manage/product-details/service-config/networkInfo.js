import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Form, Select, Button } from 'antd'
import { UploadFileHooks } from '../../../../../components/upload-file'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import './networkInfo.scss'

const { Option } = Select
const guidePic = require('../../../../../assets/images/commonDefault/service-guidePage.png')
const errorPic = require('../../../../../assets/images/commonDefault/service-bindFailPage.png')

function NetworkInfo({ networkModalVisible, productId, isGateWayDevice, isedited, cancelHandle }) {
  const [form] = Form.useForm()
  const formRef = useRef()
  const imgRef = useRef()

  const [guidePage, setGuidePage] = useState('')
  const [bindFailPage, setBindFailPage] = useState('')
  const [netData, setNetData] = useState({})
  const [baseTypeId, setBaseTypeId] = useState()
  const [baseTypeName, setbaseTypeName] = useState('') // 显示配网方式

  // 获取配网方式
  const getNetDataByProductId = () => {
    post(Paths.getNetDataByProductId, { productId })
      .then(res => {
        setNetData(res.data)
        setBaseTypeId(res.data.baseTypeId)
        // form.resetFields()
        // formRef.current.setFieldsValue(res.data)
        const arr = res.data.bindTypeList.filter(item => item.baseTypeId === res.data.baseTypeId)
        if (arr && arr.length > 0) {
          setbaseTypeName(arr[0].baseTypeName)
        }
        formRef.current.setFieldsValue({
          baseTypeId: res.data.baseTypeId,
          guidePage: res.data.guidePage ? res.data.guidePage.guidePage : '',
          bindFailPage: res.data.guidePage ? res.data.guidePage.bindFailPage : '',
          imageUrlList: res.data.helpPage ? res.data.helpPage.imageUrls : [],
          radiocastName: res.data.radiocastName || '',
        })
        if (res.data.guidePage) {
          setGuidePage(res.data.guidePage.guidePage)
          setBindFailPage(res.data.guidePage.bindFailPage)
        }
        res.data.helpPage && imgRef.current.setFileList(res.data.helpPage.imageUrls.filter(item => item).map(item => {
          return { url: item, status: 'done' }
        }))
      })
  }

  useEffect(() => {
    getNetDataByProductId()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 保存配网信息
  const onFinish = (values) => {
    const imageUrlList = values.imageUrlList && values.imageUrlList.filter(item => item).map(item => {
      return item.url || item
    })
    values.productId = productId
    values.imageUrlList = imageUrlList || [] // 帮助页轮播图片集合
    values.isGateWayDevice = isGateWayDevice || '' // 是否网关设备
    values.guidePage = values.guidePage || '' // 引导图
    values.bindFailPage = values.bindFailPage || '' // 失败图
    console.log('提交的数据****', values)
    post(Paths.saveNetworkConfig, { ...values }, { loading: true }).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      cancelHandle()
    })
  }

  const onOk = () => {
    form.submit()
  }

  // 重置图片
  const resetPic = (type) => {
    if (type === 'guidePage') {
      setGuidePage('')
    }
    if (type === 'bindFailPage') {
      setBindFailPage('')
    }
  }

  // 上传图片
  const loadImg = (type, ev) => {
    let file = ev.target.files[0]
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/gif') {
      Notification({ description: '请上传gif、jpeg、jpg、png格式图片!', type: 'warn' })
      ev.target.value = ""
      resetPic(type)
      return
    }
    if (file.size > 500 * 1024) {
      Notification({ description: '文件大小不能超过500KB', type: 'warn' })
      ev.target.value = ""
      resetPic(type)
      return
    }
    const parameterobj = {
      appId: 31438,
      domainType: 4,
      file
    }
    post(Paths.upFileUrl, parameterobj, {
      needFormData: true,
      loading: true
    }, { timeout: 1000 * 30 }).then((res) => {
      if (res.code === 0) {
        if (type === 'guidePage') {
          setGuidePage(res.data.url)
        }
        if (type === 'bindFailPage') {
          setBindFailPage(res.data.url)
        }
        formRef.current.setFieldsValue({ [type]: res.data.url })
      }
    })
  }

  return (
    <Modal
      title="配网信息"
      visible={networkModalVisible}
      width={875}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="network-info-modal">
        <Form
          ref={formRef}
          form={form}
          labelAlign="left"
          onFinish={onFinish}
          wrapperCol={{ span: 19 }}
          >
          <div className="network-info-modal-title">配网方式</div>
          <Form.Item
            label="已选通信协议">
            <span>{netData.bindTypeName}</span>
          </Form.Item>
          <Form.Item
            label="配网方式"
            name="baseTypeId">
            <span>{baseTypeName}</span>
          </Form.Item>
          {/* 通信是WIFI 且是WIFI AP配网方式*/}
          {
            (netData.bindTypeId === 1 && baseTypeId === 1) &&
            <Form.Item label="AP-SSID" name="radiocastName">
              <span>{netData.radiocastName || '-'}</span>
            </Form.Item>
          }
          {/* 通信是wifi且是smartLink配网方式 或者 通信方式是蓝牙 */}
          {
            ((netData.bindTypeId === 1 && baseTypeId === 3) || (netData.bindTypeId === 2) || (netData.bindTypeId === 1 && baseTypeId === 2)) &&
            <Form.Item label="广播名" name="radiocastName">
              <span>{netData.radiocastName || '-'}</span>
            </Form.Item>
          }
          {/* WIFI或蓝牙 才需配置图片 */}
          {
            (netData.bindTypeId === 1 || netData.bindTypeId === 2) &&
            <>
              <div className="network-info-modal-title">配网图片引导<span className="tip">（需产品支持WiFi或蓝牙配置能力）</span></div>
              <div className="flex">
                <Form.Item
                  label="默认联网指引"
                  name="guidePage"
                  wrapperCol={{ span: 10 }}
                  className="upload-img">
                  {
                    <div className="native-upload">
                      <div className="img-wrap">
                        <img src={guidePage || guidePic} alt="" />
                      </div>
                      <label htmlFor="upLoadImg">
                        <Button type="primary" className="upload-btn">
                          上传图片
                          <input type="file" accept="image/*"
                            id="upLoadImg"
                            name="guideImg"
                            className="hidden"
                            onInput={(e) => loadImg('guidePage', e)}
                          />
                        </Button>
                      </label>
                      <div className="tip-text">支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸110*154px，150*267px</div>
                    </div>
                  }
                </Form.Item>
                <Form.Item
                  label="默认联网失败提示"
                  name="bindFailPage"
                  wrapperCol={{ span: 10 }}
                  className="upload-img">
                  {
                    <div className="native-upload">
                      <div className="img-wrap">
                        <img src={bindFailPage || errorPic} alt="" />
                      </div>
                      <label htmlFor="upLoadImg">
                        <Button type="primary" className="upload-btn">
                          上传图片
                          <input type="file" accept="image/*"
                            id="upLoadImg"
                            name="guideImg"
                            className="hidden"
                            onInput={(e) => loadImg('bindFailPage', e)}
                          />
                        </Button>
                      </label>
                      <div className="tip-text">支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸110*154px，150*267px</div>
                    </div>
                  }
                </Form.Item>
              </div>
              <Form.Item
                label="图片轮播帮助信息"
                name="imageUrlList"
                className="upload-img"
                wrapperCol={{ span: 20 }}>
                {
                  <UploadFileHooks
                    ref={imgRef}
                    maxCount={5}
                    preferSize={'150*267'}
                    format='.gif,.jpeg,.jpg,.png'
                    maxSize={0.5} />
                }
              </Form.Item>
            </>
          }
        </Form>
      </div>
    </Modal>
  )
}

export default NetworkInfo

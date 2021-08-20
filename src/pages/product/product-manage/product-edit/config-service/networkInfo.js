import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Form, Select, Upload, Button } from 'antd'
import { UploadFileHooks } from '../../../../../components/upload-file'
import { Paths, post, get } from '../../../../../api'
import UploadFile from '../../../../../components/upFile/UploadFile'
import { Notification } from '../../../../../components/Notification'
import './networkInfo.scss'

const { Option } = Select
const guidePic = require('../../../../../assets/images/commonDefault/service-guidePage.png')
const errorPic = require('../../../../../assets/images/commonDefault/service-bindFailPage.png')

export default function NetworkInfo({ networkModalVisible, productId, productConfig, cancelHandle }) {
  const [form] = Form.useForm()
  const formRef = useRef()
  const $imgel3 = useRef()

  const [guidePage, setGuidePage] = useState('')
  const [bindFailPage, setBindFailPage] = useState('')
  const [isGateWayDevice, setIsGateWayDevice] = useState(false) // （0-普通设备，1-网关设备）

  // 判断是否为网关设备
  const judgeIsGateWay = () => {
    post(Paths.getProductExtendInfo, { productId }).then(res => {
      console.log(res)
    })
  }

  useEffect(() => {
    judgeIsGateWay()
  }, [])


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    return
    post(Paths.saveNetworkConfig, {
      productId,
      gatewayType: '', // 网关通信技术的类型(1-Wifi; 2-蓝牙; 3-zigbee2.0; 4-zigbee3.0;5-超级开关/衣柜)
      isGateWayDevice: '', // 是否网关设备
      ssid: '', // ssid
      radiocastName: '', //广播名
      imageUrlList: [], // 帮助页轮播图片集合
      guidePage: '', // 引导图
      bindFailPage: '', // 失败图
    }).then(res => {

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
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}>
          <div className="network-info-modal-title">配网方式</div>
          <Form.Item
            label="已选通信协议">
            <span>WiFi</span>
          </Form.Item>
          <Form.Item
            label="配网方式"
            name="username"
            rules={[{ required: true, message: '请选择配网方式！' }]}>
            <Select style={{ width: 380 }}>
              <Option value="Option1-1">Option1-1</Option>
              <Option value="Option1-2">Option1-2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="AP-SSID"
            name="ssid"
            rules={[{ required: true, message: '请输入AP-SSID！' }]}>
            <Input style={{ width: 380 }} />
          </Form.Item>

          <Form.Item
            label="广播名"
            name="radiocastName"
            rules={[{ required: true, message: '请输入广播名！' }]}>
            <Input style={{ width: 380 }} />
          </Form.Item>
          <div className="network-info-modal-title">配网图片引导<span className="tip">（需产品支持WiFi或蓝牙配置能力）</span></div>
          <div className="flex">
            <Form.Item
              label="默认联网指引"
              name="guidePage"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 10 }}
              className="upload-img"
              rules={[{ message: '请上传默认联网指引图片！' }]}>
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
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 10 }}
              className="upload-img"
              rules={[{ message: '请上传默认默认联网失败提示！' }]}>
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
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 20 }}
            rules={[{ message: '请上传轮播图片' }]}>
            {
              <UploadFileHooks
                ref={$imgel3}
                maxCount={5}
                preferSize={'150*267'}
                format='.gif,.jpeg,.jpg,.png'
                maxSize={0.5} />
            }
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
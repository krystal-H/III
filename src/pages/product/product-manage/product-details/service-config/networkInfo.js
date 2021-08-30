import React, { useState, useEffect, useRef } from 'react'
import { Modal, Form, Row, Col } from 'antd'
import { Paths, post } from '../../../../../api'
import './networkInfo.scss'

const guidePic = require('../../../../../assets/images/commonDefault/service-guidePage.png')
const errorPic = require('../../../../../assets/images/commonDefault/service-bindFailPage.png')
const carouselPic = require('../../../../../assets/images/commonDefault/service-carousel.png')

function NetworkInfo({ networkModalVisible, productId, cancelHandle }) {
  const [form] = Form.useForm()
  const formRef = useRef()
  const [netData, setNetData] = useState({})
  const [imageUrlList, setImageUrlList] = useState([]) // 轮播图信息

  // 获取配网方式
  const getNetDataByProductId = () => {
    post(Paths.getNetDataByProductId, { productId })
      .then(res => {
        setNetData(res.data)
        setImageUrlList(() => {
          return res.data.helpPage ? res.data.helpPage.imageUrls.filter(item => item) : []
        })
      })
  }

  useEffect(() => {
    getNetDataByProductId()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 配网方式显示
  const dealData = () => {
    let list = netData.bindTypeList && netData.bindTypeList.map(item => {
      return netData.baseTypeId === item.baseTypeId ? item.baseTypeName : ''
    }).filter(item => item)

    return list && list.length ? list.join(',') : '-'
  }

  return (
    <Modal
      title="配网信息"
      visible={networkModalVisible}
      width={875}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="network-info-modal">
        <Form
          ref={formRef}
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}>
          <div className="network-info-modal-title">配网方式</div>
          <Form.Item label="已选通信协议"><span>{netData.bindTypeName}</span></Form.Item>
          <Form.Item label="配网方式"><span>{dealData()}</span></Form.Item>
          {/* 通信是WIFI */}
          {
            netData.bindTypeId === 1 &&
            <Form.Item label="AP-SSID" name="ssid">
              <span>{netData.ssid || '-'}</span>
            </Form.Item>
          }

          {/* 通信是wifi、蓝牙 */}
          {
            (netData.bindTypeId === 1 || netData.bindTypeId === 2) &&
            <Form.Item label="广播名" name="radiocastName">
              <span>{netData.radiocastName || '-'}</span>
            </Form.Item>
          }
          
          {/* WIFI或蓝牙 才需配置图片 */}
          {
            (netData.bindTypeId === 1 || netData.bindTypeId === 2) &&
            <>
              <div className="network-info-modal-title">配网图片引导
                <span className="tip">（需产品支持WiFi或蓝牙配置能力）</span>
              </div>
              <Row>
                <Col span={12}>
                  <Form.Item label="默认联网指引" name="guidePage"
                    labelCol={{ span: 10 }}
                    className="upload-img">
                    <div className="native-upload">
                      <div className="img-wrap">
                        <img src={netData.guidePage ? netData.guidePage.guidePage : guidePic} alt="" />
                      </div>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="默认联网失败提示" name="bindFailPage"
                    labelCol={{ span: 10 }}
                    className="upload-img">
                    <div className="native-upload">
                      <div className="img-wrap">
                        <img src={netData.guidePage ? netData.guidePage.bindFailPage : errorPic} alt="" />
                      </div>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              {
                imageUrlList && imageUrlList.length > 0 &&
                <Form.Item label="图片轮播帮助信息"
                  className="upload-img carousel-container"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 20 }}>
                  {
                    imageUrlList.map(item => (
                      <div className="img-box">
                        <img src={item || carouselPic} alt="" />
                      </div>
                    ))
                  }
                </Form.Item>
              }
            </>
          }
        </Form>
      </div>
    </Modal>
  )
}

export default NetworkInfo

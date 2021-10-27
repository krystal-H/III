import React, { useEffect, useState } from 'react'
import { Modal, Input, Form, Row, Col } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import './freeApply.scss'

function FreeApplyModal({ freeApplyVisible, handleFreeApply, type, moduleName, firmwareName }) {
  const productItemData = JSON.parse(sessionStorage.getItem('productItem')) || {}
  const [form] = Form.useForm()
  const [firmwareData, setFirmwareData] = useState({})

  const onFinish = (values) => {
    const params = {
      type,
      moduleName,
      firmwareName,
      productName: productItemData.productName,
      schemeType: productItemData.schemeType,
      productId: productItemData.productId
    }
    post(Paths.freeApplyModule, { ...params, ...values }, { loading: true })
      .then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        handleFreeApply()
      })
  }

  const onOk = () => {
    form.submit()
  }

  const formItemLayout = {
    labelCol: {
      md: {
        span: 3,
      },
    },
    wrapperCol: {
      md: {
        span: 8,
      },
    },
  }

  useEffect(() => {
    // 获取固件信息
    post(Paths.showFirmware, { productId: productItemData.productId }, { loading: true })
      .then(res => {
        setFirmwareData(res.data)
      })
  }, [])

  return (
    <Modal
      title="免费申请"
      visible={freeApplyVisible}
      onOk={onOk}
      onCancel={handleFreeApply}
      maskClosable={false}
      destroyOnClose={true}
      width={857}
      wrapClassName="replace-module-modal free-apply-modal">
      <div className="free-apply-modal-top">
        <div className="confirm-tip">请确认以下信息：</div>
        <div className="f-module-box">
          <div className="f-module-title">模组名称：{moduleName || '-'}</div>
          <div className="pad22">
            <div className="firmware-msg">固件信息</div>
            <div>
              <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}>
                <Form.Item label="固件名称/固件Key" className="txt-color">{firmwareData.burnFileName || '-'}</Form.Item>
                <Form.Item label="固件版本" className="txt-color">{firmwareData.burnFileVersion || '-'}</Form.Item>
                {
                  JSON.parse(sessionStorage.getItem('productItem')).schemeType == 1 && 
                  firmwareData.firmwareModuleList && firmwareData.firmwareModuleList.map(item => (
                    item.firmwareFuncList && item.firmwareFuncList.map((ele, index) => (
                      <>
                        {
                          ele.dataType.type === 'int' &&
                          <Form.Item key={ele.funcName} label={ele.funcName} className="txt-color">{ele.dataType.specs.defaultValue}</Form.Item>
                        }
                        {
                          ele.dataType.type === 'enum' &&
                          <Form.Item key={ele.funcName} label={ele.funcName} className="txt-color">{ele.dataType.specs.defaultValue[0].k}</Form.Item>
                        }
                      </>
                    ))
                  ))
                }
                {/* <Row>
                  <Col span={12}>
                    <Form.Item label="固件Key" className="txt-color">瑞昱SOC线上灯光固件 2M</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="暖光输出引脚-W/CCT" className="txt-color">白光亮度最大值：100</Form.Item>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col span={12}>
                    <Form.Item label="固件版本" className="txt-color">瑞昱SOC线上灯光固件 2M</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="白光亮度最小值" className="txt-color">白光亮度最大值：100</Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="配网相关" className="txt-color">白光输出引脚-C/Bright：GPIO12、高电平有效</Form.Item>
                  </Col>
                </Row> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* form表单 */}
      <div className="free-apply-modal-form">
        <Form
          {...formItemLayout}
          form={form}
          name="freeApply-form"
          onFinish={onFinish}>
          <Form.Item
            name="account"
            label="产品联系人"
            rules={[{ required: true, message: '请输入联系人名称', }]}>
            <Input maxLength={50} placeholder="请输入联系人名称" />
          </Form.Item>
          <Form.Item
            name="tel"
            label="联系方式"
            rules={[{ required: true, pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, message: '请输入联系方式', }]}>
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            name="address"
            label="邮寄地址"
            rules={[{ required: true, message: '请输入联系邮寄地址', },]}>
            <Input maxLength={50} placeholder="请输入联系邮寄地址" />
          </Form.Item>
          <Form.Item
            name="num"
            label="申请数量"
            rules={[
              { required: true, pattern: new RegExp(/^[0-9]+$/, "g"), message: '请输入申请数量，仅支持数字' }
            ]}>
            <Input placeholder="请输入申请数量" />
          </Form.Item>
        </Form>
      </div>
    </Modal >
  )
}

export default FreeApplyModal

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Tooltip, Form, Input, InputNumber } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { UploadFileHooks } from '../../../../../components/upload-file';
import LabelTip from '../../../../../components/form-com/LabelTip';
import { post, Paths, get } from '../../../../../api';
import TableCom from './downTable';
import './index.scss'
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel, authWay }) {
  const [form] = Form.useForm();
  const [isShowDn, setIsShowDn] = useState(false)
  const $el = useRef(null)
  //提交数据
  const subData = () => {
    let productId = JSON.parse(sessionStorage.getItem('productItem')).productId
    form.validateFields().then(value => {
      // 验证通过后进入
      let params = {
        productId,
        data: value.upload[0].url
      }
      post(Paths.proReledExport, params).then((res) => {
        colseMoadl()
      });
    }).catch(err => {
      // 验证不通过时进入
    });
  }
  const $dom = useMemo(() => {
    let count = authWay
    if (count === 0) {
      return (<span>一型一密<LabelTip tip="设备通信时，仅校验烧录的产品密钥，设备安全性较低。"></LabelTip></span>)
    } else if (count === 1) {
      return (<span>一型一密pro<LabelTip tip="设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。"></LabelTip></span>)
    } else if (count === 2) {
      return (<span>一机一密<LabelTip tip="设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。"></LabelTip></span>)
    }
  }, [authWay])
  const downfile = () => {
    window.open('http://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx')
  }
  //打开密钥下载
  const openDown = () => {
    let num = form.getFieldValue('number')
    if (num && parseInt(num) == num) {
      setIsShowDn(true)
    }
  }
  const handleCancel = () => {
    setIsShowDn(false)
  }
  return (
    <div>
      <Modal title="注册设备" visible={isModalVisible}  onOk={subData} onCancel={cancelModel} width='600px' wrapClassName='add-protocols-wrap'>
        <div className='device-regist'>
          <Form form={form} labelAlign='right'>
            <Form.Item label="验证方式：">
              {$dom}
            </Form.Item>
            {
              authWay === 1 && <Form.Item
                label="导入设备物理地址"
              >
                <Form.Item
                  name="upload"
                  rules={[{ required: true, message: '请上传文件' }]}
                >
                  <UploadFileHooks
                    ref={$el}
                    maxCount={1}
                    format='.xls,.xlsx'
                    isNotImg={true}
                    maxSize={10} />
                </Form.Item>
                <a className='down-model' onClick={downfile}>下载模板</a>
              </Form.Item>
            }
            {
              authWay == 1 && <>
                <Form.Item
                  label="配置密钥下载数量"
                  name='number'
                  extra="最多支持500个，请在【密钥下载】功能中导出配置数据。"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value) {
                          if (value > 0 && value <= 500 && parseInt(value) == value) {
                            return Promise.resolve()
                          } else {
                            return Promise.reject(`范围在0~500之间的整数`)
                          }
                        } else {
                          return Promise.resolve()
                        }

                      }
                    }
                  ]}
                >
                  <InputNumber style={{ width: '130px', textAlign: 'center' }} min={1}
                    max={500} />

                </Form.Item>
                <a className='regist-product-btn' onClick={openDown}>密钥下载</a>
              </>
            }
          </Form>
        </div>
      </Modal>
      {
        isShowDn && <TableCom isShowDn={isShowDn} handleCancel={handleCancel} numVal ={form.getFieldValue('number')} />
      }
    </div>
  )
}
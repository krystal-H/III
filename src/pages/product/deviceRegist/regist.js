import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, Input, Select, InputNumber, Form } from 'antd';
import { UploadFileHooks } from '../../../components/upload-file';
import LabelTip from '../../../components/form-com/LabelTip';
import TableCom from '../product-manage/product-details/regist-product/downTable';
import './index.scss'
import { post, Paths } from '../../../api';
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel, optionArr }) {
  const [selectPro, setSelectPro] = useState(null)
  const [isShowDn, setIsShowDn] = useState(false)
  const [form] = Form.useForm();
  const $el = useRef(null)
  //提交数据
  const subData = () => {
    if (selectPro == 2) {
      cancelModel()
      return
    }
    form.validateFields().then(value => {
      let params = {
        productId: value.productId,
        data: value.upload[0].url
      }
      post(Paths.proReledExport, params, { loading: true }).then((res) => {
        colseMoadl()
      });
    }).catch(err => {
      // 验证不通过时进入
    });
  }

  const $dom = useMemo(() => {
    if (!typeof (selectPro) == 'object') return
    if (selectPro === 0) {
      return (<span>一型一密<LabelTip tip="设备通信时，仅校验烧录的产品密钥，设备安全性较低。"></LabelTip></span>)
    } else if (selectPro === 1) {
      return (<span>一型一密pro<LabelTip tip="设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。"></LabelTip></span>)
    } else if (selectPro === 2) {
      return (<span>一机一密<LabelTip tip="设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。"></LabelTip></span>)
    }
  }, [selectPro])
  const selectHandle = (value) => {
    let count = 0
    optionArr.forEach(item => {
      if (item.productId === value) {
        count = item.authorityType
      }
    })
    setSelectPro(count)
  }
  //下载模板
  const downfile = () => {
    window.open('https://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx')
  }
  //打开密钥下载
  const openDown = () => {
    let params = {
      num: form.getFieldValue('number'),
      productId: form.getFieldValue('productId')
    }
    if (params.num) {
      post(Paths.replayRegistFile, params, { loading: true }).then((res) => {
        setIsShowDn(true)
      });
    } else {
      setIsShowDn(true)
    }

  }
  const handleCancel = () => {
    setIsShowDn(false)
  }
  return (
    <div>
      <Modal title="注册设备" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='600px' wrapClassName='add-protocols-wrap'>
        <div className='device-regist'>
          <Form form={form} labelAlign='right'>
            <Form.Item
              name="productId"
              label="产品名称"
              rules={[{ required: true }]}
            >
              <Select onChange={selectHandle}>
                {
                  optionArr.map(item => {
                    return (<Select.Option value={item.productId} key={item.productId}>{item.productName}</Select.Option>)
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item label="验证方式：">
              <span>{$dom}</span>
            </Form.Item>
            {
              (selectPro === 1 || selectPro === 0) && <Form.Item
                label="导入设备物理地址"

              >
                <Form.Item
                  name="upload"
                  noStyle
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
              selectPro == 2 && <>
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
        isShowDn && <TableCom isShowDn={isShowDn} handleCancel={handleCancel} productId={form.getFieldValue('productId')} />
      }
    </div>
  )
}
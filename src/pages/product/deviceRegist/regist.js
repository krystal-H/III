import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, Input, Select, Tooltip, Form } from 'antd';
import { UploadFileHooks } from '../../../components/upload-file';
import LabelTip from '../../../components/form-com/LabelTip';
import './index.scss'
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel, optionArr }) {
  const [form] = Form.useForm();
  const $el = useRef(null)

  //提交数据
  const subData = () => {
    const fileList = $el.current.getFileListUrl()
    if (fileList.length) {
      form.validateFields(['upload']).then(value => {
        // 验证通过后进入
        console.log(value, '==========aaaaaaaaa1');
      }).catch(err => {
        // 验证不通过时进入
      });
    } else {
      form.validateFields().then(value => {
        // 验证通过后进入
        console.log(value, '==========aaaaaaaaa1');
      }).catch(err => {
        // 验证不通过时进入
      });
    }
    return
    colseMoadl()
  }
  const [selectPro, setSelectPro] = useState('')
  const $dom = useMemo(() => {
    if (!selectPro) return
    let count = 0
    if (count === 0) {
      return (<span>一型一密<LabelTip tip="设备通信时，仅校验烧录的产品密钥，设备安全性较低。"></LabelTip></span>)
    } else if (count === 1) {
      return (<span>一型一密plus<LabelTip tip="设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。"></LabelTip></span>)
    } else if (count === 2) {
      return (<span>一机一密<LabelTip tip="设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。"></LabelTip></span>)
    }
  }, [selectPro])
  const selectHandle = (value) => {
    setSelectPro(value)
  }
  return (
    <Modal title="注册设备" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='555px' wrapClassName='add-protocols-wrap'>
      <div className='device-regist'>
        <Form form={form} labelAlign='right'>
          <Form.Item
            name="select"
            label="产品名称"
            rules={[{ required: true }]}
          >
            <Select onChange={selectHandle}>
              {
                optionArr.map(item => {
                  return (<Select.Option value={item.key} key={item.key}>{item.value}</Select.Option>)
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="验证方式：">
            <span>{$dom}</span>
          </Form.Item>
          <Form.Item
            label="导入设备物理地址"
            
          >
            <Form.Item
              name="upload"
              noStyle
              rules={[{ required: true ,message: '请上传文件' }]}
            >
              <UploadFileHooks
                ref={$el}
                maxCount={1}
                format='.xls,.xlsx'
                isNotImg={true}
                maxSize={10} />
            </Form.Item>
            <a className='down-model'>下载模板</a>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
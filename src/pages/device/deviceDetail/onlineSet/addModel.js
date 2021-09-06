import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Table, Modal } from 'antd'
import { Paths, post, get } from '../../../../api'
const EditableContext = React.createContext(null);
const { TextArea } = Input;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
export default function AddModel({ addVisible, addOk, CancelAdd }) {
  let baseInfo = {}
  if (sessionStorage.DEVICE_DETAIL_BASE) {
    baseInfo = JSON.parse(sessionStorage.DEVICE_DETAIL_BASE)
  }
  const [tableData, setTableData] = useState([])
  const [form] = Form.useForm();
  //获取产品id
  useEffect(() => {
    getProductDetail()
  }, [])
  const [productId, setProductId] = useState('')
  const onChange=(e,index)=>{
    setTableData(pre=>{
      let data=JSON.parse(JSON.stringify(tableData)) 
      data[index].name=e.target.value
      return data
    })
    console.log(e,index,'====')
  }
  const getProductDetail = (loading = true) => {
    post(Paths.getDeviceInfo, { 'deviceId': baseInfo.deviceId }).then((res) => {
      if(res.data.productId){
        getTableData(res.data.productId)
        setProductId(res.data.productId)
      }
      
    });
  }
  const getTableData=(id)=>{
    post(Paths.getPhysicalModel, { productId: id }).then((res) => {
      setTableData(res.data.properties)
    });
  }
  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      editable:true,
    },
    {
      title: '数据标识',
      dataIndex: 'identifier',
      key: 'identifier'
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (text, record) => {
        return (<span>{record.dataType.type}</span>)
      }
    },
    {
      title: '数据属性',
      render: (text, record) => {
        switch (record.dataType.type) {
          case 'int':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'double':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'float':
            return <span>{record.dataType.specs.min} ~ {record.dataType.specs.max}</span>
          case 'text':

            break;
          case 'enum':
            return (
              <span>{Object.values(record.dataType.specs).join(' | ')}</span>
            )
          case 'date':
            break;
          case 'bool':
            return (
              <span>{Object.values(record.dataType.specs).join(' | ')}</span>
            )
          default:
            break;
        }
      }
    },
    {
      title: '下发数据',
      dataIndex: 'execTime',
      key: 'execTime',
      width: 180,
      render: (text, record,index) => {
        return ( <Input  value={record.name} onChange={(e)=>onChange(e,index)}/>)
      }
    }
  ]
  //提交
  const subData=()=>{

  }
  return (
    <div >
      <Modal title="远程配置任务" visible={addVisible} onOk={subData} onCancel={CancelAdd} width='825px' wrapClassName='add-protocols-wrap'>
        <div>

          <Form
            form={form}
          >
            <Form.Item
              label="任务名称"
              name="problemType"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="任务说明"
              name="problemDesc"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
          <div style={{ marginBottom: '10px' }}>请添加配置信息</div>
          <Table dataSource={tableData} columns={columns} rowKey='identifier' />
          {/* <TableCom/> */}
        </div>
      </Modal>
    </div>
  )
}
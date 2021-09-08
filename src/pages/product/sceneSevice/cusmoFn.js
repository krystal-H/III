import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input, Select, Modal, Button, Checkbox } from 'antd'
import LabelTip from '../../../components/form-com/LabelTip';
import { post, Paths, get } from '../../../api';
import { cloneDeep } from 'lodash';
import './index.scss'
// import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
//处理数据
function delaData(data, typeS) {
  let newData = []
  data.forEach(item => {
    if (!item.funcParamList || !item.funcParamList.length) return
    item.funcParamList.forEach(item2 => {
      let newItem = JSON.parse(JSON.stringify(item))
      newData.push({ ...newItem, ...item2 })
    })
  })
  newData.forEach((item, index) => {
    item.typeS = typeS
    item.label = item.funcName
    item.value = item.funcIdentifier
    item.key = index
  })
  return newData
}
export default function AddModel({ addVisible, optionArr, addOk, CancelAdd }) {
  const [selectType, setSelectType] = useState(0) //产品种类
  const [originData1, setOriginData1] = useState([])
  const [originData2, setOriginData2] = useState([])
  const [selectData, setSelectData] = useState({})
  const [indeterminate, setIndeterminate] = React.useState({});
  const [checkAll, setCheckAll] = React.useState({});
  const [selectData2, setSelectData2] = useState({})
  const [indeterminate2, setIndeterminate2] = React.useState({});
  const [checkAll2, setCheckAll2] = React.useState({});
  const selectChange = (value) => {
    setSelectType(value)
    clearData()
  }
  useEffect(() => {
    if (selectType) {
      getList()
    }
  }, [selectType])
  const getDom = (data) => {
    if (!data.length) return
    let dom = []
    let type = []
    data.forEach(item => {
      let index = type.indexOf(item.dataTypCN)
      if (index > -1) {
        dom[index].content.push(item)
      } else {
        type.push(item.dataTypCN)
        dom.push({ content: [item], title: item.dataTypCN })
      }
    })
    return dom
  }
  const getList = (loading = true) => {
    let params = {
      filter: true
    }
    params.productId = 11979
    if (!params.id || !params.id.trim()) {
      delete params.id
    }
    post(Paths.scenceList, params, { loading }).then((res) => {
      let arr1 = delaData(res.data.conditionFunc, true)
      let arr2 = delaData(res.data.controlFunc, false)
      setOriginData1(getDom(arr1))
      setOriginData2(getDom(arr2))
    });
  }
  const onCheckAllChange = (data, index, option) => {
    setSelectData(pre => {
      let arr = cloneDeep(pre)
      let finArr = []
      if (data.target.checked) {
        option.forEach(item => {
          finArr.push(item.value)
        })
      }
      arr[index] = finArr
      return arr
    })
    setCheckAll(pre => {
      let arr = cloneDeep(pre)
      arr[index] = data.target.checked
      return arr
    })
    setIndeterminate(pre => {
      let arr = cloneDeep(pre)
      arr[index] = false
      return arr
    })
  };
  const onChange = (data, index, option) => {
    setSelectData(pre => {
      let arr = cloneDeep(pre)
      arr[index] = data
      return arr
    })
    setIndeterminate(pre => {
      let arr = cloneDeep(pre)
      let istrue = !!data.length && data.length < option.length
      arr[index] = istrue
      return arr
    })
    setCheckAll(pre => {
      let arr = cloneDeep(pre)
      arr[index] = data.length === option.length
      return arr
    })
  }
  const onCheckAllChange2 = (data, index, option) => {
    setSelectData2(pre => {
      let arr = cloneDeep(pre)
      let finArr = []
      if (data.target.checked) {
        option.forEach(item => {
          finArr.push(item.value)
        })
      }
      arr[index] = finArr
      return arr
    })
    setCheckAll2(pre => {
      let arr = cloneDeep(pre)
      arr[index] = data.target.checked
      return arr
    })
    setIndeterminate2(pre => {
      let arr = cloneDeep(pre)
      arr[index] = false
      return arr
    })
  };
  const onChange2 = (data, index, option) => {
    setSelectData2(pre => {
      let arr = cloneDeep(pre)
      arr[index] = data
      return arr
    })
    setIndeterminate2(pre => {
      let arr = cloneDeep(pre)
      let istrue = !!data.length && data.length < option.length
      arr[index] = istrue
      return arr
    })
    setCheckAll2(pre => {
      let arr = cloneDeep(pre)
      arr[index] = data.length === option.length
      return arr
    })
  }
  const clearData = () => {
    setSelectData({})
    setIndeterminate({})
    setCheckAll({})
  }
  const clearData2 = () => {
    setSelectData2({})
    setIndeterminate2({})
    setCheckAll2({})
  }
  const subData = () => {
    let arr = []
    for (let key in selectData) {
      arr=arr.concat(selectData[key])
    }
    let arr2 = []
    for (let key in selectData2) {
      arr2=arr2.concat(selectData2[key])
    }
    let obj={}
    obj.productId=selectType
    obj.data=arr.concat(arr2)
    console.log(obj,'====')
  }
  return (
    <div >
      <Modal title="自定义" visible={addVisible} onOk={subData} onCancel={CancelAdd} width='905px' wrapClassName='add-protocols-wrap'>
        <div className='scene-sevice-model'>
          <div className='top'>
            <span>产品名称：</span>
            <Select style={{ width: 220 }} value={selectType} onChange={selectChange}>
              {
                optionArr.map(item => {
                  return (<Option value={item.productId} key={item.productId}>{item.productName}</Option>)
                })
              }
            </Select>
          </div>
          <div className='middle'>
            <div className='middle-clear'>
              <span className='middle-title'> 场景触发条件设置<LabelTip tip="物模型的可上行、可下行、可上行可下行3种数据类型都支持条件" /></span>
              <Button type="primary" ghost onClick={clearData}>
                清空
              </Button>
            </div>
            <div className='middle-tip'>场景出发条件设置以后该功能点即可出现在App-场景-我的场景-添加条件处，作为场景的触发条件来设置</div>
          </div>
          <div className='content'>
            {
              originData1.map((item, index) => {
                return (
                  <div key={index} className='content-item'>
                    <h3>{item.title}</h3>
                    <div>
                      <Checkbox indeterminate={indeterminate[item.title] || false}
                        onChange={(e) => onCheckAllChange(e, item.title, item.content)} checked={checkAll[item.title] || false}>
                        全选
                      </Checkbox>
                      <CheckboxGroup options={item.content} value={selectData[item.title] || []} onChange={(e) => onChange(e, item.title, item.content)} />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='middle'>
            <div className='middle-clear'>
              <span className='middle-title'> 场景执行动作设置<LabelTip tip="物模型的仅可下行、可上行可下行2种数据类型支持动作" /></span>
              <Button type="primary" ghost onClick={clearData2}>
                清空
              </Button>
            </div>
            <div className='middle-tip'>场景执行动作设置以后，该功能点即可出现在APP-场景-我的场景-添加动作处，作为场景的执行动作来设置</div>
          </div>
          <div className='content'>
            {
              originData2.map((item, index) => {
                return (
                  <div key={index} className='content-item'>
                    <h3>{item.title}</h3>
                    <div>
                      <Checkbox indeterminate={indeterminate2[item.title] || false}
                        onChange={(e) => onCheckAllChange2(e, item.title, item.content)} checked={checkAll2[item.title] || false}>
                        全选
                      </Checkbox>
                      <CheckboxGroup options={item.content} value={selectData2[item.title] || []} onChange={(e) => onChange2(e, item.title, item.content)} />
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </Modal>
    </div>
  )
}
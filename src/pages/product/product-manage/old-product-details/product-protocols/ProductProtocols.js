import React, { Component } from 'react';
import { Tabs, Table, Button } from 'antd';
import { cloneDeep,isArray } from 'lodash';
import { get, Paths, post } from '../../../../../api';
import {addKeyToTableData,setFuncDataType} from '../../../../../util/util';
import NoSourceWarn from '../../../../../components/no-source-warn/NoSourceWarn';
import LabelTip from '@src/components/form-com/LabelTip';
const { TabPane } = Tabs;

function concatComplexProtocols(productProtocolLists) {
    let _productProtocolLists = cloneDeep(productProtocolLists);

    return _productProtocolLists.map(item => {
        let {list,structDefVOList,arrayDefVOList} = item,
            allList = [];

        if(list){
            allList = [...list]
        }

        // 复杂协议的functionDataType可能对不上
        if(arrayDefVOList) {
            allList = [...allList,...arrayDefVOList.map(item => {return {...item,functionDataType:10,complex:'array'}})]
        }
        if(structDefVOList) {
            allList = [...allList,...structDefVOList.map(item => {return {...item,functionDataType:11,complex:'struct'}})]
        }

        return {...item,allList};
    })
}

export default class ProductProtocols extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            curDataTypeId:undefined, // 当前tab对应的协议类别
            isChangeDataTypeId:false, // 标记是否切换过协议tab
            productProtocolLists:[]
        }

        this.recordProtocols = {}
        this.columns = [
            {
                title: '数据名称',
                dataIndex: 'propertyName',
                key: 'propertyName',
                width:'180px',
                render: (text, record, index) => {
                    let {recordResult} = record;

                    const obj = {
                      children: this.dealWhatToShow(record,index,'propertyName') ,
                      props: {},
                    };

                    if (recordResult.isArray) {
                        if (recordResult.isFirst) {
                            obj.props.rowSpan = recordResult.length;
                        } else {
                            obj.props.rowSpan = 0;
                        }
                    }

                    return obj;
                }
            },
            {
                title: '数据标识',
                dataIndex: 'property',
                key: 'property',
                width:'180px',
                render: (text, record, index) => {
                    return this.dealWhatToShow(record,index,'property')
                }
            },
            {
                title: '数据类型',
                dataIndex: 'javaType',
                key: 'javaType',
                width:'100px',
                render: (text, record, index) => {
                    return this.dealWhatToShow(record,index,'javaType',true)
                }
            },
            {
                title: '数据长度',
                dataIndex: 'length',
                key: 'length',
                width:'100px',
                render: (text, record, index) => {
                    return this.dealWhatToShow(record,index,'length')
                }
            },
            {
                title: '数据单位',
                dataIndex: 'unit',
                key: 'unit',
                width:'100px',
                render: (text, record, index) => {
                    return this.dealWhatToShow(record,index,'unit')
                }
            },
            {
                title: '数据属性',
                dataIndex: 'propertyValueDesc',
                key: 'propertyValueDesc',
                render: (text, record, index) => {
                    return this.dealWhatToShow(record,index,'propertyValueDesc')
                }
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                width:'160px',
                render: (text, record, index) => {
                    let {recordResult} = record;

                    const obj = {
                      children: this.dealWhatToShow(record,index,'remark') ,
                      props: {},
                    };

                    if (recordResult.isArray) {
                        if (recordResult.isFirst) {
                            obj.props.rowSpan = recordResult.length;
                        } else {
                            obj.props.rowSpan = 0;
                        }
                    }

                    return obj;
                }
            }
        ];
    }
    componentDidMount() {
        this.getProtocols();
    }
    componentDidUpdate() {
        let { productId } = this.props,
            {curDataTypeId,productProtocolLists} = this.state;

        if (productId && productId !== this.lastProductId) { // 切换产品
           
            this.getProtocols();
        }

        if (curDataTypeId === undefined && productProtocolLists.length > 0) {
            curDataTypeId = productProtocolLists[0].dataTypeId;
            // 此处日志是为了定位一个线上偶现BUG
            console.log("ProductProtocols -> componentDidUpdate -> curDataTypeId", curDataTypeId)
            this.lastDataTypeId = curDataTypeId;
            this.setState({
                curDataTypeId
            })
        }
    }
    dealWhatToShow(record,index,key,isFuncDatatype) {
        let realRecords = [record];
        if (record.bitDefList) {
            realRecords = record.bitDefList;
        }

        if (record.complex === 'struct' && key === 'propertyValueDesc') {
            realRecords = record.byteDefVOList
        }

        return (<div key={index}>
            {
                realRecords.map((item,_index) => {
                    return !isFuncDatatype ? <div key={_index}>{this.getWhatToshow(item,key) || ''}</div> : <div key={_index}>{setFuncDataType(item)}</div>
                })
            }
        </div>)
    }
    getWhatToshow (record,key) {
        let {complex} = record;

        if (key === 'length') {
            if (complex === 'array') {
                if(record.byteDefVO  && record.byteDefVO.length) {
                    return record.length * record.byteDefVO.length
                }
            }
            if (complex === 'struct') {
                if(record.byteDefVOList && record.byteDefVOList.length > 0) {
                   let t = 0;
                   record.byteDefVOList.forEach(item => {
                       t+=item.length
                   })
                   return t
                }
            }
        }

        if (key === 'propertyValueDesc') {
            if (complex === 'array') {
                let {length,byteDefVO} = record;

                return `${length}个${setFuncDataType(byteDefVO)}子元素`
            }
        }

        return  record[key]

    } 
    /* 判断协议是否存在多个同名的情况，需要一起操作（编辑，删除） */
    isArrayInRecordProtocols (record) {
        let {propertyName,dataTypeIndex,property} = record,
            _recordProtocol = this.recordProtocols[`protocolsInDatatype${dataTypeIndex}`],
            result = {
                isArray:false,
                isFirst:false,
                length:null,
                array:null
            };
        // propertyName为空的不记录，防止不相关的协议记录到一起
        if ( propertyName && _recordProtocol && _recordProtocol[propertyName] && isArray(_recordProtocol[propertyName])) {
            result.isArray = true
            result.array = _recordProtocol[propertyName]
            result.length = _recordProtocol[propertyName].length;
            if (result.length > 0 && _recordProtocol[propertyName][0].property === property) {
                result.isFirst = true
            }
        }

        return result;
    }
    // 获取产品协议列表
    getProtocols() {
        let { productId } = this.props;
        if (productId) {
            this.lastProductId = productId; // 记录当前的产品ID
            get(Paths.getV4Protocol,{
                productId
            },{
                needVersion:1.2,
                loading:true
            }).then(data => {
                this.setState({
                    productProtocolLists: concatComplexProtocols(data.data.list.filter(item => !!item.dataTypeId)),
                })
            })
        }
    }
    // 过滤表格中所需要展示的数据
    // 并且为协议添加 dataTypeIndex recordResult 字段，这两个字段在后续逻辑中很重要，但是在上传协议时，记得一定要删除，否则会报错
    filterProtocol(list,type,dataTypeIndex) {
        let temp = list.filter(item => type ? item.isTemplateField : !item.isTemplateField),
            _temp = cloneDeep(temp);

        return   _temp.map(item => {
                    item.dataTypeIndex = dataTypeIndex;
                    item.recordResult = this.isArrayInRecordProtocols(item)
                    return item;
                });
    }
    /**
     * 返回协议展示的表单
     * @param {Object} protocols 待处理的协议对象 （对应于 控制/运行 层级）
     * @param {number} type 展示类型 标准功能：1，非标准功能：0
     * @param {number}} dataTypeIndex 在总协议数组中的index -用于删除时提交整个对象
     */
    getTable (protocols,type,dataTypeIndex) {
        let temp = this.filterProtocol(protocols.allList || [],type,dataTypeIndex);
        temp = addKeyToTableData(temp).filter(item => item.property !== 'updateFlag');
        
        let _columns = cloneDeep(this.columns);

        console.log('---bindType----',this.props.productBaseInfo.bindType)
        if(this.props.productBaseInfo.bindType == 8){
            _columns[6] = {
                title: 'zigbeeDescribe',
                dataIndex: 'command',
                key: 'command',
                render: (text, record, index) => {
                    return this.dealWhatToShow(record,index,'command')
                }
            }
        }

        return (temp.length > 0) 
        ? <Table
            pagination={false}
            columns={_columns}
            className={`protocol-type-${type} ant-table-fixed protocol-content-table`}
            dataSource={temp} />
        : <NoSourceWarn tipText="暂无功能数据"></NoSourceWarn>
    }
    tabChangeHandle(protocols){
        let {dataTypeId} = protocols;
        if (this.lastDataTypeId !== undefined && this.lastDataTypeId != dataTypeId){
            this.lastDataTypeId = dataTypeId;
            this.setState({
                isChangeDataTypeId:true
            })
        }
        this.setState({
            curDataTypeId:dataTypeId
        })
    }

    render() {
        let { productId,productBaseInfo} = this.props,
        { protocolFormat} = productBaseInfo,
        { productProtocolLists } = this.state;

        return (
            <div className="product-protocol-wrapper">
                <Tabs 
                    onChange={activeKey => {this.tabChangeHandle(productProtocolLists[activeKey])}}
                    defaultActiveKey="0">
                        {
                            productProtocolLists.map((protocols, index) =>
                                <TabPane 
                                    tab={protocols.dataTypeName} 
                                    key={index}>
                                        <div className="protocol-item gray-bg">
                                            <div className="standard-protocols">
                                                <>                                 
                                                    <span className="protocol-name">标准功能</span>
                                                    {
                                                        protocolFormat == 1 &&
                                                        <LabelTip tipPlacement="right" tip="该产品使用CLink标准数据格式（十六进制），每类功能协议数据长度必须满足16字节的整数倍，平台将自动填充保留字段以满足长度规范。"/>
                                                    }
                                                </>
                                                {
                                                    this.getTable(protocols,1,index)
                                                }
                                            </div>
                                            <div className="self-protocols">
                                            <div >
                                                <span className="protocol-name">自定义功能</span>
                                              
                                                </div>
                                                {
                                                    this.getTable(protocols,0,index)
                                                }
                                            </div>
                                            {/* 自定义透传才有协议脚本   5.x版本取消旧产品的此功能 */}  
                                            {/* {   
                                                protocolFormat == 3 && 
                                                <div className="protocol-script">
                                                    <span className="protocol-name">数据解析</span>
                                                    <div className="protocol-script-content">
                                                        <div className="protocol-script-title">数据解析脚本</div>
                                                            <div className="protocol-script-example">
                                                                <span>支持开发者自定义解析脚本，将设备上下行的数据，分别解析成平台定义的标准数据格式。</span>
                                                                <Button type="primary" className="protocol-script-btn" onClick={this.props.triggerDebugger.bind(this, true, productId)}>调试上传脚本</Button>
                                                            </div>
                                                    </div>
                                                </div>
                                            } */}
                                        </div>
                                </TabPane>
                            )
                        }
                </Tabs>
            </div>
        )
    }
}

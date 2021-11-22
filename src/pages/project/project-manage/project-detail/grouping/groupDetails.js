import React, { useState, useEffect, useRef }  from 'react'
import { Link } from 'react-router-dom';
import { Button, Table, Divider, Modal } from 'antd';

import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import { cloneDeep } from 'lodash';
import { get, post, Paths } from '../../../../../api';
import { DateTool } from '../../../../../util/util';
import DeviceListUsed from './deviceListUsed';
import SearchProduct from './searchProduct';
import './deviceGroup.scss';
import { Notification } from '../../../../../components/Notification';


export default ({
    viewDetailId,
    userId,
    closeVisiable,
})=>{
    const paramsRef = useRef({ //记录请求分组中的设备列表参数
        groupId:viewDetailId,
        userId,
        productId:undefined,
        deviceIdParams:undefined,
        pageIndex:1,
        pageRows:10
    });
    const [productList, setProductList] = useState([])
    const [dataList, setDataList] = useState({list:[],pager:{}})
    const [addVisiable, setAddVisiable] = useState(false)

    const columns = [
        { title: '设备id', dataIndex: 'deviceId'},
        { title: '所属产品', dataIndex: 'productName'},
        { title: '绑定来源', dataIndex: 'bindSource' },
        { title: '绑定时间', dataIndex: 'bindTime', render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>},
        { title: '状态', dataIndex: 'onlineStatus', 
            render: txt => <span>{{ '0': '有效', '1': '未激活', '2': '在线', '3': '离线', '4': '禁用' }[txt]}</span>
        },
        { title: '操作', key: 'action', width: '200px',
            render: (text, { deviceId }) => <a onClick={ ()=>{}} >从分组中删除</a>
        },
    ];

    useEffect(() => {
        getDownProduct()
        getGroupDevList()
    }, [])


    //获取产品下拉列表
    const getDownProduct = () => {
        get(Paths.getProductType).then((res) => {
            setProductList(res.data || []);
        });
    }
    //获取分组下设备列表
    const getGroupDevList = () => {
        let params = { ...paramsRef.current }
        if (params.productId == -1) { delete params.productId }
        post(Paths.getGroupDeviceList, params, {loading: true}).then((res) => {
            let { list, pager } = res.data || {};
            setDataList({ list, pager });
        });
    }
    //更新请求分组设备列表的参数
    const setParams = (key, val) => {
        let params = { ...paramsRef.current }
        params[key] = val || undefined;
        paramsRef.current = params
    }



    return <Modal title="分组详情" width={900} maskClosable={false} className="self-modal" footer={null}
                visible={true}
                onCancel={()=>closeVisiable(undefined)}  
            >

                <div className='page-groupdetail'>

                    <SearchProduct productList={productList}
                        changedfunc={val => { setParams('productId', val) }}
                        searchedFunc={val => { setParams('deviceIdParams',val); getGroupDevList() }}
                    >
                        <Button className='but-add' type="primary" onClick={()=>setAddVisiable(true)}>新增设备到分组</Button>
                    </SearchProduct>
                    <div>
                        {/* <Button disabled={selectedRowKeys.length == 0} className='but-del' type="primary" onClick={this.openDel.bind(this, 0)}>删除</Button> */}
                        <Table
                            rowKey="deviceId"
                            columns={columns}
                            dataSource={dataList.list}p
                            // rowSelection={rowSelection}
                            pagination={{
                                defaultCurrent: dataList.pager.pageIndex,
                                total: dataList.pager.totalRows,
                                hideOnSinglePage: true,
                                onChange: val => { this.setParams('pageIndex', val); getGroupDevList() },
                                current: dataList.pager.pageIndex
                            }}
                        />
                    </div>
            
                </div>

                {
                    addVisiable && 
                    <Modal title="添加项目下的设备到分组" width={700} maskClosable={false} className="self-modal groupadd-device-modal"
                        visible={true}
                        onCancel={()=>setAddVisiable(false)}
                        onOk={()=>{}}
                    >
                        <DeviceListUsed userId={userId} /> 
                    </Modal>

                }


    </Modal>

}

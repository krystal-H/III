import React, { useState, useEffect, useRef, memo, useImperativeHandle, forwardRef }  from 'react'
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
    const devicedUsedRef = useRef()
    const [productList, setProductList] = useState([])
    const [dataList, setDataList] = useState({list:[],pager:{}})
    const [addVisiable, setAddVisiable] = useState(false)
    const [delids, setDelids] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const selectedLen = selectedRowKeys.length;

    const columns = [
        { title: '设备id', dataIndex: 'deviceId'},
        { title: '所属产品', dataIndex: 'productName'},
        { title: '绑定来源', dataIndex: 'bindSource' },
        { title: '绑定时间', dataIndex: 'bindTime', render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>},
        { title: '状态', dataIndex: 'onlineStatus', 
            render: txt => <span>{{'1':'在线','2':'离线'}[txt]}</span>
        },
        { title: '操作', key: 'action', width: '200px',
            render: (text, { deviceId }) => <a onClick={ ()=>{setDelids([deviceId])}} >从分组中删除</a>
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

    //删除组中设备
    const delOk = () => {
        post(Paths.delGroupDevice, { groupId:viewDetailId, deviceIds: delids }).then((res) => {
            Notification({message: '操作成功！', type: 'success'})
            getGroupDevList();
            setDelids([])

            //从列表中点击删除单条的时候 更新 selectedRowKeys
            if(delids.length==1){
                const i = selectedRowKeys.indexOf(delids[0])
                if(i>-1){
                    setSelectedRowKeys( pre =>{
                        let res = [...pre]
                        res.splice(i,1)
                        return res
                    })
                    
                }
                

            }
        });

    }
    const addOk = ()=>{   
        const selectids = devicedUsedRef.current.selectedRowKeys
        if(selectids.length>0){
            post(Paths.addGroupDevice,{groupId:viewDetailId, deviceIds:selectids}).then((res) => {
                setAddVisiable(false)
                getGroupDevList()

            });
        }
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
                        <span className="tabledel">已选择 {selectedLen} 项</span>
                        <a onClick={()=>{setDelids([...selectedRowKeys])}} disabled={!selectedLen} className={`${!selectedLen&&'a_notcur'||''}`} >删除</a>
                        <Table
                            rowKey="deviceId"
                            columns={columns}
                            dataSource={dataList.list}p
                            rowSelection={{
                                selectedRowKeys,
                                onChange: setSelectedRowKeys,
                            }}
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
                        onCancel={ ()=>setAddVisiable(false)}
                        onOk={addOk}
                    >
                        <DeviceListUsed userId={userId} ref={devicedUsedRef}/> 
                    </Modal>

                }


                <ActionConfirmModal
                    visible={delids.length>0}
                    modalOKHandle={delOk}
                    modalCancelHandle={()=>setDelids([])}
                    title='从分组中删除'
                    descText='即将删除设备'
                    targetName={`${delids[0]}${delids[1]?"，...":""}`}
                />


    </Modal>

}


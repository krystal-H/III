import React,{ useState, useEffect, useRef,memo, useImperativeHandle, forwardRef } from 'react';
import {Table,Input } from 'antd';
import { DateTool } from '../../../../../util/util';
import { post, Paths} from '../../../../../api';

import './deviceGroup.scss';

const columns = [
    { title: '设备ID', dataIndex: 'deviceUniqueId'},
    { title: '所属产品', dataIndex: 'productName' },
    { title: '状态', dataIndex: 'onlineStatus', width: '65px',
        render: txt => <span>{ {'1':'在线','2':'离线'}[txt] }</span>},
    { title: '绑定时间', dataIndex: 'bindTime', width: '180px',
        render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
    }
];
const DevUsed = ({
    userId
},_ref)=>{
    const searchValRef = useRef(undefined);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [listLoading, setListLoading] = useState(false)
    const [dataList, setDataList] = useState({list:[],pager:{}})
    const { list,pager } = dataList;

    const [pageIndex, setPageIndex] = useState(1)

    useEffect(() => {
        getDevList()
    }, [])
    //获取设备列表
    const getDevList = (pageIndex) => {



        if(pageIndex){

            setPageIndex(pageIndex)

        }else{
            pageIndex = 1;
            setListLoading(true)
            post(Paths.getGroupSlctDev,{
                userId,
                deviceUniqueIdParams:searchValRef.current,
                pageIndex,
                pageRows:9999
            }).then((res) => {
                let {list,pager} = res.data || {};
                setDataList({list,pager});
                setPageIndex(pageIndex)
            }).finally(()=>{
                setListLoading(false)
            });

        }
        
    }

    useImperativeHandle(_ref, () => {
        return {selectedRowKeys}
    }, [selectedRowKeys]);

    return <div>
                <Input.Search  maxLength={30} placeholder="请输入设备ID查询" className="search-inpt"
                    onSearch={val=>{ searchValRef.current= val; getDevList()}}
                />
                <div className='list-content'>
                    <Table 
                        rowKey="deviceId"
                        columns={columns} 
                        dataSource={list}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: setSelectedRowKeys,
                        }}
                        loading={listLoading}
                        pagination={{
                            defaultCurrent:1, 
                            total:list.length, 
                            pageSize:8,
                            onChange: getDevList ,
                            current: pageIndex,
                            showSizeChanger:false,
                            hideOnSinglePage: true,
                        }} 
                    />
                </div>
            </div>

}


export default memo(forwardRef(DevUsed));


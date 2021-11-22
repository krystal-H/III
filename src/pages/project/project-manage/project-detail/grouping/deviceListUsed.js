import React,{ useState, useEffect, useRef,memo, useImperativeHandle, forwardRef } from 'react';
import {Modal, Table,Input } from 'antd';
import { DateTool } from '../../../../../util/util';
import { post, Paths} from '../../../../../api';
import {Notification} from '../../../../../components/Notification';

import './deviceGroup.scss';

//  class GroupDetailt  {
//     constructor(props){
//         super(props);
//         this.state = {
//             listLoading:false,
//             list:[],
//             pager:{},
//             selectedRowKeys:[],
//             addListParams:{
//                 pageIndex: 1,
//                 pageRows: 8,
//                 id:props.id,
//                 productId:-1,
//                 deviceUniqueId:undefined,
//             }
            
//         };
//         this.columns = [
//             { title: '设备id', dataIndex: 'deviceUniqueId', key: 'deviceUniqueId'},
//             { title: '所属产品', dataIndex: 'productName',  key: 'productName'},
//             { title: '状态', dataIndex: 'status',  key: 'status',
//                 render: txt => <span>{ {'0':'有效','1':'未激活','2':'在线','3':'离线','4':'禁用'}[txt] }</span>},
//             { title: '最后上线时间', dataIndex: 'lastOnlineTime', key: 'lastOnlineTime', 
//                 render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
//             }
//         ];
//     }
//     //获取列表
//     getGroupAddDevList = ()=>{
//         this.setState({listLoading:true})
//         let{addListParams}=this.state;
//         let params = {...addListParams}
//         if(params.productId == -1){delete params.productId}
//         post(Paths.getGroupSlctDev,params).then((res) => {
//             let {list,pager} = res.data || {};
//             this.setState({list,pager});
//         }).finally(()=>{
//             this.setState({listLoading:false})
//         });
//     }
//     //更新请求参数并获取列表
//     setQuestParams=(key,val,isnot=false)=>{ //isnot 更新完state后是否需要请求列表
//         let prestate = {...this.state.addListParams};
//         prestate[key] = val || undefined;
//         if(key!=="pageIndex"){
//             prestate["pageIndex"] = 1
//         }
//         this.setState({addListParams:prestate},!isnot && this.getGroupAddDevList || undefined);

//     }
//     //确认添加
//     addDeviceOk=()=>{
//         let {selectedRowKeys} = this.state;
//         let addlist = selectedRowKeys;
//         if(addlist.length>0){
//             post(Paths.addGroupDevice,{id:this.props.id,deviceIds:addlist.join(',')}).then((res) => {
//                 this.setState({selectedRowKeys:[]});
//                 this.props.openCloseAdd(true); 
//             });
//         }
//     }
// }



const columns = [
    { title: '设备id', dataIndex: 'deviceId'},
    { title: '所属产品', dataIndex: 'productName' },
    { title: '状态', dataIndex: 'onlineStatus',
        render: txt => <span>{ {'0':'有效','1':'未激活','2':'在线','3':'离线','4':'禁用'}[txt] }</span>},
    { title: '绑定时间', dataIndex: 'bindTime',
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

    useEffect(() => {
        getDevList()
    }, [])
    //获取设备列表
    const getDevList = (pageIndex=1) => {
        setListLoading(true)
        post(Paths.getGroupSlctDev,{
            userId,
            deviceIdParams:searchValRef.current,
            pageIndex,
            pageRows:8
        }).then((res) => {
            let {list,pager} = res.data || {};
            setDataList({list,pager});
        }).finally(()=>{
            setListLoading(false)
        });
        
    }

    useImperativeHandle(_ref, () => {

        return {selectedRowKeys}
    }, [selectedRowKeys]);

    return <div>
                <Input.Search enterButton maxLength={30} placeholder="请输入设备ID查询" className="search-inpt"
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
                            defaultCurrent:pager.pageIndex, 
                            total:pager.totalRows, 
                            onChange:{getDevList},
                            current: pager.pageIndex,
                            showSizeChanger:false,
                            hideOnSinglePage: true,
                        }} 
                    />
                </div>
            </div>

}


export default memo(forwardRef(DevUsed));


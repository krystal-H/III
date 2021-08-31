import React, { PureComponent,createRef,forwardRef } from 'react';
import {Modal, Table,Radio,Form,Select,Upload,Button } from 'antd';
import { DateTool } from '../../../util/util';
import {get,post, Paths} from '../../../api';
import SearchProduct from './searchProduct';
import './deviceGroup.scss';

export default class GroupDetailt extends PureComponent {
    constructor(props){
        super(props);
        this.uploadForm = createRef();
        this.state = {
            addWay:1,
            listLoading:false,
            list:[],
            pager:{},
            selectedRowKeys:[],
            addListParams:{
                pageIndex: 1,
                pageRows: 8,
                id:props.id,
                productId:-1,
                deviceUniqueId:undefined,
            }
            
        };
        this.columns = [
            { title: '设备id', dataIndex: 'deviceUniqueId', key: 'deviceUniqueId'},
            { title: '所属产品', dataIndex: 'productName',  key: 'productName'},
            { title: '状态', dataIndex: 'status',  key: 'status',
                render: txt => <span>{ {'0':'有效','1':'未激活','2':'在线','3':'离线','4':'禁用'}[txt] }</span>},
            { title: '最后上线时间', dataIndex: 'lastOnlineTime', key: 'lastOnlineTime', 
                render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
            }
        ];
    }
    componentDidMount() {
        // this.props.onRef(this);
        
    }
    //获取列表
    getGroupAddDevList = ()=>{
        this.setState({listLoading:true})
        let{addListParams}=this.state;
        let params = {...addListParams}
        if(params.productId == -1){delete params.productId}
        post(Paths.getGroupSlctDev,params).then((res) => {
            let {list,pager} = res.data || {};
            this.setState({list,pager});
        }).finally(()=>{
            this.setState({listLoading:false})
        });
    }
    //更新请求参数并获取列表
    setQuestParams=(key,val,isnot=false)=>{ //isnot 更新完state后是否需要请求列表
        let prestate = {...this.state.addListParams};
        prestate[key] = val || undefined;
        if(key!=="pageIndex"){
            prestate["pageIndex"] = 1
        }
        this.setState({addListParams:prestate},!isnot && this.getGroupAddDevList || undefined);

    }
    //更新选中的数据列表
    onSelectRowKeys=(selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    //确认添加
    addDeviceOk=()=>{
        let {addWay,selectedRowKeys} = this.state;
        if(addWay==1){
            let addlist = selectedRowKeys;
            if(addlist.length>0){
                post(Paths.addGroupDevice,{id:this.props.id,deviceIds:addlist.join(',')}).then((res) => {
                    this.setState({selectedRowKeys:[]});
                    this.props.openCloseAdd(true); 
                });
            }
        }else if(addWay==2){
            this.uploadForm.current.submit();
        } 
    }
    
    changeAddWay=(e)=>{
        let addWay = e.target.value;
        this.setState({addWay});

    }
    render() {
        let { addVisiable,openCloseAdd,productList,groupid} =this.props;
        let { selectedRowKeys, list, pager, addWay,listLoading } =this.state;
        const rowSelection ={
            selectedRowKeys,
            onChange: this.onSelectRowKeys,
        }
        return (
            <Modal
                title="添加设备到分组"
                visible={addVisiable}
                width={750}
                onOk={this.addDeviceOk}
                onCancel={()=>{openCloseAdd(false)}}
                maskClosable={false}
                closable={false}
                className="groupadd-device-modal"
            >
                <div className="addtype" >
                    <Radio.Group value={addWay} onChange={this.changeAddWay}>
                        <Radio value={1}>查找选择</Radio>
                        <Radio value={2}>本地导入</Radio>
                    </Radio.Group>
                </div>
                {
                addWay==1 ?
                <div className="">
                    <SearchProduct 
                        productList={productList}
                        changedfunc={val=>{this.setQuestParams('productId',val,true)}} 
                        searchedFunc={val=>{this.setQuestParams('deviceUniqueId',val)}}
                    />
                    <div className='list-content'>
                        <Table 
                            rowKey="deviceId"
                            columns={this.columns} 
                            dataSource={list}
                            rowSelection={rowSelection}
                            loading={!!listLoading}
                            pagination={{
                                defaultCurrent:pager.pageIndex, 
                                total:pager.totalRows, 
                                onChange:val=>{this.setQuestParams('pageIndex',val)},
                                current: pager.pageIndex
                            }} 
                        />
                    </div>
                </div> : 
                <UploadDevice productList={productList} groupid={groupid} ref={this.uploadForm} openCloseAdd={openCloseAdd}></UploadDevice>
                }
            </Modal>


            
        )
    }
}

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
};

const UploadDevice = forwardRef(({
    productList,
    groupid,
    openCloseAdd
},_ref) =>{
   

    const on_Finish = values =>{
        let {data,productId} = values,
        _data = '';

        if (data && data.fileList && data.fileList.length) {
            let temp = data.fileList[0]

            if (temp && temp.response && temp.response.data) {
                _data = temp.response.data.url
            }
        }
        post(Paths.addDevice,{groupid,type:1,productId,data:_data}).then((res) => {
            openCloseAdd(true); 
        });
    }
    

    return (<Form ref={_ref} {...formItemLayout} onFinish={on_Finish}>
            <Form.Item label="产品" name="productId" rules={[{ required: true, message: '请选择产品' }]}>
                <Select showSearch optionFilterProp="children" placeholder="请选择产品">
                    <Select.Option value="" disabled selected>请选择产品</Select.Option>
                    {
                        productList.map(item => {
                            let {productName,productId} = item;
                            return (<Select.Option key={productId} value={productId}>{productName}</Select.Option>)
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="上传文件" name="data" rules={[{ required: true, message: '请上传文件' }]}>
                <Upload
                    accept='.xls,.xlsx' 
                    action={Paths.upFileUrl}
                    data={{
                        appId: 31438,
                        domainType: 4,
                    }}>
                    <Button type="primary" >上传文件</Button><span style={{marginLeft:"15px"}}>仅支持.xls,.xlsx格式文件</span>
                </Upload>
                <a href="http://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx">下载模板</a>
            </Form.Item>
        </Form>)
})


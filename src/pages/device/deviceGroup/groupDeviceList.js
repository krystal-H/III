import React, { PureComponent,createRef,forwardRef } from 'react';
import {Modal, Table,Radio,Form,Select,Upload,Button, Tabs } from 'antd';
import { DateTool } from '../../../util/util';
import { post, Paths} from '../../../api';
import SearchProduct from './searchProduct';
import {Notification} from '../../../components/Notification';

import './deviceGroup.scss';

export default class GroupDetailt extends PureComponent {
    constructor(props){
        super(props);
        this.uploadForm = createRef();
        this.state = {
            addWay:"1",
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
        if(addWay=="1"){
            let addlist = selectedRowKeys;
            if(addlist.length>0){
                post(Paths.addGroupDevice,{id:this.props.id,deviceIds:addlist.join(',')}).then((res) => {
                    this.setState({selectedRowKeys:[]});
                    this.props.openCloseAdd(true); 
                });
            }
        }else if(addWay=="2"){
            this.uploadForm.current.submit();
        } 
    }
    
    changeAddWay=(addWay)=>{
        this.setState({addWay});

    }
    render() {
        let { addVisiable,openCloseAdd,productList,groupid, id} =this.props;
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
                className="groupadd-device-modal"
            >

                <Tabs onChange={this.changeAddWay} activeKey={addWay}>
                    <Tabs.TabPane tab="查找选择" key="1">
                        {
                            addWay =="1" && <div>
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
                                        current: pager.pageIndex,
                                        showSizeChanger:false
                                    }} 
                                />
                            </div>
                        </div>
                        }
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="本地导入" key="2">
                    {
                            addWay =="2" && <UploadDevice productList={productList} id={id} ref={this.uploadForm} openCloseAdd={openCloseAdd}></UploadDevice>
                    }
                        
                    </Tabs.TabPane>
                </Tabs>
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
    id,
    openCloseAdd
},_ref) =>{
   

    const on_Finish = values =>{
        let {data,productId} = values,
        _data = '';

        if (data && data.length) {
            let temp = data[0]

            if (temp && temp.response && temp.response.data) {
                _data = temp.response.data.url
            }
        }
        post(Paths.groupUpDevice,{id: Number(id),productId,data:_data}).then(({data={}}) => {
            const { failCount=0, totalCount=0 } = data;
            Notification({
                message:'导入结果',
                description:`共导入${totalCount}条，成功了${totalCount-failCount}条，失败了${failCount}条`
            });

            openCloseAdd(true); 
        });
    }
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    return (<Form ref={_ref} {...formItemLayout} onFinish={on_Finish}>
            <Form.Item label="产品名称" name="productId" rules={[{ required: true, message: '请选择产品' }]}>
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
            <Form.Item label="上传文件" name="data" 
            valuePropName="fileList" getValueFromEvent={normFile}
                rules={[{ required: true, message: '请上传文件' }]}
            >
                <Upload
                    accept='.xls,.xlsx'
                    maxCount={1}
                    action={Paths.upFileUrl}
                    data={{
                        appId: 31438,
                        domainType: 4,
                    }}>
                    <Button type="primary" >上传文件</Button><span style={{marginLeft:"15px"}}>仅支持.xls,.xlsx格式文件</span>
                </Upload> 
            </Form.Item>
               <a style={{ "display":"inline-block", "margin":"0 0 10px 172px"}} href="http://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx">下载模板</a> 

        </Form>)
})


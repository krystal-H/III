import React, { Component,createRef } from 'react';
import {cloneDeep,compact,indexOf} from 'lodash';
import {get, post, Paths} from '../../../api';
import DoubleBtns from './../../../components/double-btns/DoubleBtns';
import NoSourceWarn from './../../../components/no-source-warn/NoSourceWarn';
import { Input, Select, Tree,Tabs,Form } from 'antd';
import { getUrlParam } from '../../../util/util';
import { Notification } from './../../../components/Notification';
import PageTitle from '../../../components/page-title/PageTitle';

import './addRole.scss';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
export default class AddRole extends Component{
    constructor(props){
        super(props);
        this.roleId = getUrlParam('roleId') && decodeURI(getUrlParam('roleId')) || undefined;
        this.state = {
            roleName:getUrlParam('roleName') && decodeURI(getUrlParam('roleName')) ||'',//角色名称
            remark:getUrlParam('remark') && decodeURI(getUrlParam('remark')) ||'',//备注
            menu:[],//功能菜单
            dataObject:[],//数据对象
            dataDimension:[],//设备标签

            treeMenu:[],
            treeDataObject:[],
            treeDataDimension:[],

            treeDataObjectCheckeys:[],
            treeDataDimensionCheckeys:[],
            treeMenuCheckeys:[],
        };
        this.formRef = createRef();
        this.treeDataObjectCheckeys=[];
        this.treeDataDimensionCheckeys=[];
    }
    componentDidMount() {
        this.getRights();
        
        
    }

    //获取权限数据
    getRights = ()=>{
        post(Paths.getRights,{roleId:this.roleId},{loading:true}).then(res => {
            let { checkBoxGroupMenuList=[], menu="[]" } = res.data;
            let dataObject = this.addFrontId(checkBoxGroupMenuList[0].checkBoxGroupList),
                dataDimension = this.addFrontId(checkBoxGroupMenuList[1].checkBoxGroupList);
            let treeDataObject = this.getOneTreeData(dataObject,"treeDataObjectCheckeys"),
                treeDataDimension = this.getOneTreeData(dataDimension,"treeDataDimensionCheckeys");
            this.setState({
                menu:JSON.parse(menu),
                dataObject,
                dataDimension,

                // treeMenu:this.geMenuTreeData(JSON.parse(menu)),

                
                treeDataObject,
                treeDataDimension,

                treeDataObjectCheckeys:this.treeDataObjectCheckeys,
                treeDataDimensionCheckeys:this.treeDataDimensionCheckeys,
            })

            console.log(JSON.parse(menu))
            console.log(dataObject)
        });

    }

    //格式化接口数据（增加一个字段前端用的id，frontId："1_2_3_4"）
    addFrontId = data => {
        let wW = cloneDeep(data);
        for(let i=0;i<wW.length;i++){
            let one = wW[i];
            wW[i].frontId = i+"";
            if(one.subBoxs.length>0){
                for(let j=0;j<one.subBoxs.length;j++){
                    let two = one.subBoxs[j];
                    wW[i].subBoxs[j].frontId = i+"_"+j;
                    if(two.subBoxs.length>0){
                        for(let k=0;k<two.subBoxs.length;k++){
                            let three = two.subBoxs[k];
                            wW[i].subBoxs[j].subBoxs[k].frontId = i+"_"+j+"_"+k;
                            if(three.subBoxs.length>0){
                                for(let l=0;l<three.subBoxs.length;l++){
                                    wW[i].subBoxs[j].subBoxs[k].subBoxs[l].frontId = i+"_"+j+"_"+k+"_"+l;
                                }
                            }
                        }
                    }
                }
            }

        }
        return wW;
    }

    //获取数据对象、设备标签权限的展示用树结构数据
    getOneTreeData = (data=[],type)=>{
        return data.map(({checked,groupName="",boxName="",subBoxs=[],frontId},index)=>{
            if(checked){
                this[type].push(frontId);
            }
            let title = groupName || boxName;
            if(subBoxs.length>0){
                return {
                    title,
                    key:frontId,
                    children:this.getOneTreeData(subBoxs)
                }
            }
            return {
                title,
                key:frontId
            }
        })
    }
    //获取菜单权限的展示用树结构数据
    geMenuTreeData = (menu=[])=>{
        return menu.map(({menuname,checked,items=[],childmenus=[]},index)=>{


            // if(childmenus.length>0){
            //     return {
            //         title:menuname,
            //         key:menuname,
            //         children:this.getOneTreeData(subBoxs)
            //     }
            // }
            // return {
            //     title,
            //     key:boxId
            // }
        })
    }

    //根据 Checkeys 里选中的id， 补充父节点id, ant 的 tree 选中的id不会包括非全选的父节点的id，但是后台需要
    addCheckedFatherId = (idlist)=>{
        let fatherIds = [];
        for(let i=0;i<idlist.length;i++){
            let str = idlist[i], fathers = [];
            str.replace(/_/g,(c,b)=>{fathers.push(str.substring(0,b))});
            fatherIds = [ ...fatherIds, ...fathers ] 
        }
        return  Array.from(new Set(fatherIds))
    }

    //获取数据对象、设备标签权限的提交接口数据
    getOneComitData = (type)=>{
        const { dataObject, dataDimension, treeDataObjectCheckeys, treeDataDimensionCheckeys} = this.state;
        let checks = treeDataObjectCheckeys, data = dataObject;
        if(type=="dataDimension"){
            checks = treeDataDimensionCheckeys, data = dataDimension;
        }
        checks = this.addCheckedFatherId(checks);

        return this.changChecked(data,checks)
    }

    //根据UI上的选中的id（frontId）， 设置 checked字段值，设置完成后删除 frontId 属性，
    changChecked = (data,checkeys)=>{
        return data.map((item)=>{
            let { frontId,subBoxs } = item;
            let checked = checkeys.includes(frontId)
            let _subBoxs = subBoxs.length>0 && this.changChecked(subBoxs,checkeys) || [];
            let _item = {
                ...item,
                checked,
                subBoxs:_subBoxs
            }
            delete _item.frontId;
            return _item;
        })
    }

    saveOkHandle = ()=>{
        let comitDataObject = this.getOneComitData("dataObject"),
            comitDataDimension = this.getOneComitData("dataDimension");
        let menustr = JSON.stringify(this.state.menu),
            dataArr = [...comitDataObject,...comitDataDimension];



        let data = {
            remark:"测试创建角色",
            roleName:"角色名2222",
            res:[{resource:menustr,type:'menu'}],
            dataJson:JSON.stringify(dataArr)
        }
        post(Paths.saveRole,data,{loading:true}).then((res) => {
            
            Notification({type:'success',description:'用户角色保存成功！'});
            this.props.history.push({
                pathname: '/userCenter/role/list'
            });
        });

    }

    onCheckNode = (checkedKeysValue,type) => {
        this.setState({
            [type]:checkedKeysValue
        })
    };
    

    render(){
        const { roleName, remark, treeDataObject,treeDataDimension,treeDataObjectCheckeys, treeDataDimensionCheckeys} = this.state;
        return <div className='page-role-edit'>
            <PageTitle backTitle={this.roleId&&"编辑角色"||"创建角色"}  />
            <div className="pagebody comm-shadowbox">
                <div className='mod'>
                    <div className='tit'>基础信息</div>
                    <Form onFinish={this.onFinish} initialValues={{roleName,remark}} ref={this.formRef}>
                        <Form.Item label="角色名" name='roleName' rules={[ { required: true, message: '请输入角色名' },{ max: 20, message: '最大输入长度为20字符' }]}>
                            <Input placeholder="请输入角色名" />
                        </Form.Item>
                        <Form.Item label="备注" name='remark' rules={[{ required: true, message: '请输入备注' },{ max: 20, message: '最大输入长度为20字符' }]}>
                            <Input placeholder="请输入备注" />
                        </Form.Item>
                    </Form>
                </div>
                
                <div className='mod'>
                    <div className='tit'>权限配置</div>



                    <div className="treemod">
                        <div className="borderbox">


                        <Tabs >
                            {/* <Tabs.TabPane tab="功能菜单" key={'0'}>
                                <Tree
                                    checkable
                                    autoExpandParent={true}
                                    // onCheck={onCheck}
                                    // checkedKeys={checkedKeys}
                                    treeData={treeDataObject}
                                />
                                
                            </Tabs.TabPane> */}
                            <Tabs.TabPane tab="数据对象"  key={'1'}>
                                <Tree
                                    checkable
                                    autoExpandParent={true}
                                    onCheck={(val)=>{this.onCheckNode(val,"treeDataObjectCheckeys")}}
                                    checkedKeys={treeDataObjectCheckeys}
                                    treeData={treeDataObject}
                                />
                                
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="设备标签"  key={'2'}>
                                <Tree
                                    checkable
                                    autoExpandParent={true}
                                    onCheck={(val)=>{this.onCheckNode(val,"treeDataDimensionCheckeys")}}
                                    checkedKeys={treeDataDimensionCheckeys}
                                    treeData={treeDataDimension}
                                />
                                
                            </Tabs.TabPane>
                        </Tabs>

                    
                            

                        </div>
                        <div className="borderbox">
                            {/* <div className="checkeddesc">已选权限</div> */}
                            <Tree
                                checkable
                                autoExpandParent={true}
                                // onCheck={onCheck}
                                // checkedKeys={checkedKeys}
                                treeData={treeDataObject}
                            />

                        </div>
                    </div>

                    
                </div>



                
                <DoubleBtns
                    preBtn={false}
                    nextHandle={this.saveOkHandle}
                    nextText={this.roleId&&"保存"||"创建"}
                />



            </div>
        </div>
    }

}
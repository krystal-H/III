import React, { Component,createRef } from 'react';
import {cloneDeep,compact,indexOf} from 'lodash';
import {get, post, Paths} from '../../../api';
import DoubleBtns from './../../../components/double-btns/DoubleBtns';
import NoSourceWarn from './../../../components/no-source-warn/NoSourceWarn';
import { Input, Select, Tree,Tabs,Form } from 'antd';
import { getUrlParam } from '../../../util/util';
import { Notification } from './../../../components/Notification';
import PageTitle from '../../../components/page-title/PageTitle';

// import {menuList} from './../../../configs/route.config';

import './addRole.scss';


export default class AddRole extends Component{
    constructor(props){
        super(props);
        this.roleId = getUrlParam('roleId') && decodeURI(getUrlParam('roleId')) || undefined;
        this.state = {
            roleName:getUrlParam('roleName') && decodeURI(getUrlParam('roleName')) ||'',//角色名称
            remark:getUrlParam('remark') && decodeURI(getUrlParam('remark')) ||'',//备注
            dataMenu:[],//功能菜单
            dataObject:[],//数据对象
            dataDimension:[],//设备标签

            treeDataMenu:[],
            treeDataObject:[],
            treeDataDimension:[],

            treeMenuCheckeys:[],
            treeDataObjectCheckeys:[],
            treeDataDimensionCheckeys:[],

            showCheckedTree:[],
            
        };
        this.formRef = createRef();
        this.treeMenuCheckeys=[];
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
            let dataMenu = this.addFrontIdMenu(JSON.parse(menu)),
                dataObject = this.addFrontId(checkBoxGroupMenuList[0].checkBoxGroupList),
                dataDimension = this.addFrontId(checkBoxGroupMenuList[1].checkBoxGroupList);


            let treeDataMenu = this.getMenuTreeData(dataMenu),
                treeDataObject = this.getOneTreeData(dataObject,"treeDataObjectCheckeys"),
                treeDataDimension = this.getOneTreeData(dataDimension,"treeDataDimensionCheckeys");
            this.setState({
                dataMenu,
                dataObject,
                dataDimension,

                treeDataMenu,
                treeDataObject,
                treeDataDimension,

                treeMenuCheckeys:this.treeMenuCheckeys,
                treeDataObjectCheckeys:this.treeDataObjectCheckeys,
                treeDataDimensionCheckeys:this.treeDataDimensionCheckeys,
            })
        });

    }

    /**
        格式化接口数据（增加一个字段前端用的id，frontId："1_2_3_4"）
    */
   //数据对象、设备标签权限  frontId
    addFrontId = data => {
        let wW = cloneDeep(data);
        for(let i=0;i<wW.length;i++){
            let one = wW[i];
            wW[i].frontId = i+"";
            if(one.subBoxs && one.subBoxs.length>0){
                for(let j=0;j<one.subBoxs.length;j++){
                    let two = one.subBoxs[j];
                    wW[i].subBoxs[j].frontId = i+"_"+j;
                    if(two.subBoxs && two.subBoxs.length>0){
                        for(let k=0;k<two.subBoxs.length;k++){
                            let three = two.subBoxs[k];
                            wW[i].subBoxs[j].subBoxs[k].frontId = i+"_"+j+"_"+k;
                            if(three.subBoxs && three.subBoxs.length>0){
                                for(let l=0;l<three.subBoxs.length;l++){
                                    let four = three.subBoxs[l];
                                    wW[i].subBoxs[j].subBoxs[k].subBoxs[l].frontId = i+"_"+j+"_"+k+"_"+l;
                                    if(four.subBoxs && four.subBoxs.length>0){
                                        for(let m=0;m<four.subBoxs.length;m++){
                                            let five = four.subBoxs[m];
                                            wW[i].subBoxs[j].subBoxs[k].subBoxs[l].subBoxs[m].frontId = i+"_"+j+"_"+k+"_"+l+"_"+m;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
        return wW;
    }
    //菜单权限  frontId
    addFrontIdMenu = menu=>{
        // let wW = cloneDeep(menuList);

        console.log(777,menu)
        let wW = cloneDeep(menu);
        
        for(let i=0;i<wW.length;i++){
            let one = wW[i];
            wW[i].frontId = i+"";
            // let { childmenus} = one; // 菜单特性 ：childmenus, items 最多只有一个的length>0
            if(one.childmenus && one.childmenus.length>0){
                for(let j=0;j<one.childmenus.length;j++){
                    wW[i].childmenus[j].frontId = i+"_"+j;
                }
            }
        }

        console.log(888,wW)
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
                    children:this.getOneTreeData(subBoxs,type)
                }
            }
            return {
                title,
                key:frontId
            }
        })
    }
    //获取菜单权限的展示用树结构数据
    getMenuTreeData = (menu=[])=>{
        return menu.map(({checked,childmenus=[],menuname="",item=[],frontId})=>{
            if(checked){
                this.treeMenuCheckeys.push(frontId);
            }
            let title = menuname;
            if(childmenus.length>0){
                return {
                    title,
                    key:frontId,
                    children:this.getMenuTreeData(childmenus)
                }
            }
            return {
                title,
                key:frontId
            }
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
        let allids = Array.from(new Set([...idlist,...fatherIds]));
        // console.log(22222,allids) 
        return  allids
    }

    //获取权限树的提交接口所需的格式数据
    getOneComitData = (type)=>{
        const { 
            dataMenu, dataObject, dataDimension, 
            treeMenuCheckeys,treeDataObjectCheckeys, treeDataDimensionCheckeys
        } = this.state;

        let checksMenu = this.addCheckedFatherId(treeMenuCheckeys);
        let checksDataObj = this.addCheckedFatherId(treeDataObjectCheckeys);
        let checksDataDimens = this.addCheckedFatherId(treeDataDimensionCheckeys);
        let comitDataMenu = this.changChecked(dataMenu,checksMenu),
            comitDataObject = this.changChecked(dataObject,checksDataObj),
            comitDataDimension = this.changChecked(dataDimension,checksDataDimens);

        // console.log(5555,comitDataMenu)
        return { comitDataMenu, comitDataObject, comitDataDimension }
    }
    //根据UI上的选中的id（frontId）， 设置 checked字段值，设置完成后删除 frontId 属性，
    changChecked = (data,checkeys)=>{
        return data.map((item)=>{
            let { frontId,subBoxs=[],childmenus=[],menuname } = item;
            let checked = checkeys.includes(frontId);
            let _item = {
                ...item,
                checked
            }
            if(menuname){ // menuname 字段用来判断是 菜单树 还是 其他权限树
                _item.childmenus = childmenus.length>0 && this.changChecked(childmenus,checkeys) || [];
            }else{
                _item.subBoxs = subBoxs.length>0 && this.changChecked(subBoxs,checkeys) || [];
            }
            delete _item.frontId;
            return _item;
        })
    }

    saveOkHandle = ()=>{
        this.formRef.current.submit()
    }
    onFinish = (baseinfo)=>{
        let { comitDataMenu, comitDataObject, comitDataDimension } = this.getOneComitData();
        let menustr = JSON.stringify(comitDataMenu),
            dataArr = [...comitDataObject,...comitDataDimension];

        let data = {
            ...baseinfo,
            res:[{resource:menustr,type:'menu'}],
            dataJson:JSON.stringify(dataArr),
            roleId:this.roleId
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
        },()=>{
            // this.getCheckedTreeData()
        })
    };

    //展示已选中的菜单树
    getCheckedTreeData = ()=>{
        // let { 
        //     treeDataMenu, treeDataObject, treeDataDimension, 
        //     treeMenuCheckeys, treeDataObjectCheckeys, treeDataDimensionCheckeys
        // } = this.state;
        // let showCheckedTree = [];
        // let checkedMenu =  treeMenuCheckeys.length>0 && this.fitherChecked(treeDataMenu,treeMenuCheckeys)

        // console.log("--checkedMenu--",checkedMenu)

    }

    // fitherChecked = (tree,checks)=>{
    //     return tree.map(({title,key,children})=>{
    //         if(checks.includes(key)){
    //             let res = {
    //                 title,
    //                 key
    //             }
    //             if(children&&children.length>0){
    //                 res.children = this.fitherChecked(children,checks)
    //             }
    //             return res
    //         }
    //         return null
    //     })
    // }

    render(){
        const { 
            roleName, remark, treeDataMenu,treeDataObject,
            treeDataDimension,treeMenuCheckeys,treeDataObjectCheckeys, 
            treeDataDimensionCheckeys
        } = this.state;

        console.log(99,treeDataMenu)
        const treeDataTabPane = [
            {
                name:"功能菜单",
                treeDataNam:treeDataMenu,
                checkKeysNam:treeMenuCheckeys,
                type:"treeMenuCheckeys",
            },
            {
                name:"数据对象",
                treeDataNam:treeDataObject,
                checkKeysNam:treeDataObjectCheckeys,
                type:"treeDataObjectCheckeys",
            },
            {
                name:"设备标签",
                treeDataNam:treeDataDimension,
                checkKeysNam:treeDataDimensionCheckeys,
                type:"treeDataDimensionCheckeys",
            }
        ]
        return <div className='page-role-edit'>
            <PageTitle title={this.roleId&&"编辑角色"||"创建角色"} titleBack={true}   />
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
                            <Tabs>
                                {treeDataTabPane.map(({name,treeDataNam,checkKeysNam,type},index)=>{
                                        return <Tabs.TabPane tab={name} key={index+""}>
                                                { treeDataNam.length > 0 &&<Tree
                                                    checkable
                                                    autoExpandParent={true}
                                                    onCheck={(val)=>{this.onCheckNode(val,type)}}
                                                    checkedKeys={checkKeysNam}
                                                    treeData={treeDataNam}
                                                /> || <NoSourceWarn />}
                                                </Tabs.TabPane>
                                })}
                            </Tabs>
                        </div>
                        {/* <div className="borderbox">
                           

                        </div> */}
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
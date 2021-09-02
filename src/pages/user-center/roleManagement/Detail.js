import React, { Component } from 'react';
import {cloneDeep,compact,indexOf} from 'lodash';
import {get, post, Paths} from '../../../api';
import DoubleBtns from './../../../components/double-btns/DoubleBtns';
import NoSourceWarn from './../../../components/no-source-warn/NoSourceWarn';
import { Input, Select, Tree,Radio } from 'antd';
import { getUrlParam } from '../../../util/util';
import { Notification } from './../../../components/Notification';
import PageTitle from '../../../components/page-title/PageTitle';

import './addRole.scss';

export default class AddRole extends Component{
    constructor(props){
        super(props);
        this.roleId = getUrlParam('roleId') && decodeURI(getUrlParam('roleId')) || undefined;
        this.state = {
            roleName:getUrlParam('roleName') && decodeURI(getUrlParam('roleName')) ||'',//角色名称
            remark:getUrlParam('remark') && decodeURI(getUrlParam('remark')) ||'',//备注
        };
    }
    componentDidMount() {
        this.getRights();
        
    }
    getRights = ()=>{
       
        post(Paths.getRights,{roleId:this.roleId},{loading:true}).then(res => {
            let {checkBoxGroupMenuList,menu} = res.data;
            let list = []; 

            for(let i=0;i<checkBoxGroupMenuList.length;i++){
                let li =  checkBoxGroupMenuList[i].checkBoxGroupList;
                if(li.length>0){
                    list = [...list,...this.rightsList(li)];
                }
            }

            this.saveOkHandle(menu,list)
         
               
        });

    }

    rightsList = (arr,key) => {
        let keyDisposes = null;
        return arr.map((item,index) => {
            if(key){
                keyDisposes = key+'-'+index;
            }else{
                keyDisposes = '0-'+index
            }
            let title = item.boxName||item.groupName;
            if(title&&title.indexOf('#')!=-1){
                title = title.split('#');
                title = title[0];
            }
            item.title = title;
            item.key = keyDisposes;
            if (item.subBoxs) {
                item.children = this.rightsList(item.subBoxs,item.key) 
            }
            return item;
        });
    }


    saveOkHandle = (menustr,list)=>{

        let data = {
            remark:"测试创建角色",
            roleName:"角色名111",
            res:[{resource:menustr,type:'menu'}],
            dataJson:JSON.stringify(list)
        }
        post(Paths.saveRole,data,{loading:true}).then((res) => {
            
            Notification({type:'success',description:'用户角色保存成功！'});
            this.props.history.push({
                pathname: '/userCenter/role/list'
            });
        });

    }
    

    render(){
        return(
        <div className='role-add'>
            <PageTitle backTitle={this.roleId&&"编辑角色"||"创建角色"}  />
            
            <DoubleBtns
                // preHandle={this.click_1}
                preText='取消'
                nextHandle={this.saveOkHandle}
                nextText={this.roleId&&"保存"||"创建"}
            />
        </div>
    )}

}
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { post,Paths } from '../../../api'
import { getDeveloperInfo } from '../store/ActionCreator'


import PageTitle from '../../../components/page-title/PageTitle';
import AloneSection from '../../../components/alone-section/AloneSection';
import ContactInformation from './ContactInformation';

import TreeStructureDisplay from '../../../components/tree-structure-display/TreeStructureDisplay'

import './UserInfo.scss'
import { DateTool } from '../../../util/util'


const mapStateToProps = state => {
    return {
        developerInfo: state.getIn(['userCenter', 'developerInfo']).toJS()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDeveloperInfo: () => dispatch(getDeveloperInfo()),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class BaseInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            treeData:{}
        }
    }
    componentDidMount () {
        this.getSubRights()
    }
    componentDidUpdate (prevProps) {
        let {isSubUser} = this.props.developerInfo;
        if(prevProps.developerInfo.isSubUser !== isSubUser) {
            this.getSubRights()
        }
    }
    getSubRights = () => {
        const { isNotSub, developerInfo:{userId} } = this.props;

        if (!isNotSub) {
            post(Paths.getRights,{userId},{loading:true}).then((model) => {
                this.setState({ treeData:model.data || {} }); 
            });
        }
    }
    render() {
        const {developerInfo,getDeveloperInfo,isNotSub} = this.props,
            {treeData} = this.state,
            {userId,email,regTime,userRole,parentUserName,userName} = developerInfo;

        return <div className='page-userbaseinfo'>
                <PageTitle title="基本资料" />
                {
                    !isNotSub ? 
                    // 子账号页面
                    <div>
                        <AloneSection title="基本信息" className='comm-shadowbox'>
                            <div className="alone-section-content-default base-info">
                                <div className="p-flex">
                                    <span className="flex-item">
                                        <span className="title">登录账号：</span>
                                        {userName}
                                    </span>
                                    <span className="flex-item">
                                        <span className="title">所属主帐号：</span>
                                        {parentUserName}
                                    </span>
                                    <span className="flex-item">
                                        <span className="title">账户角色：</span>
                                        {userRole}
                                    </span>
                                    <span className="flex-item">
                                        <span className="title">创建时间：</span>
                                        {regTime ? DateTool.utcToDev(regTime) : ''}
                                    </span>
                                </div>
                            </div>
                        </AloneSection>
                        <AloneSection title="权限信息" className='comm-shadowbox'>
                            <TreeStructureDisplay treeData={treeData}/>
                        </AloneSection> 
                    </div>
                    // 主账号页面
                    :<div>
                        <AloneSection title="基本信息" className='comm-shadowbox'>
                            <div className="alone-section-content-default base-info">
                                <div className="p-flex">
                                    <span className="flex-item">
                                        <span className="title">开发者ID：</span>
                                        {userId}
                                    </span>
                                    <span className="flex-item">
                                        <span className="title">电子邮箱：</span>
                                        {email}
                                    </span>
                                    <span className="flex-item">
                                        <span className="title">注册时间：</span>
                                        {regTime ? DateTool.utcToDev(regTime) : ''}
                                    </span>
                                </div>
                            </div>
                        </AloneSection>
                        <AloneSection title="联系信息" className='comm-shadowbox'>
                            <div className="alone-section-content-default form-wrapper">
                                <ContactInformation getDeveloperInfo={getDeveloperInfo} developerInfo={developerInfo}></ContactInformation>
                            </div>
                        </AloneSection>
                    </div>

                }
            
            </div>
    }
}



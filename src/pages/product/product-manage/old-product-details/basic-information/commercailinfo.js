import React, { Component } from 'react';
import { withRouter } from "react-router"
import { post,Paths } from '../../../../../api';
import NoSourceWarn from '../../../../../components/no-source-warn/NoSourceWarn';

class CommercailInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            publishProductInfo:{},
        }
        this.clickFile = this.clickFile.bind(this);
        this.getPublishProductInfoFun = this.getPublishProductInfoFun.bind(this);
    }
    getPublishProductInfoFun(){
        post(Paths.getPublishProductBusinessInfo,{productId:this.props.productId},{loading:true}).then((model) => {
           this.setState({publishProductInfo:model.data || {}});
        });
    }
    componentDidMount() {
        if(this.props.productId){
            this.getPublishProductInfoFun();
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.productId&&(prevProps.productId!= this.props.productId)){
            this.getPublishProductInfoFun();
        }
    }

    clickFile(url){
        if(!url){
            Notification({
                description:'暂无',
            });
            return false;
        }
        
        window.open(url);
    }


    render() {
        let {publishProductInfo} = this.state;
        let html = null;
        let mode = publishProductInfo.mode;

        if(publishProductInfo){
            let {
                supplier,
                contact,
                tel,
                size,
                weight,
                introduction,
                productParam,
                instruction,
                productPic,
            } = publishProductInfo;
            html = (
                <div>
                    <div className='commonContentBox'>
                        <div className='title'>商业化信息
                            {
                                    mode==0?<div className='update_box'>
                                            <span className='update under_review'>审核中</span>
                                        </div>:null
                                }
                        </div>
                        <div className='centent'>
                            <div className='introductionBar'>
                                <div className='common_title_input'>
                                    <span className='common_title'>成品图片：</span>
                                    <div className='common_content'>
                                        {productPic?JSON.parse(productPic).map((item,index)=>{
                                            return <img className='productPic' key={'成品图片'+index} src={item.filesrc} />
                                        }):'--'}
                                    </div>
                                </div>
                                <div className='common_title_input'>
                                    <span className='common_title'>尺寸：</span>
                                    <div className='common_content'>
                                        <span>{size||'--'}&nbsp;mm</span>
                                    </div>
                                </div>
                                <div className='common_title_input'>
                                    <span className='common_title'>重量：</span>
                                    <div className='common_content'>
                                        <span>{weight||'--'}&nbsp;Kg</span>
                                    </div>
                                </div>
                                <div className='common_title_input'>
                                    <div className='common_title'>产品参数：</div>
                                    <div className='common_content'>
                                        {productParam}
                                    </div>
                                </div>
                                <div className='common_title_input'>
                                    <span className='common_title'>产品介绍：</span>
                                    <div className='common_content'>
                                        <span>{introduction||'--'}</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='commonContentBox'>
                        <div className='title'>产品附件</div>
                        <div className='centent'>
                            <div className='common_title_input'>
                                <span className='common_title'>产品附件：</span>
                                <div className='common_content'>
                                    {
                                        instruction?JSON.parse(instruction).map((item,index)=>{
                                            return <div className='links' key={'产品附件'+index} onClick={this.clickFile.bind(this,item.filesrc)} >{item.filename}</div>
                                        }):null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='commonContentBox'>
                        <div className='title'>供应链信息</div>
                        <div className='centent'>
                            <div className='common_title_input'>
                                <span className='common_title'>供应商公司：</span>
                                <div className='common_content'>
                                    <span>{supplier||'--'}</span>
                                </div>
                            </div>
                            <div className='common_title_input'>
                                <span className='common_title'>联系人：</span>
                                <div className='common_content'>
                                    <span>{contact||'--'}</span>
                                </div>
                            </div>
                            <div className='common_title_input'>
                                <span className='common_title'>联系方式：</span>
                                <div className='common_content'>
                                    <span>{tel||'--'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
        <div className="product_info">
        {
                publishProductInfo?
                html:<div>
                        <div className='commonContentBox'>
                            <div className='title'>商业化信息</div>
                            <div className='centent'>
                                <NoSourceWarn/>
                            </div>
                        </div>
                        <div className='commonContentBox'>
                            <div className='title'>产品附件</div>
                            <div className='centent'>
                                <NoSourceWarn/>
                            </div>
                        </div>
                        <div className='commonContentBox'>
                            <div className='title'>供应链信息</div>
                            <div className='centent'>
                                <NoSourceWarn/>
                            </div>
                        </div>
                    </div>
            }
        </div>
        )
    }
}

export default withRouter(CommercailInfo)
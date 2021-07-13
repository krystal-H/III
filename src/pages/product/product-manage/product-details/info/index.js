import React, { useRef, useState } from 'react';
import { Input, Button, Select, Table } from 'antd';
import LabelTip from '../../../../../components/form-com/LabelTip';
import './index.scss'
import EditableTable from './editTable';
export default function ChangeModal() {
    return (<div id='product-info'>
        <div className='product-info-item'>
            <h3 className='product-info-title'>产品信息</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <img className='product-top-left-img' />
                    <div className='product-info-content-text'>
                        <div>
                            <span>产品型号：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                        <div>
                            <span>网关子设备：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                        <div>
                            <span>通信安全验证：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                        <div>
                            <span>配网方式：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                    </div>
                </div>
                <div className='product-info-conten-wrap'>
                    <div className='product-info-content-text'>
                        <div>
                            <span>配网方式：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                        <div>
                            <span>AP-SSID：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                        <div>
                            <span>AP-密码：</span>
                            <span>HTSL-BB100]</span>
                        </div>
                    </div>
                </div>
                <div className='product-info-conten-wrap' style={{ paddingTop: '12px' }}>
                    <div className='product-top-right-text'>配网方式：</div>
                    <img className='product-top-right-img' />
                </div>
            </div>
        </div>
        <div className='product-info-item'>
            <h3 className='product-info-title'>引导图</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>配网引导图：</span>
                    <img className='middle-img' />
                </div>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>失败引导图：</span>
                    <img className='middle-img' />
                </div>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>帮助轮播图：</span>
                    <img />
                </div>
            </div>
        </div>
        <div className='product-info-item'>
            <h3 className='product-info-title'>标准功能<LabelTip tip="产品标签是您给产品自定义的标识，您可以使用标签功能实现产品的分类统一管理。"></LabelTip></h3>
            <div className='product-info-table'>
                <EditableTable/>

            </div>
        </div>
    </div>)

}
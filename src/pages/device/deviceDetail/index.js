import React, { useState } from 'react'
import PageTitle from '../../../components/page-title/PageTitle';
import './index.scss'
export default function DeviceInfo() {
    return (<div id='device-detail'>
        <PageTitle backTitle='设备详情' >
            <div className='device-top'>
                <div className='device-top-item'>
                    <label className='device-label'>设备ID：</label><span className='device-text'>405EE1100371</span><span className='device-status'>离线</span>
                </div>
                <div className='device-top-item'><label className='device-label'>物理地址ID：</label><span className='device-text'>405EE1100371</span></div>
                <div className='device-top-item'><label className='device-label'>产品名称：</label><span className='device-text'>405EE1100371</span></div>
                <div className='device-top-item'><label className='device-label'>所属分类：</label><span className='device-text'>405EE1100371</span></div>
            </div>
        </PageTitle>
        <div>

        </div>
    </div>)
}
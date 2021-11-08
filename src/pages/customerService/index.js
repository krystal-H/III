import React, { useEffect, useCallback, useState } from 'react'
import { Input } from 'antd';
import './index.scss';

export default function OverviewWrap() {
    useEffect(() => {
       
    }, [])
   
    const [a, setA] = useState([])
    
  
    return (
        <div className="customer-service comm-shadowbox" >
            <div className='tit'>客服<span className="close"> </span></div>
            <div className='content'>
                <div className='left'></div>
                <div className='right'></div>

            </div>
            <div className='inputbox'>
                <span className='imgbtn'></span>
                <span className='sendbtn'>发送</span>
                <Input.TextArea className='textarea' placeholder="很高兴为您服务，请输入您的问题" bordered={false} maxLength={200} />
            </div>
        </div>
    )
}

import React from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

export default function EyeIcon({
    visiable,
    clickBack
}) {
    const EYE = visiable ? EyeFilled : EyeInvisibleFilled;
    
    return <EYE 
                style={{color:"#2F78FF",fontSize:"16px",margin:"0 14px"}}
                onClick={clickBack}
    />
}
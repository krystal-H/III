import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { copyTextToClipBoard } from '../../util/util';

/**
 * label必传
 * copy控制点击复制
 */

const LabelVisible = ({ defaultVisible = false, label = "", tip = "", copy = false }) => {
    const [visible, setVisible] = useState(defaultVisible);
    const handleClick = () => {
        return copy ? copyTextToClipBoard(label) : null
    }

    if (label === null) {
        label = ""
    }

    return (
        <span >
            <Tooltip title={tip}>
                <span onClick={handleClick} style={copy ? { cursor: "pointer" } : {}}>{(visible || (label && label.length < 9)) ? label : label.slice(0, 4) + label.slice(4, -4).replace(/\w/g, '*') + label.slice(-4)}</span>
            </Tooltip>
            &nbsp;
            {
                visible ? <EyeOutlined style={{ color: '#2F78FF' }} onClick={() => setVisible(!visible)} /> : <EyeInvisibleOutlined style={{ color: '#2F78FF' }} onClick={() => setVisible(!visible)} />
            }
        </span>
    );
}

export default LabelVisible
import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'


function CountAll({
    data,          //返回按钮文本，例：'开发流程'，不传则代表无返回
    bgColor = '#fff',         //返回操作 ，默认 defaultGoback
}) {
    return (
        <div className='count-component' style={{backgroundColor:bgColor}}>
            <div className='comm-shadowbox device-count'>
                {
                    data.map((item, index) => {
                        return (
                            <div className='device-count-item' key={index}>
                                <div className='item-label'>{item.label}</div>
                                <div className='item-number'>{item.count}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default withRouter(React.memo(CountAll))

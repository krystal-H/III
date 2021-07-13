import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { withRouter} from 'react-router-dom'

import './PageTitle.scss'


function PageTitle({
    backTitle,          //返回按钮文本，例：'开发流程'，不传则代表无返回
    backHandle,         //返回操作 ，默认 defaultGoback
    title,              //页面标题，一般是产品名、设备名 等
    titleTag,           //标题后缀的标签，例：'免开发方案',不传则代表无标签
    btnTxt,             //标题行右侧的按钮文本，例：'编辑'不传则代表无按钮
    btnStyle = 'link',
    btnClickHandle,
    btnLoading,
    btnIcon = null,
    children = null,     // 标题下面额外的内容
    history
}) {
    const defaultGoback = () => history.goBack()

    return (
        <div className={`comm-shadowbox main-page-title${backTitle?' haveback':''}`}>
            {
                backTitle && 
                <span className="back" onClick={backHandle || defaultGoback}>
                    <ArrowLeftOutlined />
                    <span className='backtit'>{backTitle}</span>
                </span>
            }
            <div className='title'>
                {title}
                {
                    titleTag && 
                    <span className='tag'>{titleTag}</span>
                }
                {
                    btnTxt && 
                    <Button
                        className='btn'
                        type={btnStyle} 
                        onClick={btnClickHandle} 
                        loading={btnLoading}
                    >
                        {btnTxt}
                    </Button>

                }
            </div>
            {
                children && 
                <div className='othercontent'>
                    {children}
                </div>
            }
        </div>
    );
}

export default withRouter(React.memo(PageTitle))

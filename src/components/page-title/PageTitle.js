import React, { useState, useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { get, Paths, post } from '../../api'

import './PageTitle.scss'


function PageTitle({
    defaultValue = -1,
    backTitle,          //返回按钮文本，例：'开发流程'，不传则代表无返回
    titleBack = false,
    backHandle,         //返回操作 ，默认 defaultGoback
    title,              //页面标题，一般是产品名、设备名 等
    titleTag,           //标题后缀的标签，例：'免开发方案',不传则代表无标签
    btnTxt,             //标题行右侧的按钮文本，例：'编辑'不传则代表无按钮
    btnStyle = 'link',
    btnClickHandle,
    btnLoading,
    btnIcon = null,
    children = null,     // 标题下面额外的内容
    history,
    selectOnchange = null,    //公共下拉框的 onChange 方法 , 不传则代表无此下拉框
    selectData = null, // 自定义 selectOnchange 的下拉框的列表数据，不传则代表是 公共产品下拉数据
    isRelProductData = false//是否是已发布产品列表
}) {
    const [dataList, setDataList] = useState([]);//产品列表
    useEffect(() => {

        if (selectOnchange) {
            if (!selectData && dataList.length == 0) {
                if (!isRelProductData) {
                    get(Paths.getProductType, {}, { loading: true }).then((res) => {
                        setDataList(res.data || [])
                    });
                } else {
                    post(Paths.getProductPlus, {}).then((res) => {
                        setDataList(res.data || [])
                    });
                }


            } else {
                setDataList(selectData || [])
            }

        }
    }, [selectData])
    const defaultGoback = () => history.goBack()

    const selectChange = selectOnchange && (id => {
        if (id == "-1") { id = undefined }
        selectOnchange(id)
    });

    return (
        <div className={`comm-shadowbox main-page-title${backTitle ? ' haveback' : ''}`}>
            {
                backTitle &&
                <span className="back" onClick={backHandle || defaultGoback}>
                    <ArrowLeftOutlined />
                    <span className='backtit'>{backTitle}</span>
                </span>
            }
            <div className='title'>
                {
                    titleBack &&
                    <span className="back-titleBack" onClick={backHandle || defaultGoback}>
                        <ArrowLeftOutlined />
                        <span className='backtit'>{backTitle}</span>
                    </span>
                }
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
                selectOnchange &&
                <Select className="pagetitle-select" onChange={selectChange} showSearch optionFilterProp="children" defaultValue={defaultValue + ""} >
                    <Select.Option value={"-1"}>全部产品</Select.Option>
                    {
                        dataList.map(({ productId, productName }, i) => <Select.Option key={i} value={productId + ""}>{productName}</Select.Option>)
                    }
                </Select>
            }

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

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom';
import { Steps, Button } from 'antd';

import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import ProductProtocols from './product-protocols/index.js';
import PageTitle from '../../../../components/page-title/PageTitle';
import Hardware from './dev-hardware';
import ConfirmPanel from './firmpanel';
import Validation from './validation'
import ConfigService from './config-service';
import Comunicate from './communicate'
import OperateSystem from './operateSystem'
import TitleSet from './titleSet'
import { Notification } from '../../../../components/Notification';
import { strToAsterisk } from '../../../../util/util';
import { EyeInvisibleTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Paths, post, get } from '../../../../api'
import { getProductHeadInfo } from '../store/ActionCreator'
import { connect } from 'react-redux';
import './ProductEdit.scss'

const { Step } = Steps;

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;

const mapDispatchToProps = dispatch => {
    return {
        getHeadInfoAction: params => dispatch(getProductHeadInfo(params))
    }
}

const mapStateToProps = state => {
    return {
        productHeadInfo: state.getIn(['product', 'productHeadInfo'])
    }
}

function ProductEdit({ match, location, productHeadInfo, getHeadInfoAction }) {
    const origincurrent = +sessionStorage.getItem("stepnum") || 0;

    const [productItem, setProductItem] = useState(sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
    const [showSecret, setShowSecret] = useState(false)
    const [titleVisible, setTitleVisible] = useState(false)
    const [current, setcurrent] = useState(origincurrent);
    const [maxCurrent, setMaxCurrent] = useState(origincurrent);

    const stepListCloud = [
        { title: '定义功能', content: 'protocols', mod: ProductProtocols },
        { title: '确定面板', content: 'firmpanel', mod: ConfirmPanel },
        { title: '通信方式', content: 'cloud2cloud', mod: Comunicate },
        { title: '配置服务', content: 'configService', mod: ConfigService },
        { title: '调试验证', content: 'validation', mod: Validation },
    ]

    const stepListSystem = [
        { title: '定义功能', content: 'protocols', mod: ProductProtocols },
        { title: '确定面板', content: 'firmpanel', mod: ConfirmPanel },
        { title: '操作系统', content: 'projectSelect', mod: OperateSystem },
        { title: '配置服务', content: 'configService', mod: ConfigService },
        { title: '调试验证', content: 'validation', mod: Validation },
    ]

    const stepList = [
        { title: '定义功能', content: 'protocols', mod: ProductProtocols },
        { title: '确定面板', content: 'firmpanel', mod: ConfirmPanel },
        { title: '开发硬件', content: 'projectSelect', mod: Hardware },
        { title: '配置服务', content: 'configService', mod: ConfigService },
        { title: '调试验证', content: 'validation', mod: Validation },
    ]

    const { schemeType } = productItem

    const _stepList = useMemo(() => {
        return (schemeType === 4 && stepListCloud) || (schemeType === 5 && stepListSystem) || stepList;
    }, [])

    let history = useHistory();
    let { path } = match,
        productIdInRoutePath = getProductIdFromPath(match);

    useEffect(() => {
        getHeadInfoAction(productIdInRoutePath)
    }, [])

    useEffect(() => {
        setProductItem(productHeadInfo)
    }, [productHeadInfo])

    let refAll = useRef();
    const next = () => {
        if (current === 2) {
            refAll.onFinish()
        } else {
            refAll.current.onFinish()
        }
    };

    // 发布产品
    const releaseProduct = () => {
        refAll.current.showRelease()
    }

    const nextStep = useCallback(() => {
        let nxtc = current + 1;
        if (nxtc > maxCurrent) {
            setMaxCurrent(nxtc)
            post(Paths.upProMaxStep, {
                productId: productIdInRoutePath,
                step: nxtc + 1
            })
        }
        setcurrent(nxtc);
        sessionStorage.setItem("stepnum", nxtc)
    });

    //上一步
    const prev = () => {
        setcurrent(current - 1);
        sessionStorage.setItem("stepnum", current - 1)
    };

    if (!productIdInRoutePath) {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }

    const changeState = () => {
        setShowSecret(!showSecret)
    }

    const showText = (value) => {
        value = showSecret ? value : strToAsterisk(value, 10)
        return value
    }

    //标题修改
    const openTitle = () => {
        setTitleVisible(true)
    }
    const onCloseTitle = () => {
        setTitleVisible(false)
    }
    const onOkClose = (data) => {
        getHeadInfoAction(productIdInRoutePath)
        Notification({
            type: 'success',
            description: '更新成功！',
        });
        setTitleVisible(false)
    }
    const titleCom = (<div className='product_title_baseinfo_list'>
        <div>
            <div>品类：</div>
            <div>{productItem.deviceType}</div>
        </div>
        <div>
            <div>产品ID：</div>
            <div>{productItem.productId}</div>
        </div>
        <div>
            <div>通讯协议：</div>
            <div>{productItem.bindTypeStr}</div>
        </div>
        <div>
            <div>产品编码：</div>
            <div>{productItem.code}</div>
        </div>
        <div>
            <div>产品密钥：</div>
            <div>{showText(productItem.deviceKey)}
                <span onClick={changeState}>
                    {
                        showSecret ? <EyeInvisibleTwoTone /> : <EyeTwoTone />
                    }
                </span>
            </div>
        </div>
    </div>)


    // const ModStep = stepList[current].mod;
    const ModStep = _stepList[current].mod;

    return (
        <React.Fragment>
            <div className="eidt-wrapper">
                <PageTitle title={productItem.productName} titleTag={productItem.schemeName} btnTxt='编辑'
                    backHandle={() => { history.push('/open/product/proManage/list') }} backTitle='开发流程' btnClickHandle={openTitle} >
                    {titleCom}
                </PageTitle>
                <div className='product-main-wrap comm-shadowbox'>
                    <div className='product-main-wrap_step'>
                        <Steps current={current}>
                            {_stepList.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                    <ModStep ref={current == 2 ? r => { refAll = r } : refAll} nextStep={nextStep} productId={productIdInRoutePath} />
                </div>
                <div className='product-main-footer'>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev} type="primary" ghost>
                            上一步
                        </Button>
                    )}
                    {current < _stepList.length - 1 && (
                        <Button type="primary" onClick={next}>
                            下一步
                        </Button>
                    )}

                    {current === _stepList.length - 1 && (
                        <Button type="primary" onClick={releaseProduct}>
                            发布产品
                        </Button>
                    )}
                </div>
            </div>
            {
                titleVisible && <TitleSet titleVisible={titleVisible} onCloseTitle={onCloseTitle}
                    onOkClose={onOkClose} productItem={productItem}></TitleSet>
            }

        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)
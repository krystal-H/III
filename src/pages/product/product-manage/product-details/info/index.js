import React, { useRef, useState, useEffect } from 'react';
import { Carousel } from 'antd';
import LabelTip from '../../../../../components/form-com/LabelTip';
import './index.scss'
import EditableTable from './editTable';
import { post, Paths } from '../../../../../api';
import baseImg from '../../../../../assets/images/commonDefault/prcduct_avtor.png';
import guideImg from '../../../../../assets/images/commonDefault/bind_net_guide.png';
import defaultImg from '../../../../../assets/images/commonDefault/bind_net_dafault.png'
import carouselImg from '../../../../../assets/images/commonDefault/bind_net_Carousel.png'
const contentStyle = {
    height: '160px',
    with: '100px'
};
export default function productInfo() {
    useEffect(() => {
        getBusinessInfo()
    }, [])
    let productBaseInfo = {}
    if (sessionStorage.getItem('productItem')) {
        productBaseInfo = JSON.parse(sessionStorage.getItem('productItem'))
    }
    const [businessInfo, setBusinessInfo] = useState({})
    const [imageInfo, setImageInfo] = useState({})
    const getBusinessInfo = () => {
        let productId = productBaseInfo.productId
        post(Paths.getPublishProductBusinessInfo, { productId: 1 }).then((res) => {
            setBusinessInfo(res.data)
        });
        post(Paths.proReledInfo, { productId }).then((res) => {
            setImageInfo(res.data)
        });
    }
    const downFile = (url) => {
        window.open(url)
    }
    const getMcuCodeCheck = (count) => {
        if (count === 0) {
            return '一型一密'
        } else if (count === 1) {
            return '一型一密plus'
        } else if (count === 2) {
            return '一机一密'
        } else {
            return ''
        }
    }
    return (<div id='product-info'>
        <div className='product-info-item'>
            <h3 className='product-info-title'>产品信息</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <img className='product-top-left-img' alt='' src={imageInfo.productIcon || baseImg} />
                    <div className='product-info-content-text'>
                        <div>
                            <span>产品品牌：</span>
                            <span>{imageInfo.brandName}</span>
                        </div>
                        <div>
                            <span>产品型号：</span>
                            <span>{imageInfo.productCode}</span>
                        </div>
                        <div>
                            <span>网关子设备：</span>
                            <span>{imageInfo.productClassId}</span>
                        </div>
                        <div>
                            <span>通信安全验证：</span>
                            <span>{getMcuCodeCheck(imageInfo.authorityType)}</span>
                        </div>

                    </div>
                </div>
                <div className='product-info-conten-wrap'>
                    <div className='product-info-content-text'>
                        <div>
                            <span>配网方式：</span>
                            <span>{imageInfo.bindTypeStr}</span>
                        </div>
                        <div>
                            <span>AP-SSID：</span>
                            <span>{imageInfo.ssid}</span>
                        </div>
                        <div>
                            <span>AP-密码：</span>
                            <span>{imageInfo.ssidPassword}</span>
                        </div>
                    </div>
                </div>
                <div className='product-info-conten-wrap' style={{ paddingTop: '12px' }}>
                    <div className='product-top-right-text'>配网方式：</div>
                    <img className='product-top-right-img' alt='' />
                </div>
            </div>
        </div>
        <div className='product-info-item'>
            <h3 className='product-info-title'>引导图</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>配网引导图：</span>
                    <img className='middle-img' alt='' src={imageInfo.guidePage || guideImg} />
                </div>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>失败引导图：</span>
                    <img className='middle-img' alt='' src={imageInfo.bindFailPage || defaultImg} />
                </div>
                <div className='product-info-conten-wrap '>
                    <span className='middle-text'>帮助轮播图：</span>
                    {/* <img src={carouselImg} /> */}
                    {
                        imageInfo.imageUrlList ? (<img src={carouselImg} />) : (<div className='product-info-image-wrap'>
                            {/* <Carousel autoplay>
                                <div style={contentStyle}>
                                    <img src={carouselImg} />
                                </div>
                            </Carousel> */}
                        </div>)
                    }


                </div>
            </div>
        </div>
        {/* <div className='product-info-item'>
            <h3 className='product-info-title'>标签<LabelTip tip="产品标签是您给产品自定义的标识，您可以使用标签功能实现产品的分类统一管理。"></LabelTip></h3>
            <div className='product-info-table'>
                <EditableTable />
            </div>
        </div> */}
        <div className='product-info-item'>
            <h3 className='product-info-title'>商业化信息</h3>
            <div className='product-business-wrap'>
                <div className='product-business-wrap-left'>
                    <div className='business-left-item'>
                        <div className='item-label'>产品所属公司名称：</div>
                        <div className='item-text'>{businessInfo.supplier}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>产品联系人：</div>
                        <div className='item-text'>{businessInfo.contact}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>联系方式：</div>
                        <div className='item-text'>{businessInfo.tel}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>产品尺寸：</div>
                        <div className='item-text'>{businessInfo.size}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>产品重量：</div>
                        <div className='item-text'>{businessInfo.weight}</div>
                    </div>
                </div>
                <div className='product-business-wrap-right'>
                    <div className='business-left-item'>
                        <div className='item-label'>产品参数：</div>
                        <div className='item-text'>{businessInfo.productParam}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>产品介绍：</div>
                        <div className='item-text'>{businessInfo.introduction}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>产品说明书：</div>
                        {
                            businessInfo.instruction ? JSON.parse(businessInfo.instruction).map((item, index) => {
                                return (<a key={index} onClick={() => { downFile(item.filesrc) }}>{item.filename}</a>)
                            }) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>)

}
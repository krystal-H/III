import React, { useRef, useState, useEffect } from 'react';
import { Carousel, Image, Modal } from 'antd';
// import LabelTip from '../../../../../components/form-com/LabelTip';
import './index.scss'
// import EditableTable from './editTable';
import { post, Paths } from '../../../../../api';
import baseImg from '../../../../../assets/images/commonDefault/prcduct_avtor.png';
import guideImg from '../../../../../assets/images/commonDefault/bind_net_guide.png';
import defaultImg from '../../../../../assets/images/commonDefault/bind_net_dafault.png'
import carouselImg from '../../../../../assets/images/commonDefault/bind_net_Carousel.png'
import { getUrlParam } from '../../../../../util/util';
const contentStyle = {
    height: '160px',
    with: '100px',
    display: 'block'
};
function dealData(data) {
    let arr = data.replace(/\[|]/g, '').split(',').filter(item => {
        if (item) {
            return item
        }
    })
    return arr
}
export default function ProductInfo() {
    let step = getUrlParam('step') || '1'
    const [businessInfo, setBusinessInfo] = useState({})
    const [imageInfo, setImageInfo] = useState({})
    const [showImg, setShowImg] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    useEffect(() => {
        if (step == 1) {
            getBusinessInfo()
        }
    }, [step])
    // useEffect(()=>{
    //     getBusinessInfo() 
    // },[])
    let productBaseInfo = {}
    if (sessionStorage.getItem('productItem')) {
        productBaseInfo = JSON.parse(sessionStorage.getItem('productItem'))
    }

    const getBusinessInfo = () => {
        let productId = productBaseInfo.productId
        post(Paths.getBusinessInfo, { productId }).then((res) => {
            let data = res.data || {}
            // if(data.productPic){
            //     data.productPic=dealData(data.productPic)
            //     console.log(data.productPic,9999999)
            // }
            setBusinessInfo(data)
        });
        post(Paths.proReledInfo, { productId }).then((res) => {
            let data = res.data || {}
            if (data.imageUrlList) {
                data.imageUrlList = dealData(data.imageUrlList)
            }
            setImageInfo(data)
        });
    }
    const downFile = (url) => {
        window.open(url)
    }
    const getMcuCodeCheck = (count) => {
        if (count === 0) {
            return '一型一密'
        } else if (count === 1) {
            return '一型一密pro'
        } else if (count === 2) {
            return '一机一密'
        } else {
            return ''
        }
    }

    const openImg = (url) => {
        setImgUrl(url)
        setShowImg(true)
    }
    return (<div id='product-info'>
        <div className='product-info-item'>
            <h3 className='product-info-title'>产品信息</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <img className='product-top-left-img' alt='' src={imageInfo.productIcon || baseImg} onClick={() => { openImg(imageInfo.productIcon || baseImg) }} />
                    <div className='product-info-content-text'>
                        <div>
                            <span>产品品牌：</span>
                            <span>{imageInfo.brandName}</span>
                        </div>
                        <div>
                            <span>产品型号：</span>
                            <span>{imageInfo.productCode}</span>
                        </div>
                        {/* 普通设备才显示 */}
                        {
                            imageInfo.productClassId == 0 &&
                            <div>
                                <span>网关子设备：</span>
                                <span>{imageInfo.isRelatedGateway == 1 ? '是' : imageInfo.isRelatedGateway == 0 ? '否' : ''}</span>
                            </div>
                        }
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
                        {/* <div>
                            <span>AP-密码：</span>
                            <span>{imageInfo.ssidPassword}</span>
                        </div> */}
                    </div>
                </div>
                <div className='product-info-conten-wrap' style={{ paddingTop: '12px' }}>
                    <div className='product-top-right-text'>产品图标：</div>
                    <img className='product-top-right-img' onClick={() => { openImg(businessInfo.productPic || baseImg) }} src={businessInfo.productPic || baseImg} alt='' />
                </div>
            </div>
        </div>
        <div className='product-info-item'>
            <h3 className='product-info-title'>引导图</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>配网引导图：</span>
                    <img className='middle-img' onClick={() => { openImg(imageInfo.guidePage || guideImg) }} alt='' src={imageInfo.guidePage || guideImg} />
                </div>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>失败引导图：</span>
                    <img className='middle-img' alt='' src={imageInfo.bindFailPage || defaultImg} onClick={() => { openImg(imageInfo.bindFailPage || defaultImg) }} />
                </div>
                <div className='product-info-conten-wrap '>
                    <span className='middle-text'>帮助轮播图：</span>
                    {
                        (!imageInfo.imageUrlList || !imageInfo.imageUrlList.length) ? (<img src={carouselImg} />) :
                            (<div className='product-info-image-wrap'>
                                <Carousel autoplay dots={false}>
                                    {
                                        imageInfo.imageUrlList.map((item, index) => {
                                            return <img className='product-carousel-img' src={item} key={index} alt='' style={contentStyle} />
                                        })
                                    }
                                </Carousel>
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
                        <div className='item-text'>{businessInfo.size || '--'}mm</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>产品重量：</div>
                        <div className='item-text'>{businessInfo.weight || '--'}kg</div>
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
        {
            showImg && <Modal title="图片展示" width='970px' visible={showImg} footer={null} onCancel={() => { setShowImg(false) }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={imgUrl} style={{ maxWidth: '800px' }} alt='' />
                </div>
            </Modal>
        }
    </div>)

}
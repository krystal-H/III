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
            return '????????????'
        } else if (count === 1) {
            return '????????????pro'
        } else if (count === 2) {
            return '????????????'
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
            <h3 className='product-info-title'>????????????</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <img className='product-top-left-img' alt='' src={imageInfo.productIcon || baseImg} onClick={() => { openImg(imageInfo.productIcon || baseImg) }} />
                    <div className='product-info-content-text'>
                        <div>
                            <span>???????????????</span>
                            <span>{imageInfo.brandName}</span>
                        </div>
                        <div>
                            <span>???????????????</span>
                            <span>{imageInfo.productCode}</span>
                        </div>
                        {/* ????????????????????? */}
                        {
                            imageInfo.productClassId == 0 &&
                            <div>
                                <span>??????????????????</span>
                                <span>{imageInfo.isRelatedGateway == 1 ? '???' : imageInfo.isRelatedGateway == 0 ? '???' : ''}</span>
                            </div>
                        }
                        <div>
                            <span>?????????????????????</span>
                            <span>{getMcuCodeCheck(imageInfo.authorityType)}</span>
                        </div>

                    </div>
                </div>
                <div className='product-info-conten-wrap'>
                    <div className='product-info-content-text'>
                        <div>
                            <span>???????????????</span>
                            <span>{imageInfo.bindTypeStr}</span>
                        </div>
                        <div>
                            <span>AP-SSID???</span>
                            <span>{imageInfo.ssid}</span>
                        </div>
                        {/* <div>
                            <span>AP-?????????</span>
                            <span>{imageInfo.ssidPassword}</span>
                        </div> */}
                    </div>
                </div>
                <div className='product-info-conten-wrap' style={{ paddingTop: '12px' }}>
                    <div className='product-top-right-text'>???????????????</div>
                    <img className='product-top-right-img' onClick={() => { openImg(businessInfo.productPic || baseImg) }} src={businessInfo.productPic || baseImg} alt='' />
                </div>
            </div>
        </div>
        <div className='product-info-item'>
            <h3 className='product-info-title'>?????????</h3>
            <div className='product-info-content'>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>??????????????????</span>
                    <img className='middle-img' onClick={() => { openImg(imageInfo.guidePage || guideImg) }} alt='' src={imageInfo.guidePage || guideImg} />
                </div>
                <div className='product-info-conten-wrap'>
                    <span className='middle-text'>??????????????????</span>
                    <img className='middle-img' alt='' src={imageInfo.bindFailPage || defaultImg} onClick={() => { openImg(imageInfo.bindFailPage || defaultImg) }} />
                </div>
                <div className='product-info-conten-wrap '>
                    <span className='middle-text'>??????????????????</span>
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
            <h3 className='product-info-title'>??????<LabelTip tip="???????????????????????????????????????????????????????????????????????????????????????????????????????????????"></LabelTip></h3>
            <div className='product-info-table'>
                <EditableTable />
            </div>
        </div> */}
        <div className='product-info-item'>
            <h3 className='product-info-title'>???????????????</h3>
            <div className='product-business-wrap'>
                <div className='product-business-wrap-left'>
                    <div className='business-left-item'>
                        <div className='item-label'>???????????????????????????</div>
                        <div className='item-text'>{businessInfo.supplier}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>??????????????????</div>
                        <div className='item-text'>{businessInfo.contact}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>???????????????</div>
                        <div className='item-text'>{businessInfo.tel}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>???????????????</div>
                        <div className='item-text'>{businessInfo.size || '--'}mm</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>???????????????</div>
                        <div className='item-text'>{businessInfo.weight || '--'}kg</div>
                    </div>
                </div>
                <div className='product-business-wrap-right'>
                    <div className='business-left-item'>
                        <div className='item-label'>???????????????</div>
                        <div className='item-text'>{businessInfo.productParam}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>???????????????</div>
                        <div className='item-text'>{businessInfo.introduction}</div>
                    </div>
                    <div className='business-left-item'>
                        <div className='item-label'>??????????????????</div>
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
            showImg && <Modal title="????????????" width='970px' visible={showImg} footer={null} onCancel={() => { setShowImg(false) }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={imgUrl} style={{ maxWidth: '800px' }} alt='' />
                </div>
            </Modal>
        }
    </div>)

}
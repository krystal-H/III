import React, { useRef, useState, useEffect } from 'react';
import { Carousel, Image, Modal, Form } from 'antd';
import LabelTip from '../../../../../components/form-com/LabelTip';
import './index.scss'
import EditableTable from './editTable';
import { post, Paths } from '../../../../../api';
import baseImg from '../../../../../assets/images/commonDefault/prcduct_avtor.png';
import guideImg from '../../../../../assets/images/commonDefault/bind_net_guide.png';
import defaultImg from '../../../../../assets/images/commonDefault/bind_net_dafault.png'
import carouselImg from '../../../../../assets/images/commonDefault/bind_net_Carousel.png'
import { UploadFileHooks } from '../../../../../components/upload-file';
function dealData(data) {
    let arr = data.replace(/\[|]/g, '').split(',').filter(item => {
        if (item) {
            return { url: item, status: 'done' }
        }
    })
    return arr
}
export default function productInfo() {

    useEffect(() => {
        getBusinessInfo()
    }, [])
    const [form] = Form.useForm();
    let productBaseInfo = {}
    if (sessionStorage.getItem('productItem')) {
        productBaseInfo = JSON.parse(sessionStorage.getItem('productItem'))
    }
    const [businessInfo, setBusinessInfo] = useState({})
    const [imageInfo, setImageInfo] = useState({})
    const useRefImg1 = useRef(null)
    const useRefImg2 = useRef(null)
    const useRefImg3 = useRef(null)
    const useRefImg4 = useRef(null)
    const useRefImg5 = useRef(null)
    const getBusinessInfo = () => {
        let productId = productBaseInfo.productId
        post(Paths.getBusinessInfo, { productId }).then((res) => {
            let data = res.data || {}
            setBusinessInfo(data)
            useRefImg2.current.setFileList([{ url: data.productPic || baseImg, status: 'done' }])

        });
        post(Paths.proReledInfo, { productId }).then((res) => {
            let data = res.data || {}
            if (data.imageUrlList) {
                data.imageUrlList = dealData(data.imageUrlList)
            } else {
                data.imageUrlList = []
            }

            useRefImg1.current.setFileList([{ url: data.productIcon || baseImg, status: 'done' }])
            useRefImg3.current.setFileList([{ url: data.guidePage || guideImg, status: 'done' }])
            useRefImg4.current.setFileList([{ url: data.bindFailPage || defaultImg, status: 'done' }])
            useRefImg4.current.setFileList([{ url: data.bindFailPage || defaultImg, status: 'done' }])
            let arr = data.imageUrlList.length ? data.imageUrlList : [{ url: carouselImg }]
            useRefImg5.current.setFileList(arr)
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
    return (<div id='product-info'>
        <Form form={form} >
            <div className='product-info-item'>

                <h3 className='product-info-title'>产品信息</h3>
                <div className='product-info-content'>
                    <div className='product-info-conten-wrap'>
                        <div className='product-top-left-img'>
                            <Form.Item
                                name="productIcon"
                                extra={<><span>提示:</span><LabelTip tip="支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸150*267px"></LabelTip></>}
                            >
                                <UploadFileHooks
                                    maxCount={1}
                                    ref={useRefImg1}
                                    style={{ width: '100%' }}
                                    format='.gif,.jpeg,.jpg,.png'
                                    maxSize={10} />
                            </Form.Item>
                        </div>
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
                                <span>{imageInfo.productClassId ? '是' : '否'}</span>
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
                        </div>
                    </div>
                    <div className='product-info-conten-wrap' style={{ paddingTop: '12px' }}>
                        <span className='product-top-right-text'>产品图标<LabelTip tip="支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸150*267px"></LabelTip>：</span>
                        <Form.Item
                            name="productPic"
                            className="clearfix"
                        >
                            <UploadFileHooks
                                maxCount={1}
                                ref={useRefImg2}
                                format='.gif,.jpeg,.jpg,.png'
                                maxSize={10} />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className='product-info-item'>
                <h3 className='product-info-title'>引导图</h3>
                <div className='product-info-content'>
                    <div className='product-info-conten-wrap'>
                        <div className='middle-img-wrap'>
                            <span className='middle-text'>配网引导图<LabelTip tip="支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸150*267px"></LabelTip>：</span>
                            <Form.Item
                                name="guidePage"
                            >
                                <UploadFileHooks
                                    maxCount={1}
                                    ref={useRefImg3}
                                    format='.gif,.jpeg,.jpg,.png'
                                    maxSize={10} />
                            </Form.Item>
                        </div>
                        {/* <img className='middle-img' onClick={() => { openImg(imageInfo.guidePage || guideImg) }} alt='' src={imageInfo.guidePage || guideImg} /> */}
                    </div>
                    <div className='product-info-conten-wrap'>
                        <div className='middle-img-wrap'>
                            <span className='middle-text'>失败引导图<LabelTip tip="支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸150*267px"></LabelTip>：</span>
                            <Form.Item
                                name="bindFailPage"
                            >
                                <UploadFileHooks
                                    maxCount={1}
                                    ref={useRefImg4}
                                    format='.gif,.jpeg,.jpg,.png'
                                    maxSize={10} />
                            </Form.Item>
                        </div> </div>
                    <div className='product-info-conten-wrap '>
                        <div className='middle-img-wrap'>
                            <span className='middle-text'>帮助轮播图<LabelTip tip="支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸150*267px"></LabelTip>：</span>
                            <Form.Item
                                name="imageUrlList"
                            >
                                <UploadFileHooks
                                    maxCount={4}
                                    ref={useRefImg5}
                                    format='.gif,.jpeg,.jpg,.png'
                                    maxSize={10} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='product-info-item'>
            <h3 className='product-info-title'>标签<LabelTip tip="支持gif、jpeg、jpg、png格式，大小不超过500k，推荐尺寸150*267px"></LabelTip></h3>
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
        </Form>
    </div>)

}
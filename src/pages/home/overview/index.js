import React, { useEffect, useCallback, useState } from 'react'
import { Carousel, } from 'antd';
import {
    RightOutlined,
} from '@ant-design/icons';
import './index.scss';
//==产品管理图片
import projectmn1 from './../../../assets/images/overImage/project1.png';
import projectmn2 from './../../../assets/images/overImage/project2.png';
import projectmn3 from './../../../assets/images/overImage/project3.png';
import projectmn4 from './../../../assets/images/overImage/project4.png';
import projectmn5 from './../../../assets/images/overImage/project5.png';
//==快速入口图片
import quick1 from './../../../assets/images/overImage/quick1.png';
import quick2 from './../../../assets/images/overImage/quick2.png';
//==新建产品图片
import newproduct1 from './../../../assets/images/overImage/newproduct1.png';
import newproduct2 from './../../../assets/images/overImage/newproduct2.png';
import newproduct3 from './../../../assets/images/overImage/newproduct3.png';
import newproduct4 from './../../../assets/images/overImage/newproduct4.png';
import newproduct5 from './../../../assets/images/overImage/newproduct5.png';
import processimg from './../../../assets/images/overImage/processimg.png';
//==数据服务图片
import dataservice1 from './../../../assets/images/overImage/dataservice1.png';
import dataservice2 from './../../../assets/images/overImage/dataservice2.png';
import dataservice3 from './../../../assets/images/overImage/dataservice3.png';
//==帮助图片
import help1 from './../../../assets/images/overImage/help1.png';
import help2 from './../../../assets/images/overImage/help2.png';
import help3 from './../../../assets/images/overImage/help3.png';
export default function OverviewWrap() {
    const contentStyle = {
        height: '174px',
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
        width: '100%'
    };
    return (
        <div className='over-view'>
            <div className='over-view-banner'>
                <Carousel autoplay>
                    <div >
                        <img style={contentStyle} src='https://img0.baidu.com/it/u=993093081,3581344450&fm=26&fmt=auto&gp=0.jpg' />
                    </div>
                    <div >
                        <img style={contentStyle} src='https://img0.baidu.com/it/u=993093081,3581344450&fm=26&fmt=auto&gp=0.jpg' />
                    </div>
                    <div >
                        <img style={contentStyle} src='https://img0.baidu.com/it/u=993093081,3581344450&fm=26&fmt=auto&gp=0.jpg' />
                    </div>
                </Carousel>
            </div>
            <div className='over-view-content'>
                <div className='over-view-content-left'>
                    <div className='over-view-boxshadow over-view-statistical'>
                        <div>
                            <div className='over-view-statistical-label'>接入产品数</div>
                            <div className='over-view-statistical-number'>12</div>
                        </div>
                        <div>
                            <div className='over-view-statistical-label'>接入产品数</div>
                            <div className='over-view-statistical-number'>12</div>
                        </div>
                        <div>
                            <div className='over-view-statistical-label'>接入产品数</div>
                            <div className='over-view-statistical-number'>12</div>
                        </div>
                        <div>
                            <div className='over-view-statistical-label'>故障设备数</div>
                            <div className=' over-view-statistical-number_err'>12</div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-productmn' >
                        <div className='over-view-productmn-top'>
                            <div className='over-view-productmn-header'>
                                <div>产品管理</div>
                                <a>进入</a>
                            </div>
                            <div className='over-view-productmn-content'>
                                <div >
                                    <div className='over-view-productmn-content-img center-layout-wrap'><img src={projectmn1} /></div>
                                    <div className='over-view-productmn-content-content'>
                                        <div>睡眠监测器</div>
                                        <div>开发中</div>
                                        <div>更新时间2021-06-06</div>
                                    </div>
                                </div>
                                <div >
                                    <div className='over-view-productmn-content-img center-layout-wrap'><img src={projectmn1} /></div>
                                    <div className='over-view-productmn-content-content'>
                                        <div>睡眠监测器</div>
                                        <div>开发中</div>
                                        <div>更新时间2021-06-06</div>
                                    </div>
                                </div>
                                <div >
                                    <div className='over-view-productmn-content-img center-layout-wrap'><img src={projectmn1} /></div>
                                    <div className='over-view-productmn-content-content'>
                                        <div>睡眠监测器</div>
                                        <div>开发中</div>
                                        <div>更新时间2021-06-06</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='over-view-productmn-footer'>
                            <div>
                                <img src={projectmn1} />
                                <div>设备注册</div>
                            </div>
                            <div>
                                <img src={projectmn2} />
                                <div>固件升级</div>
                            </div>
                            <div>
                                <img src={projectmn3} />
                                <div>场景服务</div>
                            </div>
                            <div>
                                <img src={projectmn4} />
                                <div>云端定时</div>
                            </div>
                            <div>
                                <img src={projectmn5} />
                                <div>远程配置</div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-device'>
                        <div className='over-view-device-title'>我的设备</div>
                        <div className='over-view-device-content'>
                            <div className='over-view-device-content-item'>
                                <div >
                                    <div className='over-view-device-content-item-label'>
                                        设备管理
                                        <RightOutlined />
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <div>当前异常数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>累计设备总数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>累计入网总数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>今日入网总数</div>
                                    <div>0</div>
                                </div>
                            </div>
                            <div className='over-view-device-content-item'>
                                <div >
                                    <div className='over-view-device-content-item-label'>
                                        设备管理
                                        <RightOutlined />
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <div>当前异常数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>累计设备总数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>累计入网总数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>今日入网总数</div>
                                    <div>0</div>
                                </div>
                            </div>
                            <div className='over-view-device-content-item'>
                                <div >
                                    <div className='over-view-device-content-item-label'>
                                        设备管理
                                        <RightOutlined />
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <div>当前异常数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>累计设备总数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>累计入网总数</div>
                                    <div>0</div>
                                </div>
                                <div>
                                    <div>今日入网总数</div>
                                    <div>0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-productmn' >
                        <div className='over-view-productmn-top'>
                            <div className='over-view-productmn-header'>
                                <div>产品管理</div>
                                <a>进入</a>
                            </div>
                            <div className='over-view-productmn-content'>
                                <div className='over-view-productmn-content-two'>
                                    <div className='over-view-productmn-content-img center-layout-wrap'><img src={projectmn1} /></div>
                                    <div className='over-view-productmn-content-content'>
                                        <div>睡眠监测器</div>
                                        <div className='over-view-productmn-content-content-time'>更新时间2021-06-06</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='over-view-content-right'>
                    <div className='over-view-boxshadow over-view-unified-wrap' >
                        <div>
                            <div>产品管理</div>
                        </div>
                        <div className='over-view-quick-entry'>
                            <div className='center-layout-wrap'>
                                <div>
                                    <img src={quick1} />
                                    <div>创建产品</div>
                                </div>
                            </div>
                            <div className='center-layout-wrap'>
                                <div>
                                    <img src={quick2} />
                                    <div>控制台</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap' >
                        <div>
                            <div>产品管理</div>
                            <a>更多</a>
                        </div>
                        <div className='over-view-message'>
                            <div>
                                【公告信息】这是一条信息内容简介一条信息内容简介【公告信息】这是一条信息内容简介一条信息内容简介【公告信息】这是一条信息内容简介一条信息内容简介绍…
                            </div>
                            <div>
                                【公告信息】这是一条信息内容简介一条信息内容简介【公告信息】这是一条信息内容简介一条信息内容简介【公告信息】这是一条信息内容简介一条信息内容简介绍…
                            </div>
                            <div>
                                【公告信息】这是一条信息内容简介一条信息内容简介【公告信息】这是一条信息内容简介一条信息内容简介【公告信息】这是一条信息内容简介一条信息内容简介绍…
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap' >
                        <div>
                            <div>新建产品</div>
                        </div>
                        <div className='over-view-new-product'>
                            <div className='over-view-new-product-img'>
                                <img src={newproduct1} />
                                <img src={processimg} />
                                <img src={newproduct2} />
                                <img src={processimg} />
                                <img src={newproduct3} />
                                <img src={processimg} />
                                <img src={newproduct4} />
                                <img src={processimg} />
                                <img src={newproduct5} />
                            </div>
                            <div className='over-view-new-product-text'>
                                <div>1.定义功能</div>
                                <div>2.确定面板</div>
                                <div>3.开发硬件</div>
                                <div>4.配置服务</div>
                                <div>5.调试验证</div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap' >
                        <div>
                            <div>数据服务</div>
                        </div>
                        <div className='over-view-data-service'>
                            <div className='center-layout-wrap'>
                                <div>
                                    <img src={dataservice1} />
                                    <div>设备分析</div>
                                </div>
                            </div>
                            <div className='center-layout-wrap'>
                                <div>
                                    <img src={dataservice2} />
                                    <div>用户分析</div>
                                </div>
                            </div>
                            <div className='center-layout-wrap'>
                                <div>
                                    <img src={dataservice3} />
                                    <div>数据订阅</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='over-view-boxshadow over-view-unified-wrap' >
                        <div>
                            <div>帮助</div>
                        </div>
                        <div className='over-view-help'>
                            <div>
                                <img src={help1} />
                                <div>客服</div>
                            </div>
                            <div>
                                <img src={help2} />
                                <div>工单</div>
                            </div>
                            <div>
                                <img src={help3} />
                                <div>帮助文档</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

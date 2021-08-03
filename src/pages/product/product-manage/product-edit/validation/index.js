import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import moment from 'moment';
import { Table, Tabs, Input, Button } from 'antd';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import LabelTip from '../../../../../components/form-com/LabelTip';
import History from './historyInfo';
import './index.scss'
import ReleaseProduct from './releaseProduct';

const columns = [
    {
        title: '序列号',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'topic数据内容',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '物理地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'DID',
        dataIndex: 'DID',
        key: 'DID',
    }
];
function Validation({ nextStep }, ref) {
    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
    }
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [inputAddress, setInputAddress] = useState('')
    const [releaseVisible, setReleaseVisible] = useState(false) // 发布产品

    // 展示发布产品弹窗
    const showRelease = () => {
        setReleaseVisible(true)
    }
    useImperativeHandle(ref, () => ({
        showRelease
    }))

    return <div id='product-edit-validation'>
        <div className='validation-top'>在调试工具的【添加调试设备】步骤，添加设备物理地址后，既默认此设备在clife平台注册，不受通信安全校验机制（如一机一码）的影响</div>
        <div className='validation-tab'>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="真实设备调试" key="1">
                    <div className='tab-one-title'>
                        <div className='tab-one-title-left'>
                            <div className='btn-label'>配置调试信息：<LabelTip tip="产品标签是您给产品自定义的标识，您可以使用标签功能实现产品的分类统一管理。"></LabelTip></div>
                            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='请输入数联智能App登录账号' />
                            <Input value={inputAddress} onChange={e => setInputAddress(e.target.value)} placeholder='输入设备物理地址' />
                            <Button type='primary'>确定调试</Button>
                            <Button >重置</Button>
                        </div>
                        <a>历史调试信息</a>
                    </div>
                    <div className='tab-one-content'>
                        <div className='left-content'>
                            <div className='left-content-title'>
                                <h3>标准功能</h3>
                                <div>
                                    <Button type="primary" ghost>清空当前信息</Button>
                                    <Button type="primary" ghost>导出数据</Button>
                                </div>
                            </div>
                            <div>
                                <Table columns={columns} dataSource={data} />
                            </div>
                        </div>
                        <div className='right-content'>
                            <h3>解析数据</h3>
                            <div></div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="虚拟设备调试" key="2">
                    <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['WiFi蓝牙设备需先登录数联智能App，并搜索绑定需要调试的设备，蜂窝设备不需要。']}></DescWrapper>
                </TabPane>
            </Tabs>
        </div>
        {<History />}
        {/* 确认发布产品弹窗 */}
        {
            releaseVisible &&
            <ReleaseProduct
                releaseVisible={releaseVisible}
                cancelHandle={() => { setReleaseVisible(false) }} />
        }
    </div>
}

export default Validation = forwardRef(Validation)

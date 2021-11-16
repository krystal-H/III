import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table, Button, Input } from 'antd';
import { get, post, Paths } from '../../../../../api';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import mqtt from 'mqtt'
const { Search } = Input;
export default ({ productId }) => {

    const [mockId, setMockId] = useState("213456789");
    const [connectData, setConnectData] = useState({});
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);

    useEffect(() => {
        if (productId) {
            post(Paths.getMockDeviceId, { productId }, { needFormData: true }).then(({ data = {} }) => {
                setMockId(data.data.id)
                setConnectData(data.data)
            })
        }
        // const product = JSON.parse(sessionStorage.getItem('productItem'));
        // const { code } = product;

    }, [])
    useEffect(() => {
        if (client) {
            console.log(client)
            client.on('connect', () => {
                console.log('连接成功了')
                setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                console.log(topic, message,'信息')
                // const payload = { topic, message: message.toString() };
                // setPayload(payload);
            });
        }
    }, [client]);
    const initData = () => {
        const options = {
            clean: false, // true: 清除会话, false: 保留会话
            connectTimeout: 4000, // 超时时间
            // 认证信息
            clientId: connectData.mqttClientId,	//客户端ID
            username: connectData.mqttUser, //连接用户名
            password: connectData.mqttPassword,//连接密码，有的密码默认为public
            // 心跳时间
            keepalive: connectData.mqttKeepalive,
        }
        setClient(mqtt.connect('ws://10.6.14.1:8083/mqtt', options))
    }


    const onSearch = (val) => {
        initData()
    }
    return (
        <div>
            <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['WiFi蓝牙设备需先登录数联智能App，并搜索绑定需要调试的设备，蜂窝设备不需要。']}></DescWrapper>
            <div className="sim-devid">
                <div>虚拟设备ID：{mockId}</div>
                <Search
                    allowClear
                    enterButton="确定"
                    placeholder='请输入数联App调试账号'
                    style={{ width: '300px', marginLeft: '30px' }}
                    size="middle"
                    onSearch={onSearch}
                />
            </div>
            <div className="modtit">模拟设备</div>
            <div className='debug-data-box'>
                <div className='databox'></div>
                <Button type='primary' onClick={we => { }}>上报</Button>
                <div className='h5page'></div>
                <div className='codeimg'>
                    <p>请使用“数联智能”app，扫描<br />以下二维码，模拟数据下发。</p>
                    <img src="" />
                </div>
            </div>
            <div className="modtit">通信日志</div>
            <div className="logbox">

            </div>




        </div>)

}


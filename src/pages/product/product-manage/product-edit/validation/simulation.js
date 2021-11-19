import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table, Button, Input, Form, Select, Radio, Divider } from 'antd';
import { get, post, Paths } from '../../../../../api';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import mqtt from 'mqtt'
import QRCode from 'qrcode.react';
export default ({ productId }) => {
    const product = JSON.parse(sessionStorage.getItem('productItem'));
    const [form] = Form.useForm();
    const [mockId, setMockId] = useState("");
    const [connectData, setConnectData] = useState({});//连接需要的参数-没啥用
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);//连接状态
    const [optionData, setOptionData] = useState([])//物模型
    const [qrcodeUrl, setQrcodeUrl] = useState(null);//二维码
    useEffect(() => {
        if (productId) {
            post(Paths.getMockDeviceId, { productId }, { needFormData: true }).then(({ data = {} }) => {
                setMockId(data.data.id)
                setConnectData(data.data)
                let obj = {
                    productId,
                    mockId: data.data.id
                }
                setQrcodeUrl(JSON.stringify(obj))
                initData(data.data)
            })
        }
        getOption()
        return () => {
            client && client.end()
        }
    }, [])
    //获取物模型
    const getOption = () => {
        post(Paths.standardFnList, { productId }).then((res) => {
            let data = res.data.standard.concat(res.data.custom).filter(item => {
                if (item.funcType == "properties") {
                    return item
                }
            })
            setOptionData(data)
        });
    }
    useEffect(() => {
        if (client) {

            client.on('connect', () => {
                console.log('连接成功了')
                setConnectStatus('Connected');
                let topic = `/device/${product.code}/${mockId}/downward`
                client.subscribe(topic);
            });

            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                console.log(topic, message, '订阅成功后的信息')
                // const payload = { topic, message: message.toString() };
                // setPayload(payload);
            });
        }
    }, [client]);
    // useEffect(() => {
    //     if (connectStatus == 'Connected') {
    //         let topic = `/device/${product.code}/${mockId}/downward`
    //         client.subscribe(topic);
    //     }
    // }, [connectStatus])
    //连接mqtt
    const initData = (data) => {
        const options = {
            clean: false, // true: 清除会话, false: 保留会话
            connectTimeout: 4000, // 超时时间
            // 认证信息
            clientId: data.mqttClientId,	//客户端ID
            username: data.mqttUser, //连接用户名
            password: data.mqttPassword,//连接密码，有的密码默认为public
            // 心跳时间
            keepalive: data.mqttKeepalive,
        }
        setClient(mqtt.connect('ws://10.6.14.1:8083/mqtt', options))
    }
    //物模型渲染
    const getDom = (data, origin) => {
        if (data.dataTypCN == "布尔" || data.dataTypCN == "枚举") {
            return (
                <Form.Item name={origin.dataPointId} label={origin.funcName}>
                    <Select
                        style={{ width: '200px' }}
                        allowClear
                    >
                        {
                            Object.keys(data.propertyMap).map(item => {
                                return (<Select.Option value={item} key={item}>{data.propertyMap[item]}</Select.Option>)
                            })
                        }
                    </Select>
                </Form.Item>
            )
        } else if (data.dataTypCN == "字符串") {
            return (
                <Form.Item name={origin.dataPointId} label={origin.funcName}>
                    <Input style={{ width: '200px' }} />
                </Form.Item>
            )
        } else if (data.dataTypCN == "数值") {
            return (
                <Form.Item name={origin.dataPointId} label={origin.funcName}>
                    <Input type='number' style={{ width: '200px' }} />
                </Form.Item>
            )
        }

        return ''
    }
    //上报
    const startSub = () => {
        let arr = []
        let data = form.getFieldsValue()
        for (let key in data) {
            if (typeof data[key] != 'undefined') {
                let obj = {}
                obj[key.toString()] = data[key]
                arr.push(obj)
            }
        }
        let timestamp = new Date().getTime()
        let params = {
            cmd: 2006,
            ver: "1.0",
            dir: "03",
            timestamp,
            msgId: timestamp,
            data: {
                "params": arr
            }
        }
        let topic = `/device/${product.code}/${mockId}/upward`
        client.publish(topic, params)
        console.log(topic, params, '上报成功了=======')
    }
    const test=()=>{
        let arr = []
        let data = form.getFieldsValue()
        for (let key in data) {
            if (typeof data[key] != 'undefined') {
                let obj = {}
                obj[key.toString()] = data[key]
                arr.push(obj)
            }
        }
        let timestamp = new Date().getTime()
        let params = {
            cmd: 2006,
            ver: "1.0",
            dir: "03",
            timestamp,
            msgId: timestamp,
            data: {
                "params": arr
            }
        }
        let topic = `/device/${product.code}/${mockId}/downward`
        client.publish(topic, params)
        alert(1)
    }
    return (
        <div>
            <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['WiFi蓝牙设备需先登录数联智能App，并搜索绑定需要调试的设备，蜂窝设备不需要。']}></DescWrapper>
            <div className="sim-devid">
                <div onClick={test}>虚拟设备ID：{mockId}</div>
            </div>
            <div className="modtit">模拟设备</div>
            <div className='debug-data-box'>
                <div className='databox'>
                    <div className='top'>
                        <Form form={form} labelAlign='right' labelCol={{
                            span: 6,
                        }}
                            wrapperCol={{
                                span: 18,
                            }}>
                            {
                                optionData.map(item => {
                                    return (<div key={item.dataPointId}>
                                        {
                                            getDom(item.funcParamList[0], item)
                                        }
                                    </div>)
                                })
                            }
                        </Form>
                    </div>
                    {/* <Divider dashed={true} style={{ margin: '0 0 5px 0' }} />
                    <div className='bottom'>
                        <div className='way'>
                            <span>发送机制：</span>
                            <Radio.Group onChange={onWayChange} value={subWay}>
                                <Radio value={1}>立即发送</Radio>
                                <Radio value={2}>定时时间后发</Radio>
                            </Radio.Group>
                        </div>
                        {
                            subWay == 2 && <div className='time'>
                                <span>定时时间：</span>
                                <Input size='small' type='number' style={{ width: '80px', marginRight: '5px' }} />分
                            </div>
                        }

                    </div> */}
                </div>
                <Button type='primary' onClick={startSub}>上报</Button>
                {/* <div className='h5page'></div> */}
                <div className='codeimg'>
                    <p>请使用“数联智能”app，扫描<br />以下二维码，模拟数据下发。</p>
                    {/* <img src="" /> */}
                    {
                        qrcodeUrl && <QRCode
                            value={qrcodeUrl}  //value参数为生成二维码的链接
                            size={114} //二维码的宽高尺寸
                            fgColor="#000000"  //二维码的颜色
                        />
                    }

                </div>
            </div>
            <div className="modtit">通信日志</div>
            <div className="logbox">

            </div>


        </div>)

}


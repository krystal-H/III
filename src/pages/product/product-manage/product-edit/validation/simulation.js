import React, { useEffect, useState } from 'react'
import { Button, Input, Form, Select, Radio, Divider } from 'antd';
import { post, Paths } from '../../../../../api';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import ObjectView from "../../../../../components/ObjectView";
import mqtt from 'mqtt'
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js'
import { cloneDeep } from 'lodash'
let msgId = 1
let client = null
export default ({ productId, tabShow }) => {
    const product = JSON.parse(sessionStorage.getItem('productItem'));
    const [form] = Form.useForm();
    const [formBar] = Form.useForm();
    const [mockId, setMockId] = useState("");
    const [connectData, setConnectData] = useState({});//连接需要的参数-没啥用
    // const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);//连接状态
    const [optionData, setOptionData] = useState([])//物模型
    const [originSource, setOriginSource] = useState({})//物模型
    const [qrcodeUrl, setQrcodeUrl] = useState(null);//二维码
    const [payload, setPayload] = useState([])
    useEffect(() => {
        getOption()
        return () => {
            console.log(client, '关闭')
            client && client.end()
        }
    }, [])
    useEffect(() => {
        // console.log(tabShow, '我看到了',client)
        // if (tabShow == 1) {
        //     resetAll()
        // }
    }, [tabShow])
    //开始调试
    const starLink = () => {
        client && client.end()
        post(Paths.getMockDeviceId, { productId, account: formBar.getFieldValue('account') }, { needFormData: true }, { loading: true }).then(data => {
            let dataSource = data.data.data
            // dataSource.mqttUrl = 'tcp://10.6.14.1:1883'
            setMockId(dataSource.id)
            setConnectData(dataSource)
            let obj = {
                productId,
                mockId: dataSource.id
            }
            setQrcodeUrl(JSON.stringify(obj))
            initData(dataSource)
        })
    }
    //获取物模型
    const getOption = () => {
        post(Paths.standardFnList, { productId }).then((res) => {
            let data = res.data.standard.concat(res.data.custom).filter(item => {
                if (item.funcType === "properties" && item.funcParamList[0].accessMode !== 'w') {
                    return item
                }
            })
            let data2 = res.data.standard.concat(res.data.custom).filter(item => {
                if (item.funcType === "properties") {
                    return item
                }
            })
            let obj = {}
            data2.forEach(item => {
                obj['dp' + item.dataPointId] = item
            })
            setOptionData(data)
            setOriginSource(obj)
        });
    }
    //客户端
    const subMessAge = (originData) => {
        if (!client || !product) return;
        client.on('connect', () => {
            console.log('连接成功了')
            setConnectStatus('Connected');
            let topic = `/device/${product.code}/${originData.id}/downward`
            client.subscribe(topic);
            console.log('订阅的主题', topic)
            sentOnLine(originData)
        });

        client.on('error', (err) => {
            console.error('连接错误: ', err);
            client.end();
        });
        client.on('reconnect', () => {
            console.log('在重复连接了', client)
            setConnectStatus('Reconnecting');
        });
        client.on('message', (topic, message) => {
            let str = String.fromCharCode.apply(null, message);
            let res = JSON.parse(str);
            let key = CryptoJS.enc.Hex.parse(originData.deviceSecret),
                iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
            let decrypted = CryptoJS.AES.decrypt(res.data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            decrypted = decrypted.toString(CryptoJS.enc.Utf8);
            // setPayload(JSON.parse(decrypted).params);
            setPayload(pre => {
                let dataArr = cloneDeep(pre)
                let item = JSON.parse(decrypted)
                console.log(item, '收到的数据')
                dataArr.push({ 下发: item })
                return dataArr
            })
        });
    }
    //我上线了
    const sentOnLine = (source) => {
        let params222 = {
            devId: source.id,
            devMac: source.physicalAddr,
            profileVer: '0'
        }
        params222 = JSON.stringify(params222)
        console.log(JSON.stringify(params222))
        let timestamp = new Date().getTime()
        let key1 = CryptoJS.enc.Hex.parse(source.deviceSecret)
        let iv1 = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
        let srcs = CryptoJS.enc.Utf8.parse(params222);
        let encrypted = CryptoJS.AES.encrypt(srcs, key1, { iv: iv1, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        // return encrypted.toString()

        let item = encrypted.toString()
        let params = {
            cmd: 2004,
            ver: "1.0",
            dir: "03",
            timestamp,
            msgId: msgId++,
            data: item
        }
        let topic = `/device/${product.code}/${source.id}/upward`
        console.log(item, source.deviceSecret)
        client.publish(topic, JSON.stringify(params))
    }
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
        let url = data.mqttUrl + '/mqtt'
        url = url.replace('tcp', 'wss')
        url = url.replace('1883', '8084')
        if (window.location.hostname !== 'open.clife.cn') {
            window.open(url.replace('wss', 'https'))
        }
        client = mqtt.connect(url, options)
        subMessAge(data)
    }
    //物模型渲染
    const getDom = (data, origin) => {
        if (data.dataTypCN === "布尔" || data.dataTypCN === "枚举") {
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
        } else if (data.dataTypCN === "字符串") {
            return (
                <Form.Item name={origin.dataPointId} label={origin.funcName}>
                    <Input style={{ width: '200px' }} />
                </Form.Item>
            )
        } else if (data.dataTypCN === "数值") {
            return (
                <Form.Item name={origin.dataPointId} label={origin.funcName} rules={[
                    {
                        validator: (_, value) => {
                            if (value) {
                                console.log(data)
                                if (value >= data.propertyMap.min && value <= data.propertyMap.max) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject(`数值需在${data.propertyMap.min}和${data.propertyMap.max}之间`)
                                }
                            } else {
                                return Promise.resolve()
                            }

                        }
                    }
                ]}>
                    <Input type='number' style={{ width: '200px' }} />
                </Form.Item>
            )
        }

        return ''
    }
    //加密
    const dealData = (word) => {
        let key1 = CryptoJS.enc.Hex.parse(connectData.deviceSecret)
        let iv1 = CryptoJS.enc.Hex.parse('00000000000000000000000000000000')
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key1, { iv: iv1, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString()
    }
    //回显数据
    const recoverData = () => {
        let payloads = cloneDeep(payload)
        payloads = payloads.filter(item => {
            let key = Object.keys(item)[0]
            if (Object.keys(item[key]).length === 1) {
                return item
            }
        })
        let finialyArr = []
        function getOrigin(arrs) {
            let showArr = []
            arrs.forEach(item => {
                for (let key in item) {
                    let itemOri = originSource['dp' + key]
                    let itemObj = {}
                    if (itemOri.funcParamList[0].dataTypCN === "布尔" || itemOri.funcParamList[0].dataTypCN === "枚举") {
                        itemObj[itemOri.funcName] = itemOri.funcParamList[0].propertyMap[item[key]]
                    } else {
                        itemObj[itemOri.funcName] = item[key]
                    }
                    showArr.push(itemObj)
                }
            })
            return showArr
        }
        payloads.forEach(item => {
            let obj = {}
            for (let key in item) {
                if (key === '下发') {
                    obj['下发'] = getOrigin(item[key].params)
                } else if (key === '上报') {
                    obj['上报'] = getOrigin(item[key].params)
                }
                finialyArr.push(obj)
            }
        })
        return finialyArr

    }
    //上报
    const startSub = () => {
        if (connectStatus != 'Connected') {
            alert('断线状态')
            return
        }
        let arr = []
        let data = form.getFieldsValue()
        for (let key in data) {
            if (data[key]) {
                data[key] = data[key].trim()
            }
            if (data[key]) {
                let obj = {}
                let itemOri = originSource['dp' + key]
                if (itemOri.funcParamList[0].dataTypCN === "数值") {
                    obj[key.toString()] = Number(data[key])
                } else {
                    obj[key.toString()] = data[key]
                }
                arr.push(obj)
            }
        }
        let timestamp = new Date().getTime()
        let item = dealData(JSON.stringify({ params: arr }))
        let params = {
            cmd: 2006,
            ver: "1.0",
            dir: "03",
            timestamp,
            msgId: msgId++,
            data: item
        }
        let topic = `/device/${product.code}/${mockId}/upward`
        client.publish(topic, JSON.stringify(params))
        setPayload(pre => {
            let dataArr = cloneDeep(pre)
            dataArr.push({ 上报: { params: arr } })
            return dataArr
        })
    }
    //测试
    const test = () => {
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
        let item = dealData(JSON.stringify({ params: arr }))
        let params = {
            cmd: 2006,
            ver: "1.0",
            dir: "03",
            timestamp,
            msgId: msgId++,
            data: item
        }
        let topic = `/device/${product.code}/${mockId}/downward`
        console.log(params, topic)
        client.publish(topic, JSON.stringify(params))
    }
    //重置
    const resetAll = () => {
        formBar.resetFields();
        setConnectStatus(null)
        client && client.end()
        setPayload([])
    }
    return (
        <div>
            <DescWrapper style={{ marginBottom: 8, width: '100%' }} desc={['可以像真实设备一样接收手机客户端下发的指令，也可以模拟真实设备上报数据。硬件设备未完成开发，也可完成 APP 界面调试。']}></DescWrapper>
            <div className="sim-devid">
                <div style={{ marginRight: '20px' }} >虚拟设备ID：{mockId || '--'}</div>
                <div style={{ marginRight: '20px' }}>连接状态：
                    <span style={{ color: connectStatus === 'Connected' ? '#4ea640' : '#2f78ff' }}>{connectStatus === 'Connected' ? '连接成功' : '断线'}</span>
                </div>
                <Form
                    form={formBar}
                    layout='inline'
                >
                    <Form.Item label="配置调试信息" tooltip="数联智能App登录账号" name='account'>
                        <Input placeholder='请输入数联智能App登录账号' style={{ width: '250px' }} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={starLink}>确定调试</Button>
                        <Button style={{ marginLeft: '20px' }} onClick={resetAll}>重置</Button>
                    </Form.Item>
                </Form>

            </div>
            <div className="modtit">模拟设备</div>
            <div className='debug-data-box'>
                <div className='databox'>
                    <div className='top'>
                        <Form form={form} labelAlign='right' labelCol={{
                            span: 8,
                        }}
                            wrapperCol={{
                                span: 16,
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
                {
                    payload && <ObjectView data={recoverData(payload)} />
                }
            </div>
        </div>)
}


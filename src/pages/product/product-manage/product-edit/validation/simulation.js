import React, { useEffect, useState, useRef } from 'react'
import { Modal, Table, Button, Input, Form, Select, Radio,Divider  } from 'antd';
import { get, post, Paths } from '../../../../../api';
import DescWrapper from '../../../../../components/desc-wrapper/DescWrapper';
import mqtt from 'mqtt'
const { Search } = Input;
//处理数据
function delaData(data) {
    let newData = []
    data.forEach(item => {
        if (!item.funcParamList || !item.funcParamList.length) return
        item.funcParamList.forEach(item2 => {
            let newItem = JSON.parse(JSON.stringify(item))
            newData.push({ ...newItem, ...item2 })
        })
    })
    newData.forEach((item, index) => {
        item.key = index
    })
    return newData
}
export default ({ productId }) => {
    const [form] = Form.useForm();
    const [mockId, setMockId] = useState("");
    const [connectData, setConnectData] = useState({});
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);
    const [optionData, setOptionData] = useState([])
    const [subWay, setSubWay] = React.useState(1);

    const onWayChange = e => {
        setSubWay(e.target.value);
    };
    useEffect(() => {
        if (productId) {
            post(Paths.getMockDeviceId, { productId }, { needFormData: true }).then(({ data = {} }) => {
                setMockId(data.data.id)
                setConnectData(data.data)
            })
        }
        getOption()
        // const product = JSON.parse(sessionStorage.getItem('productItem'));
        // const { code } = product;
        return client && client.end()
    }, [])
    const getOption = () => {
        post(Paths.standardFnList, { productId }).then((res) => {
            let data = res.data.standard.concat(res.data.custom).filter(item => {
                if (item.funcType == "properties") {
                    return item
                }
            })
            console.log(data, '=======')
            setOptionData(data)
        });
    }
    useEffect(() => {
        console.log(999)
        if (client) {
            console.log(client)
            client.on('connect', () => {
                console.log('连接成功了')
                // setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                console.log(topic, message, '信息')
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
        console.log(optionData, '==')
        return
        initData()
    }
    const getDom = (data, origin) => {
        if (data.dataTypCN == "布尔" || data.dataTypCN == "枚举") {
            return (
                <Form.Item name={'prop' + origin.dataPointId} label={origin.funcName}>
                    <Select
                        style={{ width: '200px' }}
                        allowClear
                    >
                        {
                            Object.keys(data.propertyMap).map(item => {
                                return (<Select.OptGroup value={item} key={item}>{data.propertyMap[item]}</Select.OptGroup>)
                            })
                        }
                    </Select>
                </Form.Item>
            )
        } else if (data.dataTypCN == "字符串") {
            return (
                <Form.Item name={'prop' + origin.dataPointId} label={origin.funcName}>
                    <Input style={{ width: '200px' }} />
                </Form.Item>
            )
        } else if (data.dataTypCN == "数值") {
            return (
                <Form.Item name={'prop' + origin.dataPointId} label={origin.funcName}>
                    <Input type='number' style={{ width: '200px' }} />
                </Form.Item>
            )
        }

        return ''
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
                    <Divider dashed={true} style={{margin:'0 0 5px 0'}}/>
                    <div className='bottom'>
                        <div className='way'>
                            <span>发送机制：</span>
                            <Radio.Group onChange={onWayChange} value={subWay}>
                                <Radio value={1}>手动</Radio>
                                <Radio value={2}>定时</Radio>
                            </Radio.Group>
                        </div>
                        {
                            subWay == 2 && <div className='time'>
                                <span>定时时间：</span>
                                <Input size='small' type='number' style={{ width: '80px', marginRight: '5px' }} />m
                            </div>
                        }

                    </div>
                </div>
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


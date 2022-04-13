import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import PageTitle from '../../../components/page-title/PageTitle';
import { post, Paths, get } from '../../../api';
import LabelTip from '../../../components/form-com/LabelTip';
import { Radio, DatePicker, Select, Table, Button, Space, Typography, Tabs } from 'antd';
import '../device/index.scss'
import dayjs from 'dayjs'

import * as echarts from 'echarts';
const options = [
    { label: '近7天', value: '1' },
    { label: '近30天', value: '2' },
];
const { Option } = Select;
const { RangePicker } = DatePicker;
const originCount = [
    { label: '新增设备用户数', count: '--' },
    { label: '活跃设备用户数', count: '--' },
    { label: '新增设备用户次日留存率(昨日)', count: '--' },
    { label: '活跃设备用户次日留存率(昨日)', count: '--' },
    { label: '累计设备用户数', count: '--' }]
const columns = [
    {
        title: '日期',
        dataIndex: 'summaryDate',
        key: 'summaryDate',
    },
    {
        title: '新增设备用户数',
        dataIndex: 'newNum',
        key: 'newNum',
    },
    {
        title: '活跃设备用户数',
        dataIndex: 'activeNum',
        key: 'activeNum',
    },
    {
        title: '新增设备用户次日留存率(昨日)',
        dataIndex: 'newRatio',
        key: 'newRatio',
    },
    {
        title: '活跃设备用户次日留存率(昨日)',
        dataIndex: 'activeRatio',
        key: 'activeRatio',
    },
    {
        title: '累计设备用户数',
        dataIndex: 'totalNum',
        key: 'totalNum',
    },
];

export default function Device() {
    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    const [value, setValue] = useState(); //时间值
    const disabledDate = current => {
        return current && current > dayjs().subtract(1, 'day') || current < dayjs().subtract(30, 'day')
    };

    const onOpenChange = open => {
        if (open) {
            setHackValue([]);
            setDates([]);
        } else {
            setHackValue(undefined);
        }
    };


    //======
    const [currentTime, setCurrentTime] = useState('1') //当前选择时间
    const [countData, setCountData] = useState(originCount)
    const [currentTab, setCurrentTab] = useState(0)
    const [tableData, setTableData] = useState([])
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const onChange3 = e => {
        setValue(null)
        setCurrentTime(e.target.value)
    };
    const timeCall = (value) => {
        setCurrentTime('')
        setValue(value)
    }
    const [selectType, setSelectType] = useState(0) //产品种类
    const getType = () => {
        post(Paths.allProductPubList, {}).then(res => {
            res.data.unshift({ productId: 0, productName: "全部产品" })
            setOptionArr(res.data)
        })
    }
    useEffect(() => {
        getType()
    }, [])
    useEffect(() => {
        getData()
    }, [currentTime, value, selectType])
    const [showTable, setShowTable] = useState(false)
    useEffect(() => {
        if (tableData.length) {
            if (currentTab == 2 || currentTab == 3) {
                // initTableData()
                setShowTable(true)
            } else {
                setShowTable(false)
                initData(tableData)
            }

        }
    }, [currentTab])
    const getData = (loading = true) => {
        let params = {}
        if (currentTime == 1) {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD')

        } else if (currentTime == 2) {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD')
        }
        if (value && value.length) {
            params.endDate = value[1].format('YYYY-MM-DD')
            params.startDate = value[0].format('YYYY-MM-DD')
        }
        if (selectType) {
            params.appId = selectType
        }
        post(Paths.deviceUserAn, params, { loading }).then((res) => {
            if (Array.isArray(res.data)) {
                let arr = [], tableArr = []
                while (dayjs(params.startDate).isBefore(params.endDate, 'day')) {
                    arr.push(params.startDate)
                    params.startDate = dayjs(params.startDate).add(1, 'day').format('YYYY-MM-DD')
                    console.log(arr)
                }
                arr.push(params.endDate)
                arr.reverse().forEach(item => {
                    let val = {
                        "activeNum": 0,
                        "activeRatio": 0,
                        "newRatio": 0,
                        "totalNum": 0,
                        "summaryDate": item,
                        "newNum": 0
                    }
                    tableArr.push(val)
                })
                initData(tableArr)
                setTableData(tableArr)
                dealCount({})
            } else {
                initData(res.data.summaryList || [])
                dealCount(res.data || {})
                setTableData(res.data.summaryList || [])
            }

        });
    }
    const fownFile = () => {
        let params = {}
        if (currentTime == 1) {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')

        } else if (currentTime == 2) {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(31, 'day').format('YYYY-MM-DD')
        }
        if (value && value.length) {
            params.endDate = value[1].format('YYYY-MM-DD')
            params.startDate = value[0].format('YYYY-MM-DD')
        }
        if (selectType) {
            params.appId = selectType
        }
        post(Paths.deviceUserFile, params).then((res) => {
            window.open(res.data.path)
        });
    }
    //处理统计
    const dealCount = (origin) => {
        let count = [
            { label: '新增设备用户数', count: origin.newNum || 0 },
            { label: '活跃设备用户数', count: origin.activeNum || 0 },
            { label: '新增设备用户次日留存率(昨日)', count: origin.newRatio || 0 },
            { label: '活跃设备用户次日留存率(昨日)', count: origin.activeRatio || 0 },
            { label: '累计设备用户数', count: origin.totalNum || 0 }]
        setCountData(count)
    }
    //
    const dealData = (data) => {
        let xTime = []
        let xData = []
        data.forEach(item => {
            xTime.push(item.summaryDate)
            if (currentTab == 0) {
                xData.push(item.newNum)
            } else if (currentTab == 1) {
                xData.push(item.activeNum)
            } else if (currentTab == 2) {
                xData.push(item.newRatio)
            } else if (currentTab == 3) {
                xData.push(item.activeRatio)
            }

        });
        xTime = xTime.reverse()
        xData = xData.reverse()
        return {
            xTime,
            xData
        }
    }
    const initData = (origin) => {
        let displayData = dealData(origin)
        var chartDom = document.getElementById('echart-show');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            xAxis: {
                type: 'category',
                data: displayData.xTime,
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: '#E9E9E9'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                },
                splitLine: {
                    show: true,     //y网格线
                    lineStyle: {
                        color: '#E9E9E9'
                    }
                },
            },
            grid: {
                left: '0%',   //图表距边框的距离
                right: '2%',
                bottom: '0%',
                top: '4%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let html = params[0].name + "<br>";
                    for (let i = 0; i < params.length; i++) {
                        html += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>'
                        html += countData[currentTab].label + ":" + params[i].value + "<br>";
                    }
                    return html;
                }
            },
            series: [{
                data: displayData.xData,
                type: 'line',
                lineStyle: {
                    normal: {
                        color: "#1890FF"  //连线颜色
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#1890FF"  //连线颜色
                    }
                }
            }]
        };
        option && myChart.setOption(option);
    }
    const filterData = (index) => {
        if (index === 4) {
            return
        }
        setCurrentTab(index)
    }
    //产品改变
    const selectChange = (value) => {
        setSelectType(value)
    }
    return (
        <div id='device-analysis'>
            <PageTitle title='设备用户分析' >
                <div className='top-select'>
                    <Select style={{ width: 150 }} value={selectType} onChange={selectChange} showSearch optionFilterProp="children">
                        {
                             optionArr.map(item => {
                                return (<Option value={item.productId} key={item.productId}>{item.productName}</Option>)
                            })
                        }
                    </Select>
                </div>
            </PageTitle>
            <div className='comm-shadowbox filter-wrap'>
                <Radio.Group
                    options={options}
                    onChange={onChange3}
                    value={currentTime}
                    optionType="button"
                />

                <RangePicker
                    value={hackValue || value}
                    disabledDate={disabledDate}
                    onCalendarChange={val => setDates(val)}
                    onChange={val => timeCall(val)}
                    onOpenChange={onOpenChange}
                    format={'YYYY-MM-DD'}
                    allowClear={false}
                    style={{ 'borderColor': value && value.length ? '#1890ff' : '' }}
                />

            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>用户趋势分析<LabelTip tip={<span>
                    【新增设备用户数】：新增绑定到设备的用户数（重复绑定，绑定过此账号下其他设备用户均不去重）。<br />
                    【活跃设备用户数】：绑定了设备的用户，当日有过设备控制页面打开行为，记一次活跃。<br />
                    【新增设备用户次日留存】：当日新增设备用户，次日有过设备控制页面打开行为，记一次留存。<br />
                    【活跃设备用户次日留存】：当日活跃设备用户，次日有过设备控制页面打开行为，记一次留存。<br />
                    【累计设备用户数】：累计绑定过此账号平台下产品设备的用户数量（重复绑定，绑定多个设备用户均不去重）。</span>}></LabelTip></h3>
                <div className='echart-count-tab'>
                    {
                        countData.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { filterData(index) }}
                                    className={['count-item', currentTab === index ? 'current-tab' : '', index === 4 ? 'last-wrap' : ''].join(' ')}
                                >
                                    <div className='item-label'>{item.label}</div>
                                    <div className='item-number'>{item.count}</div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    showTable ? <TableCom tableData={tableData} /> : null
                }
                <div style={{ height: showTable ? 0 : '303px', overflow: 'hidden' }} id='echart-show'></div>
            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>统计数据</h3>
                <div className='echart-download'>
                    <a onClick={fownFile}>下载数据</a>
                </div>
                <Table dataSource={tableData} columns={columns} pagination={false} rowKey='summaryDate' />
            </div>

        </div>
    )
}
function TableCom({ tableData }) {
    const { TabPane } = Tabs;
    const columnList = [
        {
            title: '首次使用时间',
            dataIndex: 'summaryDate',
            key: 'summaryDate',
        },
        {
            title: '新用户',
            dataIndex: 'newNum',
            key: 'newNum',
            render: (text, record) => 0,
        },
        {
            title: '1天后',
            dataIndex: 'activeNum',
            key: 'activeNum',
            render: (text, record) => 0,
        },
        {
            title: '2天后',
            dataIndex: 'newRatio',
            key: 'newRatio',
            render: (text, record) => 0,
        },
        {
            title: '3天后',
            dataIndex: 'activeRatio',
            key: 'activeRatio',
            render: (text, record) => 0,
        },
        {
            title: '4天后',
            dataIndex: 'totalNum',
            key: 'totalNum',
            render: (text, record) => 0,
        },
        {
            title: '5天后',
            dataIndex: 'totalNum1',
            key: 'totalNum1',
            render: (text, record) => 0,
        },
        {
            title: '6天后',
            dataIndex: 'totalNum2',
            key: 'totalNum2',
            render: (text, record) => 0,
        },
        {
            title: '7天后',
            dataIndex: 'totalNum3',
            key: 'totalNum3',
            render: (text, record) => 0,
        },
        {
            title: '14天后',
            dataIndex: 'totalNum4',
            key: 'totalNum4',
            render: (text, record) => 0,
        },
        {
            title: '30天后',
            dataIndex: 'totalNum5',
            key: 'totalNum5',
            render: (text, record) => 0,
        },
    ];
    return (
        <Tabs defaultActiveKey="1" >
            <TabPane tab="留存率" key="1">
                <Table dataSource={tableData} columns={columnList} pagination={false} rowKey='summaryDate' />
            </TabPane>
            <TabPane tab="留存数" key="2">
                <Table dataSource={tableData} columns={columnList} pagination={false} rowKey='summaryDate' />
            </TabPane>
        </Tabs>
    )
}

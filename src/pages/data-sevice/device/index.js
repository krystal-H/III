/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PageTitle from '../../../components/page-title/PageTitle';
import { post, Paths } from '../../../api';
import { Radio, DatePicker, Select, Table } from 'antd';
import LabelTip from '../../../components/form-com/LabelTip';
import './index.scss'
import dayjs from 'dayjs'
import moment from 'moment'
import * as echarts from 'echarts';
const options = [
    { label: '近7天', value: '1' },
    { label: '近30天', value: '2' },
];
const { RangePicker } = DatePicker;
const originCount = [
    { label: '新增设备数', count: '--' },
    { label: '入网设备数', count: '--' },
    { label: '活跃设备数', count: '--' },
    { label: '异常设备数', count: '--' },
    { label: '设备累计总数', count: '--' }]
const columns = [
    {
        title: '日期',
        dataIndex: 'summaryDate',
        key: 'summaryDate',
    },
    {
        title: '新增设备数',
        dataIndex: 'newNum',
        key: 'newNum',
    },
    {
        title: '入网设备数',
        dataIndex: 'joinNum',
        key: 'joinNum',
    },
    {
        title: '活跃设备数',
        dataIndex: 'activeNum',
        key: 'activeNum',
    },
    {
        title: '异常设备数',
        dataIndex: 'exceptionNum',
        key: 'exceptionNum',
    },
    {
        title: '累积设备总数',
        dataIndex: 'totalNum',
        key: 'totalNum',
    },
];
const { Option } = Select;
export default function Device() {
    //====
    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    const [value, setValue] = useState(); //时间值
    const [optionArr, setOptionArr] = useState([]) //产品列表
    const disabledDate = current => {
        // if (!dates || dates.length === 0) {
        //     return false;
        // }
        // const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
        // const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
        // const isBeyong = current > dayjs().subtract(1, 'day') || dates[0] > dayjs().subtract(1, 'day') || dates[1] > dayjs().subtract(1, 'day')
        // return isBeyong || tooEarly || tooLate
        return current && current > dayjs().subtract(1, 'day') || current < dayjs().subtract(30, 'day')
    };
    const [selectType, setSelectType] = useState(0) //产品种类
    //产品改变
    const selectChange = (value) => {
        setSelectType(value)
    }
    const getType = () => {
        post(Paths.allProductPubList, {}).then(res => {
            res.data.unshift({productId:0,productName:"全部产品"})
            setOptionArr( res.data)
        })
    }
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
    const onChange3 = e => {
        setValue(null)
        setCurrentTime(e.target.value)
    };
    const timeCall = (value) => {
        setCurrentTime('')
        setValue(value)
    }
    useEffect(() => {
        getData()
    }, [currentTime, value, selectType])
    useEffect(() => {
        if (tableData.length) {
            initData(tableData)
        }
    }, [currentTab])
    useEffect(() => {
        getType()
    }, [])
    const getData = (loading = true) => {
        let params = {}
        if (currentTime === '1') {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')

        } else if (currentTime === '2') {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(31, 'day').format('YYYY-MM-DD')
        }
        if (value && value.length) {
            params.endDate = value[1].format('YYYY-MM-DD')
            params.startDate = value[0].format('YYYY-MM-DD')
        }
        if (selectType) {
            params.productId = selectType
        }
        post(Paths.deviceDataAn, params, { loading }).then((res) => {
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
                        "exceptionNum": 0,
                        "joinNum": 0,
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
    //处理统计
    const dealCount = (origin) => {
        let count = [
            { label: '新增设备数', count: origin.newNum || 0 },
            { label: '入网设备数', count: origin.joinNum || 0 },
            { label: '活跃设备数', count: origin.activeNum || 0 },
            { label: '异常设备数', count: origin.exceptionNum || 0 },
            { label: '设备累计总数', count: origin.totalNum || 0 }]
        setCountData(count)
    }
    //
    const dealData = (data) => {
        let xTime = []
        let xData = []
        data.forEach(item => {
            xTime.push(item.summaryDate)
            if (currentTab === 0) {
                xData.push(item.newNum)
            } else if (currentTab === 1) {
                xData.push(item.joinNum)
            } else if (currentTab === 2) {
                xData.push(item.activeNum)
            } else if (currentTab === 3) {
                xData.push(item.exceptionNum)
            }

        });
        xTime = xTime.reverse()
        xData = xData.reverse()
        return {
            xTime,
            xData
        }
    }
    const downFile = () => {
        let params = {}
        if (currentTime === '1') {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')

        } else if (currentTime === '2') {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(31, 'day').format('YYYY-MM-DD')
        }
        if (value && value.length) {
            params.endDate = value[1].format('YYYY-MM-DD')
            params.startDate = value[0].format('YYYY-MM-DD')
        }
        if (selectType) {
            params.productId = selectType
        }
        post(Paths.deviceDataDown, params).then((res) => {
            window.open(res.data.path)
        });
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

    return (
        <div id='device-analysis'>
            <PageTitle title='设备分析' >
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
                    style={{'borderColor':value && value.length ? '#1890ff' : ''}}
                />

            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>设备趋势分析<LabelTip tip="【新增设备数】：平台导入或者录入的设备数。
【入网设备数】：首次入网统计激活的设备数。
【活跃设备数】：和clife平台有过一次数据上行或下行的设备数。
【异常设备数】：出现故障等异常的数据数量。
【累计设备数】：产品历史以来总的平台入网设备总数"></LabelTip></h3>
                <div className='echart-count-tab'>
                    {
                        countData.map((item, index) => {
                            return (
                                <div key={index} className='count-item' onClick={() => { filterData(index) }}
                                    className={[currentTab === index ? 'current-tab' : '', index == 4 ? 'last-wrap' : ''].join(' ')}>
                                    <div className='item-label'>{item.label}</div>
                                    <div className='item-number'>{item.count}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{ height: '303px' }} id='echart-show'></div>
            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>统计数据</h3>
                <div className='echart-download'>
                    <a onClick={downFile}>下载数据</a>
                </div>
                <Table dataSource={tableData} columns={columns} pagination={false} rowKey='summaryDate' />
            </div>

        </div>
    )
}

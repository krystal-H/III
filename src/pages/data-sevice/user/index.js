import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import PageTitle from '../../../components/page-title/PageTitle';
import { post, Paths, get } from '../../../api';
import { Radio, DatePicker, Select, Table, Button, Space, Typography } from 'antd';
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
    { label: '新增用户数', count: 0 },
    { label: '活跃用户数', count: 0 },
    { label: '新增用户次日留存率(昨日)', count: 0 },
    { label: '活跃用户次日留存率(昨日)', count: 0 },
    { label: '累计用户数', count: 0 }]
const columns = [
    {
        title: '日期',
        dataIndex: 'summaryDate',
        key: 'summaryDate',
    },
    {
        title: '新增用户数',
        dataIndex: 'newNum',
        key: 'newNum',
    },
    {
        title: '活跃用户数',
        dataIndex: 'activeNum',
        key: 'activeNum',
    },
    {
        title: '新增用户次日留存率(昨日)',
        dataIndex: 'newRatio',
        key: 'newRatio',
    },
    {
        title: '活跃用户次日留存率(昨日)',
        dataIndex: 'activeRatio',
        key: 'activeRatio',
    },
    {
        title: '累计用户数',
        dataIndex: 'totalNum',
        key: 'totalNum',
    },
];

export default function Device() {
    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    const [value, setValue] = useState(); //时间值
    const disabledDate = current => {
        if (!dates || dates.length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
        const isBeyong = current > dayjs().subtract(1, 'day') || dates[0] > dayjs().subtract(1, 'day') || dates[1] > dayjs().subtract(1, 'day')
        return isBeyong || tooEarly || tooLate
    };

    const onOpenChange = open => {
        if (open) {
            setHackValue([]);
            setDates([]);
        } else {
            setHackValue(undefined);
        }
    };
    const timeCall = (value) => {
        setValue(value)
    }
    //======
    const [currentTime, setCurrentTime] = useState('1') //当前选择时间
    const [countData, setCountData] = useState(originCount)
    const [currentTab, setCurrentTab] = useState(0)
    const [tableData, setTableData] = useState([])
    const onChange3 = e => {
        setValue(null)
        setCurrentTime(e.target.value)
    };
    const [selectType, setSelectType] = useState('') //产品种类

    useEffect(() => {
        getData()
    }, [currentTime, value, selectType])
    useEffect(() => {
        if (tableData.length) {
            initData(tableData)
        }
    }, [currentTab])
    const getData = (loading = true) => {
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
            params.productId = selectType
        }
        post(Paths.userDataAn, params, { loading }).then((res) => {
            initData(res.data.summaryList)
            dealCount(res.data)
            setTableData(res.data.summaryList)
        });
    }
    const fownFile = () => {
        let params = {}
        if (currentTime == 1) {
            params.endDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
            params.startDate = dayjs().subtract(8, 'day').format('YYYY-MM-DD')

        } else if (currentTime === 2) {
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
        post(Paths.userDataDown, params).then((res) => {
            window.open(res.data.path)
        });
    }
    //处理统计
    const dealCount = (origin) => {
        let count = [
            { label: '新增用户数', count: origin.newNum },
            { label: '活跃用户数', count: origin.activeNum },
            { label: '新增用户次日留存率(昨日)', count: origin.newRatio },
            { label: '活跃用户次日留存率(昨日)', count: origin.activeRatio },
            { label: '累计用户数', count: origin.totalNum }]
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
        xTime=xTime.reverse()
        xData=xData.reverse()
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
                        html += countData[currentTab].label + ":"  + params[i].value + "<br>";
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
        if (index == 4) {
            return
        }
        setCurrentTab(index)
    }

    return (
        <div id='device-analysis'>
            <PageTitle title='用户分析' selectOnchange={val => setSelectType(val)} isRelProductData={true}>
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
                />

            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>用户趋势分析</h3>
                <div className='echart-count-tab'>
                    {
                        countData.map((item, index) => {
                            return (
                                <div key={index} className='count-item' onClick={() => { filterData(index) }}
                                    className={[currentTab === index ? 'current-tab' : '', index == 4 ? 'last-wrap' : ''].join(' ')}
                                >
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
                    <a onClick={fownFile}>下载数据</a>
                </div>
                <Table dataSource={tableData} columns={columns} pagination={false} rowKey='summaryDate' />
            </div>

        </div>
    )
}

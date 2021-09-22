/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PageTitle from '../../../components/page-title/PageTitle';
import { post, Paths } from '../../../api';
import { Radio, DatePicker, Select, Table } from 'antd';
import './index.scss'
import dayjs from 'dayjs'

import * as echarts from 'echarts';
const options = [
    { label: '近7天', value: '1' },
    { label: '近30天', value: '2' },
];
const { RangePicker } = DatePicker;
const originCount = [
    { label: '新增设备数', count: 0 },
    { label: '入网设备数', count: 0 },
    { label: '活跃设备数', count: 0 },
    { label: '异常设备数', count: 0 },
    { label: '设备累计总数', count: 0 }]
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
    const disabledDate = current => {
        if (!dates || dates.length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;
        return tooEarly || tooLate;
    };
    const [selectType, setSelectType] = useState('') //产品种类
    //产品改变
    const selectChange = (value) => {
        setSelectType(value)
    }
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
            initData(res.data.summaryList)
            dealCount(res.data)
            setTableData(res.data.summaryList)
        });
    }
    //处理统计
    const dealCount = (origin) => {
        let count = [
            { label: '新增设备数', count: origin.newNum },
            { label: '入网设备数', count: origin.joinNum },
            { label: '活跃设备数', count: origin.activeNum },
            { label: '异常设备数', count: origin.exceptionNum },
            { label: '设备累计总数', count: origin.totalNum }]
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
            <PageTitle title='设备分析' selectOnchange={val => setSelectType(val)} isRelProductData={true}>
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
                <h3>设备趋势分析</h3>
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

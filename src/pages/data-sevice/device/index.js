import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import PageTitle from '../../../components/page-title/PageTitle';
import { post, Paths, get } from '../../../api';
import { Radio, DatePicker, Select, Table, Button, Space, Typography } from 'antd';
import CountNum from '../../../components/CountNum/index';
import './index.scss'
import * as echarts from 'echarts';
const options = [
    { label: '昨天', value: 'Apple' },
    { label: '近7天', value: 'Pear' },
    { label: '近30天', value: 'Orange' },
];
const { RangePicker } = DatePicker;
const originCount = [
    { label: '新增设备数', count: 0 },
    { label: '入网设备数', count: 0 },
    { label: '移动设备数', count: 0 },
    { label: '异常设备数', count: 0 },
    { label: '设备累计总数', count: 0 }]
const columns = [
    {
        title: '日期',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '物理地址',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '入网设备数',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '移动设备数',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '异常设备数',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '设备累计总数',
        dataIndex: 'address',
        key: 'address',
    },
];

export default function Device() {
    const [currentTime, setCurrentTime] = useState('Apple')
    const [countData, setCountData] = useState(originCount)
    const [tableData, setTableData] = useState([])
    const onChange3 = e => {
        setCurrentTime(e.target.value)
    };
    useEffect(() => {
        initData()
    }, [])
    const initData = () => {
        var chartDom = document.getElementById('echart-show');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                data: [150, 230, 224, 218, 135, 147, 260],
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

    return (
        <div id='device-analysis'>
            <PageTitle title='设备分析'>
                <div className='top-select'>
                    <Select defaultValue="lucy" style={{ width: 200 }} allowClear>
                        <Select.Option value="lucy">Lucy</Select.Option>
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

                <RangePicker />

            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>设备趋势分析</h3>
                <CountNum data={countData} className='dadas' />
                <div style={{ height: '303px' }} id='echart-show'></div>
            </div>
            <div className='comm-shadowbox main-echart'>
                <h3>统计数据</h3>
                <div className='echart-download'>
                    <a>下载数据</a>
                </div>
                <Table dataSource={tableData} columns={columns} />;
            </div>

        </div>
    )
}

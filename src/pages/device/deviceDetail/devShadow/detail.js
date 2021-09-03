import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { post, Paths } from '../../../../api';
import './detail.scss';
import * as echarts from 'echarts';
const { Option } = Select;
const optionArr = [{ key: 1, value: '最近1小时' }, { key: 2, value: '最近6小时' }, { key: 3, value: '最近24小时' }, { key: 4, value: '最近7天' }]
export default function AddFuncModal({ ModalVisible, closeOk, sentData }) {
    const initData = () => {
        var chartDom = document.getElementById('echart-show');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: 'Step Line'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Step Start', 'Step Middle', 'Step End']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Step Start',
                    type: 'line',
                    step: 'start',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Step Middle',
                    type: 'line',
                    step: 'middle',
                    data: [220, 282, 201, 234, 290, 430, 410]
                },
                {
                    name: 'Step End',
                    type: 'line',
                    step: 'end',
                    data: [450, 432, 401, 454, 590, 530, 510]
                }
            ]
        };

        option && myChart.setOption(option);
    }
    useEffect(() => {
        initData()
        getData()
    }, [])
    const getData = () => {
        let params = {
            column: sentData.funcIdentifier,
            productId: 11529,
            tslType: sentData.funcType
        }
        params={"column":"base_null_status_null","productId":"11529","tslType":"properties"}
        post(Paths.deviceShadowHis, params).then((res) => {

        });
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div >
            <Modal title="查看" visible={ModalVisible} onOk={closeOk} onCancel={closeOk} width='764px' wrapClassName='add-protocols-wrap'>
                <div className='device-shadow-modal'>
                    <div className='device-shadow-modal-header'> 
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                            {
                                optionArr.map(item => {
                                    return <Option value={item.key} key={item.key}>{item.value}</Option>
                                })
                            }
                        </Select>
                        <a>导出数据</a>
                    </div>
                    <div style={{ height: '303px' }} id='echart-show'></div>
                </div>

            </Modal>
        </div>
    )
}
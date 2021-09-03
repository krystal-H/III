import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { post, Paths } from '../../../../api';
import './detail.scss';
import * as echarts from 'echarts';
const { Option } = Select;
const optionArr = [{ key: 1, value: '最近1小时' }, { key: 2, value: '最近6小时' }, { key: 3, value: '最近24小时' }, { key: 4, value: '最近7天' }]
export default function AddFuncModal({ ModalVisible, closeOk, sentData ,productId}) {
    const initData = (origin) => {
        let xData=[]
        let yData=[]
        origin.forEach(item=>{
            xData.push(item.datatimestamp)
            yData.push(item.data)
        })
        var chartDom = document.getElementById('echart-show');
        var myChart = echarts.init(chartDom);
        var option;
 
        option = {
            title: {
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                label:{
                    narmal:{
                        show:false
                    }
                }
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
                data: xData,
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Step Start',
                    type: 'line',
                    step: 'start',
                    data: yData
                }
            ]
        };

        option && myChart.setOption(option);
    }
    useEffect(() => {
        
        getData()
    }, [])
    const getData = (val) => {
        let params = {
            column: sentData.funcIdentifier,
            productId: productId,
            tslType: sentData.funcType
        }
        if(val){
            params.selectType=val
        }
        // params={"column":"base_null_status_null","productId":"11529","tslType":"properties"}
        post(Paths.deviceShadowHis, params).then((res) => {
            initData(res.data)
        });
    }
    function handleChange(value) {
        getData(value)
    }
    return (
        <div >
            <Modal title="查看" visible={ModalVisible} onOk={closeOk} onCancel={closeOk} width='764px' wrapClassName='add-protocols-wrap'>
                <div className='device-shadow-modal'>
                    <div className='device-shadow-modal-header'> 
                        <Select  style={{ width: 200 }} onChange={handleChange}>
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
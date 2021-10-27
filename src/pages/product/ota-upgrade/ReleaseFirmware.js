import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Radio, Steps, Button, Upload, DatePicker } from 'antd';
import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import {UPDATETYPE,UPRANGE,RERTYTIME,RERTYCOUNT} from './store/constData'
import {getDeviceGroupLi,getVersionList} from './store/actionCreators'
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;
const layoutper = [5,19]
const formItemLayout = {
    labelCol: { span: layoutper[0]  },
    wrapperCol: {span: layoutper[1]  },
};
const mapStateToProps = state => {
    const {deviceGorupLi} = state.get('otaUpgrade')
    return { deviceGorupLi }
}
const mapDispatchToProps = dispatch => {
    return {
        getGroupLi: () => dispatch(getDeviceGroupLi()),
        getVersionLi: param => dispatch(getVersionList(param)),
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export const ReleaseFirmware = Form.create({
    name: 'ota_reaease_ver'
})(
    class extends Component{
        constructor(props){
            super(props);
            this.state = {
                upgradeType:1,
                upgradeRange:2,
                triggerTime:0,
            }
        }
        componentDidMount() {
            this.props.getGroupLi()
            
        }
        changeState=(k,v)=>{
            let val = v.target ? v.target.value : v
            this.setState({[k]:val})
        }
        //mac模板下载
        downloadMac =()=>{
            window.location.href = 'https://open.clife.cn/v1/web/open/device/mac/download?type=2';//v5版 域名换成cms 所以用绝对地址
        }
        //批量导入
        beforeUpload = file => {
            const isLt2M = file.size / 1024 < 500;//限制500k
            if (!isLt2M) {
                Notification({
                    description:'文件上传大小超过500k限制'
                });
                return false;
            }
            const {deviceVersionId,form:{setFieldsValue}} = this.props
            post(Paths.otaImportMac,{multipartFile:file,deviceVersionId},{needFormData:true}).then(({data={}}) => {
                const {successes,fails,totalCount,successCount,failCount} = data
                const upgradeDevice = successes.join(','),failsStr='';
                setFieldsValue({upgradeDevice})
                Notification({
                    message:'Mac导入结果',
                    description:`共导入${totalCount}条，成功了${successCount}条，失败了${failCount}条${failsStr}`
                });
                
            });
            return false;
        };
       
        commit = ()=>{
            const { form:{validateFieldsAndScroll},deviceVersionId,close } = this.props;
            validateFieldsAndScroll((err, values) => {
                
                if (!err) {
                    let { upgradeDevice, beginDate, endDate, ...params } = values
                    
                    if(upgradeDevice){
                        params.upgradeDevice = upgradeDevice.join&&upgradeDevice.join(',')||upgradeDevice
                    }
                    if(beginDate||endDate){
                        params.beginDate = moment(beginDate).format('YYYY-MM-DD HH:mm:ss')
                        params.endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss')
                    }
                    get(Paths.otaRelease,{deviceVersionId,...params},{loading:true}).then(() => {
                        this.props.getVersionLi()
                        close()
                    });
                }
            })
        }
       
        render() {
            const {form:{getFieldDecorator},deviceGorupLi} =this.props
            const {upgradeType,upgradeRange,triggerTime} =this.state
            const desc = UPDATETYPE.find(({id})=> id==upgradeType).desc
            return (
                <div className="ota_release_dialog">
                         <Form {...formItemLayout}>
                            <div>
                                <Form.Item label='升级方式' required help={desc} className='helpitem'>
                                    {getFieldDecorator('upgradeType', {initialValue:1})(
                                        <Radio.Group onChange={(v)=>{this.changeState('upgradeType',v)}} >
                                            {UPDATETYPE.map(({id,nam})=><Radio.Button key={id} value={id}>{nam}</Radio.Button>)}
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item label='升级提示信息'>
                                    {getFieldDecorator('upgradeRemark')(
                                        <TextArea
                                            placeholder='仅普通升级和强制升级时，用户可在app（或设备屏幕）查看到升级提示，最多50个字符'
                                            rows={3}
                                            maxLength={50}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label='升级范围' required help='若选择全部设备，则有且仅能发布一个批次，不能新增其他发布批次' className='helpitem'>
                                    {getFieldDecorator('upgradeRange',{initialValue:2})(
                                        <Radio.Group onChange={(v)=>{this.changeState('upgradeRange',v)}} >
                                            {
                                                UPRANGE.map(({id,nam})=>{
                                                    if( upgradeType==4&&id==0 || id==1 ){
                                                        return null
                                                    }
                                                    return <Radio.Button key={id} value={id}>{nam}</Radio.Button>
                                                })
                                            }
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                {
                                    upgradeRange==2?<>
                                        <Form.Item label='设备Mac' >
                                            {getFieldDecorator('upgradeDevice', {
                                                rules: [{ required: true, message: '请输入或导入要升级的设备Mac' }]
                                            })(
                                                <TextArea placeholder='请输入或导入要升级的设备Mac，多个用逗号隔开' rows={5} />
                                            )}
                                        </Form.Item>
                                        <div className='ota_uploadbox'>
                                            <Upload className='upbtn' beforeUpload={this.beforeUpload} fileList={[]} accept='.xls,.xlsx'>
                                                <Button type="primary" icon={<UploadOutlined />}>批量导入</Button>
                                            </Upload>
                                            <Button className='downbtn' type="link" onClick={this.downloadMac}>下载模板</Button>
                                        </div>
                                    </>:<>
                                        {upgradeRange==1&&
                                            <Form.Item label='升级设备组'>
                                                {getFieldDecorator('upgradeDevice', {
                                                    rules: [{ required: true, message: '请选择设备组' }]
                                                })(<Select placeholder="选择待升级设备组"
                                                //  mode="multiple"
                                                 >
                                                    {
                                                        deviceGorupLi.map(({id,name})=><Option key={id} value={id}>{name}</Option>)
                                                    }
                                                </Select>)}
                                            </Form.Item>
                                        }
                                    </>
                                }
                                {
                                    upgradeType==4&&
                                    <div>
                                        <Form.Item label='升级时间策略' required>
                                            {getFieldDecorator('triggerTime', {initialValue:0})(
                                                <Radio.Group onChange={(v)=>{this.changeState('triggerTime',v)}} >
                                                    <Radio.Button value={0}>触发升级</Radio.Button>
                                                    <Radio.Button value={1}>定时升级</Radio.Button>
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                        {
                                            triggerTime==1&&<>
                                                <Form.Item label='升级开始时间'>
                                                    {getFieldDecorator('beginDate',{rules: [{ required: true, message: '请选择开始时间' }],})(
                                                        <DatePicker showTime
                                                            placeholder="请选择开始时间"
                                                            format="YYYY-MM-DD HH:mm:ss"
                                                            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                                                            disabledDate={disabledDate}
                                                            disabledTime={disabledDateTime}
                                                        />
                                                    )}
                                                </Form.Item>
                                                <Form.Item label='升级结束时间'>
                                                    {getFieldDecorator('endDate',{rules: [{ required: true, message: '请选择结束时间' }],})(
                                                        <DatePicker showTime
                                                            placeholder="请选择结束时间"
                                                            format="YYYY-MM-DD HH:mm:ss"
                                                            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                                                            disabledDate={disabledDate}
                                                            disabledTime={disabledDateTime}
                                                        />
                                                    )}
                                                </Form.Item>
                                            </>
                                        }
                                        <Form.Item label='失败重试时间' required>
                                            {getFieldDecorator('retryTime', {initialValue:0})(
                                                <Radio.Group >
                                                    {RERTYTIME.map(({id,nam})=><Radio.Button key={id} value={id}>{nam}</Radio.Button>)}
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                        <Form.Item label='失败重试次数' required>
                                            {getFieldDecorator('retryCount', {initialValue:1})(
                                                <Radio.Group >
                                                    {RERTYCOUNT.map(({id,nam})=><Radio.Button key={id} value={id}>{nam}</Radio.Button>)}
                                                </Radio.Group>
                                            )}
                                        </Form.Item>
                                    </div>
                                }


                            </div>
                            
                            
                         </Form>
                         <div className='btnbox'>
                            <Button type='primary' onClick={this.commit}>确定</Button>
                         </div>

                        </div>
            );
        }
    }
);

function disabledDate(current) {
    return current && current < moment().startOf("day");
  }

  function disabledDateTime() {
    return {
      disabledHours:()=> getDisabledTime("h") ,
      disabledMinutes: ()=> getDisabledTime("m"),
    //   disabledSeconds: () => [55, 56],
    };
  }

  function getDisabledTime(t){
      let _now = moment().format(t)-0;
      console.log(t,moment().format(t))
      
      let a = [];
      for(let i=0; i< _now; i++){
          a.push(i)
      }
      console.log(t,a)
      return a

  }
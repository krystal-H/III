import * as React from 'react';
import { Modal, Button, Input, Select } from 'antd';
import { Notification} from '../../../../../components/Notification';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store';

const Option = Select.Option;

const defaultJS = `// 设备上报数据
function RawDataToclinkJs (rawdata){
    var jsonObj;
    // todo
    return jsonObj;
}
// 设备接受数据
function clinkJsToRawData (jsonObj){
    var rawdata;
    // todo
    return rawdata;
}
`;

const defaultRawData = `0x00022333`;
const defaultJsonObj = `{
    "timestamp":1490858478589,
    "data":{
            "breathRate":0
    }
}`;

class DebuggerModal extends React.Component{
    state = {
        type: 1, // 1： 设备上报； 2：设备接收 
        result: "", // 运行结果
        dataType: 2, // 数据类型： 2：控制数据，3：运行数据，4：故障数据
    }

    // 修改输入调用函数
    handleChange = (val) => {
        this.setState({
            type: val
        });
    }

    // 修改数据类型
    changeDataType = (val) => {
        this.setState({
            dataType: val
        })
    }

    // 关闭窗口
    handleClose = () => {
        this.props.triggerDebugger(false);
    }

    componentWillUpdate(nextProps){
        const { jsContent } = nextProps;
        if(jsContent !== this.props.jsContent){
            this.refJs.setState({
                value: jsContent
            })
        }
    }

    componentWillReceiveProps(nextProps){
        const { visible } = nextProps;
        if(!visible && this.props.visible){
            this.setState({
                result: ""
            });
            this.refInput.setState({
                value: ""
            });
            this.refJs.setState({
                value: defaultJS
            })
        }
    }

    render(){
        const { type, result, dataType } = this.state;
        const { visible } = this.props;

        return (
            <Modal
                visible={visible}
                width={1100}
                wrapClassName="debugger-modal"
                centered
                maskClosable={false}
                onCancel={this.handleClose}
            >
                <div className="debugger-modal-edit">
                      <div className="debugger-modal-fun">
                            <div className="debugger-modal-title">
                                <span>编辑脚本：</span>
                                <span>语法： Js脚本</span>
                            </div>                                
                            <div className="debugger-modal-input edit">
                                <Input.TextArea 
                                    placeholder={defaultJS}
                                    defaultValue={defaultJS}
                                    ref={refInput => this.refJs = refInput}
                                    maxLength={10485760}
                                />
                            </div>
                     </div>  
                     <div className="debugger-modal-fun">
                            <div className="debugger-modal-title">
                                <div>
                                    <span>模拟输入：</span>              
                                    <span>输入模拟数据，点击执行，查看解析结果</span>
                                </div>
                                <div>
                                    <span>模拟类型：</span>
                                    <Select placeholder="选择模拟数据类型" defaultValue={1} size="small" style={{width: 120}} onChange={this.handleChange}>
                                        <Option key="1" value={1}>设备上报数据</Option>
                                        <Option key="2" value={2}>设备接受数据</Option>
                                    </Select>
                                </div>
                            </div>                                
                            <div className="debugger-modal-input input">
                                <div className="data-type">
                                    <span>数据类型：</span>
                                    <Select placeholder="选择数据类型" value={dataType} size="small" style={{width: 120}} onChange={this.changeDataType}>
                                        <Option key="2" value={2}>控制数据</Option>
                                        <Option key="3" value={3}>运行数据</Option>
                                        <Option key="4" value={4}>故障数据</Option>
                                    </Select>
                                </div>
                                <Input.TextArea 
                                    placeholder={type === 1 ? defaultRawData : defaultJsonObj}
                                    defaultValue={""}
                                    ref={refInput => this.refInput = refInput}
                                    maxLength={10485760}
                                    />
                            </div>
                     </div>  
                </div>
                <div className="debugger-modal-result">
                    <div className="debugger-modal-fun">
                            <div className="debugger-modal-title">
                                <span>运行结果：</span>
                            </div>                                
                            <div className="debugger-modal-input">
                                <Input.TextArea 
                                    placeholder={type === 2 ? defaultRawData : defaultJsonObj}
                                    defaultValue=""
                                    value={result}
                                />
                            </div>
                            <div className="attention">
                                <p>
                                    提示：
                                    <br/>
                                    1、仅支持提交后的脚本才能被平台调用，草稿状态的脚本不能被调用；
                                    <br/>
                                    2、请使用真实设备与平台进行上下行消息通信，以验证平台能顺利调用脚本，解析上下行数据；
                                    <br/>
                                    3、产品发布后不支持更改提交后的脚本，请谨慎调试运行后提交；
                                </p>
                            </div>
                     </div>  
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    visible: state.getIn(["oldProduct", "visibleDebugger"]),
    jsContent: state.getIn(["oldProduct", "jsContent"]),
});

const mapDispatchToProps = (dispatch) => ({
    triggerDebugger: visible => dispatch(ActionCreator.triggerDebugger(visible)),   //  打开关闭协议脚本窗口
    submitJsContent: (productId, jsContent) => dispatch(ActionCreator.submitJsContent(productId, jsContent)), // 提交脚本
});

export default connect(mapStateToProps, mapDispatchToProps)(DebuggerModal);
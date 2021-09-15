import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Cascader, AutoComplete ,Form} from 'antd';
import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import { UploadFileClass } from '../../../components/upload-file';
import LabelTip from '../../../components/form-com/LabelTip';
import {formrules,VERFIRMTYPE} from './store/constData'
import {getVersionList,getExtVerLi} from './store/actionCreators'
const { Option } = Select;
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 7 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, },
};
const mapStateToProps = state => {
    const {extVerisonLi} = state.get('otaUpgrade')
    return {
        // productList,
        extVerisonLi
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getVersionLi: param => dispatch(getVersionList(param)),
        getExtVerLi: param => dispatch(getExtVerLi(param)),
    }
}

const AddMod = connect(mapStateToProps, mapDispatchToProps)((
    refInstance,
)=>{
    return (
        <Modal
            title='新增固件' 
            visible={addFirmwareDialog}
            onOk={()=>{this.refAddFirmware.handleSubmit()}}
            onCancel={()=>{this.switchDialog('addFirmwareDialog');this.refAddFirmware.resetForm()}}
            width={650}
            maskClosable={false}
        >
            
        </Modal>
    )
})

export default forwardRef( (props,_ref) => <AddMod  {...props}  refInstance={_ref} />   )
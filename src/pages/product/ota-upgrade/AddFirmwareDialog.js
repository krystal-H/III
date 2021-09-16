import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Cascader, AutoComplete ,Form, Modal} from 'antd';

import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import { UploadFileClass } from '../../../components/upload-file';
import LabelTip from '../../../components/form-com/LabelTip';
import {formrules,VERFIRMTYPE} from './store/constData'
import {getVersionList,getExtVerLi} from './store/actionCreators'
const { Option } = Select;
const { Item } = Form;
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 7 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, },
};
const mapStateToProps = state => {
    const { productList, extVerisonLi } = state.get('otaUpgrade')
    return {
        productList,
        // extVerisonLi
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // getVersionLi: param => dispatch(getVersionList(param)),
        // getExtVerLi: param => dispatch(getExtVerLi(param)),
    }
}

const AddMod = connect(mapStateToProps, mapDispatchToProps)(({
    refInstance,

    visiable,
    changeState,

    productList,
})=>{

    const changedPro= productId =>{
        console.log(productId)

    }
    return (
        <Modal
            title='新增固件' 
            visible={visiable}
            // onOk={()=>{this.refAddFirmware.handleSubmit()}}
            onCancel={()=>{ 
                changeState('addFirmwareVisiable',false);
                // this.refAddFirmware.resetForm() 
            }}
            width={650}
            maskClosable={false}
        >
            <Form {...formItemLayout} className="ota_add_firmware_dialog" >
                <Item label="产品名称" name='productId' rules={[{ required: true, message: '请选择产品' }]}>
                    <Select showSearch optionFilterProp="children" placeholder="请选择产品" onChange={changedPro}>
                        {
                            productList.map(item => {
                                const {productName,productId} = item;
                                return <Option key={productId} value={productId}>{productName}</Option>
                            })
                        }
                    </Select>
                </Item>

                
                
                
            </Form>



            
        </Modal>
    )
})

export default forwardRef( (props,_ref) => <AddMod  {...props}  refInstance={_ref} />   )
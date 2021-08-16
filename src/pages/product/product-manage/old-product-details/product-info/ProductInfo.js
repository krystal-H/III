import * as React from "react";
import { Form} from "antd";
import { withRouter } from 'react-router-dom';

import LabelTip from "../../../../../components/form-com/LabelTip";
import LabelVisible from "../../../../../components/form-com/LabelVisible";
import AloneSection from "../../../../../components/alone-section/AloneSection";
import DefaultIcon from '../../../../../assets/images/defaultIocn.png'
const FormItem = Form.Item;
const formLayout = {labelCol: {span: 3},wrapperCol: {span: 10}};
class ProductInfo extends React.Component {
    
    render() {
        const { productId, productName, productCode,
            allCategoryName, accessModeName, productClassName,
            bindTypeName, protocolFormatName, netTypeName,
            deviceKey, productIdHex, ssid, ssidPassword,
            radiocastName, productClassId, gatewayCommType,
            isRelatedGateway, accessModeId, authorityType,
            bindType, netTypeId, productIcon
        } = this.props.productBaseInfo;

        //本来一个正则搞定，结果为了兼容老数据 accessModeId 为null的情况，就得用if了
        let authorityText = "";
        if (accessModeId === 0) {
            authorityText =
                authorityType === 2
                    ? "高级认证"
                    : authorityType === 1
                    ? "中级认证"
                    : "初级认证";
        } else if (accessModeId === 1) {
            authorityText = authorityType === 0 ? "无认证" : "有认证";
        } else {
            authorityText = "初级认证";
        }

        // 技术方案， ssid与广播名
        const showRadiocastName =
            (bindType === 1 && netTypeId === 3) || bindType === 2; // 通信技术为WIFI，但是配网为蓝牙配网时；通信技术为蓝牙时   需要展示 广播名字段
        const showSSID = netTypeId === 1; // 配网方式为AP配网时，需要展示 ssid及密码 字段

        return <div>
            <Form {...formLayout}>
                <AloneSection title="基础信息">
                    <div className="product-info-item-content">
                        <FormItem label="产 品 ID">
                            <span>{productId}</span>
                            <span className="small-size">
                                由系统自动分配的产品唯一标示码
                            </span>
                        </FormItem>
                            <FormItem label="产品名称"  >
                                <span>{productName || ''}</span>
                            </FormItem>
                        <FormItem label="产品型号">
                                 <span>{productCode || ''}</span>
                            </FormItem>
                        
                        <FormItem label="所属分类"  >
                            <span>{allCategoryName}</span>
                        </FormItem>
                        <FormItem label="产品图标" className="clearfix">
                            <div className="icon-wrapper-in-detail">
                                <img src={productIcon || DefaultIcon} alt=""/>
                            </div>
                        </FormItem>
                        <FormItem label="接入方式">
                            <span>{accessModeName}</span>
                            <span className="small-size">
                                {accessModeId === 0
                                    ? "设备直连C-Life平台"
                                    : "产品不直连C-Life云，已接入的云平台与C-Life云对接"}
                            </span>
                        </FormItem>
                        <FormItem label="产品类型">
                            <span>{productClassName}</span>
                        </FormItem>
                        {/* 网关设备才有此属性 */}
                        {productClassId === 1 && (
                            <FormItem label="网关通信方案">
                                <span>{gatewayCommType}</span>
                            </FormItem>
                        )}
                    </div>
                </AloneSection>
                <AloneSection title="技术信息">
                    <div className="product-info-item-content">
                        <FormItem label="通信方式">
                            <span>{bindTypeName}</span>
                        </FormItem>
                        <FormItem label="协议格式">
                            <span>{protocolFormatName}</span>
                        </FormItem>
                        <FormItem label="配网方式">
                            <span>{netTypeName}</span>
                        </FormItem>
                        <FormItem label="产品密钥">
                            <LabelVisible
                                label={deviceKey}
                                copy={true}
                                tip="点击复制"
                            />
                            <span className="small-size">
                                由系统自动分配的密码
                            </span>
                        </FormItem>
                        <FormItem label="产品编码">
                            <span>{productIdHex}</span>
                            <span className="small-size">
                                由系统自动分配的设备唯一编码
                            </span>
                        </FormItem>
                        <FormItem label="安全认证级别">
                            <span>{authorityText}</span>
                        </FormItem>
                        {/* 非网关设备才有此属性 */}
                        {productClassId === 0 && (
                            <FormItem label="关联网关">
                                <span>
                                    {isRelatedGateway === 1 ? "是" : "否"}
                                </span>
                            </FormItem>
                        )}
                    </div>
                </AloneSection>

                {showRadiocastName || showSSID ? (
                    <AloneSection title="技术方案">
                        <div className="product-info-item-content">
                            {showSSID ? (
                                <div>
                                    <FormItem
                                        label={
                                            <LabelTip
                                            label="AP-SSID"
                                            tip={
                                                <span>
                                                            AP配网时的密码{" "}
                                                            <a>使用指南</a>
                                                        </span>
                                                    }
                                                    />
                                                }>
                                                <span>{ssid || ""}</span>
                                        </FormItem>
                                    
                                        <FormItem label={"AP-密码"}>
                                            <span>{ssidPassword || ""}</span>
                                            <span className="explain-text">
                                                配网时AP的SSID和密码
                                            </span>
                                        </FormItem>
                                </div>
                            ) : null}
                            {showRadiocastName ? (
                                
                                <FormItem label={"广播名"}>
                                    <span>{radiocastName || ''}</span>
                                </FormItem>
                            ) : null}
                        </div>
                    </AloneSection>
                ) : null}
                
            </Form>
        </div>;
    }
}

export default withRouter(ProductInfo);

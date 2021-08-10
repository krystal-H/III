import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ProductIcon from '../../../../../components/product-components/product-icon/ProductIcon';
import MyIcon from '../../../../../components/my-icon/MyIcon';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';

export default function ApplicationCard(props) {
    const [delDialog, setDelDialog] = useState(false);
    let { appId, appIconLow, appName, appType, appDesc } = props.Info;

    const updateOkHandle = (appId) => {
        props.deleteApp(appId);
    };

    const updateCancelHandle = () => {
        setDelDialog(false);
    };

    return (
        <div className="application-item-card flex-row">
            <ProductIcon icon={appIconLow} />
            <div className="application-info flex-column flex1">
                <Link key="detail" to={'/open/base/application/details/' + appId} target="_blank">
                    <div className="application-info-title">{appName}</div>
                </Link>
                <div className="application-info-bar">
                    <span className="title">APPID：</span>{appId}
                </div>
                <div className="application-info-bar">
                    <span className="title">应用类型：</span>{Number(appType) === 0 ? '移动应用' : '小程序'}
                </div>
                <div className="application-info-bar application-desc">
                    <span className="title">应用简介：</span>{appDesc}
                </div>
                {/* <span className="type">应用类型：{Number(appType) === 0 ? '移动应用' : '小程序'}</span> */}
                {/* <div title={appDesc} className="application-desc">
                    应用简介：{appDesc}
                </div> */}
            </div>
            <div className="del-app" onClick={() => setDelDialog(true)}>
                <MyIcon type="icon-delete" style={{ fontSize: 16 }} />
                <span>删除</span>
            </div>
            {delDialog && <ActionConfirmModal
                visible={delDialog}
                modalOKHandle={() => updateOkHandle(appId)}
                modalCancelHandle={() => updateCancelHandle()}
                targetName={appName}
                title={'删除应用'}
                descText={'应用删除后将无法继续APPID。即将删除应用'}
                needWarnIcon={true}
                tipText={'应用删除操作不可恢复。是否确认删除?'}
            />}
        </div>
    )
}

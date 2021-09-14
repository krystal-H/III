import React from 'react';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';

export default function CloudUpdate({ operate, visible, updateOkHandle, updateCancelHandle, actionObj }) {
    let texts = null;
    switch (operate) {
        case 1:
            texts = {
                title: '发布',
                desc: `确定要发布吗？`,
                needWarnIcon: false
            }
            break;
        case 2:
            texts = {
                title: '删除',
                desc: `确定要删除吗？`,
                needWarnIcon: true
            }
            break;
        case 3:
            texts = {
                title: '下线',
                desc: `确定要下线吗？`,
                needWarnIcon: true
            }
            break;
        case 4:
            texts = {
                title: '使用',
                desc: `确定要使用吗？`,
                needWarnIcon: false
            }
            break;
        default:
            break;
    }
    return (
        <ActionConfirmModal
            visible={visible}
            modalOKHandle={() => updateOkHandle(operate)}
            modalCancelHandle={updateCancelHandle}
            targetName={actionObj.projectName}
            title={texts.title}
            descGray={true}
            needWarnIcon={texts.needWarnIcon}
            descText={texts.desc}
        // tipText={texts.tip}
        // confirmLoading={updateLoading}
        ></ActionConfirmModal>
    )
}
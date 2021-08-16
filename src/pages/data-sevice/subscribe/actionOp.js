import React, { useState, useEffect } from 'react';
import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal';

export default function CloudUpdate({ operate, visible, updateOkHandle, updateCancelHandle,actionObj }) {
  let texts = null;
    switch (operate) {
        case 1:
            texts = {
                title:'启动数据订阅',
                desc:'启动',
                needWarnIcon:false
            }
            break;
        case 2:
            texts = {
                title:'停用数据订阅',
                desc:'停用',
                needWarnIcon:true
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
      targetName={actionObj.subscription}
      title={texts.title}
      descGray={true}
      needWarnIcon={texts.needWarnIcon}
      descText={texts.desc}
      tipText={texts.tip}
      // confirmLoading={updateLoading}
    ></ActionConfirmModal>
  )
}
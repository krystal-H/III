import React, { useState, useEffect } from 'react';
import ActionConfirmModal from '../../../../components/action-confirm-modal/ActionConfirmModal';

export default function CloudUpdate({ operate, visible, updateOkHandle, updateCancelHandle }) {
  let texts = null;
    switch (operate) {
        case 1:
            texts = {
                title:'发布云端定时功能',
                desc:'即将发布的功能',
                tip:'功能发布后，APP上可以看到并启用，是否确认发布？',
                needWarnIcon:false
            }
            break;
        case 2:
            texts = {
                title:'删除标签',
                tip:'标签删除后将无法找回，是否确认删除？',
                needWarnIcon:true
            }
            break;
        case 3:
            texts = {
                title:'下线云端定时功能',
                desc:'即将下线的功能',
                tip:'功能下线后将无法看到，是否确认下线？',
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
      targetName='test'
      title={texts.title}
      descGray={true}
      needWarnIcon={texts.needWarnIcon}
      descText={texts.desc}
      tipText={texts.tip}
      // confirmLoading={updateLoading}
    ></ActionConfirmModal>
  )
}
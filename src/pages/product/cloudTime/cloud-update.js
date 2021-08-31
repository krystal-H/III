import React from 'react'
import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal'

function CloudUpdate({ operate, visible, updateOkHandle, updateCancelHandle, changeStatus }) {
  let texts = null;
  switch (operate) {
    case 1:
      texts = {
        title: '发布云端定时功能',
        desc: '即将发布的功能',
        tip: '功能发布后，APP上可以看到并启用，是否确认发布？',
        needWarnIcon: false
      }
      break;
    case 2:
      texts = {
        title: '删除云端定时功能',
        desc: '即将删除的功能',
        tip: '功能删除后将无法找回，是否确认删除？',
        needWarnIcon: true
      }
      break;
    case 0:
      texts = {
        title: '下线云端定时功能',
        desc: '即将下线的功能',
        tip: '功能下线后将无法看到，是否确认下线？',
        needWarnIcon: true
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
      targetName={changeStatus.serviceName}
      title={texts.title}
      descGray={true}
      needWarnIcon={texts.needWarnIcon}
      descText={texts.desc}
      tipText={texts.tip}
    ></ActionConfirmModal>
  )
}

export default CloudUpdate

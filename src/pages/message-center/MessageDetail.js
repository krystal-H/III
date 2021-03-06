import React, { Component } from 'react'
import AloneSection from '../../components/alone-section/AloneSection'
import { DateTool } from '../../util/util';
import { get, Paths, post } from '../../api';
import { connect } from 'react-redux'
import { getNavMess, getNewMessageNums } from './store/ActionCreator'
const mapStateToProps = state => {
    return {
        messageList: state.getIn(['message', 'titleMessage']).toJS()
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNavMess: () => dispatch(getNavMess()),
        getNewMessageNums: () => dispatch(getNewMessageNums()),
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class MessageDetail extends Component {
    state = {
        detail: null
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            let id = nextProps.location.pathname.split('/').slice(-1)[0]
            this.getMessageDetail(id)
        }
        return true;
    }
    componentDidMount() {
        this.getMessageDetail()
    }
    setReaded = (noticeId) => {
        let params = {
            noticeIds: noticeId,
        }
        post(Paths.setRead, params).then((res) => {
        });
    }
    getMessageDetail = (id) => {
        let { match = {}, location, messageList, getNavMess } = this.props,
            { params = {} } = match,
            { noticeId } = params,
            { state = {} } = location,
            { read } = state;
        noticeId = id || noticeId

        if (noticeId) {
            post(Paths.getNoticeDetail, {
                noticeId: noticeId - 0,
            }).then(data => {
                if (!data.data.isRead) {
                    //已读
                    this.setReaded(noticeId)
                }

                this.setState({
                    detail: data.data
                })
            })
            //是否是顶部的消息列表
            let isRefresh = messageList.some(item => {
                if (item.noticeId == noticeId && !item.isRead) {
                    return true
                }
            })
            //更新未读数
            this.props.getNewMessageNums()
            if (isRefresh) {
                getNavMess()
            }

        }
    }

    goBackList = () => {
        let { history } = this.props;
        history.replace({
            pathname: '/messageCenter/list'
        })
    }

    render() {
        let { detail } = this.state;
        return (
            <AloneSection>
                {
                    detail &&
                    <div className="message-detail-wrapper">
                        <h2 className="message-title">{detail.noticeTitle}</h2>
                        <p className="message-tips">
                            <span><b>发布时间：</b>{DateTool.utcToDev(detail.sendTime)}</span>
                            <span><b>消息类型：</b>{(() => {
                                if (detail.noticeType == 1) return '系统公告'
                                if (detail.noticeType == 2) return '流程消息'
                                if (detail.noticeType == 3) return '服务消息'
                            }
                            )()
                            }</span>
                        </p>
                        <div className="message-content" dangerouslySetInnerHTML={{ __html: detail.noticeContent }}>{ }</div>
                        <a className="left-top" onClick={this.goBackList}>返回消息列表</a>
                    </div>
                }
            </AloneSection>
        )
    }
}
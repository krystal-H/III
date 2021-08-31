import React from 'react'
import AloneSection from '../../components/alone-section/AloneSection'
import { DateTool } from '../../util/util';
import { get, Paths, post } from '../../api';

export default class MessageDetail extends React.PureComponent {
    state = {
        detail: null
    }

    componentDidMount() {
        this.getMessageDetail()
    }
    setReaded = (noticeId) => {
        let params = {
            noticeIds: noticeId,
            "developerId": 1
        }
        post(Paths.setRead, params).then((res) => {
        });
    }
    getMessageDetail = () => {
        let { match = {}, location } = this.props,
            { params = {} } = match,
            { noticeId } = params,
            { state = {} } = location,
            { read } = state;

        if (noticeId) {
            post(Paths.getNoticeDetail, {
                noticeId: noticeId - 0,
                developerId: 1
            }).then(data => {

                if (read === false) {
                    this.setReaded(noticeId)
                }

                this.setState({
                    detail: data.data
                })
            })
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
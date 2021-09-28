import React, { useState, useEffect } from 'react'
import AloneSection from '../../components/alone-section/AloneSection'
import { Radio, Table, Button } from 'antd';
import { DateTool, addKeyToTableData } from '../../util/util';
import { Link } from 'react-router-dom';
import { post, Paths, get } from '../../api';
import { Notification } from '../../components/Notification'


const columns = [
    {
        title: '消息标题',
        dataIndex: 'noticeTitle',
        render: (text, record) => {
            let { noticeTitle, noticeId, read } = record;

            return <Link className={read ? 'gray' : ''} to={{
                pathname: `/messageCenter/detail/${noticeId}`,
                state: { read }
            }}>{noticeTitle}</Link>
        }
    },
    {
        title: '消息类型',
        dataIndex: 'noticeType',
        width: '300px',
        render: (text, record) => {
            if (text == 1) {
                return '系统公告'
            }
            if (text == 2) {
                return '流程消息'
            }
            if (text == 31) {
                return 'APP控制服务'
            }
            if (text == 32) {
                return '云端定时服务'
            }
            if (text == 33) {
                return '场景联动服务'
            }
            return ''
        }
    },
    {
        title: '时间',
        width: '400px',
        dataIndex: 'updateTime',
        render: (text, record) => {
            let { updateTime } = record;
            return <span>{updateTime && DateTool.utcToDev(updateTime)}</span>
        }
    }
];

export default function MessageList({ messageList = [], selectedRowKeys, noticeType, onSelectChange, newMessageNums, pageIndex, changePage, read }) {
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 })
    // let btnDisable = (selectedRowKeys.length > 0),
    //     { totalUnRead, processUnRead, serviceUnRead, publicUnRead } = newMessageNums,
    //     showReadNums = !(read === true);

    messageList = addKeyToTableData(messageList)
    const [selectedKey, setSelectedKey] = useState('')
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedKey(selectedRowKeys)
        },
        getCheckboxProps: record => ({
            disabled: record.isRead,
            name: record.noticeTitle
        }),
        selectedRowKeys:selectedKey
    };
    const [dataSource, setDataSource] = useState([])
    const [messageType, setMessageType] = useState('')
    const changeMessageType = (e) => {
        setMessageType(e.target.value)
    }
    //标记已读
    const setReaded = () => {
        console.log(selectedKey)
        let params = {
            noticeIds: selectedKey.join(','),
        }
        post(Paths.setRead, params).then((res) => {
            Notification({
                type: 'success',
                description: '操作成功！'
            })
            getList()
        });
    }
    //获取列表
    const getList = (loading = true) => {
        let params = {
            pager: pager,
        }
        if (typeof read == 'boolean') {
            params.isRead = read
        }
        if (messageType) {
            params.noticeType = messageType
        }
        // setSearchParams(params.devicePushUrlConf)
        post(Paths.getNoticeList, params, { loading }).then((res) => {
            setDataSource(res.data.list)
            setPager(pre => {
                setSelectedKey('')
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { totalRows: res.data.pager.totalRows })
            })
        });
    }
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows == pager.pageRows) {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1, pageRows })
            })
        }

    }
    const [countObj, setCountObj] = useState({})
    const getCount = () => {
        let params = {}
        if (typeof read == 'boolean') {
            params.isRead = read
        }
        post(Paths.getUnreadQuantity, params).then((res) => {
            setCountObj(res.data)
        });
    }
    useEffect(() => {
        getList()
    }, [pager.pageRows, pager.pageIndex, messageType, read])
    useEffect(() => {
        getCount()
    }, [])
    return (
        <AloneSection>
            <div className="message-wrapper">
                <Radio.Group value={messageType} onChange={changeMessageType}>
                    <Radio.Button value="">全部类型消息 {read !== true ? dealNums(countObj.totalUnRead) : ''}</Radio.Button>
                    <Radio.Button value="2">&nbsp;&nbsp;流程消息 {read !== true ? dealNums(countObj.processUnRead) : ''}</Radio.Button>
                    <Radio.Button value="3">&nbsp;&nbsp;服务消息 {read !== true ? dealNums(countObj.serviceUnRead) : ''}</Radio.Button>
                    <Radio.Button value="1">&nbsp;&nbsp;公告消息 {read !== true ? dealNums(countObj.publicUnRead) : ''}</Radio.Button>
                </Radio.Group>
                <Button style={{ float: 'right' }}
                    disabled={!selectedKey.length}
                    onClick={() => setReaded()}
                    type="primary">标记已读</Button>
            </div>
            <section className="table-wrapper">
                {/* <Table rowSelection={rowSelection}
                    dataSource={messageList}
                    columns={columns}
                    pagination={{
                        total: pager.totalRows,
                        current: pageIndex,
                        defaultCurrent: 1,
                        defaultPageSize: defaultPageRows,
                        onChange: (page) => changePage(page),
                        showTotal: total => <span>共 <a>{total}</a> 条</span>,
                        showQuickJumper: true,
                        hideOnSinglePage: true
                    }} ></Table> */}
                <Table rowKey='noticeId'
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns} pagination={{
                        defaultCurrent: 1,
                        current: pager.pageIndex,
                        onChange: pagerChange,
                        pageSize: pager.pageRows,
                        total: pager.totalRows,
                        showQuickJumper: true,
                        pageSizeOptions: [10],
                        showTotal: () => <span>共 <a>{pager.totalRows}</a> 条</span>
                    }} />
            </section>
        </AloneSection>
    )
}

function dealNums(num) {
    if (!num) {
        return ''
    }

    if (num > 99) { num = '99+' }

    return `(${num})`
}
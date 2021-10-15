import React, { PureComponent, createRef } from 'react'
import { Link } from 'react-router-dom';
import { Button, Table, Divider } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';

import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal';
import { cloneDeep } from 'lodash';
import { get, post, Paths } from '../../../api';
import { DateTool } from '../../../util/util';
import DeviceList from './groupDeviceList';
import SearchProduct from './searchProduct';
import './deviceGroup.scss';
import { Notification } from '../../../components/Notification';

export default class GroupDetailt extends PureComponent {
    constructor(props) {
        super(props);
        this.id = props.match.params.groupid
        this.groupidid = props.match.params.groupidid



        this.defaultListParams = { // 设备列表相关默认请求参数
            pageIndex: 1,
            pageRows: 10,
            id: this.id,
            productId: -1,
            deviceUniqueId: undefined,
        }
        this.addListRefs = createRef();

        this.state = {
            listParams: cloneDeep(this.defaultListParams), // 设备列表的请求参数

            name: '--',
            groupId: '--',
            createTime: '--',
            remark: '--',
            deviceCount: '--',
            activeCount: '--',

            groupDevList: [],
            pager: {},
            productList: [],//下拉产品列表、添加设备到分组时的产品选择列表 公用同一数据源
            addVisiable: false,
            selectedRowKeys: [],
            delid: '', deldeviceUniqueId: '',
            delVisable: false,


        }
        this.columns = [
            { title: '设备id', dataIndex: 'deviceUniqueId', key: 'deviceUniqueId' },
            { title: '所属产品', dataIndex: 'productName', key: 'productName' },
            {
                title: '设备类型', dataIndex: 'productClass', key: 'productClass',
                render: txt => <span>{txt == 0 && '普通设备' || '网关设备'}</span>
            },
            {
                title: '状态', dataIndex: 'status', key: 'status',
                render: txt => <span>{{ '0': '有效', '1': '未激活', '2': '在线', '3': '离线', '4': '禁用' }[txt]}</span>
            },
            {
                title: '最后上线时间', dataIndex: 'lastOnlineTime', key: 'lastOnlineTime',
                render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
            },

            {
                title: '操作', key: 'action', width: '200px',
                render: (text, { deviceId, deviceUniqueId }) => (
                    <span>
                        <Link key="detail" to={`/open/device/devManage/detail/${deviceId}?step=1`}>查看</Link>
                        <Divider type="vertical" />
                        <a onClick={this.openDel.bind(this, deviceId, deviceUniqueId)} >从分组中删除</a>
                    </span>
                ),
            },
        ];


    }
    openDel = (delid, deldeviceUniqueId) => {
        this.setState({ delVisable: true });
        if (delid) {
            // console.log(delid);
            this.setState({ delid, deldeviceUniqueId });
        }

    }
    componentDidMount() {
        this.getDetail();
        this.getDownProduct();
        this.getGroupDevList();

    }
    getDetail = () => {
        post(Paths.getGroupDetail, { id: this.id }).then((res) => {
            let { name, createTime, remark, deviceCount, activeCount, groupId } = res.data;
            this.setState({
                name,
                remark,
                deviceCount,
                activeCount,
                groupId,
                createTime: DateTool.utcToDev(createTime),
            });
        });
    }
    //获取产品下拉列表
    getDownProduct = () => {
        get(Paths.getProductType).then((res) => {
            // let productList = []
            // for (let key in res.data) {
            //     productList.push({ productId: key, productName: res.data[key] })
            // }
            this.setState(res.data);
        });
    }
    //获取分组中的设备列表
    getGroupDevList = () => {
        let params = cloneDeep(this.state.listParams);
        if (params.productId == -1) { delete params.productId }
        post(Paths.getGroupDeviceList, params, {loading: true}).then((res) => {
            let { list, pager } = res.data || {};
            this.setState({ groupDevList: list, pager });
        });
    }
    //更新请求参数并且重新获取列表
    setParams = (key, val, isnot = false) => {
        let params = cloneDeep(this.state.listParams);
        params[key] = val || undefined;
        if (key !== "pageIndex") {
            params["pageIndex"] = 1
        }

        this.setState({ listParams: params }, !isnot && this.getGroupDevList || undefined);
    }
    //打开或关闭添加设备的弹窗
    openCloseAdd = (getList = false) => {
        let addVisiable = !this.state.addVisiable;
        this.setState({ addVisiable });
        // console.log(5555,this.addListRefs)
        if (addVisiable) {
            console.log(3333, this.addListRefs)
            this.addListRefs.current.setQuestParams("pageIndex", 1);
            this.addListRefs.current.changeAddWay("1");
        } else {
            if (getList) { //关闭弹窗时候，getList 为 true 则需要重新请求列表
                this.getGroupDevList();
            }
        }
    }
    onSelectRowKeys = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    //删除组中设备
    delOkCancel = (type) => {
        let { delid, selectedRowKeys } = this.state;
        if (type == 'ok') {
            post(Paths.delGroupDevice, { id: this.id, deviceIds: delid || selectedRowKeys.join(',') }).then((res) => {
                if (res.code == 0) {
                    Notification({message: '操作成功！', type: 'success'})
                    this.getGroupDevList();
                    this.setState({ delid: '', delVisable: false, selectedRowKeys: [] });
                }
            });

        } else {
            this.setState({ delid: '', delVisable: false });
        }

    }
    render() {
        let { name, createTime, remark, deviceCount, activeCount, groupId, productList,
            groupDevList, addVisiable, selectedRowKeys,
            pager, delVisable, delid, deldeviceUniqueId
        } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectRowKeys,
        }
        return (
            <section className="page-groupdetail">
                <PageTitle backTitle="分组详情" title={name}>
                    <div className='product_title_baseinfo_list'>
                        <div>
                            <div>分组ID：</div>
                            <div>{groupId}</div>
                        </div>
                        <div>
                            <div>创建时间：</div>
                            <div>{createTime}</div>
                        </div>
                        <div>
                            <div>描述：</div>
                            <div title={remark} className="show-title">{remark ? remark.substring(0, 28) + '......' : "无"}</div>
                        </div>
                    </div>
                </PageTitle>

                <div className="comm-shadowbox comm-countbox">
                    <div className="item">设备总数<br /><span className="num">{deviceCount}</span></div>
                    <div className="item">激活设备数<br /><span className="num">{activeCount}</span></div>
                </div>

                <div className="comm-shadowbox comm-boxpadding">
                    <SearchProduct
                        productList={productList}
                        changedfunc={val => { this.setParams('productId', val, true) }}
                        searchedFunc={val => { this.setParams('deviceUniqueId', val) }}
                    >
                        <Button className='but-add' type="primary" onClick={this.openCloseAdd}>新增设备到分组</Button>
                    </SearchProduct>
                    <div>
                        <Button disabled={selectedRowKeys.length == 0} className='but-del' type="primary" onClick={this.openDel.bind(this, 0)}>删除</Button>
                        <Table
                            rowKey="deviceId"
                            columns={this.columns}
                            dataSource={groupDevList}
                            rowSelection={rowSelection}
                            pagination={{
                                defaultCurrent: pager.pageIndex,
                                total: pager.totalRows,
                                hideOnSinglePage: false,
                                onChange: val => { this.setParams('pageIndex', val) },
                                current: pager.pageIndex
                            }}
                        />
                    </div>
                </div>

                <DeviceList
                    addVisiable={addVisiable}
                    ref={this.addListRefs}
                    productList={productList}
                    id={this.id}
                    groupid={this.groupidid}
                    openCloseAdd={this.openCloseAdd}
                />

                <ActionConfirmModal
                    visible={delVisable}
                    modalOKHandle={this.delOkCancel.bind(this, 'ok')}
                    modalCancelHandle={this.delOkCancel.bind(this, 'cancel')}
                    title='从分组中删除'
                    descText={`即将删除${delid ? "设备" : "选中的"}`}
                    targetName={delid ? `${deldeviceUniqueId}` : `${selectedRowKeys.length}个设备`}
                />

            </section>
        )
    }
}

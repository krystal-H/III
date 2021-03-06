/**
 * Created by xiao on 2019/12/18.
 */
import React, { useState, PureComponent, forwardRef, useImperativeHandle, memo, useEffect } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, Modal, Button } from 'antd';
import { Notification } from '../../components/Notification';
import { Paths } from '../../api';

import './style.scss'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
/**
 * react-hooks实现 （需要父组件亦使用react-hooks）
 *
 * maxSize: 文件大小 默认小于0.2mb
 * format: 文件格式 图片默认支持.gif,.jpeg,.jpg,.png，非图片默认支持.dox,.docx
 * isNotImg: 是否为图片文件 true 不是， false 是图片
 * maxCount: 默认1即为单选上传，支持上传多选
 * preferSize: 推荐尺寸 图片默认192px*192px
 * cb: 文件上传成功后的回调
 */
function CheckUpFile(target) {
    let format = target.getAttribute('data-format'), //格式（format）、大小（maxsize） 校验标准
        maxsize = (target.getAttribute('data-maxsize') && target.getAttribute('data-maxsize') - 0) || 500, //默认限制不超过500KB
        upsize = 1024 * 1024 * 10; //初始化实际上传文件的格式、大小
    let localsrc = target.value;
    if (maxsize) {
        //验证文件占存大小
        if (window.ActiveXObject && !target.files) {
            let fileSystem = new ActiveXObject('Scripting.FileSystemObject');
            let file = fileSystem.GetFile(localsrc);
            upsize = file.Size;
        } else {
            upsize = target.files[0].size;
        }
        if (upsize > maxsize * 1024) {
            prompt('文件大小不能超过' + maxsize + 'KB');
            target.value = '';
            return false;
        }
    }
    if (format) {
        //验证文件格式
        let arr = format.split(',');
        let upformat = localsrc.substring(localsrc.lastIndexOf('.') + 1).toLowerCase(),
            find = false;
        for (let i in arr) {
            if (arr[i].toLowerCase() == upformat) {
                find = true;
                break;
            }
        }
        if (!find) {
            prompt('请选择' + format + '格式的文件');
            target.value = '';
            return false;
        }
    }
    return true;
};
function UploadFileHooks({ maxCount = 1, format, maxSize = 0.2, isNotImg = false, preferSize = '192px*192px', cb, value, onChange }, uploadRef) {

    //回显
    useEffect(() => {
        if (value) {
            setFileList(value)
        }
    }, [])
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    useImperativeHandle(uploadRef, () => {
        // 这个函数会返回一个对象
        // 该对象会作为父组件 current 属性的值
        return {
            /**
             * 对外函数，获取腾讯云返回的文件列表链接
             */
            getFileListUrl: () => {
                return getFileListUrl();
            },
            /**
             * 对外函数，文件数据回填
             */
            setFileList: (fileList) => {
                setFileList(fileList);
            },
            /**
             * 对外函数，获取文件列表
             */
            getFileList: () => {
                return fileList;
            }
        }
    }, [fileList, getFileListUrl]); // 如果想要useImperativeHandle更新，需要传参数
    const uploadImg = (
        <div>
            <PlusOutlined style={{ fontSize: '34px', color: '#C4C6CF' }} />
            <div className="ant-upload-text">上传图片</div>
        </div>
    );
    const uploadButton = (
        <Button type="primary">
            <UploadOutlined /> 上传附件
        </Button>
    );
    const buttonType = isNotImg ? uploadButton : uploadImg;
    const buttonStyle = isNotImg ? 'text' : 'picture-card';
    let acceptFormat = '';
    if (!format) {
        acceptFormat = isNotImg ? '.doc,.docx' : '.gif,.jpeg,.jpg,.png';
    } else {
        acceptFormat = format;
    }
    let desc = '';
    if (isNotImg) {
        desc = <span className="upload-desc">支持{acceptFormat}格式，不超过{maxSize}MB。</span>
    } else {
        desc = <span className="upload-desc">推荐尺寸{preferSize}。支持{acceptFormat}格式，不超过{maxSize * 1000}kB。</span>
    }
    const isLtMaxSize = (file) => {
        return file.size / 1024 / 1024 < maxSize;
    }
    const isLtMaxCount = () => {
        return fileList.length < maxCount;
    };
    const ifFormat = (file) => {
        if (acceptFormat) {
            let arr = acceptFormat.split(',');
            let upformat = file.name.substring(file.name.lastIndexOf('.')).toLowerCase(),
                find = false;
            for (let i in arr) {
                if (arr[i].toLowerCase() == upformat) {
                    find = true;
                    break;
                }
            }
            return find
        }
        return true
    }
    const getExtraData = () => {
        return {
            appId: 31438,
            domainType: 4,
        };
    };
    const getFileListUrl = () => {
        let fileListUrl = [];
        fileList.forEach((file) => {
            let { response, url } = file;
            if (response) {
                let { code, data } = response;
                if (code === 0) {
                    fileListUrl.push(data.url);
                }
            } else {
                fileListUrl.push(url);
            }
        });
        return fileListUrl;
    };
    /**
     * handleChange会自动调3次 1.选中的文件改变 2.上传中 3.上传完成（成功/失败）
     * @param file
     * @param fileList
     */
    const handleChange = ({ file, fileList }) => {
        fileList = fileList.map(file => {
            if (file.response) {
                let { code, data } = file.response;
                if (code === 0) {
                    // Component will show file.url as link
                    file.url = data.url;
                }
            }
            return file;
        });
        // console.log(fileList,'===')
        if (isLtMaxSize(file) && fileList.length <= maxCount && ifFormat(file)) {
            setFileList(fileList);
            if (file.status === 'done') {
                onChange(fileList)
                // alert(1)
                cb && typeof cb === 'function' && cb();
            }
        }
    };
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
    };
    const onPreview = isNotImg ? null : handlePreview;
    const beforeUpload = (file) => {
        const isLt = isLtMaxSize(file);
        if (!ifFormat(file)) {
            Notification({
                description: `不支持上传此格式文件`,
                type: 'warn'
            })
            return false;
        }
        if (!isLt) {
            Notification({
                description: isNotImg ? `文件必须小于 ${maxSize} MB!` : `文件必须小于 ${maxSize * 1000} kB!`,
                type: 'warn'
            })
            return false;
        }
        if (!isLtMaxCount()) {
            Notification({
                description: `文件个数最多 ${maxCount} 个!`,
                type: 'warn'
            });
            return false;
        }
        return true;
    };
    const onRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
        onChange(newFileList)
    }
    return (
        <div className="upload-wrapper">
            <div className="upload clearfix">
                <Upload
                    className="upload-component"
                    action={Paths.upFileUrl}
                    listType={buttonStyle}
                    fileList={fileList}
                    data={getExtraData}
                    onPreview={onPreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    accept={acceptFormat}
                    onRemove={onRemove}
                    showUploadList={{ showDownloadIcon: false }}
                >
                    {(maxCount === fileList.length && !isNotImg) ? null : buttonType}
                </Upload>
                {isNotImg && <span className="file-upload-desc">最多{maxCount}个</span>}
                {desc}
                {previewVisible && <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>}
            </div>
        </div>
    )
}

UploadFileHooks = memo(forwardRef(UploadFileHooks))
export { UploadFileHooks }

/**
 * 类组件实现
 *
 * maxSize: 文件大小 默认小于0.2mb
 * format: 文件格式 图片默认支持.gif,.jpeg,.jpg,.png，非图片默认支持.dox,.docx
 * isNotImg: 是否为图片文件 true 不是， false 是图片
 * maxCount: 默认1即为单选上传，支持上传多选
 * preferSize: 推荐尺寸 图片默认192px*192px
 * cb: 文件上传成功后的回调
 */
export class UploadFileClass extends PureComponent {

    static defaultProps = {
        isNotImg: false,
        format: undefined,
        maxCount: 1,
        preferSize: '192px*192px',
        maxSize: 0.2,
    }

    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            previewVisible: false,
            previewImage: '',
        }
    };

    componentDidMount = () => {
        this.props.onRef(this);
    };

    isLtMaxSize = (file) => {
        const { maxSize } = this.props;
        return file.size / 1024 / 1024 < maxSize;
    };

    isLtMaxCount = () => {
        const { fileList } = this.state;
        const { maxCount } = this.props;
        return fileList.length < maxCount;
    };

    //验证文件格式
    isLtFormat = (file) => {
        const { format } = this.props;
        let filename = file.name;
        let upformat = filename.substring(filename.lastIndexOf('.')).toLowerCase(),
            arr = format.split(','),
            find = false;
        // console.log(arr,upformat);
        for (let i in arr) {
            if (arr[i].toLowerCase() == upformat) {
                find = true;
                break;
            }
        }
        return find;

    }



    getExtraData = () => {
        return {
            appId: 31438,
            domainType: 4,
        };
    };

    /**
     * handleChange会自动调3次 1.选中的文件改变 2.上传中 3.上传完成（成功/失败）
     * @param file
     * @param fileList
     */
    handleChange = ({ file, fileList }) => {

        if (file.name !== "") {
            const { format } = this.props;
            const isLtF = this.isLtFormat(file);
            if (!isLtF) {

                Notification({
                    description: `文件格式必须是 ${format}其中之一 `,
                    type: 'warn'
                });
                return false;
            }
        }

        const { maxCount, cb } = this.props;
        fileList = fileList.map(file => {
            if (file.response) {
                let { code, data } = file.response;
                if (code === 0) {
                    // Component will show file.url as link
                    file.url = data.url;
                }
            }
            return file;
        });
        if (this.isLtMaxSize(file) && fileList.length <= maxCount) {
            this.setState(() => {
                return {
                    fileList,
                }
            }, () => {
                if (file.status === 'done') {
                    cb && typeof cb === 'function' && cb();
                }
            });
        }
    };

    /**
     * 对外函数，获取腾讯云返回的文件列表链接
     */
    getFileListUrl = () => {
        let { fileList } = this.state;
        let fileListUrl = [];
        fileList.forEach((file) => {
            let { response, url } = file;
            if (response) {
                let { code, data } = response;
                if (code === 0) {
                    fileListUrl.push(data.url);
                }
            } else {
                fileListUrl.push(url);
            }
        });
        return fileListUrl;
    };

    /**
     * 对外函数，获取文件列表
     */
    getFileList = () => {
        let { fileList } = this.state;
        return fileList;
    };

    handleCancel = () => this.setState(() => ({ previewVisible: false }));

    onRemove = (file) => {
        this.setState(preState => {
            const index = preState.fileList.indexOf(file);
            const newFileList = preState.fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        });
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState(() => {
            return {
                previewVisible: true,
                previewImage: file.url || file.preview,
            }
        });
    };

    beforeUpload = (file) => {
        const { maxSize, maxCount, format } = this.props;
        const isLt = this.isLtMaxSize(file);
        const isLtF = this.isLtFormat(file);

        if (!isLtF) {
            Notification({
                description: `文件格式必须是 ${format}其中之一 `,
                type: 'warn'
            });
            return false;
        }
        if (!isLt) {
            Notification({
                description: `文件必须小于 ${maxSize} MB!`,
                type: 'warn'
            });
            return false;
        }
        // if (!this.isLtMaxCount()) {
        //     Notification({
        //         description: `文件个数必须小于 ${maxCount} 个!`,
        //         type: 'warn'
        //     });
        //     return false;
        // }
        return true;
    };

    render() {
        const { isNotImg, format, maxCount, preferSize, maxSize, disabled } = this.props;
        const { fileList, previewVisible, previewImage } = this.state;
        const uploadImg = (
            <div>
                <PlusOutlined style={{ fontSize: '34px', color: '#C4C6CF' }} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const uploadButton = (
            <Button type="primary" disabled={disabled}>
                <UploadOutlined /> 上传附件
            </Button>
        );
        const buttonType = isNotImg ? uploadButton : uploadImg;
        const buttonStyle = isNotImg ? 'text' : 'picture-card';
        const onPreview = isNotImg ? null : this.handlePreview;
        let acceptFormat = '';
        if (!format) {
            acceptFormat = isNotImg ? '.doc,.docx' : '.gif,.jpeg,.jpg,.png';
        } else {
            acceptFormat = format;
        }
        let desc = '';
        if (isNotImg) {
            console.log('不是图片')
            desc = <span className="upload-desc">支持{acceptFormat}格式，不超过{maxSize}MB。</span>
        } else {
            console.log('是图片')
            desc = <span className="upload-desc">推荐尺寸{preferSize}。支持{acceptFormat}格式，不超过{maxSize * 1024}kB。</span>
        }
        return (
            <div className="upload-wrapper">
                <div className="upload clearfix">
                    <Upload
                        className="upload-component"
                        action={Paths.upFileUrl}
                        listType={buttonStyle}
                        fileList={fileList}
                        data={this.getExtraData}
                        onPreview={onPreview}
                        onChange={this.handleChange}
                        beforeUpload={this.beforeUpload}
                        onRemove={this.onRemove}
                        accept={acceptFormat}
                        showUploadList={{ showDownloadIcon: false }}
                        disabled={disabled}
                        maxCount={maxCount}
                    >
                        {(maxCount === fileList.length && !isNotImg) ? null : buttonType}
                    </Upload>
                    {isNotImg && maxCount > 1 && <span className="file-upload-desc">最多{maxCount}个</span>}
                    {desc}
                    {previewVisible && <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>}
                </div>
            </div>
        )
    }
}

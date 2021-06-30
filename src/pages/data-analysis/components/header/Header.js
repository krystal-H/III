import React from 'react'
import { BugOutlined, CloudUploadOutlined, SaveOutlined } from '@ant-design/icons';
import {Button} from 'antd'
import {saveNodes,publishFlow,configFlow,testFlow} from '../../subjects';
import './Header.scss'

export default React.memo(function Header({
    dataAnalysisName = '未命名',
    analysisiType,
    testEnv
}) {

    const save = () => {
        saveNodes.next('save')
    }

    const publish = () => {
        publishFlow.next('publish')
    }

    const test = () => {
        testFlow.next('text')
    }

    return (
        <header className="data-analysis-header">
            <span className="d-a-name">{dataAnalysisName}</span>
            <div className="tools-wrapper">
                {
                    analysisiType === 3 ? 
                    <>
                        <Button type="primary" 
                                size="small"
                                onClick={test}
                                // disabled={![2].includes(testEnv)}
                                icon={<BugOutlined />}>调试</Button>
                        <Button type="primary" 
                                size="small"
                                onClick={save}
                                disabled={![0,1,3].includes(testEnv)}   
                                icon={<SaveOutlined />}>保存</Button>
                        <Button type="primary" 
                                size="small"
                                onClick={publish}
                                disabled={![1,3].includes(testEnv)}  
                                icon={<CloudUploadOutlined />}>发布</Button>
                    </>:
                    <>
                        {/* <Button type="primary" 
                                size="small"
                                onClick={publish} 
                                icon="cloud-upload">发布</Button> */}
                        <Button type="primary" 
                                size="small"
                                onClick={save}  
                                icon={<SaveOutlined />}>保存</Button>
                    </>
                }
            </div>
        </header>
    );
})

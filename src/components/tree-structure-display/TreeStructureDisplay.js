import React, { Component } from 'react';
import { Tabs, Tree } from 'antd';
import NoSourceWarn from '../no-source-warn/NoSourceWarn';
import './TreeStructureDisplay.scss';
const {TabPane} = Tabs;


const fitherChecked = (tree)=>{
    let _arr = [];
    for(let i = 0; i<tree.length; i++){
        let {
                checked,
                groupName="", boxName="", subBoxs=[], boxId="",
                childmenus=[], menuname=""
            } = tree[i];

        if(checked){
            let title = menuname || groupName || boxName;
            let key = boxId + "_" + title + "_" + i;
            let childs = menuname && childmenus || subBoxs;
            _arr.push({
                title,
                key,
                children:fitherChecked(childs)
            })
        }
    }
    return _arr
}


export default ({
    treeData={
    }
}) => {

    console.log(333,treeData)
    const { checkBoxGroupMenuList=[], menu="[]" } = treeData
    
    const   dataMenu = JSON.parse(menu) || [],
            dataObject = checkBoxGroupMenuList[0]&&checkBoxGroupMenuList[0].checkBoxGroupList || [],
            dataDimension = checkBoxGroupMenuList[1]&&checkBoxGroupMenuList[1].checkBoxGroupList || [];
    const treeMenu = fitherChecked(dataMenu);
    const treeObj = fitherChecked(dataObject);
    const treeDimen = fitherChecked(dataDimension);



    console.log(5555,treeMenu)


    const treeDataTabPane = [
        {
            name:"功能菜单",
            data:treeMenu,
        },
        {
            name:"数据对象",
            data:treeObj,
        },
        {
            name:"设备标签",
            data:treeDimen,
        }
    ]

    return <Tabs >
        {
            treeDataTabPane.map(({name,data},index)=>{

                <TabPane tab={name} key={index+""}>
                    { data.length > 0 && <Tree
                        
                        
                        showLine={true}
                        autoExpandParent={true}
                        treeData={data}
                        defaultExpandAll={true}

                    /> 
                    || <NoSourceWarn />}
                </TabPane>
            })
        }
        
    </Tabs>
}

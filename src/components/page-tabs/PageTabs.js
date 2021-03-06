import React,{useState} from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import {Link} from 'react-router-dom';
import {pageTabs} from '../../configs/page-tabs';
import {cloneDeep} from 'lodash';

import './PageTabs.scss';

// 用户资料页需要传developerInfo字段
export default function PageTabs({developerInfo,Nums=[],clickHandles = []}) {
    const [activeIndex, setActiveIndex] = useState(0);

    let configs = getFirstMatchTab(developerInfo);

    if (!configs) {
        return null
    }

    let {title,tabs,notRoute} = configs,
        {titleIcon,titleText} = title,
        hash = window.location.hash;
    // return(1)
    return (
        <div className="page-tabs-wrapper">
            
            <div className="tabs-title">
                <LegacyIcon type={titleIcon}></LegacyIcon>
                <span>{titleText}</span>
            </div>
            {
                tabs.map((tab,index) => {
                    let {tabText,tabPath} = tab,
                    itemClassName = "page-tabs-item ",
                    isActive = false,
                    _tabPath = tabPath instanceof Array ? tabPath : [tabPath];


                _tabPath.forEach(item => {
                    if(hash.indexOf(item) > -1) {
                        isActive = true;
                    }
                })

                if (!notRoute) {
                    itemClassName += (isActive ? 'active' : '')

                    return (
                        <div key={index}
                             className={itemClassName}>
                                <Link to={_tabPath[0]}>
                                    <span>{tabText}</span>
                                </Link>    
                        </div>
                    )
                } else {
                    itemClassName += ((activeIndex === index) ? 'active ' : '');

                    return (
                        <div key={index}
                             onClick={() => {setActiveIndex(index);clickHandles[index]()}}
                             className={itemClassName}>
                                <span className={Nums[index] ? 'top-right-nums' : ''}
                                      data-nums={(Nums[index] > 99) ? '99+' : Nums[index]}>{tabText}</span>  
                        </div>
                    )
                }
                })
            }
        </div>
    );
}


// 获取需要展示的tab信息
function getFirstMatchTab (developerInfo = {}) {
    let hash = window.location.hash,
        allPages = Object.keys(pageTabs),
        {isSubUser = 0} = developerInfo;
     
    let index = allPages.findIndex(page => {
        return hash.indexOf(page) > -1
    }),
    temp = index > -1 ? cloneDeep(pageTabs[allPages[index]]) : null;


    // 用户资料页，子账号要屏蔽一些菜单
    if (temp && (allPages[index] === '/userCenter') && isSubUser) {
        temp.tabs = temp.tabs.slice(0,2)
    }

    return temp;
}

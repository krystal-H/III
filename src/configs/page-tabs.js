export const pageTabs = {
    '/userCenter': {
        title : {
            titleIcon:'user',
            titleText:'用户中心'
        },
        tabs:[
            {
                tabText:'基本资料',
                tabPath:'/userCenter/info'
            },
            {
                tabText:'安全设置',
                tabPath:'/userCenter/security'
            },
            {
                tabText:'访问用户',
                tabPath:['/userCenter/visit','/userCenter/look']
            },
            {
                tabText:'用户角色',
                tabPath:['/userCenter/role','/userCenter/add']
            },
            {
                tabText:'操作日志',
                tabPath:'/userCenter/log'
            },
            {
                tabText:'实例管理',
                tabPath:['/userCenter/case']
            },
            {
                tabText:'授权管理',
                tabPath:['/userCenter/authorize']
            },
            {
                tabText:'数据资产',
                tabPath:['/userCenter/dataasset','userCenter/assetdetail']
            }
        ]
    },
    '/messageCenter': {
        title : {
            titleIcon:'sound',
            titleText:'消息中心'
        },
        notRoute:true,
        tabs:[
            {
                tabText:'全部消息'
            },
            {
                tabText:'未读消息'
            },
            {
                tabText:'已读消息'
            }
        ]
    }
}
// 产品状态
export const productStatusText = {
    '0': '开发中',
    '1': '已发布',
    '2': '审核中'
}

// 产品方案类型 map
export const productSchemeTypeMap = {
    1: '免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。',
    2: '独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。',
    3: 'SoC方案，不提供通用固件程序，需自行开发模组固件。',
    4: '成品接入方案，支持已上市的产品，云对云方式或C-Life代理直连方式接入C-Life平台。',
    5: '自带Android或者Linux系统的产品，有独立的系统。'
}

// 页面的状态
export const H5Status = {
    '1': '草稿',
    '2': '审核中',
    '3': '灰度版本',
    '4': '正式版本'
}

// H5页面开发方式
export const projectType = {
    '1': 'SDK开发',
    '2': '在线拖拽'
}


// 云端定时的状态
export const cloudStatus = {
    '0': '草稿',
    '1': '已发布',
    '2': '删除'
}

// 协议的类型
export const FunctionDataTypeText = {
    '1': '字符',
    '2': '数值',
    '3': '枚举',
    '4': '布尔',
    '5': '绝对时间',
    '6': '相对时间',
    '7': '循环时间',
    '8': 'RGB颜色',
    '9': '二进制数据'
}

// 场景服务条件参数规则
export const SceneConditionRuleParams = {
    '1': '大于',
    '2': '小于',
    '3': '范围'
}

// 场景服务类型
export const SceneType = {
    '1': '条件',
    '2': '动作'
}

// 场景服务状态
export const SceneStatus = {
    '1': '草稿',
    '2': '审核中',
    '3': '已发布',
    '4': '驳回'
}

export const OpetateLogType = {
    "0": "基本操作 ",
    "1": "产品操作 ",
    "2": "数据订阅 ",
    "3": "应用管理 ",
    "4": "设备管理 ",
    "5": "固件管理 ",
    "6": "调试工具"
}

// 入网状态
export const netStatus = [
    {
        "value": "全部状态 ",
        "key": "-1",
    },
    {
        "value": "已入网 ",
        "key": "1 ",
    }, {
        "key": "0 ",
        "value": "未入网 ",
    }]
//功能定义-单位
export const unitCollection = [{
    "Symbol": "无",
    "Name": "无"
}, {
    "Symbol": "μg/m³",
    "Name": "不知道2"
}, {
    "Symbol": "mV",
    "Name": "mV"
},
{
    "Symbol": "mg/m³",
    "Name": "不知道3"
}, {
    "Symbol": "cal",
    "Name": "卡路里"
},
{
    "Symbol": "g",
    "Name": "克"
},
{
    "Symbol": "kg",
    "Name": "千克"
},
{
    "Symbol": "t",
    "Name": "吨"
},
{
    "Symbol": "mL",
    "Name": "毫升"
},
{
    "Symbol": "L",
    "Name": "升"
},
{
    "Symbol": "℉",
    "Name": "华氏度"
},
{
    "Symbol": "°C",
    "Name": "摄氏度"
},
{
    "Symbol": "%RH",
    "Name": "相对湿度"
},
{
    "Symbol": "nm",
    "Name": "纳米"
},
{
    "Symbol": "μm",
    "Name": "微米"
},
{
    "Symbol": "cm",
    "Name": "厘米"
},
{
    "Symbol": "m",
    "Name": "米"
},
{
    "Symbol": "km",
    "Name": "千米"
},
{
    "Symbol": "s",
    "Name": "秒"
},
{
    "Symbol": "min",
    "Name": "分钟"
},
{
    "Symbol": "h",
    "Name": "小时"
},
{
    "Symbol": "day",
    "Name": "日"
},
{
    "Symbol": "week",
    "Name": "周"
},
{
    "Symbol": "month",
    "Name": "月"
},
{
    "Symbol": "year",
    "Name": "年"
},
{
    "Symbol": "mmHg",
    "Name": "血压"
},
{
    "Symbol": "mmol/L",
    "Name": "血糖"
},
{
    "Symbol": "pH",
    "Name": "PH值"
},
{
    "Symbol": "dS/m",
    "Name": "土壤EC值"
},
{
    "Symbol": "W/㎡",
    "Name": "太阳总辐射"
},
{
    "Symbol": "mm/hour",
    "Name": "降雨量"
},
{
    "Symbol": "N",
    "Name": "牛"
},
{
    "Symbol": "aw",
    "Name": "饱和度"
},
{
    "Symbol": "pixel",
    "Name": "像素"
},
{
    "Symbol": "Lux",
    "Name": "照度"
},
{
    "Symbol": "grav",
    "Name": "重力加速度"
},
{
    "Symbol": "dB",
    "Name": "分贝"
},
{
    "Symbol": "lm",
    "Name": "流明"
},
{
    "Symbol": "bit",
    "Name": "比特"
},
{
    "Symbol": "count",
    "Name": "次"
},
{
    "Symbol": "turn/m",
    "Name": "转每分钟"
},
{
    "Symbol": "GB",
    "Name": "吉字节"
},
{
    "Symbol": "MB",
    "Name": "兆字节"
},
{
    "Symbol": "KB",
    "Name": "千字节"
},
{
    "Symbol": "B",
    "Name": "字节"
},
{
    "Symbol": "%",
    "Name": "百分比"
},
{
    "Symbol": "g/L",
    "Name": "克每升"
},
{
    "Symbol": "g/m³",
    "Name": "克每立方米"
},
{
    "Symbol": "kg/m³",
    "Name": "千克每立方米"
},
{
    "Symbol": "F",
    "Name": "法拉"
},
{
    "Symbol": "Ω",
    "Name": "欧姆"
},
{
    "Symbol": "mA",
    "Name": "毫安"
},
{
    "Symbol": "A",
    "Name": "安培"
},
{
    "Symbol": "V",
    "Name": "伏特"
},
{
    "Symbol": "kV",
    "Name": "千伏"
},
{
    "Symbol": "Hz",
    "Name": "赫兹"
},
{
    "Symbol": "W",
    "Name": "瓦特"
},
{
    "Symbol": "Wh",
    "Name": "瓦时"
},
{
    "Symbol": "eV",
    "Name": "电子伏"
},
{
    "Symbol": "J",
    "Name": "焦耳"
},
{
    "Symbol": "kJ",
    "Name": "千焦"
},
{
    "Symbol": "hPa",
    "Name": "百帕"
},
{
    "Symbol": "kPa",
    "Name": "千帕"
},
{
    "Symbol": "cm³",
    "Name": "立方厘米"
},
{
    "Symbol": "m³",
    "Name": "立方米"
},
{
    "Symbol": "h㎡",
    "Name": "公顷"
},
{
    "Symbol": "c㎡",
    "Name": "平方厘米"
},
{
    "Symbol": "㎡",
    "Name": "平方米"
}]
//功能定义-倍数
export const multipleCollection = [
    {
        value: 1,
        label: 1
    },
    {
        value: 10,
        label: 10
    },
    {
        value: 100,
        label: 100
    },
    {
        value: 1000,
        label: 1000
    },
    {
        value: 10000,
        label: 10000
    },
]
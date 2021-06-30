// 此控件用于antd自定义icon icon库地址为 https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1356493
import { createFromIconfontCN } from '@ant-design/icons';

import {myIconUrl} from '../../configs/antd.config';

const MyIcon = createFromIconfontCN({
    scriptUrl: myIconUrl,
});

export default MyIcon;
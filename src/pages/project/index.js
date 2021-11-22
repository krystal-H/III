import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const ProjectManage = loadable(() => import('./project-manage'));
const routes = {
    '项目管理': ProjectManage
}
export default function Project({ match: { path }, childmenus }) {
    return (
        <Switch>
            {
                childmenus.map(({
                    menuname,
                    items = [],
                    path
                }, i) => <Route key={i} path={path} component={routes[menuname]} authItem={items}></Route>
                )
            }
            <Redirect to={childmenus[0].path} />
        </Switch>
    )
}

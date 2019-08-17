/**
 * 定义应用路由
 */
import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import Bundle  from './routerBundle.js';
// import temp1 from './templates/temp1/index.js';

const Temp1 = (props) => (
    <Bundle load={() => import('./templates/temp1/index.js')}>
        {(Temp1) => <Temp1 {...props}/>}
    </Bundle>
);

const Temp2 = (props) => (
    <Bundle load={() => import('./templates/temp2/index.js')}>
        {(Temp2) => <Temp2 {...props}/>}
    </Bundle>
);

const Test = (props) => (
    <Bundle load={() => import('./templates/test/index.js')}>
        {(Test) => <Test {...props}/>}
    </Bundle>
);

const Building = (props) => (
    <Bundle load={() => import('./templates/building/index.js')}>
        {(Building) => <Building {...props}/>}
    </Bundle>
);

const router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/1" component={Temp1} />
		<Route path="/2" component={Temp2} />
		<Route path="/test" component={Test} />
		<Route path="/building" component={Building} />
      </Switch>
    </HashRouter>
  );
};

export default router();

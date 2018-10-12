import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import loadable from 'loadable-components';

import App from '../pages/app';

const A = loadable(() => import('../pages/a/a'));
const B = loadable(() => import('../pages/b/b'));
const C = loadable(() => import('../pages/c/c'));

class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={App} />
                    <Route path="/aaa" component={A} />
                    <Route path="/bbb" component={B} />
                    <Route path="/c/ccc" component={C} />
                </div>
            </Router>
        );
    }
}

export default hot(module)(Root);

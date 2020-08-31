import React from 'react'
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import index from "./components/index/index"

ReactDom.render((
    <Router>
        <Switch>
            <Route exact path="/" component={index}></Route>
            <Route path="/:path" component={index}></Route>
        </Switch>
    </Router>
), document.getElementById('root'));
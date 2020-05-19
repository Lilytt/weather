import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import asyncComponent from "./components/AsyncComponent";

import './index.css';


const WeatherList = asyncComponent(() => import('./weather_list/weather_list'));

const setTitle = title => () => document.title = title;

function fontSizeInit() {
    var doc = document.documentElement,
        cli = doc.clientWidth,
        clh = doc.clientHeight;
        if(cli < clh){
            if (cli < 750) {
                cli = cli / 7.5;
            } else {
                cli = 100;
            }
            // cli = cli / 9;
        }else{
            if (clh < 750) {
                cli = clh / 7.5;
            } else {
                cli = 100;
            }
        }

    doc.style.fontSize = cli + "px";
}
fontSizeInit();


var routername = "/h5/mogul_react";

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path={routername + "/weather_list"} exact component={WeatherList} onEnter={setTitle('天气列表')} />
    </Router>
),document.getElementById("root"))

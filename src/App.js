import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import Home from "./pages/home";
import ReqWeatherData from "./pages/reqWeatherData";
import 'antd/dist/antd.css'
import './App.css';


function App() {

    return (
        <div className='container'>
             <Switch>
                 <Route path="/" component={Home} exact />
                 <Route path="/reqWeather" component={ReqWeatherData}  />
             </Switch>
        </div>
    );
}

export default App;

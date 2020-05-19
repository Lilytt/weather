import React from 'react';
import { Component } from 'react';
import Loading from '../loading/loading';
import $ from 'jquery'
import './weather_list.css';

var protocol = window.location.protocol;
var host = window.location.host;
var api;
if(window.location.host.indexOf("api") >= 0){
    api = protocol + "//" + host;
}else{
    api = "";
}

class WeatherList extends Component{
    constructor(props){
        super(props)
        this.state={
            hideload: false,
            weather_list_default: [],
            weather_list: []
        }
    }

    componentDidMount(){
        this.getWeatherList();
    }

    getWeatherList(){
        $.ajax({
            type: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast/?appid=9de243494c0b295cca9337e1e96b00e2&q=shanghai,china',
            data: {},
            dataType: 'jsonp',
            context: this,
            contentType: 'application/json',
            success: function(res) {
                this.setState({
                    weather_list_default: res.list,
                    weather_list: res.list,
                    hideload: true
                })
            },
            error: function(data) {
                this.setState({
                    hideload: true
                })
            }
        });
    }

    searchWeather(search_value){
        $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?appid=9de243494c0b295cca9337e1e96b00e2&q=beijing,china',
            data: {},
            dataType: 'jsonp',
            context: this,
            contentType: 'application/json',
            success: function(res) {
                var search_weather = [];
                search_weather.push(res);
                this.setState({
                    weather_list: search_weather,
                    hideload: true
                })
            },
            error: function(data) {
                this.setState({
                    hideload: true
                })
            }
        });
    }

    convertWeather(clouds_all){
        var clouds;
        if(0 <= clouds && clouds < 30){
            clouds = "晴"
        }else if(clouds >= 30 && clouds < 50){
            clouds = "少云"
        }else if(clouds > 50){
            clouds = "多云"
        }
        return clouds;
    }

    search(){
        var search_value = $(".search_input").val();
        $(".search_input").val("");
        this.searchWeather(search_value);
    }

    cancel(){
        $(".search_input").val("");
        this.setState({
            weather_list: this.state.weather_list_default
        })
    }

    render(){
        var weather_list = [];
        weather_list = this.state.weather_list.map(function(weather_list,index){
            return (
                <div className='weather_list_li' key={index}>
                    <div className='weather_list_li_title'>
                        <span className='weather_list_li_title_line'></span>
                        <span className='weather_list_li_title_name'>{weather_list.name ? weather_list.name : "城市地点"}</span>
                    </div>
                    <div className='weather_list_li_detail'>
                        <span className='weather_list_li_name'>当前湿度</span>
                        <span className='weather_list_li_humidity'>{weather_list.main.humidity}°</span>
                        <span className='weather_list_li_clouds'>{this.convertWeather(weather_list.clouds.all)}</span>
                        <span className='weather_list_li_wind'>
                            <span className='weather_list_li_wind_title'>风力 <span className="wind_num">{weather_list.wind.speed}</span> 级</span>
                        </span>
                    </div>
                </div>
            );
        }, this);
        return (
            <div className="weather_list">
                <Loading show={this.state.hideload ? false : true} />
                <div className="weather_search">
                    <input type="text" defaultValue="" placeholder="搜索" className="search_input" />
                    <span className="search_btn" onClick={this.search.bind(this)}>搜索</span>
                    <span className="cancel" onClick={this.cancel.bind(this)}>取消</span>
                </div>
                <div className="weather_list_ul">
                    {weather_list}
                </div>
            </div>
        )
    }
}
export default WeatherList;

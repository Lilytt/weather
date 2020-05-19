import React from 'react';
import { Component } from 'react';
import './loading.css';


class Loading extends React.Component {
    changeTime(){
        this.props.changeTime(this.props.index);
    }
    
    render(){
        return(
            <div className="wrapper" data-show={this.props.show}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
                <div className="line4"></div>
                <div className="line5"></div>
                <div className="line6"></div>
                <div className="line7"></div>
                <div className="line8"></div>
                <div className="line9"></div>
                <div className="line10"></div>
                <div className="line11"></div>
                <div className="line12"></div>
            </div>
        )
    }
}

export default Loading;
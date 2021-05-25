import React, { Component } from 'react';
import config from '../config/config'
export default class Leftsidebar extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="fixed-sidebar-left">
                <ul className="nav navbar-nav side-nav nicescroll-bar">
                    <li className="navigation-header">
                        <span>Main</span>
                        <i className="zmdi zmdi-more"></i>
                    </li>
                  
                    <li>
                    <a href={`${config.baseUrl}dashboard`}><div className="pull-left"><i className="zmdi zmdi-view-dashboard mr-20"></i><span className="right-nav-text">Dashboard</span></div><div className="pull-right"><i ></i></div><div className="clearfix"></div></a>

					</li>

                    <li>
                    <a href={`${config.baseUrl}setting`}><div className="pull-left"><i className="zmdi zmdi-collection-image mr-20"></i><span className="right-nav-text">Settings</span></div><div className="pull-right"><i ></i></div><div className="clearfix"></div></a>

					</li>

                </ul>
            </div>
        )

    }
}
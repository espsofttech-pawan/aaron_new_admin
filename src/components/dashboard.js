import React, { Component } from 'react';
import Header from '../directives/header'
import Leftsidebar from '../directives/leftsidebar'
import Footer from '../directives/footer'
import axios from  'axios'
import config from '../config/config'
import Cookies from 'js-cookie';

export default class dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(!Cookies.get('loginSuccess')){
            window.location.href = `${config.baseUrl}`
            return false;
         }
    }
   
    render() {

        return (          
            <>
                <div className="preloader-it">
                    <div className="la-anim-1"></div>
                </div>
                <div className="wrapper theme-6-active pimary-color-green">
                    <Header/>
                    <Leftsidebar/>

                    <div className="right-sidebar-backdrop"></div>
                    <div className="page-wrapper">
                        <div className="container-fluid pt-25">
                            <div className="row">
                               
                            </div> 
                        </div>
                        <Footer/>
                    </div>
                 </div>
            </>
        )
    }
}
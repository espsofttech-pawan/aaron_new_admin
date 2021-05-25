import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
import config from '../config/config'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile_pic : ''
        }
        this.loginData = (!Cookies.get('loginSuccess'))?[]:JSON.parse(Cookies.get('loginSuccess'))
    }
    
   async getUserProfilePicAPI() {
    await axios({
        method: 'post',
        url: `${config.apiUrl}/adminprofilepic`,
        data:{'email':this.loginData.data.user_email}
    })
    .then(response => {
        if (response.data.success === true) {
            this.setState({
                profile_pic: response.data.response
            })   
        }
    })
}

    componentDidMount() {
        this.getUserProfilePicAPI();
    }

    logout(){
        Cookies.remove('loginSuccess')
    }
   
    render() {

        return (
            <div className="sp-header">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <ToastContainer/>
                    <div className="mobile-only-brand pull-left">
                        <div className="nav-header pull-left">
                            <div className="logo-wrap">
                                <a href={`${config.baseUrl}dashboard`}>
                                    <img className="brand-img" src="images/Lock.svg" alt="brand" style={{width:"50px"}} />
                                    <span className="brand-text"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="mobile_only_nav" className="mobile-only-nav pull-right">
                        <ul className="nav navbar-right top-nav pull-right">
                            <li className="dropdown auth-drp">
                                <a href="#" className="dropdown-toggle pr-0" data-toggle="dropdown"><img src={`${config.imageUrl}uploads/`+this.state.profile_pic?.profile_pic} alt="user_auth" className="user-auth-img img-circle" /><span className="user-online-status"></span></a>
                                <ul className="dropdown-menu user-auth-dropdown" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
                                    <li>
                                        <a href={`${config.baseUrl}changeprofile`}  ><i className="zmdi zmdi-account-o "></i>
                                        <span>Edit Profile Pic</span></a>
                                    </li>
                                    
                                    <li>
                                        <a href={`${config.baseUrl}changepassword`}  ><i className="zmdi zmdi-key"></i>
                                        <span>Change Password</span></a>
                                    </li> 
                                    
                                
                                    <li>
                                        <Link to={`${config.baseUrl}`} onClick={this.logout.bind(this)}><i className="zmdi zmdi-power"></i>
                                        <span>Log Out</span></Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )

    }
}
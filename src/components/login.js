import React, { Component } from 'react';
import axios from 'axios';
import config from '../config/config'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

import 'react-toastify/dist/ReactToastify.css';
const headers = {
   'Content-Type': 'application/json'
};

export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {

    }

    onChange(e) {
        this.setState({
           [e.target.name]: e.target.value
        })
     }
  
     //================================================  Login API integrate  =============
  
     async submitForm(e) {
        e.preventDefault()
        const data = this.state
        axios.post(`${config.apiUrl}/adminlogin`, data, { headers })
           .then(response => {
              if (response.data.success === true) {
                 toast.success('Login Successfully!', {
                    position: toast.POSITION.TOP_CENTER
                 });
                 Cookies.set('loginSuccess', response.data);
                 window.location.href = `${config.baseUrl}dashboard`
              }
  
              else if (response.data.success === false) {
                 toast.error(response.data.msg, {
                    position: toast.POSITION.TOP_CENTER
                 });
              }
           })
  
           .catch(err => {        
              toast.error(err.response.data?.msg, {
                 position: toast.POSITION.TOP_CENTER
              });
  
           })
     }
  
    render() {

        return (
        <div className="wrapper pa-0">
            
            <header className="sp-header">
                <div className="brand-be">
                    <a href={`${config.baseUrl}`}>
                        <img className="logo-c active be_logo" src="images/Lock.svg" alt="logo" style={{width:"100px", height:"70px"}} />
                        <span className="brand-text"></span>
                    </a>
                </div>
                <div className="clearfix"></div>
            </header>

            <div className="page-wrapper pa-0 ma-0 auth-page">
                <div className="container-fluid">
                    <div className="table-struct full-width full-height">
                        <div className="table-cell vertical-align-middle auth-form-wrap">
                            <div className="auth-form  ml-auto mr-auto no-float">
                                <div className="row">
                                    <div className="col-sm-12 col-xs-12">
                                        <div className="mb-30">
                                            <h3 className="text-center txt-dark mb-10">Sign in to Aaron</h3>
                                            <h6 className="text-center nonecase-font txt-grey">Enter your details below</h6>
                                        </div>
                                        <div className="form-wrap">
                                            <form onSubmit={this.submitForm}>
                                            <ToastContainer />

                                                <div className="form-group">
                                                    <label className="control-label mb-10" for="exampleInputEmail_2">Email address</label>
                                                    <input type="email" className="form-control" required="" value={this.state.email}
                                                    onChange={this.onChange} name="email" id="exampleInputEmail_2" placeholder="Enter email" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="pull-left control-label mb-10" for="exampleInputpwd_2">Password</label>
                                                    <div className="clearfix"></div>
                                                    <input type="password" className="form-control" required="" id="exampleInputpwd_2" value={this.state.password}
                                                    onChange={this.onChange} name="password" placeholder="Enter Password" />
                                                </div>

                                                <div className="form-group text-center">
                                                    <button type="submit" className="btn btn-info btn-primary btn-rounded">sign in</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )

    }
}
import React, { Component } from 'react';
import Header from '../directives/header'
import Leftsidebar from '../directives/leftsidebar'
import Footer from '../directives/footer'
import axios from  'axios'
import config from '../config/config'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
const headers = {
   'Content-Type': 'application/json'
};


export default class changeprofile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profile_pic : '',
            image_file: null,
			image_preview: '',
        }

         this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
         this.getUserProfilePicAPI = this.getUserProfilePicAPI.bind(this)
         this.updateProfilePicAPI = this.updateProfilePicAPI.bind(this)
        
    }

    componentDidMount() {
        if(!Cookies.get('loginSuccess')){
            window.location.href = `${config.baseUrl}`
            return false;
         }
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
   
async updateProfilePicAPI(e) {
     
    e.preventDefault()
    const formData = new FormData();
      formData.append('profile_pic', this.state.image_file);
      formData.append('email', this.loginData.data.user_email);

    await axios({
       method: 'post', 
       url: `${config.apiUrl}/updateprofilepicAdmin`,
       data:formData
    })
       .then(result => {
          console.log('result',result);
           if (result.data.success === true) {
             
             toast.success(result.data.msg, {
                position: toast.POSITION.TOP_CENTER
                });
        this.getUserProfilePicAPI()

        setTimeout(() => {
            window.location.reload();
            }, 2000);        

         } 
 
           else if (result.data.success === false) {
             toast.error(result.data.msg, {
                position: toast.POSITION.TOP_CENTER
                });
      
         }

        }).catch(err => {
       console.log(err);
       
    });
 }
 
componentDidMount() {
    if(!Cookies.get('loginSuccess')){
        window.location.href = `${config.baseUrl}`
        return false;
    }
        this.getUserProfilePicAPI();
    }

    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        this.setState({
        image_preview: image_as_base64,
        image_file: image_as_files,
        })
    }
     render() {
        return (
        <>
        <div className="preloader-it">
            <div className="la-anim-1"></div>
        </div>
        <ToastContainer/>
        <div className="wrapper theme-6-active pimary-color-green">
            <Header />
            <Leftsidebar />

            <div className="page-wrapper">
                <div className="container-fluid">
                    {/* <!-- Title --> */}
                    <div className="row heading-bg">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h5 className="txt-dark">Change Profile Pic</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-default card-view">
                                <div className="panel-wrapper collapse in">
                                    <div className="panel-body">
                                        <div className="form-wrap">
                                            <form action="#">
                                                <hr className="light-grey-hr" />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="control-label mb-10">Change Profile Pic</label>
                                                            <input type="file" id="firstName" onChange={this.handleImagePreview} name="profile" className="form-control"   />
                                                        </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-label mb-10"></label>
                                                                        <button type="submit" onClick={this.updateProfilePicAPI} className="btn btn-primary">Change Profile</button>
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                            <div className="form-actions">
                                                    <div className="clearfix"></div>
                                                </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="form-wrap"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                <Footer/>
            </div>
        </div>
        </>
        )

    }
}


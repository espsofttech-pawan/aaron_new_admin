import React, { Component } from 'react';
import Header from '../directives/header'
import Leftsidebar from '../directives/leftsidebar'
import Footer from '../directives/footer'
import axios from  'axios'
import config from '../config/config'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default class setting extends Component {
    constructor(props) {
        super(props)
            this.state={
                settingsData : [],
                address : '',
                amount : '',
                id : ''
        };
         this.loginData = (!Cookies.get('loginSuccess'))? [] : JSON.parse(Cookies.get('loginSuccess'));
    }

    componentDidMount() {
        if(!Cookies.get('loginSuccess')){
            window.location.href = `${config.baseUrl}`
            return false;
         }
        this.getSettingDataAPI();
    }

    async getSettingDataAPI() {
        await axios.get(`${config.apiUrl}/getSettingData`, {}, )
                .then(result => {
                    console.log(result.data);
                    if (result.data.success === true) {
                        this.setState({
                            address: result.data.response.address,
                            amount: result.data.response.amount,
                            id : result.data.response.id
                        })
                    }
                    else if (result.data.success === false) {
    
                    }
                })
            .catch(err => { })
        }

    updateDataAPI(){
        const { id,address, amount} = this.state;  
        axios.post(`${config.apiUrl}/updateSetting`,{id:id,address:address,amount:amount})
        .then(result=>{
            toast.success(result.data.msg, {
                position: toast.POSITION.TOP_CENTER
            }
            ,setTimeout(() => {
                window.location.reload();
            }, 2000)
            );
            
            this.setState({
                category_name :'',
                updateform : ""   
            })

                // this.categoryList();
        }).catch(err=>{
            toast.error(err.response.data?.msg, {
                position: toast.POSITION.TOP_CENTER, autoClose:1500       
            },
             setTimeout(() => {
                    
            }, 500)
            );
        });       
    }


    handleChange = e =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

 
    render() {
        return (
            <>
                <div className="preloader-it">
                    <div className="la-anim-1"></div>
                </div>
                <ToastContainer/>
                {/* <!--/Preloader--> */}
                <div className="wrapper theme-6-active pimary-color-green">
                    <Header />
                    <Leftsidebar />                    
                    <div className="right-sidebar-backdrop"></div>
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            <div className="row heading-bg">
                                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <h5 className="txt-dark">Settings</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="panel panel-default card-view">
                                        <div className="panel-wrapper collapse in">
                                            <div className="panel-body">
                                            <div className="form-wrap">

                                           
                                                </div>
                                                <div className="form-wrap">

                                                <form onSubmit={this.updateDataAPI.bind(this)}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-0">
                                                                <label className="control-label mb-10">Address</label>
                                                                <input type="text"   id="firstName" onChange={this.handleChange} name="address" className="form-control" placeholder="Enter Address"  value={this.state.address} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-0">
                                                                <label className="control-label mb-10">Amount</label>
                                                                <input type="text" onChange={this.handleChange} name="amount" className="form-control" placeholder="Enter Amount"  value={this.state.amount} />
                                                            </div>
                                                        </div>
                                                    </div>  

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                        <label className="control-label mb-10"></label>
                                                            <div className="form-group mb-0">
                                                                <button type="submit" className="btn btn-success">Update</button>
                                                            </div>
                                                        </div>
                                                    </div>                                                                                                        
                                                </form>

                                    </div>
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
)}}

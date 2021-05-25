import React, { Component } from 'react';
import Header from '../directives/header'
import Leftsidebar from '../directives/leftsidebar'
import Footer from '../directives/footer'
import axios from 'axios'
import config from '../config/config'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default class userlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            user_id: '',
            user_list: [],
        };
        this.loginData = (!Cookies.get('loginSuccess')) ? [] : JSON.parse(Cookies.get('loginSuccess'));

    }

    componentDidMount() {
        if (!Cookies.get('loginSuccess')) {
            window.location.href = `${config.baseUrl}`
            return false;
        }
        this.userList();
    }

    updateApprovedAPI(id) {

        console.log(id);
        axios.post(`${config.apiUrl}/updateTelentForApproved`, { 'email': id.email, 'user_id': id.id })
            .then(result => {

                if (result.data.success === true) {
                    toast.success(result.data.msg, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.state = {
                        email: '',
                        user_id: '',

                    }
                    this.componentDidMount();

                }

                else if (result.data.success === false) {

                }
            })

            .catch(err => {
            })
    }

    updateRejectAPI(id) {

        console.log(id);
        axios.post(`${config.apiUrl}/updateTelentForReject`, { 'email': id.email, 'user_id': id.id })
            .then(result => {

                if (result.data.success === true) {
                    toast.success(result.data.msg, {
                        position: toast.POSITION.TOP_CENTER
                    });
                      this.componentDidMount();

                }

                else if (result.data.success === false) {

                }
            })

            .catch(err => {
            })
    }

    async deleteUser(id) {

        await axios.post(`${config.apiUrl}/deleteuser`,
            { id: id.id })
            .then(result => {

                if (result.data.success === true) {
                    toast.success(result.data.msg, {
                        position: toast.POSITION.TOP_CENTER
                    }, setTimeout(() => {
                        window.location.reload();
                    }, 1500));
                    this.userList();
                }

                else if (result.data.success === false) {

                }
            })

            .catch(err => {
                toast.error(err.response.data?.msg, {
                    position: toast.POSITION.TOP_CENTER,

                }, setTimeout(() => {

                }, 500));
            })
    }



    async userList() {
        await axios.get(`${config.apiUrl}/getuser`, {},)
            .then(result => {
                console.log(result.data);
                if (result.data.success === true) {
                    this.setState({
                        user_list: result.data.response
                    })


                }

                else if (result.data.success === false) {

                }
            })

            .catch(err => {
            })
    }






    render() {

        return (

            <>

                <div className="preloader-it">
                    <div className="la-anim-1"></div>
                </div>
                <ToastContainer />
                {/* <!--/Preloader--> */}
                <div className="wrapper theme-6-active pimary-color-green">
                    <Header />
                    <Leftsidebar />
                    <div className="right-sidebar-backdrop"></div>
                    <div className="page-wrapper">
                        <div className="container-fluid">
                            {/* <!-- Title --> */}
                            <div className="row heading-bg">
                                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <h5 className="txt-dark">Users Details</h5>
                                </div>

                            </div>
                            {/* <!-- /Title --> */}

                            {/* <!-- Row --> */}
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="panel panel-default card-view">
                                        <div className="panel-wrapper collapse in">
                                            <div className="panel-body">
                                                <div className="form-wrap">
                                                    <form action="#">
                                                        <hr className="light-grey-hr" />
                                                        <div className="row">
                                                        </div>

                                                        <div className="form-actions">
                                                            <div className="clearfix"></div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="form-wrap">

                                                    <div class="table-responsive">
                                                        <table class="table table-striped mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Full Name</th>
                                                                    <th>Email</th>
                                                                    <th>Email Verify</th>
                                                                    <th>Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.user_list.map(item => (
                                                                    <tr>

                                                                        <td>{item.id}</td>
                                                                        <td>{item.first_name} {item.last_name}</td>
                                                                        <td>{item.email}</td>
                                                                        <td>{(item.is_email_verify === 0) ? 'Not Verified' : "Verified"}</td>

                                                                        <td class="text-nowrap"><button className=" btn-danger" onClick={this.deleteUser.bind(this, item)} data-toggle="tooltip" data-original-title="Close"> <i class="fa fa-close m-r-10"></i> </button> </td>
                                                                        {/*   */}
                                                                    </tr>
                                                                ))}

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /Row --> */}

                        </div>
                        {/* <!-- Footer --> */}
                        <Footer />
                        {/* <!-- /Footer --> */}

                    </div>
                    {/* <!-- /Main Content --> */}

                </div>
            </>


        )

    }
}

import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import axios from 'axios';
import swal from 'sweetalert';


function Login() {

    const [Signin, setSignin] = useState({
        email: "",
        password: "",
        error: [],
    });

    const clientId = "662742889961-vd3nhrmupasv5gbms0clun5f8ea43oun.apps.googleusercontent.com";
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId });
        })
    }, []);


    const responseFacebook = (response) => {
        const data = {
            name: response.name,
            email: response.email,
            img: response.picture.data.url,
        };
    }
    const responseGoogle = (response) => {
        const data = {
            firstname: response.profileObj.givenName,
            lastname: response.profileObj.familyName,
            email: response.profileObj.email,
            ID: response.profileObj.googleId,
        }
    }
    const handleinput = (e) => {
        e.persist();
        setSignin({ ...Signin, [e.target.name]: e.target.value });
    }

    const LoginAccount = (e) => {
        e.preventDefault();

        const data = {
            email: Signin.email,
            password: Signin.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/Login`,data).then(res =>{
                if(res.data.status === 200){

                    // Admin
                    if(res.data.token === 1){

                    }
                    //
                    else if(res.data.token === 2){
                        
                    }
                    // Business Account
                    else {

                    }
                }
            }).catch((error)=> {
                if(error.response.status === 500){
                    swal("Warning",error.response.statusText,'warning');
                }
            })
        });
        
    }

    return (
        <div>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-sm-12">
                        <Panel header="Login">
                            <form onSubmit={LoginAccount}>
                                <div className="row">
                                    <div className="col-md-12 mb-1">
                                        <label htmlFor="Username" className="form-label">
                                            Email
                                        </label>
                                        <InputText type="email" keyfilter={'email'} onChange={handleinput} required className='w-100' name='email'></InputText>
                                    </div>
                                    <div className="col-md-12 mb-1">
                                        <label htmlFor="Username" className="form-label">
                                            Password
                                        </label>
                                        <InputText type="password" keyfilter={'hex'} required className='w-100' name='password'></InputText>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <center> <Button className="p-button-sm w-100" label='Login'></Button></center>
                                    <center><div className="mt-2">
                                        <span>If you don't have an Account</span> <Link to={'/create'}>Sign up</Link></div></center>
                                </div>
                                <Divider align='center'>or</Divider>
                                <center>
                                    <div className="mb-3">
                                        <span>Login with</span>
                                    </div>
                                </center>
                            </form>
                            <center>
                                <div className="d-flex justify-content-evenly">
                                    <FacebookLogin
                                        appId="421463426161553"
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            // <button onClick={renderProps.onClick}>This is my custom FB button</button>
                                            <Button className="p-button-sm p-button-info" onClick={renderProps.onClick} icon="pi pi-fw pi-facebook" label='Facebook'></Button>
                                        )}
                                    />

                                    <GoogleLogin
                                        clientId={clientId}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        theme="light"
                                        render={renderProps => (
                                            <Button className="p-button-sm p-button-danger" icon="pi pi-fw pi-google" label='Google' onClick={renderProps.onClick} disabled={renderProps.disabled} ></Button>
                                            // <Button className='p-button-danger p-button-sm me-3' label='Login' icon="pi pi-google" onClick={renderProps.onClick} disabled={renderProps.disabled}></Button>
                                        )}
                                        cookiePolicy={'single_host_origin'} />


                                </div>
                            </center>
                        </Panel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
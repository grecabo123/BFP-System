import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';



function Login() {
    return (
        <div>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-sm-12">
                        <Panel header="Login">
                            <form>

                                <div className="row">
                                    <div className="col-md-12 mb-1">
                                        <label htmlFor="Username" className="form-label">
                                            Email
                                        </label>
                                        <InputText keyfilter={'email'} required className='w-100' name='email'></InputText>
                                    </div>
                                    <div className="col-md-12 mb-1">
                                        <label htmlFor="Username" className="form-label">
                                            Password
                                        </label>
                                        <InputText keyfilter={'hex'} required className='w-100' name='password'></InputText>
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
                                    <Button className="p-button-sm p-button-info" icon="pi pi-fw pi-facebook" label='Facebook'></Button>
                                    <Button className="p-button-sm p-button-danger" icon="pi pi-fw pi-google" label='Google'></Button>
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
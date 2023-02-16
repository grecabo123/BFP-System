import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useEffect, useRef, useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import swal from 'sweetalert';
import {Toast} from 'primereact/toast';


function Create() {

    const [checked, setChecked] = useState(false);
    const [addressdata, setAddressdata] = useState([]);
    const refcode = useRef(null);
    const [btndis, setBtndis] = useState(false);
    const [selected, setSelected] = useState([]);
    const [FileUpload, setFile] = useState();
    const toast = useRef();
    const [register, setRegister] = useState({
        owner: "",
        business: "",
        email: "",
        contact: "",
        address: "",
        password: "",
        error: [],
    });

    useEffect(() =>{
        axios.get(`/api/Barangay`).then(res =>{
            if(res.data.status === 200){
                setAddressdata(res.data.data);
            }
        }).catch((error) =>{
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);
    const fileHandler = (e) => {
        // e.persist();
        setFile({file: e.target.files[0]});
        // console.log(e.target.files[0]);
    }

    const datacol = addressdata.map((brgy, idx) =>{
        return (
            {label: brgy.name, value: brgy.id}
        )
    })

   
    const onRegister = (e) => {
        e.persist();
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    

    const Register = (e) => {
        e.preventDefault();
        const robot = refcode.current.getValue();
        setBtndis(true)
        console.log(FileUpload.file)
        if (checked && robot) {
            const data = new FormData();
            data.append('file',FileUpload.file);
            data.append('owner',register.owner);
            data.append('business',register.business);
            data.append('email',register.email);
            data.append('contact',register.contact);
            data.append('location',register.address);
            data.append('address',selected);
            data.append('password',register.password);
            
            axios.post(`/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    document.getElementById('fromregister').reset();
                    // refcode.reset();
                    setChecked(false)
                    setBtndis(false)
                    setSelected([])
                    toast.current.show({severity: "success", summary: res.data.message, detail: "Registered Account"});
                }
                else {
                    setRegister({ ...register, error: res.data.error });
                    setBtndis(false)
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
        }
        else {
            alert("Please Check The Term and Condition And Verified That you are human.!")
            setBtndis(false)
        }
    }

   

    return (
        <div>
            <Toast ref={toast} />
            <div className="container mt-1">
                <Panel header="Create Account">
                    <form onSubmit={Register} id="fromregister" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Name of Owner</label>
                                <InputText className='w-100' name='owner' onChange={onRegister}></InputText>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Name of Business</label>
                                <InputText className='w-100' name='business'  onChange={onRegister}></InputText>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Business Email</label>
                                <InputText className='w-100' name='email'  onChange={onRegister}></InputText>
                                <small><span className='text-danger'>{register.error.email}</span></small>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Business Contact Number</label>
                                <InputText className='w-100' name='contact'  onChange={onRegister}></InputText>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Address</label>
                                <InputText className='w-100' name='address'  onChange={onRegister}></InputText>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Barangay</label>
                                {/* <InputText className='w-100'></InputText> */}
                                <Dropdown className='w-100' value={selected} onChange={(e) => setSelected(e.target.value)} options={datacol} placeholder="Select Barangay"></Dropdown>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Password</label>
                                <InputText type='password' className='w-100'  onChange={onRegister} name='password'></InputText>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">Attach File</label>
                                <input type="file" onChange={fileHandler} name='file' className='form-file' />
                                {/* <InputText type={'file'} name="file" onChange={onchangeFile} className="w-100 border-0"></InputText> */}
                                {/* <input type="file" onChange={fileHandler} name='file' className='form-control' /> */}
                                <small className='text-danger'>*<span className='text-info'>PDF,PNG,JPG,JPEG - Attach File</span></small>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="col-md-12">
                                <Checkbox onChange={e => setChecked(e.checked)} className="me-2" checked={checked}></Checkbox>
                                <label htmlFor="">Term and Condition</label>
                                {/* <label htmlFor="cb1" className="p-checkbox-label "></label> */}
                                <p className='text-parag'>The Bureau of Fire Protection is commited to protecting your privacy. This Privacy Policy explains how your personal information is collected and disclosed by The Bureau of Fire Protection.
                                    This Privacy Policy applies to our website, and it's associated subdomins(collectively, our "Service") alongside our application Bureau of Fire Protection. By accessing or using our Service, you signify that you have read,undertood, and agree to our collection,storage,use and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.</p>
                            </div>
                        </div>
                        <ReCAPTCHA
                            sitekey="6LcC86wcAAAAAOohkFSsLQ-Pa-6W21_hukOLMYoV"
                            theme="light"
                            ref={refcode}
                        />
                        <div className="mt-3">
                            <Button className='p-button-sm' disabled={btndis} label='Create Account'></Button>
                            <div className="mt-2">
                                <p className='text-parag'><b>Instruction:</b> When You Submit The Data, Kindly Wait At Least 1 Day For Verification To Your Account. Will Notify You By Using Business Email.</p>
                            </div>
                        </div>
                    </form>
                </Panel>
            </div>
        </div>
    )
}

export default Create
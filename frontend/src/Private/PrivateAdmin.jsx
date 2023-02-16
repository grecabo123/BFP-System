import axios from 'axios';
import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import swal from 'sweetalert';
import Admin from '../components/admin/Admin';

function PrivateAdmin({ ...rest }) {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(`/api/checkingrole`).then(res =>{
            if(res.data.status === 200 && res.data.token === 1){
                setAuthenticated(true);
            }
        }).catch((error) =>{
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        })
        return () => {
            setAuthenticated(false);
        }
    }, [])

    // Unauthorized
    axios.interceptors.request.use(undefined, function axiosRetryInterceptor (err) {
        if(err.response.status === 401){
            swal("Warning",err.response.message,'warning');
            history.push('/');
        }
        return Promise.reject(err)
    });

    axios.interceptors.request.use(function (response) {
        return response;
    }, function (error) {
        if(error.response.status === 403){

            // 
            if(error.response.data.token === 2){

            }
        }
        // Page Not Found
        else if(error.response.status === 404){
            swal("Error",error.response.data.message,'error');
            history.push('/admin');
        }
    });


    return (
         <Route {...rest}
            render={({props,location}) =>
                authenticated ?
                (<Admin {...rest} />) : 
                (<Redirect to={{pathname: "/", state: {from:location}}} />)
            }
         />
    )
}

export default PrivateAdmin
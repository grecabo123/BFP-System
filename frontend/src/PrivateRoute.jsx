import axios from 'axios'
import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import Index from './Index';

function PrivateRoute({ ...rest }) {

    const [authenticated, setauthen] = useState(false);

    useEffect(() => {
        axios.get(`/api/checking`).then(res =>{
            if(res.data.status === 1 && res.data.token === 1){
                setauthen(true)
            }
        }).catch((erorr) =>{
            if(erorr.response.status === 500){
                alert("awd")
            }
        })

        return () => {
            setauthen(false)
        }
    }, [])


    // Unauthorized
    axios.interceptors.request.use(undefined, function axiosRetryInterceptor(err) {
        if(err.response.status === 403){
            alert("You must login first")
        }

        return Promise.reject(err)
    });

    axios.interceptors.request.use(function (response) {
        return response
    },function (error) {
        if(error.response.status === 401){


            if(error.response.data.token === 1){

            }
        }
        else if(erorr.response.status === 404){
            alert("Page not found")
        }

        return Promise.reject(error)
    });


    return (
        <Route {...rest}
            render={({props,location}) =>{
                authenticated ? 
                (<Index {...rest}/>) : 
                (<Redirect to={{pathname: "/", state: {from: location}}} />)
            }}
        
        
        />
    )
}

export default PrivateRoute
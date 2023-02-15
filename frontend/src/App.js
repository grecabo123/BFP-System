import axios from 'axios'
import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <Router>
            <Switch>
                <Route></Route>
            </Switch>
        </Router>
    )
}

export default App
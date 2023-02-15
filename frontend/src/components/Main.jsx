import React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import PublicRoutes from '../routes/PublicRoutes'
import img from '../image/banner.jpg'

function Main() {
    return (
        <React.Fragment>
            {/* <img src={img} className='img-responsive' alt="" /> */}
            <section className=" d-flex flex-column min-vh-100">
                <div className="banner">
                    <div className="container">
                        <div className="flex">
                            <h4></h4>
                            <div className="list-nav-item">
                                <ul>
                                    <li><Link to={'/'}>Login</Link></li>
                                    <li><Link to={'/about'}>About</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <center><h1 className='text-light'>Web Portal and Decision Support System</h1></center>
                    
                    <center><h4 className='text-light'>For the Bureau of Fire Protection</h4></center>
                </div>
                <Switch>
                    {
                        PublicRoutes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => <route.component {...props} />}
                                    />
                                )
                            )
                        })
                    }
                    <Redirect from='/' to={'/'} />
                </Switch>
            </section>
        </React.Fragment>

    )
}

export default Main
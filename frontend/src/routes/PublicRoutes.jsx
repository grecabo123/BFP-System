import About from "../components/About";
import Create from "../components/Create";
import Login from "../components/Login";


const PublicRoutes = [
    {path: "/", exact: true, name: "Login",component: Login},
    {path: "/about", exact: true, name: "About",component: About},
    {path: "/create", exact: true, name: "Create",component: Create},
];

export default PublicRoutes;
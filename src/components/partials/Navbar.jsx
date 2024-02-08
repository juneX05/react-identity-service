import {useAuth} from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

const Navbar = () => {
    const {logout, user} = useAuth()
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                        className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-user-circle"></i> {user?.email} <br/>
                        {/*<span className="badge badge-warning navbar-badge">15</span>*/}
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-header">{user?.email}</span>
                        <div className="dropdown-divider"></div>
                        {/*<a href="#" className="dropdown-item">*/}
                        {/*    <i className="fas fa-envelope mr-2"></i> 4 new messages*/}
                        {/*    <span className="float-right text-muted text-sm">3 mins</span>*/}
                        {/*</a>*/}
                        {/*<div className="dropdown-divider"></div>*/}
                        <Link to={"/profile"} href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2"></i> Profile
                        </Link>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-cogs mr-2"></i> Settings
                        </a>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-divider"></div>
                        <a onClick={logout} href="#" className="dropdown-item dropdown-footer bg-danger">
                            <i className="fas fa-power-off mr-2"></i>
                            Logout</a>
                    </div>
                </li>
                {/*<li className="nav-item">*/}
                {/*    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">*/}
                {/*        <i className="fas fa-th-large"></i>*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
}

export default Navbar
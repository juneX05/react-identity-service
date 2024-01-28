import {NavLink, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

const menus = [
    {
        name: 'home',
        title: 'Home',
        icon: 'fas fa-tachometer-alt',
        path: '/dashboard',
    },
    {
        name: 'domains',
        title: 'Domains',
        icon: 'fas fa-globe',
        path: '#',
        children: [
            {
                name: 'view_domains',
                title: 'View Domains',
                icon: 'fas fa-globe',
                path: '/domains/list',
            },
            {
                name: 'create_domain',
                title: 'Create Domain',
                icon: 'fas fa-globe',
                path: '/domains/create',
            }
        ],
    },
    {
        name: 'simple_link',
        title: 'Simple Link',
        icon: 'fas fa-tachometer-alt',
        path: '/simple',
        badge: {
            title: 'New',
            color: 'success'
        }
    }
]


const Sidebar = () => {
    const {user} = useAuth()
    const pathname = useLocation().pathname
    const isActive = (path, children = []) => {
        if (children.length > 0) {
            for (const key in children) {
                if(isActive(children[key].path)) {
                    return true;
                }
            }
        }

        return pathname === path
    }
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/" className="brand-link">
                <img src={"/src/assets/dist/img/AdminLTELogo.png"} alt="AdminLTE Logo"
                     className="brand-image img-circle elevation-3"
                     style={{opacity: .8}}/>
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={"/src/assets/dist/img/avatar.png"} className="img-circle elevation-2"
                             alt="User Image"/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{user?.firstName} {user?.lastName}</a>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column nav-compact nav-child-indent" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {
                            menus.map((menu, index) => {
                                if (menu.children) {
                                    return (
                                        <li className={`nav-item ${isActive(menu.path, menu.children) ? 'menu-open' : ''}`} key={index}>
                                            <a href={'#'}
                                                     className={`nav-link ${isActive(menu.path, menu.children) ? 'active' : ''}`}>
                                                <i className={`nav-icon ${menu.icon}`}></i>
                                                <p>
                                                    {menu.title}
                                                    <i className="right fas fa-angle-left"></i>
                                                </p>
                                            </a>

                                            <ul className="nav nav-treeview">
                                                {menu.children.map((child, child_index) => {
                                                    return <li className="nav-item" key={child_index}>
                                                        <NavLink to={child.path}
                                                                 className={`nav-link ${isActive(child.path)}`}>
                                                            <i className={`nav-icon ${child.icon}`}></i>
                                                            <p>
                                                                {child.title}
                                                            </p>
                                                        </NavLink>
                                                    </li>
                                                })}
                                            </ul>
                                        </li>
                                    )
                                } else {
                                    return <li className="nav-item" key={index}>
                                        <NavLink key={index} to={menu.path}
                                                 className={`nav-link ${isActive(menu.path) ? 'active' : ''}`}>
                                            <i className={`nav-icon ${menu.icon}`}></i>
                                            <p>
                                                {menu.title}
                                            </p>
                                        </NavLink>
                                    </li>
                                }
                            })
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

    export default Sidebar
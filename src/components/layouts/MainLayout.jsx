import Navbar from "../partials/Navbar.jsx";
import Sidebar from "../partials/Sidebar.jsx";
import Content from "../partials/Content.jsx";
import RightSidebar from "../partials/RightSidebar.jsx";
import Footer from "../partials/Footer.jsx";
import {useEffect} from "react";

const MainLayout = ({pageHeader, ...props}) => {
    useEffect( () => {
        // $('body').attr('class','layout-fixed sidebar-mini text-sm')
        // $('body').Layout('fixLayoutHeight')
    }, [])
    return (
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
            <Content pageHeader={pageHeader}>
                {props.children}
            </Content>
            <RightSidebar/>
            <Footer/>
        </div>
    )
}

export default MainLayout
import {useEffect, useState} from "react";
import {useImmer} from "use-immer";
import {getDomains, saveDomain} from "../../../services/client.js";
import MainLayout from "../../layouts/MainLayout.jsx";

const Dashboard = () => {

    const [domains, setDomains] = useState([]);
    const [loadingDomain, setLoadingDomain] = useState(false);

    useEffect( () => {
        $('body').attr('class','sidebar-mini text-sm')

        getAllDomains()
    }, [])

    const getAllDomains = () => {
        setLoadingDomain(true)
        getDomains().then( res => {
            setDomains(res.data)
        }).catch(err => {
            console.log(err)
        }).finally( () => {
            setLoadingDomain(false)
        })
    }

    const Loader = () => {
        if (loadingDomain) {
            return <div className="overlay dark">
                <i className="fas fa-2x fa-spinner fa-spin"></i>
            </div>
        }
        return null;
    }

    const Dashboard = () => {
        return <div className="text-center">

            <b>Dashboard</b>

        </div>
    }

    return <MainLayout
        pageHeader="Dashboard"
    >

        <div className="card">
            <div className="card-header py-2 bg-gray d-flex align-items-center">
                <h3 className="card-title">Dashboard</h3>
                {/*<div className="card-tools ml-auto">*/}
                {/*    <button data-toggle="modal" data-target="#modal-xl"*/}
                {/*        className="btn btn-primary btn-sm">Add Domain</button>*/}
                {/*</div>*/}
            </div>

            <Dashboard />

            <Loader />
        </div>
    </MainLayout>
}

export default Dashboard

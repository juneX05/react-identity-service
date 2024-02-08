import {useEffect} from "react";
import {useImmer} from "use-immer";
import {getDashboard} from "../../../../services/client.js";
import MainLayout from "../../../layouts/MainLayout.jsx";

const Dashboard = () => {

    const [data, setData] = useImmer([]);
    const [loading, setLoading] = useImmer(false);

    useEffect( () => {
        // $('body').attr('class','sidebar-mini text-sm')

        // getDashboardData()
    }, [])

    const getDashboardData = () => {
        setLoading(true)
        getDashboard().then( res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        }).finally( () => {
            setLoading(false)
        })
    }

    const Loader = () => {
        if (loading) {
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

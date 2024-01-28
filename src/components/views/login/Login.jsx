import {useEffect} from "react";
import {useImmer} from "use-immer";
import {useAuth} from "../../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {getUserDetails} from "../../../services/client.js";

const Login = () => {

    const notificationInitialValue = {
        status: null,
        message: null
    }
    const errorsInitialValue = {
        email: '',
        password: ''
    }
    const recordInitialValue = {
        email: '',
        password: ''
    }

    const [record, updateRecord] = useImmer({...recordInitialValue})
    const [errors, updateErrors] = useImmer({...errorsInitialValue})
    const [notification, updateNotification] = useImmer({...notificationInitialValue})
    const [loading, updateLoading] = useImmer(false)

    const ValidateRecord = () => {
        return record.email == "" || record.password == ""
    }

    const handleRecordUpdate = (e) => {
        const field = e.target.id;
        const value = e.target.value;

        updateRecord( draft => {
            draft[field] = value
        })
    }

    const handleErrorsUpdate = (field, value) => {
        updateErrors( draft => {
            draft[field] = value
        } )
    }

    const {login, user, setCurrentUserDetails} = useAuth()
    const navigate = useNavigate()
    const Submit = () => {
        updateErrors({...errorsInitialValue})
        updateNotification({...notificationInitialValue})
        updateLoading(true)

        login(record)
            .then(async r => {
                updateNotification({
                    status: r.status,
                    message: r.message
                })

                if (r.status) {
                    setCurrentUserDetails()
                    setTimeout(() => {
                        window.location.href="/dashboard"
                        // navigate("/dashboard")
                        updateLoading(false)

                    }, 2000)
                } else {
                    for (const key in r.data) {
                        handleErrorsUpdate(key, r.data[key])
                    }
                    updateLoading(false)
                }
            })
            .catch(err => {
                updateNotification({
                    status: false,
                    message: "An Error Occurred"
                })
                console.log(err)
                updateLoading(false)
            })
    }

    useEffect(() => {
        $('body')
            .attr('class', 'hold-transition login-page')
            .attr('style', 'height: revert-layer;')
            .Layout('fixLoginRegisterHeight')
        if (user) {
            // navigate("/dashboard")
            window.location.href = "/dashboard"
        }
    },[])

    const Alert = () => {
        if (notification.status === true) {
            return <div className="alert alert-success alert-dismissible">
                <button type="button" className="close" data-dismiss="alert"
                        aria-hidden="true">&times;</button>
                <h5><i className="icon fas fa-check"></i> Success!</h5>
                {notification.message}
            </div>
        }

        if (notification.status === false) {
            return <div className="alert alert-danger alert-dismissible">
                <button type="button" className="close" data-dismiss="alert"
                        aria-hidden="true">&times;</button>
                <h5><i className="icon fas fa-ban"></i> Error!</h5>
                {notification.message}
            </div>
        }

    }


    return (<>
        <div className="login-box">
            {/* /.login-logo */}
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <a href="/" className="h1"><b>TIZ</b>PESA</a>
                </div>
                <div className="card-body">
                    <Alert />
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form>
                        <div className="input-group mb-3">
                            <input onChange={handleRecordUpdate} id="email" type="email" className="form-control" placeholder="Email"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input onChange={handleRecordUpdate} id="password" type="password" className="form-control" placeholder="Password"/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/*<div className="col-8">*/}
                            {/*    <div className="icheck-primary">*/}
                            {/*        <input type="checkbox" id="remember"/>*/}
                            {/*        <label htmlFor="remember">*/}
                            {/*            Remember Me*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/* /.col */}
                            <div className="col-12">
                                <button onClick={Submit} disabled={ValidateRecord() || loading} type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                            {/* /.col */}
                        </div>
                    </form>

                    {/*<div className="social-auth-links text-center mt-2 mb-3">*/}
                    {/*    <a href="#" className="btn btn-block btn-primary">*/}
                    {/*        <i className="fab fa-facebook mr-2"></i> Sign in using Facebook*/}
                    {/*    </a>*/}
                    {/*    <a href="#" className="btn btn-block btn-danger">*/}
                    {/*        <i className="fab fa-google-plus mr-2"></i> Sign in using Google+*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    {/*/!* /.social-auth-links *!/*/}

                    {/*<p className="mb-1">*/}
                    {/*    <a href="/">I forgot my password</a>*/}
                    {/*</p>*/}
                    {/*<p className="mb-0">*/}
                    {/*    <a href="/" className="text-center">Register a new membership</a>*/}
                    {/*</p>*/}
                </div>
                {/* /.card-body */}
            </div>
            {/* /.card */}
        </div>
        {/* /.login-box */}
    </>)
}

export default Login
import MainLayout from "../../../../layouts/MainLayout.jsx";
import Alert from "../../../../partials/Alert.jsx";
import {useImmer} from "use-immer";
import {useAuth} from "../../../../../context/AuthContext.jsx";
import {useEffect} from "react";
import {getUserDetails, updateDetails} from "../../../../../services/client.js";
import {useNavigate} from "react-router-dom";

const UserProfileDetails = () => {
    const [profile,profileUpdate] = useImmer({})
    const [notification,setNotification] = useImmer({})
    const [errors,setErrors] = useImmer({})
    const [loading,setLoading] = useImmer(false)
    const [email,setEmail] = useImmer("")
    const {logout, setCurrentUserDetails} = useAuth()
    const navigate = useNavigate()

    useEffect( () => {

        setUserDetails();

    }, [])

    const setUserDetails = () => {
        getUserDetails().then( res => {
            if (res.status) {
                profileUpdate({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                })

                setEmail(res.data.email)
            }
        })
    }

    const handleProfileUpdate = (e) => {
        const field = e.target.id;
        const value = e.target.value;

        profileUpdate( draft => {
            draft[field] = value
        })
    }

    const handleErrorsUpdate = (field, value) => {
        setErrors( draft => {
            draft[field] = value
        })
    }

    const validateProfileUpdate = () => {
        return profile.firstName == ''
        || profile.lastName == ''
        || profile.email == ''
    }


    const SubmitProfileUpdate = () => {
        setErrors({})
        setNotification(null)
        setLoading(false)

        updateDetails(profile).then(res => {
            setNotification({
                status: res.status,
                message: res.message
            })

            if (res.status) {
                setTimeout(() => {
                    setLoading(false)
                    setNotification(null)

                    if (profile.email !== email) {
                        logout()
                    }

                    setUserDetails();
                    setCurrentUserDetails();
                }, 2000)

            } else {
                for (const key in res.data) {
                    handleErrorsUpdate(key, res.data[key])
                }
                setLoading(false)
            }
        })
    }

    const UserProfileBody = () => {
        return (<>
            <div className={"card-body"}>
                <Alert />

                {/* form start */}
                <form className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="firstName" className="col-form-label">First Name</label>
                        <input onChange={handleProfileUpdate} value={profile.firstName}
                               type="text" className="form-control form-control-sm" id="firstName"
                               placeholder="First Name"/>
                        <div className="text-danger">{errors.firstName}</div>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="lastName" className="col-form-label">Last Name</label>
                        <input onChange={handleProfileUpdate} value={profile.lastName}
                               type="text" className="form-control form-control-sm" id="lastName"
                               placeholder="Last Name"/>
                        <div className="text-danger">{errors.lastName}</div>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email" className="col-form-label">Email</label>
                        <input onChange={handleProfileUpdate} value={profile.email}
                               type="text" className="form-control form-control-sm" id="email"
                               placeholder="Domain Name"/>
                        <div className="text-danger">{errors.email}</div>
                    </div>
                    {/*<div className="form-group row">*/}
                    {/*    <div className="offset-sm-4 col-sm-8">*/}
                    {/*        <div className="form-check">*/}
                    {/*            <input type="checkbox" className="form-check-input" id="exampleCheck2"/>*/}
                    {/*            <label className="form-check-label" htmlFor="exampleCheck2">I confirm everything is OK</label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </form>
            </div>

            <div className={"card-footer d-flex justify-content-between"}>
                <button type="button" className="btn btn-primary" disabled={validateProfileUpdate() || loading} onClick={SubmitProfileUpdate}>Update Profile Details</button>
            </div>
        </>)
    }

    const NoDetailsBody = () => {
        return (<>
            <div className={"card-body"}>
                <h3 className={"text-center"}>
                    No Details
                </h3>
            </div>
        </>)
    }

    return <div className="card">
        <div className="card-header py-2 bg-gray d-flex align-items-center">
            <h3 className="card-title">User Profile</h3>
            <div className="card-tools ml-auto">
                {/*<Link data-toggle="modal" data-target="#modal-xl"*/}
                {/*      className="btn btn-primary btn-sm" to={"/domains/create"}>Add Domain</Link>*/}
            </div>
        </div>

        { Object.keys(profile).length > 0
            ? UserProfileBody()
            : NoDetailsBody()
        }

    </div>
}

export default UserProfileDetails
import Alert from "../../../../partials/Alert.jsx";
import {useImmer} from "use-immer";
import {changePassword} from "../../../../../services/client.js";

const ChangePassword = () => {
    const initialValue = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }
    const [form, setForm] = useImmer({...initialValue})
    const [errors, setErrors] = useImmer({...initialValue})
    const [notification, setNotification] = useImmer(null)
    const [loading, setLoading] = useImmer(false)

    const handleFormUpdate = (e) => {
        const field = e.target.id;
        const value = e.target.value;

        setForm( draft => {
            draft[field] = value
        })
    }
    const handleErrorsUpdate = (field, value) => {
        setErrors( draft => {
            draft[field] = value
        })
    }

    const validate = () => {

    }

    const Submit = () => {
        setLoading(true)
        setNotification(null)
        setErrors({...initialValue})
        changePassword(form).then(res => {
            setNotification({
                status: res.status,
                message: res.message
            })

            if (res.status) {
                setTimeout(() => {
                    setLoading(false)
                    setNotification(null)
                    setForm({...initialValue})
                }, 2000)

            } else {
                for (const key in res.data) {
                    handleErrorsUpdate(key, res.data[key])
                }
                setLoading(false)
            }
        })
    }

    return <div className="card">
        <div className="card-header py-2 bg-gray d-flex align-items-center">
            <h3 className="card-title">Change Password</h3>
            <div className="card-tools ml-auto">
                {/*<Link data-toggle="modal" data-target="#modal-xl"*/}
                {/*      className="btn btn-primary btn-sm" to={"/domains/create"}>Add Domain</Link>*/}
            </div>
        </div>

        <div className={"card-body"}>
            <Alert notification={notification} />

            {/* form start */}
            <form className="row">
                <div className="form-group col-md-12">
                    <label htmlFor="oldPassword" className="col-form-label">Old Password</label>
                    <input onChange={handleFormUpdate} value={form.oldPassword}
                           type="password" className="form-control form-control-sm" id="oldPassword"
                           placeholder="Old Password"/>
                    <div className="text-danger">{errors.oldPassword}</div>
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="newPassword" className="col-form-label">New Password</label>
                    <input onChange={handleFormUpdate} value={form.newPassword}
                           type="password" className="form-control form-control-sm" id="newPassword"
                           placeholder="New Password"/>
                    <div className="text-danger">{errors.newPassword}</div>
                </div>
                <div className="form-group col-md-12">
                    <label htmlFor="confirmPassword" className="col-form-label">Confirm Password</label>
                    <input onChange={handleFormUpdate} value={form.confirmPassword}
                           type="password" className="form-control form-control-sm" id="confirmPassword"
                           placeholder="Confirm Password"/>
                    <div className="text-danger">{errors.confirmPassword}</div>
                </div>
            </form>
        </div>

        <div className={"card-footer d-flex justify-content-between"}>
            <button type="button" className="btn btn-primary float-left" disabled={validate() || loading} onClick={Submit}>Change Password</button>
        </div>

    </div>
}

export default ChangePassword
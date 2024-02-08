
import {useImmer} from "use-immer";
import {saveDomain} from "../../../../services/client.js";
import MainLayout from "../../../layouts/MainLayout.jsx";
import {Link, useNavigate} from "react-router-dom";
import Alert from "../../../partials/Alert.jsx";

const DomainCreate = () => {
    const navigate = useNavigate();

    const domainInitialValue = {
        name: '',
        url: '',
        administratorEmail: '',
        administratorFirstName: '',
        administratorLastName: '',
        logo: {},
        commissionPercentage: '',
    }
    const notificationInitialValue = {
        status: null,
        message: null
    }
    const [notification, updateNotification] = useImmer({...notificationInitialValue})
    const [domain, updateDomain] = useImmer({...domainInitialValue})
    const [domainErrors, updateDomainErrors] = useImmer({...domainInitialValue})
    const [loadingSaveDomain, setLoadingSaveDomain] = useImmer(false)

    const ValidateDomain = () => {
        return domain.name == ''
            || domain.url == ''
            || domain.administratorEmail == ''
            || domain.administratorFirstName == ''
            || domain.administratorLastName == ''
            || domain.commissionPercentage == ''
            || domain.logo == ''
    }

    const handleDomainUpdate = (e) => {
        const field = e.target.id;
        let value;
        if (field === "logo") {
            value = e.target.files[0]
        } else {
            value = e.target.value
        }

        updateDomain(draft => {
            draft[field] = value
        })
    }

    const handleDomainErrorsUpdate = (field, value) => {
        updateDomainErrors(draft => {
            draft[field] = value
        })
    }

    const Submit = () => {
        updateDomainErrors({...domainInitialValue})
        updateNotification({...notificationInitialValue})
        setLoadingSaveDomain(true)

        saveDomain(domain)
            .then(r => {
                updateNotification({
                    status: r.status,
                    message: r.message
                })

                if (r.status) {
                    setTimeout( () => {
                        $('#create_domain_close_btn').trigger('click')

                        setLoadingSaveDomain(false)
                        navigate("/domains/list")
                    },3000)
                } else {
                    for (const key in r.data) {
                        handleDomainErrorsUpdate(key, r.data[key])
                    }
                    setLoadingSaveDomain(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoadingSaveDomain(false)
            })
    }

    return <MainLayout
        pageHeader="Domains"
    >

        <div className="card">
            <div className="card-header py-2 bg-gray d-flex align-items-center">
                <h3 className="card-title">Create Domain</h3>
                <div className="card-tools ml-auto">
                    <Link to={"/domains/list"} data-toggle="modal" data-target="#modal-xl"
                        className="btn btn-primary btn-sm">
                        <i className={"fa fa-arrow-left"} /> &nbsp;
                        Back to All Domains
                    </Link>
                </div>
            </div>

            <div className={"card-body"}>
                <Alert notification={notification}/>

                {/* form start */}
                <form className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name" className="col-form-label">Name</label>
                        <input onChange={handleDomainUpdate}
                               type="text" className="form-control form-control-sm" id="name" placeholder="Domain Name"/>
                        <div className="text-danger">{domainErrors.name}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="name" className="col-form-label">URL</label>
                        <input onChange={handleDomainUpdate}
                               type="text" className="form-control form-control-sm" id="url" placeholder="URL"/>
                        <div className="text-danger">{domainErrors.url}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="name" className="col-form-label">Commission Percentage</label>
                        <input onChange={handleDomainUpdate}
                               type="text" className="form-control form-control-sm" id="commissionPercentage" placeholder="Commission Percentage"/>
                        <div className="text-danger">{domainErrors.commissionPercentage}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="name" className="col-form-label">Administrator Email</label>
                        <input onChange={handleDomainUpdate}
                               type="text" className="form-control form-control-sm" id="administratorEmail" placeholder="Administrator Email"/>
                        <div className="text-danger">{domainErrors.administratorEmail}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="name" className="col-form-label">Administrator First Name</label>
                        <input onChange={handleDomainUpdate}
                               type="text" className="form-control form-control-sm" id="administratorFirstName" placeholder="Administrator First Name"/>
                        <div className="text-danger">{domainErrors.administratorFirstName}</div>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="name" className="col-form-label">Administrator Last Name</label>
                        <input onChange={handleDomainUpdate}
                               type="text" className="form-control form-control-sm" id="administratorLastName" placeholder="Administrator Last Name"/>
                        <div className="text-danger">{domainErrors.administratorLastName}</div>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="logo">Logo</label>
                        <div className="custom-file">
                            <input onChange={handleDomainUpdate}
                                   type="file" className="custom-file-input" id="logo" />
                            <label className="custom-file-label" htmlFor="logo">
                                {domain.logo ? domain.logo.name : 'Choose File'}
                            </label>
                        </div>
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
                <button id="create_domain_close_btn" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary ml-auto" disabled={ValidateDomain() || loadingSaveDomain} onClick={Submit}>Save changes</button>
            </div>

        </div>
    </MainLayout>
}

export default DomainCreate

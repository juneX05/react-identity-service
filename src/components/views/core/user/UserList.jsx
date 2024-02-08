import {useEffect, useState} from "react";
import {useImmer} from "use-immer";
import {getUsers} from "@/services/client";
import MainLayout from "../../../layouts/MainLayout.jsx";
import {Link, useNavigate} from "react-router-dom";

const UserList = () => {

    const [records, setRecords] = useImmer([]);
    const [params, setParams] = useImmer({});
    const [loading, setLoading] = useImmer(false);
    const [search, setSearch] = useImmer({
        firstName: '',
        lastName: '',
        email: '',
        createdAt: '',
        userType: 0,
        role: 0,
        userStatus: 0,
        sort: '',
        direction: ''
    })

    useEffect(() => {


        select2Fields.forEach((item, index) => {
            $('#' + item).select2().on('select2:select', function (e) {
                handleSearchParam(item, e.params.data.id)
            })
        })

        dateFields.forEach((item, index) => {
            $('#' + item).datetimepicker({
                format: 'DD-MM-yyyy'
            })

            $('#' + item).on('change.datetimepicker', function ({date, oldDate}) {
                const newDate = (date) ? date.format("yyyy-MM-DD") : ""
                setSearch(draft => {
                    draft['createdAt'] = newDate
                })
            })
        })

        getAllRecords()

    }, [])

    const select2Fields = ['userType', 'role', 'userStatus','sort','direction'];
    const dateFields = ['createdAt'];

    let url = new URL(window.location.href)
    let searchParams = url.searchParams;

    const rebuildUrl = async (filters = {}) => {
        for (const key in params) {
            searchParams.set(key, params[key])
        }

        for (const key in filters) {
            if (filters[key] !== '') {
                searchParams.set(key, filters[key])
            } else {
                searchParams.set(key, '')
            }
        }

        url.search = searchParams.toString()

        history.pushState(
            {pageID: 'users-list'},
            'Users List',
            url.toString()
        );
    }

    const getAllRecords = () => {
        setLoading(true)
        getUsers(url.searchParams.toString()).then(async (res) => {
            if (res.data) {
                await setRecords(res.data.content)
                await setParams(res.data.params)
                await handleSearchParams(res.data.params)
                await rebuildUrl(res.data.params)
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const Loader = () => {
        if (loading) {
            return <div className="overlay dark ">
                <i className="fas fa-2x fa-spinner fa-spin"></i>
            </div>
        }
        return null;
    }


    const UserList = () => {

        const UserListItem = ({title, value, className, index, children}) => {
            const borderColor = 'rgba(0,0,0,0.1)'
            return (
                <div
                    className={className + " pb-1 pt-1"} style={{border: '1px solid ' + borderColor}}>
                    {
                        value ? (<>
                                <div className={"text-nowrap text-uppercase"}> {title} </div>
                                <div className={"ml-auto text-nowrap text-md text-bold"}>{value}</div>
                            </>)
                            : children
                    }
                </div>
            )
        }

        return <div className="card-body pt-1">
            {
                (records.map((value, index, array) => {
                    const bgColor = (index % 2 ? 'rgba(0,0,0,0.05)' : '')

                    return (<div className={"card row mb-1"}
                                 style={{backgroundColor: bgColor, cursor: 'pointer',}} key={index+"card"}>
                        <div className={"card-body px-2 py-0"}>
                            <div className={"row"}>
                                <UserListItem key={index + 'sn'} className={" p-2 d-flex align-items-center"}
                                              index={index}
                                              title={""}
                                              value={index + 1}/>
                                <div className={"col"}>
                                    <div className={"row"}>
                                        <UserListItem key={index + 'firstName'} className={"col"} index={index}
                                                      title={"First Name"}
                                                      value={value.firstName}/>
                                        <UserListItem key={index + 'lastName'} className={"col"} index={index}
                                                      title={"Last Name"}
                                                      value={value.lastName}/>
                                        <UserListItem key={index + 'email'} className={"col"} index={index}
                                                      title={"Email"}
                                                      value={value.email}/>
                                        <UserListItem key={index + 'createdAt'} className={"col"} index={index}
                                                      title={"Created At"}
                                                      value={value.createdAt}/>
                                        <UserListItem key={index + 'userType'} className={"col"} index={index}
                                                      title={"User Type"}
                                                      value={value.userType.name}/>
                                        <UserListItem key={index + 'mainRole'} className={"col"} index={index}
                                                      title={"Main Role"}
                                                      value={value.userType.role.name}/>
                                        <UserListItem key={index + 'userStatus'} className={"col"} index={index}
                                                      title={"User Status"} value={value.userStatus.name}/>
                                    </div>

                                </div>
                                <UserListItem key={index + 'actions'} className={" col-12 col-sm-auto w- d-flex align-items-center"}
                                              index={index}
                                              title={""} value={""}>
                                    <button key={index + 'view-btn'} className={"btn btn-primary btn-xs m-1 w-100"}>View</button>
                                </UserListItem>

                            </div>

                        </div>
                    </div>)
                }))
            }
        </div>
    }


    const handleSearch = (e) => {
        const field = e.target.name;
        const value = e.target.value

        handleSearchParam(field, value)
    }
    const handleSearchParam = (field,value) => {
        setSearch(draft => {
            draft[field] = value
        })
        if (select2Fields.includes(field)) {
            $('#' + field).select2().val(value).trigger('change')
        }
    }
    const handleSearchParams = (params) => {
        for (const key in params) {
            handleSearchParam(key, params[key])
        }
    }

    const filterData = () => {
        rebuildUrl(search).then(() => getAllRecords())
        $('#filter-collapse').trigger('click')
    }

    return <MainLayout
        pageHeader="Users"
    >
        <div className="card collapsed-card">
            <div className="card-header bg-gray d-flex align-items-center">
                <button id={"filter-collapse"} className="d-flex btn btn-tool pl-0 text-white btn-block" data-card-widget="collapse">
                    <h3 className={"card-title"}>Filters</h3>
                    <div className={"ml-auto"}><i className="fas fa-plus"></i></div>
                </button>
            </div>
            <div className={"card-body p-2"}>
                <div className={"row"}>
                    <div className={"col-sm-4 mb-1"}>
                        <input onChange={handleSearch}
                               key="filter-first-name"
                               name="firstName"
                               type="text"
                               className="form-control form-control-sm"
                               placeholder="First Name"
                               value={search?.firstName}
                        />
                    </div>
                    <div className={"col-sm-4 mb-1"}>

                        <input onChange={handleSearch}
                               key="filter-last-name"
                               name="lastName"
                               type="text"
                               className="form-control form-control-sm"
                               placeholder="Last Name"
                               value={search?.lastName}
                        />
                    </div>
                    <div className={"col-sm-4 mb-1"}>
                        <input onChange={handleSearch}
                               key="filter-email"
                               name="email"
                               type="text"
                               className="form-control form-control-sm"
                               placeholder="Email"
                               value={search?.email}
                        />
                    </div>
                    <div className={"col-sm-4 mb-1"}>
                        <input
                               id="createdAt"
                               name="createdAt"
                               type="text"
                               defaultValue={search?.createdAt}
                               className="form-control form-control-sm col-12 datetimepicker-input"
                               placeholder="Created Date"
                               readOnly={true}
                               data-target="#createdAt"
                               data-toggle="datetimepicker"
                        />
                    </div>
                    <div className={"col-sm-4 mb-1"}>
                        <select
                            id="userType"
                            className="form-control form-control-sm select2"
                            style={{width: '100%'}}
                            defaultValue={search?.userType}>
                            <option value={0}>--Select User Type--</option>
                            <option value={1}>Developer</option>
                            <option value={2}>SuperAdmin</option>
                            <option value={3}>Admin</option>
                        </select>
                    </div>
                    <div className={"col-sm-4 mb-1"}>
                        <select
                            id="role"
                            className="form-control form-control-sm select2"
                            style={{width: '100%'}}
                            defaultValue={search?.role}>
                            <option value={0}>--Select Main Role--</option>
                            <option value={1}>Developer</option>
                            <option value={2}>SuperAdmin</option>
                            <option value={3}>Admin</option>
                        </select>
                    </div>
                    <div className={"col-sm-4 mb-1"}>
                        <select
                            id="userStatus"
                            className="form-control form-control-sm select2"
                            style={{width: '100%'}}
                            defaultValue={search?.userStatus}>
                            <option value={0}>--Select Status--</option>
                            <option value={1}>Active</option>
                            <option value={2}>Pending</option>
                            <option value={3}>Inactive</option>
                        </select>
                    </div>
                </div>
                <hr className={"bg-gray-light mb-2"}/>
                <div className={"row"}>
                    <div className={"col-sm-6 mb-1"}>
                        <label className={"col-form-label"}>Sort Column</label>
                        <select
                            id="sort"
                            className="form-control form-control-sm select2"
                            style={{width: '100%'}}
                            defaultValue={search?.sort}>
                            <option value={'id'}>ID</option>
                            <option value={'firstName'}>First Name</option>
                            <option value={'lastName'}>Last Name</option>
                            <option value={'email'}>Email</option>
                            <option value={'createdAt'}>Created At</option>
                            <option value={'userType'}>User Type</option>
                            <option value={'mainRole'}>Main Role</option>
                            <option value={'userStatus'}>User Status</option>
                        </select>
                    </div>

                    <div className={"col-sm-6 mb-1"}>
                        <label className={"col-form-label"}>Sort Direction</label>
                        <select
                            id="direction"
                            className="form-control form-control-sm select2"
                            style={{width: '100%'}}
                            defaultValue={search?.direction}>
                            <option value={'asc'}>Ascending</option>
                            <option value={'desc'}>Descending</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={"card-footer"}>
                <button onClick={filterData}
                    className={"btn btn-primary btn-xs btn-block"}>
                    <i className={"fa fa-filter"}></i> Filter
                </button>
            </div>
        </div>

        <div className="card">
            <div className="card-header py-2 bg-gray d-flex align-items-center">
                <h3 className="card-title">Users List</h3>
                <div className="card-tools ml-auto">
                    <Link data-toggle="modal" data-target="#modal-xl"
                          className="btn btn-primary btn-xs" to={"/domains/create"}>Add User</Link>
                </div>
            </div>

            <Loader/>

            {
                records && records.length > 0
                    ? (<UserList/>)
                    : (<div className={"card-body"}><h3 className={"text-center"}>No Records</h3></div>)
            }
        </div>
    </MainLayout>
}

export default UserList

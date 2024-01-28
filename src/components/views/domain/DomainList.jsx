import {useEffect, useState} from "react";
import {useImmer} from "use-immer";
import {getDomains, saveDomain} from "../../../services/client.js";
import MainLayout from "../../../components/layouts/MainLayout.jsx";
import {Link, useNavigate} from "react-router-dom";

const DomainList = () => {


    const [domains, setDomains] = useImmer([]);
    const [params, setParams] = useImmer({});
    const [loadingDomain, setLoadingDomain] = useImmer(false);

    useEffect( () => {
        getAllDomains()
    }, [])

    let url = new URL(window.location.href)
    let searchParams = url.searchParams;

    const rebuildUrl = async (filters = {}) => {
        for(const key in params) {
            searchParams.set(key, params[key])
        }

        for(const key in filters) {
            if (filters[key] !== '') {
                searchParams.set(key, filters[key])
            } else {
                searchParams.set(key, '')
            }
        }

        url.search = searchParams.toString()

        history.pushState(
            {pageID: 'domains-list'},
            'Domains List',
            url.toString()
        );
    }

    const getAllDomains = () => {
        setLoadingDomain(true)
        getDomains(url.searchParams.toString()).then( async (res) => {
            await setDomains(res.data.content)
            await setParams(res.data.params)
            await rebuildUrl(res.data.params)
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

    const DomainsList = () => {
        const [domainSearch, setDomainSearch] = useImmer(params)
        const handleDomainSearch = (e) => {
            const field = e.target.name;
            const value = e.target.value

            setDomainSearch(draft => {
                draft[field] = value
            })
        }

        const filterData = () => {
            console.log(domainSearch)
            rebuildUrl(domainSearch).then(() => getAllDomains())
        }

        useEffect(() => {
            $('#filter-status')
                .select2()
                .on("select2:select", function (e) {
                    let data = e.params.data;
                    setDomainSearch(draft => {
                        draft['status'] = data.id
                    })
                })
                .on("select2:unselect", function () {
                    const data = $(`#${props.id}`).select2('data');
                    console.log(data)
                })
        })

        return <div className="card-body">
            <div className="table-responsive table-responsive-md">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th style={{width: '10px'}}>ID</th>
                        <th style={{width: "100px"}}>Name</th>
                        <th>Administrator Email</th>
                        <th style={{width: "100px"}}>Url</th>
                        <th style={{width: "100px"}}>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <th style={{width: '10px'}}></th>
                        <th>
                            <input onChange={handleDomainSearch}
                                   key="filter-name"
                                   name="name"
                                   type="text"
                                   className="form-control form-control-sm col-12"
                                   placeholder="Domain Name"
                                   value={domainSearch.name}
                            />
                        </th>
                        <th>
                            <input onChange={handleDomainSearch}
                                   key="filter-administrator_email"
                                   name="administratorEmail"
                                   type="text"
                                   className="form-control form-control-sm col-12"
                                   placeholder="Administrator Email"
                                   value={domainSearch.administratorEmail}
                            />
                        </th>
                        <th>
                            <input onChange={handleDomainSearch}
                                   key="filter-url"
                                   name="url"
                                   type="text"
                                   className="form-control form-control-sm col-12"
                                   placeholder="URL"
                                   value={domainSearch.url}
                            />
                        </th>
                        <th>
                            <select
                                id="filter-status"
                                className="form-control form-control-sm select2"
                                style={{width: '100%'}}
                                    defaultValue={domainSearch.status}>
                                <option value={0}>--Select Status--</option>
                                <option value={1}>Active</option>
                                <option value={2}>Pending</option>
                            </select>
                        </th>
                        <th>
                            <button onClick={filterData} className="btn btn-primary btn-xs">Filter</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        domains.length > 0
                        ? (domains.map((value, index, array) => (
                            <tr key={index}>
                                <td>{index +1}</td>
                                <td>{value.name}</td>
                                <td>{value.administratorEmail}</td>
                                <td>{value.url}</td>
                                <td>{value.domainStatus.name}</td>
                                <td>

                                </td>
                             </tr>
                            )))
                        : (
                            <tr>
                                <td colSpan={6}>
                                    <div className="text-center">

                                        <i className="fa fa-info-circle"></i> &nbsp;
                                        <b>No Domains Found. </b>

                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    }

    return <MainLayout
        pageHeader="Domains"
    >

        <div className="card">
            <div className="card-header py-2 bg-gray d-flex align-items-center">
                <h3 className="card-title">Domains List</h3>
                <div className="card-tools ml-auto">
                    <Link data-toggle="modal" data-target="#modal-xl"
                        className="btn btn-primary btn-sm" to={"/domains/create"}>Add Domain</Link>
                </div>
            </div>

            <DomainsList />

            <Loader />
        </div>
    </MainLayout>
}

export default DomainList

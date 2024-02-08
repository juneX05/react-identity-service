

const getAuthConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
}

const dispatchRequest = async (url, method = "GET", data = null, config = {}) => {
    let response;
    try {
        if (method === "GET") {
            response = await axios.get(`${url}`, config)
        } else {
            response = await axios.post(`${url}`, data, config)
        }
    } catch (e) {
        if (e.code === "ERR_NETWORK") response = {data: {status: false, message:'Network Error', data: null}}
        else response = e.response
    }

    return response.data
}

const sendPostRequest = async (url, data = null, auth = true, config = getAuthConfig) => {
    if (auth) return dispatchRequest(url, "POST", data, config)
    return dispatchRequest(url, "POST", data)
}

const sendFormDataRequest = async (url, data = null, auth = true) => {
    const formData = new FormData();
    if (data) {
        for (const key in data) {
            formData.append(key, data[key])
        }
    }
    return sendPostRequest(url, formData, auth, {...getAuthConfig, 'content-type' : 'multipart/form-data'})
}

const sendGetRequest = async (url, auth = true) => {
    if (auth) return dispatchRequest(url, "GET", null, getAuthConfig)
    return dispatchRequest(url, "GET")
}

export const getDashboard = async (params) => {
    return await sendGetRequest('/api/v1/dashboard/data?' + params)
}

export const getDomains = async (params) => {
    return await sendGetRequest('/api/v1/domains/list?' + params)
}

export const getUserDetails = async () => {
    return await sendGetRequest('/api/v1/auth/user')
}

export const changePassword = async (data) => {
    return await sendPostRequest('/api/v1/auth/change-password', data)
}

export const updateDetails = async (data) => {
    return await sendPostRequest('/api/v1/auth/update-details', data)
}

export const logoutUser = async () => {
    return await sendGetRequest('/api/v1/auth/logout')
}

export const saveDomain = async (domain) => {
    return await sendFormDataRequest('/api/v1/domains/register', domain)
}

export const login = async (data) => {
    return await sendPostRequest('/api/v1/auth/login', data, false)
}

export const getUsers = async (params) => {
    return await sendGetRequest('/api/v1/users/list?' + params)
}
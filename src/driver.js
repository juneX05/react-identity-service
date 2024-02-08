import moment from "moment"
import axios from 'axios';

window.moment = moment

try {
    require ("bootstrap")
    require ("select2")
    // require ("daterangepicker")
    require ("tempusdominus-bootstrap-4")
    require ("./assets/dist/js/adminlte")
} catch (e) {

}

window.axios = axios
    .create({
        baseURL: "http://localhost:8091/",
    })

// window.axios.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('token');
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//     return config;
// });
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';



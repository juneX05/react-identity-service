import {
    createContext,
    useContext,
    useEffect,
} from "react";
import {useImmer} from "use-immer";
import {login as performLogin, getUserDetails, logoutUser} from "../services/client.js";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";


const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    useEffect(() => {
        setCurrentUserDetails()
    }, [])

    const [user, setUser] = useImmer(null)

    const login = async (credentials) => {
        return new Promise( (resolve, reject) => {
            performLogin(credentials).then(res => {
                const token = res.data.token
                localStorage.setItem('access_token', token)

                resolve(res);
            }).catch(err => {
                reject(err)
            })
        } )
    }

    const logout = async () => {
        localStorage.removeItem('access_token')
        setUser(null)
        logoutUser().then(res => {
            console.log(res.message)
        })
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) return false;

        const decodedToken = jwtDecode(token)
        if (Date.now() > decodedToken.exp * 1000) {
            logout();
            return false;
        }

        return true
    }

    const setCurrentUserDetails = () => {
        getUserDetails().then(res => {
            if (res.status) setUser(res.data)
            else setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isUserAuthenticated,
            setCurrentUserDetails
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default  AuthProvider
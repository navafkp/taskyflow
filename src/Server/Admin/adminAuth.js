import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;


// axios call for admin login
export const loginAdmin = (email, password) => {
    return axios.post(`${API}/admin/`, {
        email, password
    }).then((response) => {
        const access = response.data.access
        const refresh = response.data.refresh
        const authdata = { 'access': access, 'refresh': refresh }
        return authdata
    }).catch((error) => {
        const data = { 'error': "Unauthorized Access" }
        return data
    });
        
}

// get access from refresh token
export const adminAccess = (refresh) => {
    return axios.post(`${API}/admin/access/`, { refresh })
        .then((resposne) => {
            const access = resposne.data.access
            const refresh = resposne.data.refresh
            const authdata = { 'access': access, 'refresh': refresh }
            return authdata
        }).catch((error => {
            throw error
        })
        )
}



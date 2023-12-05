import axios from "axios";
const API = process.env.REACT_APP_BASE_URL;

// axios call to get the user details
export const GetuserDetail = (access) => {
    return axios.get(`${API}/user/profile/`, {
        headers: {
            Authorization: access
        }
    }).then((response) => {
        return response.data
    }).catch((error) => {
        error = { "error": "no access" }
        return error
    })

}


// axios call to update user details
export const changeDetails = (data, access) => {
    const json_data = { 'data': data, 'access': access }
    return axios.patch(`${API}/user/update/`, json_data)
        .then((response) => {
            console.log(response.data, 'lllllllllll')
            return response.data
        }).catch((error) => {
            console.log(error, 'xxxxxxx')
            return error
        })
}
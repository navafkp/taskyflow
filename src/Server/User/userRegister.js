import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

// axios call for registering new user
export const userRegister = (name, username,  email, workspace, password, password2, role='manager', designation) => {
    const newuserData = { name, username, email,  workspace, password, password2, role , designation};
    const headers = { 'Content-Type': 'application/json' };
    console.log("sddsd")
    return axios.post(`${API}/user/register/`,
        newuserData,
        headers
    ).then((response) => {
        console.log(response.data, '555555')
        return response.data
    }).catch((error) => {
        console.log(error.response.data.error, '66666')
        if (error.response.data.error){
            return error.response.data.error
        }else{
            return error
        }
       
    })

}
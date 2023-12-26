import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

export const blockUser = (id, value, access) => {
    return axios.patch(
        `${API}/user/action/${id}/`,
        value,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {

    }).catch((error) => {

    })
}

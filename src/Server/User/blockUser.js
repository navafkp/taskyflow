import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;

export const blockUser = (id, value, access) => {
    const headers= {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json'
    }

    return axios.patch(
        `${API}/user/action/${id}/`,
            value, 
            {headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }}
        
       
    ).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}

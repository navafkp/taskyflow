import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;


export const GetalluserDetail = (access, work) => {

    return axios.get(`${API}/user/users-list/`,

        {
            params: {
                workspace: work
            },
            headers: {
                // Add any required headers here
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json', // Adjust if needed
            }
        }

    )
    .then((response) => {
        
        return response.data;
    })
    .catch((error) => {
    
        throw error;
    })
}
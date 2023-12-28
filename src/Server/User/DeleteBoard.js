import axios from 'axios';

const API = process.env.REACT_APP_BASE_URL;

export const deleteBoard = (access, id) => {
    return axios.delete(
        `${API}/board/delete/${id}/`,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        console.log(response.data, '9898989898989898')
        return response.data
    }).catch((error) => {
        return error
    });
};



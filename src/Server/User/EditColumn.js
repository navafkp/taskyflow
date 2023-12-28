import axios from 'axios';
const API = process.env.REACT_APP_BASE_URL;

export const editColumn = (access ,title,  columnid , boardId) => {
    return axios.patch(`${API}/boards/columns/`, {
        title: title,
        position: columnid,
        boardID: boardId
    },
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            return response.data
        }).catch((error) => {
            return error
        })
}
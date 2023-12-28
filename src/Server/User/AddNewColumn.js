import axios from "axios";

const API = process.env.REACT_APP_BASE_URL;

export const addNewColumn = (access, boardId, columnTitle, newPosition) => {
    const requestData = {
        position: newPosition,
        boardId:boardId,
        title: columnTitle,
    };
    return axios.post(`${API}/boards/columns/`,
        requestData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((respose) => {
        console.log(respose.data, 'respose.datarespose.datarespose.datarespose.datarespose.data')
        return respose.data
    }).catch((error) => {
        return error
    })

}
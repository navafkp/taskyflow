import axios from 'axios';
const API = process.env.REACT_APP_BASE_URL;

export const createMeetAxios = (access, id, workspace, roomID, description, starting_time, duration) => {

    const requestData = {
        "organizer_id":id,
        'workspace':workspace,
        'roomID':roomID, 
        'description': description, 
        'starting_time': starting_time, 
        'duration':duration,
        
    };
    return axios.post(`http://127.0.0.1:9000/api/meeting/create-meeting/`,
        requestData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((respose) => {
        return respose.data
    }).catch((error) => {
        return error
    })

}
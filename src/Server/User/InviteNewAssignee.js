
import axios from 'axios'
const API = process.env.REACT_APP_BASE_URL;


export const inviteAssignee = (access, emails, card_id) => {
    const requestData = {
        card_id: card_id,
        emails: emails
    };
    return axios.post(`${API}/card/assignee/invite/`,
        requestData,
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        console.log(response.data, 'respose.datarespose.datarespose.datarespose.data')
        return response.data
    }).catch((error) => {
        console.error('Error during inviteAssignee:', error);
        return error
    })

}
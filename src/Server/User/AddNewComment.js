import axios from "axios";

const API = process.env.REACT_APP_BASE_URL;

export const newComment = (access, user_id, user_name, comment, card_id) => {
    console.log(access, user_id, user_name, comment, card_id)
    const requestData = {
        user_name:user_name,
        user_id: user_id,
        comment: comment,
        card_id: card_id
    };
    return axios.post(`${API}/card/comment/${card_id}/`,
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
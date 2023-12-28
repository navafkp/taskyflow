import axios from "axios";
const API = process.env.REACT_APP_BASE_URL;

// getting all cards
export const getCards = (access, board_slug) => {
    return axios.get(`${API}/card/`, {
        params: {
            board_slug: board_slug
        },
        headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.data

    }).catch((error) => {
        return error
    })
}

// dragging one card from one column to another columns update
export const dragCardUpdate = (destination, draggableId, access) => {
    return axios.patch(`${API}/card/`, {
        columnId: destination,
        cardId: draggableId
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

// creating a new card
export const cardCreate = (access, id, title, description, maxNum = 1, emails = null, selectedColor, priority) => {
    return axios.post(`${API}/card/`, {
        'board': id,
        'title': title,
        'description': description,
        'max_members': maxNum,
        'assignee': emails,
        'color': selectedColor,
        'priority':priority
    },
        {
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data, 'response.dataresponse.dataresponse.dataresponse.dataresponse.data')
            return response.data
        }).catch((error) => {
            return error
        })
}
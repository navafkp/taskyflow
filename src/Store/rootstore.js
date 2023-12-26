export const initialstate = {
    // usertoken for user and admin
    usertoken: {
        access: null,
        refresh: null,
        is_authenticated: false,
        type: null,
        registerSuccess: null,
    },
    // logged user data
    userData: null,
    // user-manager collect and store all user data here
    users: [],

    isLoading: false,
    notifications: [],
    allboards: [],
    columns: [],

    //  cards and assignee data
    cardData: {
        cards: [],
        assignee: [],
        comments: [],

    },

    meetingData : [],
 
}

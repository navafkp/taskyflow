export const initialstate = {
    // usertoken for user and admin
    usertoken: {
        access: null,
        refresh: null,
        is_authenticated: false,
        type: null,
        registerSuccess: null,

        
    },
    userData: null,

    // user-manager collect and store all user data here
    users:[],
    isLoading:false,
    notifications:[],
}

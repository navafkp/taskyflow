import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { initialstate } from "./rootstore"
import { GetalluserDetail } from "../Server/User/getallUser"


// get all user details for user - manager

export const alluserDetails = createAsyncThunk('user/alluserDetails', async ({access,workspace}) => {
    const alluserdetails = await GetalluserDetail(access, workspace)

    return alluserdetails
})


const userslistSlice = createSlice({
    name: 'userslistdata',
    initialState: initialstate.users,
    reducers: {
        alluserUpdate: (state, action) =>{
   
            return action.payload

        }
    },

    extraReducers: (builder) => {

        builder.addCase(alluserDetails.fulfilled, (state, action) => {
            
            const userList = JSON.parse(action.payload)
            return userList; // Return the updated state
        })

    }
})

export const {alluserUpdate} = userslistSlice.actions
export default userslistSlice.reducer





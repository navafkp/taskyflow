import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { getAllNotification } from "../Server/User/getNotification";

export const getNotification = createAsyncThunk('user/notication', ({access,workspace})=>{
    const response =  getAllNotification(access,workspace)
    return response

})


const notificationSlice = createSlice({
    name:'notification',
    initialState: initialstate.notifications,
    extraReducers: (builder) => {
        builder
        .addCase(getNotification.fulfilled, (state, action)=>{
            return action.payload
            
        })
    }
})

export default notificationSlice.reducer;
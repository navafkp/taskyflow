import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { gettingBroadcastNotification } from "../Server/User/BroadcastNotification";
import { gettingPersonalNotification } from "../Server/User/gettingPersonalNotification";

// -----MIDDLEWARES---
// get all notification
export const getBroadcastNotification = createAsyncThunk('user/getBroadcastNotification', ({ access, workspace }) => {
    console.log("I am middleware")
    const response = gettingBroadcastNotification(access, workspace)
    console.log(response, 'middleware')
    return response
})


//  get all notification
export const getPersonalNotification = createAsyncThunk('user/getPersonalNotification', ({ access, workspace, email }) => {
    console.log("I am middleware")
    const response = gettingPersonalNotification(access, workspace, email)
    console.log(response, 'middleware')
    return response
})


const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialstate.notifications,
    extraReducers: (builder) => {
        builder
            .addCase(getBroadcastNotification.fulfilled, (state, action) => {
                return {
                    ...state, broadcast: action.payload
                }
            })
            .addCase(getPersonalNotification.fulfilled, (state, action) => {
                if (action.payload.message === 'No notifications found') {
                    return {
                        ...state, personal: []
                    }
                } else {
                    return {
                        ...state, personal: action.payload
                    }
                }

            })
    }
})

export default notificationSlice.reducer;
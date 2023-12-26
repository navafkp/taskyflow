import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { getAllNotification } from "../Server/User/getNotification";

// -----MIDDLEWARES---
// get all notification
export const getNotification = createAsyncThunk('user/notication', ({ access, workspace }) => {
    console.log("I am middleware")
    const response = getAllNotification(access, workspace)
    console.log(response, 'middleware')
    return response
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialstate.notifications,
    extraReducers: (builder) => {
        builder
            .addCase(getNotification.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

export default notificationSlice.reducer;
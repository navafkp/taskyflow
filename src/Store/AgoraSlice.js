// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { initialstate } from "./rootstore";
// import { getAgoraToken } from "../Server/Meeting/GetAgoraToken";


// // -----MIDDLEWARES---
// // get all notification
// export const getAgoraInfo = createAsyncThunk('user/notication', ({ access, channel }) => {
//     const response = getAgoraToken(access, channel)
//     return response

// })

// const AgoraSlice = createSlice({
//     name: 'agoraInfo',
//     initialState: initialstate.agoraInfo,
//     reducers: {
//         clearAgoraInfo: (state, action) => {
//             return initialstate.agoraInfo
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAgoraInfo.fulfilled, (state, action) => {
//                 return action.payload
                
//             })
//     }
// })

// export const {clearAgoraInfo} = AgoraSlice.actions
// export default AgoraSlice.reducer;
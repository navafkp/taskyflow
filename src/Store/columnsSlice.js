import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootstore";
import { getCloumns } from "../Server/User/getColumns";
import { addNewColumn } from "../Server/User/AddNewColumn";

// -----MIDDLEWARES---

// get all columns
export const getAllColumns = createAsyncThunk('user/getAllColumns', async ({ access, board_slug }) => {
    const response = await getCloumns(access, board_slug)
    return response
})

// add a new columns
export const addingColumns = createAsyncThunk('user/addingColumns', async ({ access, boardId, columnTitle, newPosition}) => {
    const response = await addNewColumn(access, boardId, columnTitle, newPosition)
    return response
})


const columnsSlice = createSlice({
    name: 'columns',
    initialState: initialstate.columns,
    extraReducers: (builder) => {
        builder
            .addCase(getAllColumns.fulfilled, (state, action) => {
                return (
                    action.payload
                )
            })
            .addCase(addingColumns.fulfilled, (state, action) => {
                console.log(action.payload)
                return (
                    [...state, action.payload]
                )
            })
    }
})

export default columnsSlice.reducer;
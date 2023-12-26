import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { initialstate } from "./rootstore";
import { userAccess } from "../Server/User/userAuth";
import { userLogin } from "../Server/User/userAuth";
import { loginAdmin } from '../Server/Admin/adminAuth'
import { adminAccess } from "../Server/Admin/adminAuth";

// -----MIDDLEWARES---

// user
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
    const authdata = await userLogin(email, password);
    return authdata
});
// get access from refresh
export const GetAccess = createAsyncThunk('user/GetAccess', async ({ refresh }) => {
    const authdata = await userAccess(refresh)
    return authdata
})

// admin
export const adminLogin = createAsyncThunk('admin/adminLogin', async ({ email, password }) => {
    const authdata = await loginAdmin(email, password);
    return authdata
})

// get access from refresh
export const GetAccessAdmin = createAsyncThunk('user/GetAccessAdmin', async ({ refresh }) => {
    const authdata = await adminAccess(refresh)
    return authdata
})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialstate.usertoken,
    reducers: {
        Logout: (state) => {
            return initialstate.usertoken;
        },
        Alogout: (state) => {
            return initialstate.usertoken;
        },
        Success: (state, action) => {
            return {
                ...state,
                registerSuccess: action.payload.message,
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {

                if (!action.payload.error) {
                    return {
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        type: 'user',
                        is_authenticated: true,
                        registerSuccess: null,
                    };
                }
            })
            .addCase(GetAccess.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        type: 'user',
                        is_authenticated: true,
                        registerSuccess: null,
                    }
                }
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    return {
                        ...state,
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        type: 'admin',
                        is_authenticated: true,
                    }
                }
            })
            .addCase(GetAccessAdmin.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        type: 'admin',
                        is_authenticated: true,
                    }
                }
            })
    },
});

export const { Logout, Alogout, Success } = authSlice.actions;
export default authSlice.reducer


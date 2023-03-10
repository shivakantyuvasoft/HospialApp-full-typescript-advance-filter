import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


interface IData{
    status:string,
    getsinglepost:any,
    getdata:any,
    getallpost:any,
    appoinment:any ,
    register:any,
}

const initialState : IData={
    status:"",
    getsinglepost:[],
    getdata:[],
    getallpost:[],
    appoinment:[],
    register:[]
    
}

export const makeAppoinment = createAsyncThunk("auth/makeAppoinment",async(data:any)=>{
    try{
        const response = data;
        return response;
    }catch(error){
        return error;
    }
})

export const authRegister = createAsyncThunk("auth/authRegister",async(data:any)=>{
    try{
        const response = data;
        return response;
    }catch(error){
        return error;
    }
})
export const getSignlePost = createAsyncThunk("auth/getSignlePost",async()=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}`);
        return response;
    }catch(error){
        return error;
    }
})

export const getAllData = createAsyncThunk("auth/getAllData",async()=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_POST_API_KEY}`);
        return response;
    }catch(error){
        return error;
    }
})


export const getAllPost = createAsyncThunk("auth/getAllPost",async()=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_DUMMY_API_KEY}`);
        return response;
    }catch(error){
        return error;
    }
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getSignlePost.pending,(state,action)=>{
            state.status = "loading";
        }).addCase(getSignlePost.fulfilled,(state,{payload})=>{
            state.status = "success"
            state.getsinglepost = payload;
        }).addCase(getSignlePost.rejected,(state,action)=>{
            state.status = "failed";
        }).addCase(getAllData.pending,(state,action)=>{
            state.status = "loading";
        }).addCase(getAllData.fulfilled,(state,{payload})=>{
            state.status = "success"
            state.getallpost = "";
            state.getdata = payload;
        }).addCase(getAllData.rejected,(state,action)=>{
            state.status = "failed";
        }).addCase(getAllPost.pending,(state,action)=>{
            state.status = "loading";
        }).addCase(getAllPost.fulfilled,(state,{payload})=>{
            state.status = "success"
            state.getdata = ""
            state.getallpost = payload;
        }).addCase(getAllPost.rejected,(state,action)=>{
            state.status = "failed";
        }).addCase(makeAppoinment.pending,(state,action)=>{
            state.status = "loading";
        }).addCase(makeAppoinment.fulfilled,(state,{payload})=>{
            state.status = "success";
            state.getdata = "";
            state.appoinment.push(payload);
        }).addCase(makeAppoinment.rejected,(state,action)=>{
            state.status = "failed";
        }).addCase(authRegister.pending,(state,action)=>{
            state.status = "loading";
        }).addCase(authRegister.fulfilled,(state,{payload})=>{
            state.status = "success";
            state.register.push(payload);
        }).addCase(authRegister.rejected,(state,action)=>{
            state.status = "failed";
        })
    }
})

export default authSlice.reducer;
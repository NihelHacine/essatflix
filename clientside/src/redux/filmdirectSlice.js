import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import Swal from 'sweetalert2';

export const getfilmdirect = createAsyncThunk ("filmdirect/get",async()=> {try {
    let result = axios.get("http://localhost:5000/filmdirect/allfilmdirect")
    return result;
} catch (error) {
    console.log(error);
}})

export const addfilmdirect = createAsyncThunk ("filmdirect/add",async(filmdirect)=> {try {
    let result = axios.post("http://localhost:5000/filmdirect/addfilmdirect",filmdirect)
    return result;
} catch (error) {
    console.log(error);
}})

export const deletefilmdirect = createAsyncThunk ("filmdirect/delete",async(id)=> {try {
    let result = axios.delete (`http://localhost:5000/filmdirect/${id}`)
    return result;
} catch (error) {
    console.log(error);
}})
export const editfilmdirect = createAsyncThunk ("filmdirect/update",async({id,editedfilmdirect})=> {try {
    let result = axios.put (`http://localhost:5000/filmdirect/${id}`,editedfilmdirect)
    return result;
} catch (error) {
    console.log(error);
}})
const initialState={
    filmdirectlist:null,
    status:null,
}

export const filmdirectSlice = createSlice({

  name: 'filmdirect',
  initialState,
  reducers: {},
  extraReducers:{
    [getfilmdirect.pending]:(state) => {
        state.status="pending";
    },
    [getfilmdirect.fulfilled]:(state,action) => {
        state.status="fullfilled";
        state.filmdirectlist =action.payload.data.filmdirect;
    },
    [getfilmdirect.rejected]:(state) => {
        state.status="rejected";
    },

    [addfilmdirect.pending]:(state) => {
        state.status="pending";
    },
    [addfilmdirect.fulfilled]:(state) => {
        state.status="fullfilled";

       
    },
    [addfilmdirect.rejected]:(state) => {
        state.status="rejected";
    },

    [deletefilmdirect.pending]:(state) => {
        state.status="pending";
    },
    [deletefilmdirect.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [deletefilmdirect.rejected]:(state) => {
        state.status="rejected";
    },

    [editfilmdirect.pending]:(state) => {
        state.status="pending";
    },
    [editfilmdirect.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [editfilmdirect.rejected]:(state) => {
        state.status="rejected";
    },

    

  },
})

// Action creators are generated for each case reducer function
export const { } =filmdirectSlice.actions

export default filmdirectSlice.reducer
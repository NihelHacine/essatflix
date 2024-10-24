import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import Swal from 'sweetalert2';

export const getfilm = createAsyncThunk ("film/get",async()=> {try {
    let result = axios.get("http://localhost:5000/film/allfilm")
    return result;
} catch (error) {
    console.log(error);
}})

export const addfilm = createAsyncThunk ("film/add",async(film)=> {try {
    let result = axios.post("http://localhost:5000/film/addfilm",film)
    return result;
} catch (error) {
    console.log(error);
}})

export const deletefilm = createAsyncThunk ("film/delete",async(id)=> {try {
    let result = axios.delete (`http://localhost:5000/film/${id}`)
    return result;
} catch (error) {
    console.log(error);
}})
export const editfilm = createAsyncThunk ("film/update",async({id,editedfilm})=> {try {
    let result = axios.put (`http://localhost:5000/film/${id}`,editedfilm)
    return result;
} catch (error) {
    console.log(error);
}})
const initialState={
    filmlist:null,
    status:null,
}

export const filmSlice = createSlice({

  name: 'film',
  initialState,
  reducers: {},
  extraReducers:{
    [getfilm.pending]:(state) => {
        state.status="pending";
    },
    [getfilm.fulfilled]:(state,action) => {
        state.status="fullfilled";
        state.filmlist =action.payload.data.film;
    },
    [getfilm.rejected]:(state) => {
        state.status="rejected";
    },

    [addfilm.pending]:(state) => {
        state.status="pending";
    },
    [addfilm.fulfilled]:(state) => {
        state.status="fullfilled";

       
    },
    [addfilm.rejected]:(state) => {
        state.status="rejected";
    },

    [deletefilm.pending]:(state) => {
        state.status="pending";
    },
    [deletefilm.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [deletefilm.rejected]:(state) => {
        state.status="rejected";
    },

    [editfilm.pending]:(state) => {
        state.status="pending";
    },
    [editfilm.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [editfilm.rejected]:(state) => {
        state.status="rejected";
    },

    

  },
})

// Action creators are generated for each case reducer function
export const { } =filmSlice.actions

export default filmSlice.reducer
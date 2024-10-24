import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import Swal from 'sweetalert2';

export const getfavori = createAsyncThunk ("favori/get",async()=> {try {
    let result = axios.get("http://localhost:5000/favori/allfavori")
    return result;
} catch (error) {
    console.log(error);
}})

export const addfavori = createAsyncThunk ("favori/add",async(favori)=> {try {
    let result = axios.post("http://localhost:5000/favori/addfavori",favori)
    return result;
} catch (error) {
    console.log(error);
}})

export const deletefavori = createAsyncThunk ("favori/delete",async(id)=> {try {
    let result = axios.delete (`http://localhost:5000/favori/${id}`)
    return result;
} catch (error) {
    console.log(error);
}})

const initialState={
    favorilist:null,
    status:null,
}

export const favoriSlice = createSlice({

  name: 'favori',
  initialState,
  reducers: {},
  extraReducers:{
    [getfavori.pending]:(state) => {
        state.status="pending";
    },
    [getfavori.fulfilled]:(state,action) => {
        state.status="fullfilled";
        state.favorilist =action.payload.data.favori;
    },
    [getfavori.rejected]:(state) => {
        state.status="rejected";
    },

    [addfavori.pending]:(state) => {
        state.status="pending";
    },
    [addfavori.fulfilled]:(state) => {
        state.status="fullfilled";

       
    },
    [addfavori.rejected]:(state) => {
        state.status="rejected";
    },

    [deletefavori.pending]:(state) => {
        state.status="pending";
    },
    [deletefavori.fulfilled]:(state) => {
        state.status="fullfilled";
       
    },
    [deletefavori.rejected]:(state) => {
        state.status="rejected";
    },

   

    

  },
})

// Action creators are generated for each case reducer function
export const { } =favoriSlice.actions

export default favoriSlice.reducer
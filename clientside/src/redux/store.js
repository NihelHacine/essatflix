import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import usersSlice from './usersSlice'
import filmSlice from './filmSlice'
import favoriSlice from './favoriSlice'
import  filmdirectSlice  from './filmdirectSlice'


export const store = configureStore({
  reducer: {
    user : userSlice,
    users : usersSlice,
    films : filmSlice,
    favoris : favoriSlice,
    filmdirect : filmdirectSlice,


  },
})
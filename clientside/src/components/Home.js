import React from 'react'
import Header from './Header'
import Contentt from './Contentt'
import Navbarr from './Navbarr'
import { useSelector } from 'react-redux'


function Home() {
  const user = useSelector((state)=>state.user?.user)
  console.log("first bonjour")
  console.log("user", user)
  return (
    <>
    <Navbarr/>
    <Header/>
    <Contentt user={user}/>
    {/* <AjoutFilm/> */}
        </>
  )
}

export default Home
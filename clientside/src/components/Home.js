import React from 'react'
import Header from './Header'
import Contentt from './Contentt'
import Navbarr from './Navbarr'
import Annonce from './Annonce'


function Home({user,filmdirect}) {

  return (
    <>
    <Navbarr/>
    <Header/>
    <Annonce filmdirect={filmdirect} />
    <Contentt user={user}/>
    {/* <AjoutFilm/> */}
        </>
  )
}

export default Home
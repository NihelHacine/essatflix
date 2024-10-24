import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Navbarr from './Navbarr';
import './CssFolder/DisplayFilm.css'

function DisplayFilm() {
    const n = useParams();
    const films = useSelector((state) => state.films?.filmlist);
    console.log("films",films)
    const film = films?.filter((el) => el?._id == n.id)[0];
    console.log("one film",film)
  return (
    <>
    <Navbarr/>
    {film?(
   <div style={{backgroundColor:'black'}}>
   <iframe width="100%" height="500" src={film?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
   <div className='descfilm'>
       <h1>{film?.film}</h1>
       <p>{film?.description}</p>
    </div>
    </div>
    ): (
        <p>Aucun film sélectionné</p>
      )}
    </>

  )
}

export default DisplayFilm
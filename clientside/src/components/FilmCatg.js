import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './CssFolder/Contentt.css';
import Navbarr from './Navbarr';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addfavori } from '../redux/favoriSlice';

function FilmCatg({user}) {
    const n = useParams();
    const films = useSelector((state) => state.films?.filmlist);
    const favoris = useSelector((state) => state.favoris?.favorilist);
    const dispatch = useDispatch();

    // Filtrer les films par catégorie
    const filmcat = films?.filter((el) => el?.gender === n.cat);
    const sortedFilms = filmcat?.length ? [...filmcat].sort((a, b) => new Date(b.add_date) - new Date(a.add_date)) : [];

    const ajout = (id) => {
        // Vérifier si le film est déjà dans les favoris de cet utilisateur
        const tofind = favoris?.some((f) => f?.film === id && f?.email_user === user?.email);

        if (!tofind) {
            // Si le film n'est pas dans les favoris, l'ajouter
            const newFavori = {
                film: id,
                email_user: user?.email
            };
            dispatch(addfavori(newFavori));

            // Notification de succès
            Swal.fire({
                title: "C'est fait!",
                text: "Le film a été ajouté à votre liste de favoris!",
                icon: "success"
            });
            window.location.reload();
        } else {
            // Notification si le film est déjà dans les favoris
            Swal.fire({
                title: "Ce film existe déjà dans votre liste des favoris!",
                icon: "info",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            });
        }
    };
  return (
    <>
    <Navbarr />
    <div className="contentt">
        <div className="container text-center text">
            <h1 contentEditable spellCheck="false">Films {n.cat}s </h1>
            
        </div>
        <div className="shell">
            <div className="container">
                <div className="row">
                    {sortedFilms.length > 0 ? (
                        sortedFilms.map((el) => (
                            <div className="col-md-3" key={el.id}>
                                <div className="wsk-cp-product">
                                    <div className="wsk-cp-img">
                                        <img src={el?.photo} alt="Film" className="img-responsive" />
                                    </div>
                                    <div className="wsk-cp-text">
                                        <div className="category">
                                            <span>{el?.film}</span>
                                        </div>
                                        <div className="title-product">
                                            <h3>{el?.gender}</h3>
                                        </div>
                                        <div className="description-prod">
                                            <p>{el?.description}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="wcf-right">
                                                <a href="#" className="buy-btn">
                                                <Link to={`/film/${el?._id}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={'20'} height={'20'}>
                                                        <path fill="#ffffff" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                                    </svg>
                                                </Link>
                                                </a>
                                            </div>
                                            <a className="buy-btn" onClick={()=>ajout(el?._id)}>
                                                        
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={'20'} height={'20'}><path fill="#fa0505" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                                                       
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 style={{color:'white'}}>Aucun film à afficher</h1>
                    )}
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default FilmCatg
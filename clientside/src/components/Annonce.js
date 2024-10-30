import React from 'react';
import './CssFolder/Annonce.css';
import Navbarr from './Navbarr';

function Annonce({ filmdirect }) {
    let film = filmdirect && filmdirect.length > 0 ? filmdirect[0] : null;

    const now = new Date();
    const filmDate = new Date(film?.year, film?.month - 1, film?.day); // Mois indexé à partir de 0 dans JS

    // Afficher l'annonce uniquement si la date actuelle est inférieure à la date de diffusion du film
    if (!film || now >= filmDate) {
        return null;
    }

    return (
      
            <div className="annonce">
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@400;600&display=swap"
                    rel="stylesheet"
                />
                <header>
                    <div>
                        <h1>{film?.film}</h1>
                        <p>
                            Rejoignez-nous le {film?.day}/{film?.month}/{film?.year} pour une diffusion cinéma unique entre étudiants ! {film?.description}
                        </p>
                    </div>
                </header>
            </div>
        
    );
}

export default Annonce;

import React from 'react'
import './CssFolder/AjoutFilm.css'
import Navbarr from './Navbarr'

function About() {
  return (
    <>
    <Navbarr/>
    <div className='ajoutfilm'>
        <section className="two row dark">
      <div className="text text-style skew-text-tr">
        <h2>A propos de ESSATFLIX</h2>
        <p>Bienvenue sur Essatflix, la plateforme créée par des étudiants, pour les étudiants de l'ESSAT Gabès !</p>
        <p>Notre mission est simple : offrir un espace où tous les étudiants de l'institut peuvent se divertir en regardant et partageant des films. Que ce soit pour découvrir de nouveaux films ou pour passer un bon moment entre amis, Essatflix est conçu pour être votre référence en matière de divertissement.</p>
        <p>Mais ce n'est pas tout ! Essatflix, c'est aussi un espace de partage et d'interaction. Grâce à notre espace de tchat, vous pouvez échanger vos avis, recommander des films ou simplement discuter avec d'autres étudiants.</p>
        <p>Nous croyons en la collaboration et en la créativité de notre communauté. C'est pourquoi chaque étudiant peut contribuer à améliorer cette plateforme. Que vous ayez des idées pour de nouvelles fonctionnalités, des suggestions pour enrichir la bibliothèque de films, ou que vous souhaitiez simplement nous donner votre avis, votre participation est la bienvenue !</p>
        <p>Ce site a été créé pour vous, les étudiants de l'ESSAT, afin que vous ayez un endroit où vous détendre et profiter d'une pause bien méritée après vos études.</p>
        <p>Merci d'être ici, et nous espérons que vous apprécierez chaque moment passé sur Essatflix.

</p>
      </div>
      {/* <figure><img src="https://assets.codepen.io/t-1/cassidy-james-blaede-1lzJt360gkE-unsplash.jpg" alt="two people playing Guitar Hero Arcade. " />
    <figcaption>Photo by Cassidy James Blaede</figcaption>
</figure> */}
      {/* full size image: https://images.unsplash.com/photo-1536818968680-deeec2e9fd11*/}
      <figure className="skew-tl"><img src="https://images.unsplash.com/photo-1601637155580-ac6c49428450" alt="a person wearing a bucket hat, sitting on a skee ball machine lane. " />
      </figure>
    </section>
  </div>
  </>
  )
}

export default About
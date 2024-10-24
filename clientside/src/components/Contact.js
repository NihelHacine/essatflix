import React, { useRef } from 'react'
import './CssFolder/Contact.css'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_75u9cmp', 'template_d67uqel', form.current, {
        publicKey: '7InAQW5TO_m6eP9bJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Votre email a été bien envoyé",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className='contact'>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@300&display=swap" rel="stylesheet" />
        <main>
          <div className="title">
            <h1 id="title">Rester en contact avec l'administrateur</h1>
            <p id="description">Merci d'avoir pris le temps de nous aider à améliorer la plateforme</p>
          </div>
          <form id="survey-form" ref={form} onSubmit={sendEmail}>
            <label htmlFor="name" id="name-label" className="uno">Pseudo</label>
            <input type="text" id="name" placeholder="Enter your name" requiered name="from_name"/>
            <label htmlFor="email" id="email-label" className="uno">Email</label>
            <input type="email" id="email" placeholder="Enter your email" requiered name='from_email'/>
            <p className="uno">Commentaires ou suggestions?</p>
            <textarea id="message" className="textarea uno" name="message" placeholder="Entrer votre message..." defaultValue={""} />
            <button type="submit" id="submit" className="submit uno">Envoyer</button>
          </form>
        </main>
      </div>
  )
}

export default Contact
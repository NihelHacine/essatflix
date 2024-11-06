import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './CssFolder/LoginPage.css';
import { userLogin } from '../redux/userSlice';
import Loading from './Loading';
import Swal from 'sweetalert2';
import axios from 'axios';

function LoginPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 4400);
    }, []);

    // State login
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const user = useSelector((state) => state.user?.user);
    const isAuth = localStorage.getItem('token');

    // Vérification de l'email
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const verificationStatus = queryParams.get('verification');

        if (verificationStatus === 'success') {
            Swal.fire('Inscription réussie', 'Votre email a été vérifié avec succès!', 'success');
        } else if (verificationStatus === 'failed') {
            Swal.fire('Échec de la vérification', 'La vérification de votre email a échoué.', 'error');
        }
    }, [location]);

    // Fonction pour demander une réinitialisation de mot de passe
    const handleResetPassword = async (email) => {
      try {
          const response = await axios.post('http://localhost:5000/user/request-password-reset', { email });
  
          Swal.fire({
              icon: 'success',
              title: 'Email envoyé!',
              text: response.data.msg,
          });
      } catch (error) {
          console.error("Erreur lors de la demande de réinitialisation:", error);
          Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: error.response?.data?.msg || 'Une erreur est survenue lors de l\'envoi de l\'email.',
          });
      }
  };

    const handleForgotPassword = () => {
        Swal.fire({
            title: 'Réinitialiser le mot de passe',
            html: `
                <input type="email" id="resetEmail" class="swal2-input" placeholder="Entrez votre email">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const email = document.getElementById('resetEmail').value;
                if (!email) {
                    Swal.showValidationMessage(`Veuillez entrer un email valide`);
                }
                return email; // Retourne l'email
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleResetPassword(result.value); // Passe l'email à la fonction
            }
        });
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : !isAuth ? (
                <div className='loginPage'>
                    <div className="box">
                        <form className='form' onSubmit={(e) => e.preventDefault()}>
                            <div className="input-box">
                                <h2 className='h2'>S'authentifier</h2>
                                <input
                                    type="email"
                                    required
                                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                                    name='username'
                                />
                                <span>Email</span>
                                <i />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    required
                                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                                />
                                <span>Mot de passe</span>
                                <i />
                            </div>
                            <input
                                className='input'
                                type="button"
                                value="Valider"
                                onClick={() => { dispatch(userLogin(login)) }}
                            />
                            <div className="links">
                                <Link to={'/register'}>S'inscrire</Link>
                                <span> | </span>
                                <a  onClick={handleForgotPassword}>Mot de passe oublié ?</a>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                navigate('/home')
            )}
        </>
    );
}

export default LoginPage;

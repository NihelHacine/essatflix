import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import './CssFolder/LoginPage.css'
import Button from 'react-bootstrap/Button';

const ResetPassword = () => {
    const { token } = useParams(); // Récupérer le token depuis l'URL
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/user/reset-password/${token}`, { newPassword });
            Swal.fire('Succès', response.data.msg, 'success');
        } catch (error) {
            Swal.fire('Erreur', error.response?.data?.msg || 'Erreur lors de la réinitialisation.', 'error');
        }
    };

    return (
        <div className='loginPage'>
            <div className='box'>
        <form onSubmit={handleResetPassword} className='form'>
        <div className="input-box">
            <h2 className='h2'>Nouveau mot de passe</h2>
                                <input
                                    type="password"
                                    name='username'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span>Nouveau mot de passe</span>
                                <i />
            </div>
            <div className="input-box">
            <Button  type="submit">Réinitialiser le mot de passe</Button>
            </div>
        </form>
       
        </div>
        </div>
    );
};

export default ResetPassword;

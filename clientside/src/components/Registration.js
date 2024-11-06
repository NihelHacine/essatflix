import React, { useState } from 'react'
import './CssFolder/Registration.css'
import { userRegister } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';



function Registration() {
  const dispatch = useDispatch();
  //redirection 
  const navigate = useNavigate();
  //state register
  const [register, setregister] = useState({
    pseudo : "",
    cin : "" , 
    email: "",
    password : "",
    secret_chat : "123456" ,
    classe :"" ,
    date_naissance:"",
    
  });
  return (
    <div className='subscribe'>
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className="container">
            <h1>Devenir membre</h1>
            <p>Créer un nouveau compte:</p>
            <label htmlFor="email"><b>Pseudo </b></label>
            <input type="text" name="pseudo" placeholder="Entrer votre pseudo" onChange={(e)=> setregister({...register,pseudo : e.target.value})} required  />
            <label htmlFor="email"><b>Cin</b></label>
            <input type="number" name="cin" placeholder="Entrer votre cin (8 chiffress)" onChange={(e)=> setregister({...register,cin : e.target.value})} required />
            <label htmlFor="email"><b>Email </b></label>
            <input type="text" name="email" placeholder="Entrer votre email" onChange={(e)=> setregister({...register,email : e.target.value})} required />
            
            <label htmlFor="email"><b>Classe</b></label><br/>
   
            <Form.Select style={{width:'100%'}}
    aria-label="choisir votre classe"
    onChange={(e) => setregister({ ...register, classe: e.target.value })}
>
    <option value="">choisir votre classe</option>
    <option value="1ere branche commune info">1ere branche commune info</option>
    <option value="2eme GL">2eme GL</option>
    <option value="2eme RT">2eme RT</option>
    <option value="3eme GL">3eme GL</option>
    <option value="3eme RT">3eme RT</option>

</Form.Select><br/>

            <label htmlFor="email"><b>Date de naissance</b></label>
            <input type="date" name="date" placeholder="Entrer le nom de votre société" onChange={(e)=> setregister({...register,date_naissance : e.target.value})} required />
            
            
            <label htmlFor="psw"><b>Mot de passe</b></label>
            <input type="password" placeholder="Entrer votre mot de passe" name="psw" onChange={(e)=> setregister({...register,password : e.target.value})} required />
            <div className="clearfix">
              <button type="submit" className="btn" onClick={() => {dispatch(userRegister(register));
              setTimeout(() => {
                navigate("/")
              }, 1000);
              }}>S'inscrire</button>
            </div>
          </div>
        </form>
      </div>

  )
}

export default Registration
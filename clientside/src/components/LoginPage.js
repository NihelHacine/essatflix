import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';import './CssFolder/LoginPage.css'
import { userLogin } from '../redux/userSlice';
import Loading from './Loading';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //loading
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 4400);
  }, []);

  //state login 
  const [login, setlogin] = useState({
    email : "" ,
    password :"" , 
  })

  const user = useSelector((state) => state.user?.user);
  const isAuth = localStorage.getItem('token');

  return (
    <>

    {loading?(<Loading/>):!isAuth?(
      <div className='loginPage'>
      <div className="box">
        <form action className='form'>
          <div className="input-box">
            <h2 className='h2'>S'authentifier</h2>
            <input type="email" required onChange={(e)=> setlogin({...login,email : e.target.value})}/>
            <span>Email</span>
            <i />
          </div>
          <div className="input-box">
            <input type="password" required onChange={(e)=> setlogin({...login,password : e.target.value})}/>
            <span>Mot de passe</span>
            <i />
          </div>
          <input className='input' defaultValue="Login" value="Valider" onClick={() => {dispatch(userLogin(login))}}/>
        </form>
      </div>
    </div>
    ):(
      navigate('/home')
    )}
    
      </>
  )
}

export default LoginPage
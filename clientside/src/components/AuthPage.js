import axios from 'axios';
import './CssFolder/Chat.css'
import Navbarr from './Navbarr';

const AuthPage = (props) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      axios.post(
        'http://localhost:5000/authenticate',
        {username:value}
    ) 
    .then(r=> props.onAuth({ ...r.data, secret: value }))
    .catch(e => console.log('error',e))
    };
  
    return (
    <>
      <Navbarr/>
      <div className="background">
        <form onSubmit={onSubmit} className="form-card" >
          <div className="form-title">Bienvenue 👋</div>
  
          <div className="form-subtitle">Commencer à discuter !</div>
  
          <div className="auth">
            <div className="auth-label">Pseudo</div>
            <input className="auth-input" name="username" defaultValue={props.current_user?.pseudo}/>
            <button className="auth-button" type="submit">
              Entrer
            </button>
          </div>
        </form>
      </div> 
      </>
    );
  };
 
  export default AuthPage;
import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginPage';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import PrivateRoute from './routes/PrivateRoute';
import DashContent from './components/DashContent';
import { useDispatch, useSelector } from 'react-redux';
import { getusers } from './redux/usersSlice';
import { userCurrent } from './redux/userSlice';
import UserManag from './components/UserManag';
import FilmsManag from './components/FlimsManag';
import Films from './components/Films';
import { getfilm } from './redux/filmSlice';
import DisplayFilm from './components/DisplayFilm';
import AuthPage from "./components/AuthPage";
import ChatsPage from './components/ChatsPage';
import FilmCatg from './components/FilmCatg';
import { getfavori } from './redux/favoriSlice';
import Favoris from './components/Favoris';

function App() {
  const [text, settext] = useState("");
  const [ping, setping] = useState(false);
  const [user, setuser] = useState(undefined);
    
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getusers());
    dispatch(userCurrent());
    dispatch(getfilm());
    dispatch(getfavori());
  }, [ping])

  const current_user = useSelector((state) => state.user?.user);


  return (
    < >
     <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>}/>
      <Route path='/about' element={<PrivateRoute><About/></PrivateRoute>}/>
      <Route  path='/dashboard' element={<PrivateRoute><DashContent/></PrivateRoute>}/>
      <Route  path='/userslist' element={<PrivateRoute><UserManag/></PrivateRoute>}/>
      <Route  path='/filmslist' element={<PrivateRoute><FilmsManag/></PrivateRoute>}/>
      <Route  path='/films' element={<PrivateRoute><Films user={current_user}/></PrivateRoute>}/>
      <Route  path='/favoris' element={<PrivateRoute><Favoris user={current_user}/></PrivateRoute>}/>
      <Route  path='/film/:id' element={<PrivateRoute><DisplayFilm/></PrivateRoute>}/>
      <Route  path='/films/:cat' element={<PrivateRoute><FilmCatg user={current_user}/></PrivateRoute>}/>
      <Route path='/chatroom' element={<PrivateRoute>
        {(!user)?
     (<AuthPage onAuth={(user) => setuser(user)} current_user={current_user}/>)
  
     :(<ChatsPage user={user} />)
    }
      </PrivateRoute>}/>

     </Routes>
    </>
  );
}

export default App;

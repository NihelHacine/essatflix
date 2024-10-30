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
import { getfilmdirect } from './redux/filmdirectSlice';
import Filmdirectmanag from './components/Filmdirectmanag';
import DisplayFilmDirect from './components/DisplayFilmDirect';
import Registration from './components/Registration';
import Annonce from './components/Annonce';

function App() {
  const [text, settext] = useState("");
  const [stars, setstars] = useState(0)


    
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getusers());
    dispatch(userCurrent());
    dispatch(getfilm());
    dispatch(getfavori());
    dispatch(getfilmdirect());
    
  }, [])

  const filmdirect = useSelector((state)=>state.filmdirect?.filmdirectlist);
  const user_connected = JSON.parse(localStorage.getItem("user_connected"));




  return (
    < >
     <Routes>
      <Route path='/register' element={<Registration/>}/>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/home' element={<PrivateRoute><Home user={user_connected} filmdirect={filmdirect}/></PrivateRoute>}/>
      <Route path='/about' element={<PrivateRoute><About/></PrivateRoute>}/>
      <Route  path='/dashboard' element={<PrivateRoute><DashContent user={user_connected}/></PrivateRoute>}/>
      <Route  path='/userslist' element={<PrivateRoute><UserManag user={user_connected}/></PrivateRoute>}/>
      <Route  path='/filmslist' element={<PrivateRoute><FilmsManag user={user_connected}/></PrivateRoute>}/>
      <Route  path='/filmdirectdetails' element={<PrivateRoute><Filmdirectmanag user={user_connected}/></PrivateRoute>}/>
      <Route  path='/films' element={<PrivateRoute><Films stars={stars} setstars={setstars} user={user_connected} text={text} settext={settext}/></PrivateRoute>}/>
      <Route  path='/filmdirect' element={<PrivateRoute><DisplayFilmDirect filmdirect={filmdirect} user={user_connected} /></PrivateRoute>}/>
      <Route  path='/favoris' element={<PrivateRoute><Favoris user={user_connected}/></PrivateRoute>}/>
      <Route  path='/film/:id' element={<PrivateRoute><DisplayFilm user={user_connected}/></PrivateRoute>}/>
      <Route  path='/films/:cat' element={<PrivateRoute><FilmCatg user={user_connected}/></PrivateRoute>}/>
      <Route path='/chatroom' element={<PrivateRoute>
       <ChatsPage user={user_connected}/>
      </PrivateRoute>}/>

     </Routes>
    </>
  );
}

export default App;
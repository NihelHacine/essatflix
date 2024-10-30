import React, { useEffect, useState } from 'react'
import './CssFolder/DashContent.css'
import { Link } from 'react-router-dom'
import { useSelector} from "react-redux";
import Navbarr from './Navbarr';


function DashContent() {
  const isAuth = localStorage.getItem("token");
  const user = useSelector((state) => state.user?.user);
  const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      // Vérifier si l'utilisateur est admin à partir du stockage local
      const adminStatus = localStorage.getItem("isAdmin") === 'true';
      setIsAdmin(adminStatus);
    }, []);
  return (
    <>
     {isAdmin?(
    <>
    <Navbarr/>
    <div className='dashcontent'>
        <h1>Dashboard</h1>
        <ol>
        <Link to='/userslist' style={{textDecoration:'none'}}><li>
            <div className="icon"><i className="fa-solid fa-user" /></div>
            <div className="title">Gestion des utilisateurs</div>
          </li>
          </Link>
          <Link to='/filmslist' style={{textDecoration:'none'}}>
          <li>
            <div className="icon"><i className="fa-solid fa-user" /></div>
            <div className="title">Gestion des films</div>
          </li>
          </Link>
          <Link to='/filmdirectdetails' style={{textDecoration:'none'}}>
          <li>
            <div className="icon"><i className="fa-solid fa-user" /></div>
            <div className="title">Films direct</div>
          </li>
          </Link>
          
        </ol>
      </div>
      </>
     )
    :(
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
          <a href="contact" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>

  )
}
</>
  )}

export default DashContent
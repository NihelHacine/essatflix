import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Navbarr from './Navbarr';
import EditFilmDirect from './EditFilmDirect';

function Filmdirectmanag() {
    const dispatch = useDispatch()
    const filmdirect = useSelector((state)=>state.filmdirect?.filmdirectlist);
    const user = useSelector((state)=>state.user?.user);
    const isAuth = localStorage.getItem('token');
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      // Vérifier si l'utilisateur est admin à partir du stockage local
      const adminStatus = localStorage.getItem("isAdmin") === 'true';
      setIsAdmin(adminStatus);
    }, []);
  return (
    <>
    <Navbarr/>
    {isAdmin?(
<>

<div className='userscontainer'>
<header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Film Direct</h1>
    </div>
  </header>
  <div>
  </div>
 <div className='userslist'>
<table>
<tbody>
 <tr>
     <th>Film</th>
     <th>video_id</th>
     <th>date</th>
     <th>diffusion</th>
     <th>Description</th>
     <th></th>
   
 </tr>
 {filmdirect?.map((el)=>(
     <tr>
     <td>{el?.film}</td>
     <td>{el?.video_id}</td>
     <td>{el?.day+"/"+el?.month+"/"+el?.year}</td>
     <td>{el?.start_hour+":"+el?.start_minute}</td>
     <td>{el?.description}</td>
     <td><EditFilmDirect film_direct = {el}/></td>
     </tr>
 ))}
 
</tbody>
</table>
</div>
</div> 
</>):
(
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    )}
   
    </>
  )
}

export default Filmdirectmanag
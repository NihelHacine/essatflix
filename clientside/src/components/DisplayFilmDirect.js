import React, { useState, useEffect } from 'react';
import { ChatEngine, ChatList, ChatFeed, MessageFormSocial } from 'react-chat-engine';
import Swal from 'sweetalert2';
import Navbarr from './Navbarr';

function DisplayFilmDirect({filmdirect,user}) {
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  
  let film_direct = null;

if (filmdirect && filmdirect.length > 0) {
    film_direct = filmdirect[0];
    console.log("Le premier film:", film_direct);
} else {
    console.log("Le tableau filmdirect est vide ou n'est pas défini.");
}

  // Date et heure de début de diffusion
  const startYear = film_direct?.year;
  const startMonth = film_direct?.month; // Mois d'octobre (les mois sont basés sur l'indice 0, donc 10 = novembre)
  const startDay = film_direct?.day; // Jour du mois (par exemple, le 27)
  const startHour = film_direct?.start_hour; // Heure de début (par exemple, 22h)
  const startMinute = film_direct?.start_minute; // Minute de début (par exemple, 00 minute)

  const endYear = film_direct?.year;
  const endMonth = film_direct?.month;
  const endDay = film_direct?.day;
  const endHour = 23;
  const endMinute = 59;

  useEffect(() => {
    const now = new Date();
    const startTime = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);
    const endTime = new Date(endYear, endMonth - 1, endDay, endHour, endMinute);

    // Vérifie si l'accès est autorisé
    if (now < startTime) {
      Swal.fire("La vidéo n'est pas encore accessible. Elle sera disponible à " + startTime.toLocaleString());
      setAccessAllowed(false);
    } else if (now > endTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Le film est déjà terminée.! Attendez le film de la prochaine session :) ",
      });
      setAccessAllowed(false);
    } else {
      setAccessAllowed(true);
    }
  }, []);

  useEffect(() => {
    if (!accessAllowed || !userHasInteracted) return;

    // Charge l'API YouTube IFrame Player API
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    // Crée un lecteur YouTube et calcule le temps de lecture
    const onYouTubeIframeAPIReady = () => {
      const now = new Date();
      const startTime = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);
      const timeDifference = Math.max((now - startTime) / 1000, 0);

      const newPlayer = new window.YT.Player('youtube-player', {
        height: '390',
        width: '540',
        videoId: film_direct?.video_id, // Remplace par l'ID de ta vidéo YouTube
        playerVars: {
          autoplay: 1,
          controls: 0,
          start: Math.floor(timeDifference),
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PAUSED) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    // Charge l'API YouTube
    loadYouTubeAPI();
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  }, [accessAllowed, userHasInteracted]);

  return (
    <>
    <Navbarr/>
    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' , backgroundColor:'black'}}>
      {/* Section vidéo */}
      <div style={{  width: '40%' }}>
        {accessAllowed ? (
          <>
            {!userHasInteracted && (
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh' }}>
              <button onClick={() => setUserHasInteracted(true)} style={{ marginBottom: '20px' }} className='button'>
                Démarrer la session
              </button>
              </div>
            )}
            {userHasInteracted && (
              <div id="youtube-player" style={{marginTop:'50px'}}></div>
            )}
          </>
        ) : (
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh', color:'white' }}>
          <p>La vidéo sera disponible à l'heure prévue.</p>
          </div>
        )}
      </div>

      {/* Section chat */}
      <div style={{ flex: 1, width: '50%', marginLeft: '20px' }}>
        {accessAllowed && userHasInteracted && (
          <ChatEngine
            projectID="5143bf92-46fd-442e-89c1-c16df79098d2"      // Remplace par ton Project ID
            userName={user?.pseudo}               // Nom de l’utilisateur que tu as créé
            userSecret="123456"          // Secret de l’utilisateur
            height="600px"
            renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
            renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
            renderNewMessageForm={(creds, chatId) => <MessageFormSocial creds={creds} chatId={chatId} />}
          />
        )}
      </div>
    </div>
  </>
  )
}

export default DisplayFilmDirect
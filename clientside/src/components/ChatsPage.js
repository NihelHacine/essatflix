import React, { useEffect } from 'react';
import { ChatEngine, ChatFeed, ChatList, MessageFormSocial } from 'react-chat-engine';
import Navbarr from './Navbarr';

function Chatspage({user}) {
    const notificationAudio = new Audio('/notification.mp3');

    // Fonction pour jouer le son de notification
    const playNotificationSound = () => {
      notificationAudio.play().catch((error) => {
        console.log("Notification sound play blocked:", error);
      });
    };
 
    useEffect(() => {
      // Pré-charge le fichier audio pour éviter tout délai
      notificationAudio.load();
    }, []);

    // Rendu du composant ChatEngine une fois que l'utilisateur est disponible
    return (
        <div>
            <Navbarr />
            <ChatEngine
                  projectID="5143bf92-46fd-442e-89c1-c16df79098d2"
                  userName={user?.pseudo}
                  userSecret={user?.secret_chat}
                  height="100vh"
                  renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
                  renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
                  renderNewMessageForm={(creds, chatId) => (
                    <MessageFormSocial creds={creds} chatId={chatId} />
                  )}
                  onNewMessage={(chatId, message) => playNotificationSound()}
                  onError={(error) => console.error("Error connecting to ChatEngine:", error)}
              />
        </div>
    );
}

export default Chatspage;

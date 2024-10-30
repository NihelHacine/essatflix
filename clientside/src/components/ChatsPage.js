import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChatEngine, ChatFeed, ChatList, MessageFormSocial } from 'react-chat-engine';
import Loading from './Loading';
import Navbarr from './Navbarr';

function Chatspage({user}) {
  console.log(user)
    // Rendu du composant ChatEngine une fois que l'utilisateur est disponible
    return (
        <div>
            <Navbarr />
            <ChatEngine
                projectID="5143bf92-46fd-442e-89c1-c16df79098d2"
                userName={user?.pseudo}
                userSecret={user?.secret_chat} // Assurez-vous que `user.token` est correct
                height="100vh"
                renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
                renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
                renderNewMessageForm={(creds, chatId) => <MessageFormSocial creds={creds} chatId={chatId} />}
                onError={(error) => console.error("Error connecting to ChatEngine: ", error)} // Gestion des erreurs
            />
        </div>
    );
}

export default Chatspage;

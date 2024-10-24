import {PrettyChatWindow} from 'react-chat-engine-pretty'
import Navbarr from './Navbarr';
const ChatsPage = (props) => {
    // const chatProps = useMultiChatLogic('f74cf75d-c7e7-461a-9bd2-f245709f8698', props.user.username, props.user.secret);
    return ( 
    <div style={{height:'100vh'}}>
    <Navbarr/>
    <PrettyChatWindow 
      projectId="6b2d9a57-8bf5-4890-b4db-b601b2f26769"
      username= {props.user.username}
      secret={props.user.secret}
      style={{ height: '100vh' }}
    />
   </div>
   );
  };
  export default ChatsPage;
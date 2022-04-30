import React, { useState, useRef } from 'react';
import AutorizationForm from './AutorizationForm';
import Chat from './Chat';
import './App.css';

function App() {
  
  const [disabledAuthBut, setDisabledAuthBut] = useState(true);
  const [hiddenEmoji, setHiddenEmoji] = useState(true);
  const [chosenEmoji, setChosenEmoji] = useState('');
  const [myName, setMyName] = useState('');
  const [userName, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [connected, setConnected] = useState(false);
  const [disabledBut, setDisabledBut] = useState(true);

  const socket = useRef();

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
        setConnected(true);
        const message = {
            event: 'connection',
            userName,
            id: Date.now()
        }
        socket.current.send(JSON.stringify(message));
    }
    socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
              [].concat(message).reverse();

        setMessages(prev => [message, ...prev]);
    }
    socket.current.onclose= () => {
        console.log('Socket закрыт')
    }
    socket.current.onerror = () => {
        console.log('Socket произошла ошибка')
    }
  }

  const sendMessage = async () => {
      const message = {
          userName,
          message: value,
          id: Date.now(),
          event: 'message'
      }

      socket.current.send(JSON.stringify(message));
      setValue('');
      setDisabledBut(true);
      setHiddenEmoji(true);
  }

  if (!connected) {
      return (      
          <AutorizationForm  
            value={userName}
            setUsername={setUsername}
            setMyName={setMyName}
            disabled={disabledAuthBut}
            setDisabled={setDisabledAuthBut}
            onClick={connect}
          />
      )
  }

   return (
    <div className="App">
      <Chat 
        value={value}
        setValue={setValue}
        messages={messages}
        sendMessage={sendMessage}
        hidden={hiddenEmoji}
        setHidden={setHiddenEmoji}
        chosenEmoji={chosenEmoji}
        setChosenEmoji={setChosenEmoji}
        myName={myName}
        userName={userName}
        disabled={disabledBut}
        setDisabled={setDisabledBut}
      />
   </div>
  );
}

export default App;

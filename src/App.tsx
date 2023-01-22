import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import './App.css'
import {io} from 'socket.io-client'
import {createStore} from "redux";

interface IUser{
  userId: string
  userName: string
  message: string
  photo: string
}
// const store = createStore()
const socket = io('http://localhost:3010',{ transports : ['websocket'] })
function App() {
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<IUser[]>([])
  const [name, setName] = useState('Jack')
  const [isAutoScrollActive, setAutoScrollActive] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
  socket.on('init-messages-published',(users)=>{
    setUsers(users)
  })
    socket.on('new-message-sent',(message)=>{
      setUsers(state=>[...state,message])
  })
  }, [])
  useEffect(()=>{
    if(isAutoScrollActive) ref.current?.scrollIntoView({behavior:'smooth'})
  },[users])
  const send = () => {
    socket.emit('client-message-sent',message)
    setMessage('')
    setAutoScrollActive(true)
  }
  const setNameOnWS = () => {
    socket.emit('client-name-sent',name)

  }
  const onMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
  }

  const pressEnter = (e: KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === "Enter") {
      send()
    }
  }

  return (
      <div className="chat-container">
        <div className="chat" onScroll={()=>setAutoScrollActive(false)}>
          <div  className="messages">
            {users.map((u,i) => {
              return <div className={'message'} key={i}>
                <img src={u.photo} alt={"*"}/>
                <b>{u.userName}</b> <span>{u.message}</span>
              </div>
            })}
            <div ref={ref}></div>
          </div>
        </div>
        <input value={name} onChange={e=>setName(e.currentTarget.value)} type="text"/>
        <button onClick={setNameOnWS}>setName</button>
        <input className={'textField'} value={message}
                  onKeyDown={pressEnter}
                  onChange={onMessageChange}>

            </input>
        <button className={'send'} onClick={send}>Send</button>
      </div>
  );
}

export default App;
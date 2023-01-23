import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from "react";
import './App.css'
import {createConnection, IUser, sendMessage, setClientName} from "./chat-reducer";
import {useAppDispatch, useAppSelector} from "./store";

function App() {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(state=>state.chat.messages)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('Jack')
  const [isAutoScrollActive, setAutoScrollActive] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    dispatch(createConnection())
  }, [])
  useEffect(()=>{
    if(isAutoScrollActive) ref.current?.scrollIntoView({behavior:'smooth'})
  },[messages])
  const send = () => {
    dispatch(sendMessage(message))
    setMessage('')
    setAutoScrollActive(true)
  }
  const setNameOnWS = () => {
    dispatch(setClientName(name))

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
            {messages.map((u:IUser,i:number) => {
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
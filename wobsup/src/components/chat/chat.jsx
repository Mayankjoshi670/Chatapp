import React, { useEffect, useState } from 'react'
import { user } from "../join/join.jsx";
import socketIo from "socket.io-client";
import Message from "../message/message.jsx"
import ReactScrollToBottom from "react-scroll-to-bottom";
let socket;
const ENDPOINT = 'http://localhost:4500';
const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }
    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);
        })
        console.log(socket);
        socket.emit('joined', { user })
        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
            
        })
        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })
        return () => {
            socket.emit('dissconnect');
            socket.off();
        }
    }, [])
    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])
    return (
        <div className="chatPage bg-emerald-500 flex justify-center items-center w-full h-screen">
            <div className="chatContainer bg-white h-[60%] w-[50%]">
                <div className="header bg-cyan-500 h-[15%] text-center">
                    <h2>WobSup</h2>
                </div>
     <ReactScrollToBottom className="chatBox border-2 border-black h-[70%] box-border"> 
     {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message}  />)}
                </ReactScrollToBottom>
                <div className="inputBox  h-[15%] box-border border-2 flex border-green-400">
                    <input  className='chatINput w-[96%] h-full flex flex-col border-none'  onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className="sendBtn">click me </button>
                </div>
            </div>
        </div>
    )
}
export default Chat

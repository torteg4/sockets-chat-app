import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const Chat = props => {

    const [socket] = useState(() => io(":8000"))
    const [messages, setMessages] =useState([])
    const [msg, setMsg] = useState([])

    useEffect (() => {
        socket.emit("message_from_client", "Hello from the client");

        socket.on ("data_returned_from_server", (data) => {
            console.log(data);
        })

        return () =>socket.disconnect(true);
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("sending_message", msg);
        setMsg("");
    }

    return (

        <form onSubmit={sendMessage}>
            <input 
                name="msg" 
                type="text" 
                onChange ={(e) => setMsg(e.target.value)}
                value ={msg}
                />

        </form>
    )
};

export default Chat;
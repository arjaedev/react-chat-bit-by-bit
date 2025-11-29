import { useState, useEffect, useRef } from 'react';
import './Messages.css';

export default function Messages({ sessionToken, room, setRoom, logout }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = () => {
        const url = `http://127.0.0.1:4000/message/${room.roomName}`;

        fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": sessionToken
            })
        })
        .then(res => {
            if (res.status === 401) {
                logout();
                throw new Error("Unauthorized");
            }
            if (!res.ok) throw new Error("Failed to fetch messages");
            return res.json();
        })
        .then(data => {
            setMessages(data);
            scrollToBottom();
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000);
        return () => clearInterval(interval);
    }, [room]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const url = `http://127.0.0.1:4000/message/${room.roomName}`;
        const body = { body: newMessage };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": sessionToken
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to send message");
            return res.json();
        })
        .then(() => {
            setNewMessage('');
            fetchMessages();
        })
        .catch(err => console.log(err));
    };

    // Helper to determine if message is from current user (this is a simplification, 
    // ideally we'd compare IDs, but we need the current user's ID from the token/state)
    // For now, we'll just style all messages similarly or rely on a future 'currentUser' prop
    
    return (
        <div className="chat-container">
            <div className="chat-header">
                <div style={{position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', borderRadius: '4px', color: '#00f2ff', fontSize: '0.8rem'}}>
                    LIVE DEMO
                </div>
                <div className="chat-header-info">
                    <h2>{room.roomName}</h2>
                    <p>{room.description}</p>
                </div>
                <button onClick={() => setRoom(undefined)} className="back-btn">Back to Rooms</button>
            </div>
            
            <div className="messages-list">
                {messages.length === 0 ? (
                    <p style={{textAlign: 'center', color: '#9ca3af'}}>No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className={`message-bubble ${msg.user ? 'other-message' : 'own-message'}`}>
                            <span className="message-user">
                                {msg.user || 'Unknown'}
                                <span className="message-time">{new Date(msg.when).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </span>
                            <p className="message-body">{msg.body}</p>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="chat-input-form">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

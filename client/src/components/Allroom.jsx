import { useState, useEffect } from 'react';
import './Allroom.css';

export default function Allrooms({ sessionToken, setRoom, logout }) {

    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [rooms, setRooms] = useState([]);

    const fetchRooms = () => {
        const url = "http://127.0.0.1:4000/rooms/rooms";

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
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        })
        .then(data => setRooms(data))
        .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchRooms();
    }, []);
    
    const AddRooms = (e) => {
		e.preventDefault()

        const body = {
            roomName: roomName,
            description: description
        };
        
        const url = "http://127.0.0.1:4000/rooms/room";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
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
            return res.json();
        })
        .then(data => {
            console.log("New room added:", data);
            setRoomName('');
            setDescription('');
            fetchRooms();
        })
        .catch(err => console.log(err));
    };

    return (
      <div className="rooms-container">
       <div style={{position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', background: 'rgba(0, 242, 255, 0.1)', border: '1px solid #00f2ff', borderRadius: '4px', color: '#00f2ff', fontSize: '0.8rem'}}>
            LIVE DEMO
       </div>
       <h1>Available Rooms</h1>
       <ul className="rooms-list">
        {rooms.map((r) => (
          <li key={r._id} className="room-card">
            <div>
                <h3>{r.roomName}</h3>
                <p>{r.description}</p>
            </div>
            <button onClick={() => setRoom(r)}>Join Room</button>
          </li>
        ))}
       </ul>
    
        <div className="add-room-form">
            <h2>Create New Room</h2>
            <form onSubmit={AddRooms}>
                <input 
                    type="text" 
                    value={roomName} 
                    name="Rooms" 
                    id="Rooms" 
                    placeholder='Room Name' 
                    onChange={e => setRoomName(e.target.value)}
                />
                <input 
                    type="text" 
                    value={description} 
                    name="Description" 
                    id="Description" 
                    placeholder='Description' 
                    onChange={e => setDescription(e.target.value)}
                />
                <button type="submit">Create Room</button>
            </form>
        </div>
      </div>
    );
}
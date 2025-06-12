import { useState, useEffect } from 'react';

export default function Allrooms({ sessionToken }) {

    const [roomName, setRoomName] = useState('');
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
        .then(res => res.json())
        .then(data => setRoomName(data))
        .catch(err => console.log(err));

        console.log("New room added:", roomName);
    };

    useEffect(() => {
        fetchRooms();
        console.log("Rooms fetched from server:", roomName);
    }, []);

    const AddRooms = () => {
        const url = "http://127.0.0.1:4000/rooms/room";

        fetch(url, {
            method: "POST",
            body: JSON.stringify({ rooms }),
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": sessionToken
            })
        })       
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(err => console.log(err));

        console.log("New room added:", AddRooms);
    };


    return (
      <div>
        <h1>ROOMS</h1>

        <input 
            type="Rooms" 
            value={rooms} 
            name="Rooms" 
            id="Rooms" 
            placeholder='Enter room name' 
            onChange={e => setRooms(e.target.value)}
        />
        <button> ADD ROOM </button>

      </div>
    );
  
}
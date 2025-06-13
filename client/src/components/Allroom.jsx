import { useState, useEffect } from 'react';


export default function Allrooms({ sessionToken }) {

    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [room, setRooms] = useState([]);

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
        .then(data => setRooms(data))
        .catch(err => console.log(err));

        console.log("New room added:", room);
    };

    useEffect(() => {
        fetchRooms();
        console.log("Rooms fetched from server:", room);
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
        .then(res => res.json())
        .then(data => {
            console.log("New room added:", data);
            setRoomName('');
            setDescription('');
            fetchRooms();
        })
        .catch(err => console.log(err));

        
    };


    return (
      <>
       
    
        <h2>Add New Room</h2>
        <input 
            type="text" 
            value={roomName} 
            name="Rooms" 
            id="Rooms" 
            placeholder='Enter room name' 
            onChange={e => setRoomName(e.target.value)}
        />
        <input 
            type="text" 
            value={description} 
            name="Description" 
            id="Description" 
            placeholder='Enter room description' 
            onChange={e => setDescription(e.target.value)}
        />
        <button onClick={AddRooms}>ADD ROOM</button>
      </>
    );
  
}
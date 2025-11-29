import { useState, useEffect } from 'react';
import './Allroom.css';

export default function Allrooms({ sessionToken, setRoom, logout }) {

    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [rooms, setRooms] = useState([]);

    const [showModal, setShowModal] = useState(false);

    // Static data for demo purposes
    const staticRooms = [
        { _id: 'static_1', roomName: 'David Peters', description: 'Senior Developer', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=david', isStatic: true },
        { _id: 'static_2', roomName: 'Lisa Roy', description: 'Hi, are you Available Tomorrow?', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=lisa', unread: 1, isStatic: true },
        { _id: 'static_3', roomName: 'Jamie Taylor', description: 'Nice One. Will Do it tomorrow', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=jamie', unread: 3, isStatic: true },
        { _id: 'static_4', roomName: 'Jason Roy', description: 'That\'s Great. I am Looking forward...', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=jason', isStatic: true },
        { _id: 'static_5', roomName: 'Amy Frost', description: 'Hi, will you start working on the...', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=amy', isStatic: true },
        { _id: 'static_6', roomName: 'Paul Wilson', description: 'See you tommorow champ', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=paul', isStatic: true },
        { _id: 'static_7', roomName: 'Ana Williams', description: '??', type: 'direct', avatar: 'https://i.pravatar.cc/150?u=ana', unread: 1, isStatic: true },
        { _id: 'static_8', roomName: 'Design Team', description: 'Project updates and assets', type: 'group', avatar: 'https://ui-avatars.com/api/?name=Design+Team&background=random', isStatic: true },
        { _id: 'static_9', roomName: 'General', description: 'General discussion', type: 'group', avatar: 'https://ui-avatars.com/api/?name=General&background=random', isStatic: true },
    ];

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
        .catch(err => {
            console.log(err);
            // If fetch fails (e.g. server down), we still have static rooms
        });
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // Combine static and fetched rooms
    const displayRooms = [...staticRooms, ...rooms];
    
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
            setShowModal(false);
            fetchRooms();
        })
        .catch(err => console.log(err));
    };

    return (
      <div className="rooms-container">
       <div className="sidebar-header">
            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search Here..." />
            </div>
       </div>
       
       <ul className="rooms-list">
        {displayRooms.map((r) => (
          <li key={r._id} className="room-card" onClick={() => setRoom(r)}>
            <div className="room-avatar">
                <img src={r.avatar || `https://ui-avatars.com/api/?name=${r.roomName}&background=random`} alt={r.roomName} />
            </div>
            <div className="room-info">
                <div className="room-header">
                    <span className="room-name">{r.roomName}</span>
                    <span className="room-time">10:35 AM</span>
                </div>
                <p className="room-last-msg">{r.description}</p>
            </div>
            {r.unread && <div className="unread-badge">{r.unread}</div>}
          </li>
        ))}
       </ul>
    
        <button className="add-room-btn" onClick={() => setShowModal(true)}>+ Create New Room</button>

        {showModal && (
            <div className="modal-overlay">
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
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
}
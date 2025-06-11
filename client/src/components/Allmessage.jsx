import { useState, useEffect } from 'react';

export default function Allrooms({ sessionToken }) {
  const [data, setData] = useState([]);

  const fetchMessage = () => {
    const url = "http://127.0.0.1:4000/message/messages";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "authorization": sessionToken
      })
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMessage();
    console.log("Data fetched from server:", data);
  }, []);

  return (
    <div>
      <h1>All Messages</h1>
    </div>
  );
}

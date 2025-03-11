import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState("USA");

  useEffect(() => {
    fetchPlayers();
  }, [isAdmin]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/players?isAdmin=${isAdmin}`);
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players", error);
    }
  };

  const fetchNickname = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/v1/nickname?country=${country}`);
      setNickname(response.data.nickname);
    } catch (error) {
      console.error("Error fetching nickname", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Player List</h1>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
          className="mr-2"
        />
        Admin View
      </label>
      <ul className="list-disc pl-5 mb-4">
        {players.map((player, index) => (
          <li key={index}>{isAdmin ? `${player.first_name} ${player.last_name}, Age: ${player.age}` : `${player.first_name}, Age: ${player.age}`}</li>
        ))}
      </ul>
      <div className="mb-4">
        <label className="mr-2">Country:</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="border p-2">
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="Australia">Australia</option>
        </select>
        <button onClick={fetchNickname} className="ml-4 bg-blue-500 text-white p-2 rounded">Generate Nickname</button>
      </div>
      {nickname && <p className="text-lg font-semibold">Generated Nickname: {nickname}</p>}
    </div>
  );
};

export default PlayerList;

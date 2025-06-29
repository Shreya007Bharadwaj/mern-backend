import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // 🟢 FETCH USERS FROM BACKEND
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // ⏱️ Fetch users once when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔵 HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
      });
      setMessage(res.data.message);
      setName("");
      setEmail("");
      fetchUsers(); // refresh the list
    } catch (error) {
      setMessage("Error sending data");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <button type="submit">Send</button>
      </form>
      <p>{message}</p>

      <hr />

      <h3>👥 User List</h3>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

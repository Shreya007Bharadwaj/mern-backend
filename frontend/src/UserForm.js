import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/add", formData);
      onUserAdded(); // reload user list
      setFormData({ name: "", email: "" }); // clear form
    } catch (error) {
      console.error("❌ Error adding user", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;

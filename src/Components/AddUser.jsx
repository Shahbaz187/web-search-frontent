import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from 'axios'
import toast from 'react-hot-toast';

const AddUser = () => {
  const [user, setUser] = useState({email: "" , url: ""})
   const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const submitForm = async(e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/api/create" , user).then((res)=>{
      toast.success("User Add Successfully")
      navigate("/")
    }).catch((error)=> console.log(error))
  };
  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Add new user</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            value={user.email}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">URL</label>
          <input
            type="text"
            onChange={inputHandler}
            value={user.url}
            id="password"
            name="url"
            autoComplete="off"
            placeholder="URL"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  );
}

export default AddUser
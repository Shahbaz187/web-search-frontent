import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./add.css";
import axios from 'axios';
import toast from 'react-hot-toast';


const UpdateUser = () => {
  const {id} = useParams();
 const [user, setUser] = useState({email: "", url: "", });
  const navigate = useNavigate()
  const inputHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
     axios.get(`http://localhost:3000/api/getone/${id}`).then((res)=>{
      setUser(res.data)
    })
  
  }, [])
  
  const submitForm = async(e) => {
        e.preventDefault();
        await axios
          .put(`http://localhost:3000/api/update/${id}`, user)
          .then((res) => {
            toast.success("User updated Successfully");
            navigate("/");
          })
          .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Update user</h3>
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
            type="password"
            onChange={inputHandler}
            value={user.url}
            id="text"
            name="url"
            autoComplete="off"
            placeholder="URL"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GetUser.css";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const GetUser = () => {
  const [user, setUser] = useState(null);
  const [filterUser, setfilterUser] = useState(null)

  useEffect(() => {
    const fechData = async () => {
      const url = await axios.get("https://web-search-backend.vercel.app/getall"
      );
      const res = await url.data;
      setUser(res)
      setfilterUser(res)
      console.log(res);
    };
    fechData();
  }, []);

  const deleteUser = async(id) =>{
    await axios
      .delete(`https://web-search-backend.vercel.app/delete/${id}`)
      .then((res) => {
        console.log(res);
         setUser((prevUser) => prevUser.filter((user) => user._id !== id));
         toast.success("User deleted Successfully");
         location.reload()
      })
      .catch((error) => console.log(error));
  }

  const searchUser = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setfilterUser(null);
    }
    const filter = user?.filter((data) =>
      data.url.toLowerCase().includes(searchValue.toLowerCase())
    );
    setfilterUser(filter);
  };


  return (
    <div className="userTable">
      <div className="top-container">
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <div className="">
        <input type="search" placeholder="Enter URL" onChange={(e) => searchUser(e)}/>
      </div>
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterUser?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.url}</td>
                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>
                    <AiFillDelete size={23} />
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GetUser;

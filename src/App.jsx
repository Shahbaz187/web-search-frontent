import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GetUser from './Components/GetUser';
import AddUser from './Components/AddUser';
import UpdateUser from './Components/UpdateUser';
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <GetUser/>
    },
    {
      path: "/add",
      element: <AddUser/>
    },
    {
      path: "/edit/:id",
      element: <UpdateUser/>
    },
  ])
  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App

import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;

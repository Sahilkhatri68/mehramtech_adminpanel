import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Noutfound from "./components/Noutfound";
import AddCourse from "./components/AddCourse";
import Login from "./components/Login";
import axios from "axios";
import ProductsListForServices from "./components/ProductsListForServices";
import CompletedProductList from "./components/CompletedProductList";
import UnReadNotificationDevices from "./components/UnReadNotificationDevices";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/addcourse" element={<AddCourse />}></Route>
        <Route
          path="/completedproductlist"
          element={<CompletedProductList />}
        ></Route>
        <Route
          path="/productlist"
          element={<ProductsListForServices />}
        ></Route>
        <Route
          path="/unreadNotificationDevices"
          element={<UnReadNotificationDevices />}
        ></Route>
        <Route path="*" element={<Noutfound />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;

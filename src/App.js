import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./components/Account";
import Support from "./components/Support";
import Viewteacher from "./components/Viewteacher";
import Aboutus from "./components/Aboutus";
import Noutfound from "./components/Noutfound";
import AddCourse from "./components/AddCourse";
import Login from "./components/Login";
import axios from "axios";
import ViewCourseDetail from "./components/ViewCourseDetail";
import AddTeacher from "./components/AddTeacher";
import Students from "./components/Students";
import ProductsListForServices from "./components/ProductsListForServices";
import CompletedProductList from "./components/CompletedProductList";
import UnReadNotification_Devices from "./components/UnReadNotificationDevices";
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
        {/* <Route path="/students" element={<Students />}></Route> */}
        {/* <Route path="/account" element={<Account />}></Route> */}
        {/* <Route path="/support" element={<Support />}></Route> */}
        {/* <Route path="/viewteacher" element={<Viewteacher />}></Route> */}
        {/* <Route path="/aboutus" element={<Aboutus />}></Route> */}
        {/* <Route path="/addteacher" element={<AddTeacher />}></Route> */}
        {/* <Route
          path="/viewcoursedetail/:_id"
          element={<ViewCourseDetail />}
        ></Route> */}
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

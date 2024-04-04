import React, { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        `${API}/adminAuthentication/adminLogin`,
        {
          adminEmail: adminEmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        if ((res.data.status = "success")) {
          localStorage.setItem("Admin_token", res.data.token); //code to set token in localstorage
          return navigate("/");
        } else {
          navigate("/login"); //if not found then it will send to login page
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
        <div className="flex flex-col overflow-hidden justify-center bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-[#0F1131] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              Mobile Tech CRM
            </div>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <form action="#" className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  {/* <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a> */}
                </div>
                <input
                  type="password"
                  id="password"
                  name={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div> */}
              <div>
                <button
                  onClick={HandleLogin}
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-[#0F1131] rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
